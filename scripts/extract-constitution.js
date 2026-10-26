/**
 * Extraction Script: Official Constitution of India PDF to Structured JSON
 * 
 * Source: /assets/official constitution/english-version.pdf
 * Target: /assets/data/
 * 
 * Hierarchy:
 * - Preamble
 * - Parts (with Chapters and Article references)
 * - Articles (id, number, title, part, chapter, fullText, simpleExplanation, footnotes, status)
 * - Schedules (1 to 12)
 * - Appendices (I, II, III)
 * - Parsing Report (audit trail of parsing fidelity and manual review flags)
 */

const fs = require('fs');
const path = require('path');
const { PDFParse } = require('pdf-parse');

const PDF_PATH = path.join(__dirname, '..', 'assets', 'official constitution', 'english-version.pdf');
const OUTPUT_DIR = path.join(__dirname, '..', 'assets', 'data');

async function extractConstitution() {
  console.log('📖 Starting extraction from:', PDF_PATH);

  if (!fs.existsSync(PDF_PATH)) {
    throw new Error(`Constitution PDF not found at: ${PDF_PATH}`);
  }

  const dataBuffer = fs.readFileSync(PDF_PATH);
  const parser = new PDFParse({ data: dataBuffer });
  await parser.load();
  const pdfData = await parser.getText();
  const pages = pdfData.pages;

  console.log(`📄 Total pages in PDF: ${pdfData.total}`);

  // 1. EXTRACT PREAMBLE (Page 32, index 31)
  console.log('\n--- Parsing Preamble (Page 32) ---');
  const preamblePageText = pages[31].text;
  const preambleLines = preamblePageText.split('\n').map(l => l.trim()).filter(Boolean);
  
  let preambleText = '';
  let preambleFootnotes = [];
  let readingFootnotes = false;

  for (const line of preambleLines) {
    if (line === 'THE CONSTITUTION OF INDIA' || line === 'PREAMBLE') continue;
    if (/^\d+\.\s+Subs\./.test(line)) {
      readingFootnotes = true;
    }
    if (readingFootnotes) {
      preambleFootnotes.push(line);
    } else {
      preambleText += (preambleText ? '\n' : '') + line;
    }
  }

  const preamble = {
    title: 'PREAMBLE',
    fullText: preambleText.trim(),
    simpleExplanation: 'The Preamble is the guiding spirit and introduction to the Constitution. It declares India to be a Sovereign, Socialist, Secular, Democratic Republic, committed to securing Justice, Liberty, Equality for all citizens, and promoting Fraternity and unity.',
    footnotes: preambleFootnotes,
    page: 32
  };
  console.log('✓ Preamble parsed successfully');

  // 2. PARSE TABLE OF CONTENTS (Pages 4 to 31, indices 3 to 30)
  console.log('\n--- Parsing Table of Contents (Pages 4 - 31) ---');
  let tocLines = [];
  for (let p = 3; p <= 30; p++) {
    const lines = pages[p].text.split('\n').map(l => l.trim()).filter(Boolean);
    for (const line of lines) {
      if (line === 'ARTICLES' || line === 'Contents' || line === 'THE CONSTITUTION OF INDIA' || line === 'PREAMBLE') continue;
      if (/^\([ivxlcdm]+\)$/i.test(line)) continue; // page numbers like (ii)
      tocLines.push(line);
    }
  }

  const tocParts = [];
  const tocArticles = [];
  let currentPart = null;
  let currentChapter = null;

  for (let i = 0; i < tocLines.length; i++) {
    const line = tocLines[i];
    if (line === 'SCHEDULES') break;

    // Detect Part
    const partMatch = line.match(/^(\[?PART\s+[IVXLCDM]+[A-Z]?.*?)(?:\])?$/i);
    if (partMatch && !line.includes('—Provisions') && !line.includes('—General')) {
      const partId = line;
      let partTitle = tocLines[i + 1] || '';
      if (partTitle.startsWith('PART') || partTitle.startsWith('CHAPTER') || /^\d+\./.test(partTitle)) {
        partTitle = '';
      } else {
        i++;
      }
      currentPart = {
        header: partId,
        title: partTitle,
        chapters: [],
        articleIds: []
      };
      tocParts.push(currentPart);
      currentChapter = null;
      continue;
    }

    // Detect Chapter
    const chapMatch = line.match(/^CHAPTER\s+[IVXLCDM]+[A-Z]?\s*[.—–-]?\s*(.*)/i);
    if (chapMatch) {
      currentChapter = line;
      if (currentPart && !currentPart.chapters.includes(currentChapter)) {
        currentPart.chapters.push(currentChapter);
      }
      continue;
    }

    // Detect Article in TOC
    const artMatch = line.match(/^\[?(\d+[A-Z]*)\.\s*(.*)/);
    if (artMatch) {
      const artNum = artMatch[1];
      const numericPart = parseInt(artNum.replace(/\D/g, ''), 10);
      if (numericPart > 395) {
        // Skip years like '1950.' that appear inside omitted article titles
        continue;
      }
      let title = artMatch[2];
      let j = i + 1;
      while (
        j < tocLines.length &&
        !tocLines[j].match(/^\[?\d+[A-Z]*\./) &&
        !tocLines[j].match(/^PART\s+/) &&
        !tocLines[j].match(/^\[PART\s+/) &&
        !tocLines[j].match(/^CHAPTER\s+/) &&
        tocLines[j] !== 'SCHEDULES'
      ) {
        title += ' ' + tocLines[j];
        j++;
      }
      i = j - 1;

      title = title.replace(/\]$/, '').trim();
      const isOmitted = title.toLowerCase().includes('omitted') || title.toLowerCase().includes('repealed');

      const artDef = {
        number: artNum,
        title,
        part: currentPart ? currentPart.header : null,
        chapter: currentChapter,
        status: isOmitted ? 'omitted' : 'active'
      };

      tocArticles.push(artDef);
      if (currentPart) {
        currentPart.articleIds.push(artNum);
      }
    }
  }

  console.log(`✓ Found ${tocParts.length} Parts and ${tocArticles.length} Articles in Table of Contents`);

  // 3. PARSE BODY TEXT (Pages 33 to 283, indices 32 to 282)
  console.log('\n--- Parsing Article Full Texts from Body (Pages 33 - 283) ---');

  // Build clean text with page boundary tracking
  const bodyPages = [];
  for (let p = 32; p <= 282; p++) {
    const rawLines = pages[p].text.split('\n');
    const cleanedLines = [];
    let isHeader = true;

    for (const rawLine of rawLines) {
      const trimmed = rawLine.trim();
      // Remove running header
      if (isHeader && (
        /^\d+\s+THE CONSTITUTION OF INDIA/i.test(trimmed) ||
        /^THE CONSTITUTION OF INDIA\s+\d+/i.test(trimmed) ||
        /^\((?:Part|PART)\s+[^\)]+\)/.test(trimmed)
      )) {
        continue;
      }
      isHeader = false;
      cleanedLines.push(rawLine);
    }
    bodyPages.push({ pageNum: p + 1, text: cleanedLines.join('\n') });
  }

  const fullBodyText = bodyPages.map(p => p.text).join('\n');

  // Match each article in the body text
  // Pattern accommodates footnotes, brackets, etc.: e.g. "1. Name", "3[2A. Sikkim", "[31. Compulsory", "132A. [Constitutional"
  const articleLocations = [];
  const flags = [];

  for (let idx = 0; idx < tocArticles.length; idx++) {
    const art = tocArticles[idx];
    const num = art.number;
    
    // Create targeted regex
    // Looks for line starting or preceded by newline with optional footnote markers (numbers, brackets, asterisks, unicode markers): e.g. "1. Name", "3[2A. Sikkim", "[31. Compulsory", "1[370."
    const pattern = new RegExp(`(?:^|\\n)(?:[0-9*\\uF000-\\uFFFF]+\\s*\\[*|\\[|\\*+)?${num}\\.\\s*`, 'g');
    
    let match;
    let foundIndex = -1;
    let matchLength = 0;

    // Search from previous article's location to prevent backwards misattribution
    const searchStart = articleLocations.length > 0 ? articleLocations[articleLocations.length - 1].startIndex : 0;
    pattern.lastIndex = searchStart;

    while ((match = pattern.exec(fullBodyText)) !== null) {
      // Avoid false matches inside internal cross-references like "under article 32."
      // An article start should usually be at line start or preceded by a newline
      foundIndex = match.index;
      matchLength = match[0].length;
      break;
    }

    if (foundIndex === -1) {
      // Secondary fallback search from 0 if not found sequentially
      pattern.lastIndex = 0;
      match = pattern.exec(fullBodyText);
      if (match) {
        foundIndex = match.index;
        matchLength = match[0].length;
      }
    }

    if (foundIndex !== -1) {
      articleLocations.push({
        article: art,
        startIndex: foundIndex,
        contentStart: foundIndex + matchLength
      });
    } else if (num === '238') {
      // Part VII (Article 238) was omitted in its entirety by Constitution (7th Amendment) Act, 1956
      const part7Idx = fullBodyText.indexOf('PART VII');
      if (part7Idx !== -1) {
        articleLocations.push({
          article: art,
          startIndex: part7Idx,
          contentStart: part7Idx + 8
        });
      }
    } else {
      flags.push({
        type: 'ARTICLE_BODY_NOT_FOUND',
        articleNumber: num,
        title: art.title,
        status: art.status,
        note: art.status === 'omitted' ? 'Omitted article; may not have dedicated body text block' : 'Requires manual review'
      });
    }
  }

  // Sort locations by appearance order
  articleLocations.sort((a, b) => a.startIndex - b.startIndex);

  // Extract content between article boundaries
  const articles = [];
  for (let i = 0; i < articleLocations.length; i++) {
    const loc = articleLocations[i];
    const nextLoc = articleLocations[i + 1];
    
    let rawBlock = '';
    if (nextLoc) {
      rawBlock = fullBodyText.substring(loc.startIndex, nextLoc.startIndex);
    } else {
      // Last article (395) extends to the end of PART XXII
      const endMarker = fullBodyText.indexOf('FIRST SCHEDULE', loc.startIndex);
      rawBlock = fullBodyText.substring(loc.startIndex, endMarker !== -1 ? endMarker : loc.startIndex + 2000);
    }

    // Separate operative article text from trailing footnotes
    const blockLines = rawBlock.split('\n');
    let operativeLines = [];
    let footnotes = [];
    let inFootnotes = false;

    for (const bLine of blockLines) {
      const trimmed = bLine.trim();
      // Footnote start pattern (e.g., "1. Subs. by...", "2. Ins. by...", "* Omitted by...")
      if (/^(\d+\.\s*(?:Subs\.|Ins\.|Added|The words|Certain words|Omitted|In its application|See|Cl\.|Sub-clause|Article|w\.e\.f\.)|\*{1,4}\s+)/.test(trimmed)) {
        inFootnotes = true;
      }

      if (inFootnotes) {
        if (trimmed && !/^\d+$/.test(trimmed)) { // exclude standalone page numbers
          footnotes.push(trimmed);
        }
      } else {
        // Exclude standalone page numbers at bottom
        if (!/^\d+$/.test(trimmed)) {
          operativeLines.push(bLine);
        }
      }
    }

    const fullArticleText = operativeLines.join('\n').trim();

    articles.push({
      id: `art-${loc.article.number.toLowerCase()}`,
      number: loc.article.number,
      title: loc.article.title,
      part: loc.article.part,
      chapter: loc.article.chapter,
      status: loc.article.status,
      fullText: fullArticleText,
      simpleExplanation: '', // placeholder as requested
      footnotes: footnotes
    });
  }

  console.log(`✓ Extracted ${articles.length} article text blocks`);

  // 4. PARSE SCHEDULES (Pages 284 to 381, indices 283 to 380)
  console.log('\n--- Parsing Schedules (Pages 284 - 381) ---');
  const scheduleNames = [
    { num: 1, name: 'FIRST SCHEDULE', title: 'The States and The Union Territories' },
    { num: 2, name: 'SECOND SCHEDULE', title: 'Provisions as to the President, Governors, Ministers, Judges, and CAG' },
    { num: 3, name: 'THIRD SCHEDULE', title: 'Forms of Oaths or Affirmations' },
    { num: 4, name: 'FOURTH SCHEDULE', title: 'Allocation of Seats in the Council of States' },
    { num: 5, name: 'FIFTH SCHEDULE', title: 'Provisions as to the Administration and Control of Scheduled Areas and Scheduled Tribes' },
    { num: 6, name: 'SIXTH SCHEDULE', title: 'Provisions as to the Administration of Tribal Areas in Assam, Meghalaya, Tripura and Mizoram' },
    { num: 7, name: 'SEVENTH SCHEDULE', title: 'Union List, State List, and Concurrent List' },
    { num: 8, name: 'EIGHTH SCHEDULE', title: 'Official Recognized Languages of the Republic' },
    { num: 9, name: 'NINTH SCHEDULE', title: 'Validation of Certain Acts and Regulations' },
    { num: 10, name: 'TENTH SCHEDULE', title: 'Provisions as to Disqualification on Ground of Defection' },
    { num: 11, name: 'ELEVENTH SCHEDULE', title: 'Powers, Authority and Responsibilities of Panchayats' },
    { num: 12, name: 'TWELFTH SCHEDULE', title: 'Powers, Authority and Responsibilities of Municipalities' }
  ];

  // Schedule page indices
  const scheduleLocations = [];
  for (const sch of scheduleNames) {
    let foundPage = -1;
    for (let p = 283; p <= 380; p++) {
      if (pages[p].text.includes(sch.name)) {
        foundPage = p;
        break;
      }
    }
    scheduleLocations.push({ ...sch, pageIndex: foundPage });
  }

  const schedules = [];
  for (let s = 0; s < scheduleLocations.length; s++) {
    const cur = scheduleLocations[s];
    const next = scheduleLocations[s + 1];
    const startP = cur.pageIndex !== -1 ? cur.pageIndex : 283;
    const endP = next && next.pageIndex !== -1 ? next.pageIndex - 1 : 380;

    let schText = '';
    for (let p = startP; p <= endP; p++) {
      schText += pages[p].text + '\n';
    }

    schedules.push({
      id: `sch-${cur.num}`,
      number: cur.num,
      name: cur.name,
      title: cur.title,
      startPage: startP + 1,
      endPage: endP + 1,
      fullText: schText.trim(),
      simpleExplanation: ''
    });
  }
  console.log(`✓ Parsed all ${schedules.length} Schedules`);

  // 5. PARSE APPENDICES / AMENDMENTS (Pages 382 to 402)
  console.log('\n--- Parsing Appendices & Constitutional Amendment Orders (Pages 382 - 402) ---');
  const appendices = [
    {
      id: 'app-1',
      number: 'I',
      title: 'The Constitution (One Hundredth Amendment) Act, 2015',
      description: 'Acquiring of territories by India and transfer of certain territories to Bangladesh.',
      startPage: 382,
      endPage: 400
    },
    {
      id: 'app-2',
      number: 'II',
      title: 'The Constitution (Application to Jammu and Kashmir) Order, 2019 (C.O. 272)',
      description: 'Order issued under Article 370(1) applying all provisions of the Indian Constitution to J&K.',
      startPage: 401,
      endPage: 401
    },
    {
      id: 'app-3',
      number: 'III',
      title: 'Declaration under Article 370(3) of the Constitution (C.O. 273)',
      description: 'Presidential declaration that all clauses of Article 370 shall cease to be operative.',
      startPage: 402,
      endPage: 402
    }
  ];

  for (const app of appendices) {
    let appText = '';
    for (let p = app.startPage - 1; p <= app.endPage - 1; p++) {
      if (pages[p]) appText += pages[p].text + '\n';
    }
    app.fullText = appText.trim();
  }
  console.log(`✓ Parsed ${appendices.length} Appendices`);

  // 6. BUILD FINAL HIERARCHICAL DATASET
  const constitutionData = {
    metadata: {
      title: 'Constitution of India',
      officialDate: 'As on 10th September, 2026',
      source: 'Ministry of Law and Justice, Legislative Department, Government of India',
      extractedAt: new Date().toISOString(),
      stats: {
        totalParts: tocParts.length,
        totalArticles: articles.length,
        totalSchedules: schedules.length,
        totalAppendices: appendices.length,
        flaggedItems: flags.length
      }
    },
    preamble,
    parts: tocParts.map(p => ({
      id: p.header.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      header: p.header,
      title: p.title,
      chapters: p.chapters,
      articleIds: p.articleIds.map(num => `art-${num.toLowerCase()}`)
    })),
    articles,
    schedules,
    appendices,
    parsingReport: {
      generatedAt: new Date().toISOString(),
      flaggedItems: flags,
      summary: `Successfully parsed Preamble, ${tocParts.length} Parts, ${articles.length} Articles, ${schedules.length} Schedules, and ${appendices.length} Appendices. Flagged ${flags.length} items for review.`
    }
  };

  // 7. WRITE TO ASSETS/DATA/
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const mainFilePath = path.join(OUTPUT_DIR, 'constitution.json');
  fs.writeFileSync(mainFilePath, JSON.stringify(constitutionData, null, 2), 'utf8');
  console.log(`\n💾 Saved primary dataset: ${mainFilePath} (${(fs.statSync(mainFilePath).size / 1024).toFixed(1)} KB)`);

  // Modular datasets for fast selective loading in Expo
  fs.writeFileSync(path.join(OUTPUT_DIR, 'preamble.json'), JSON.stringify(preamble, null, 2), 'utf8');
  fs.writeFileSync(path.join(OUTPUT_DIR, 'parts.json'), JSON.stringify(constitutionData.parts, null, 2), 'utf8');
  fs.writeFileSync(path.join(OUTPUT_DIR, 'articles.json'), JSON.stringify(articles, null, 2), 'utf8');
  fs.writeFileSync(path.join(OUTPUT_DIR, 'schedules.json'), JSON.stringify(schedules, null, 2), 'utf8');
  fs.writeFileSync(path.join(OUTPUT_DIR, 'appendices.json'), JSON.stringify(appendices, null, 2), 'utf8');
  fs.writeFileSync(path.join(OUTPUT_DIR, 'parsing-report.json'), JSON.stringify(constitutionData.parsingReport, null, 2), 'utf8');

  console.log('💾 Saved modular datasets: preamble.json, parts.json, articles.json, schedules.json, appendices.json, parsing-report.json');
  console.log('\n========================================');
  console.log('🎉 EXTRACTION COMPLETED SUCCESSFULLY');
  console.log(`- Parts: ${tocParts.length}`);
  console.log(`- Articles: ${articles.length}`);
  console.log(`- Schedules: ${schedules.length}`);
  console.log(`- Appendices: ${appendices.length}`);
  console.log(`- Flagged for Review: ${flags.length}`);
  console.log('========================================\n');

  await parser.destroy();
}

extractConstitution().catch(err => {
  console.error('❌ Extraction failed:', err);
  process.exit(1);
});
