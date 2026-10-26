import { Article } from '@/types/constitution';

const articles: Article[] = require('@/assets/data/articles.json');

export interface SearchResult {
  article: Article;
  score: number;
  matchedField: 'number' | 'title' | 'fullText';
  snippet: string;
}

/**
 * High-performance offline search index and ranker.
 * Matches article number, title, and body keywords with relevance scoring.
 */
export function searchConstitution(query: string, maxResults = 50): SearchResult[] {
  if (!query || !query.trim()) return [];

  const rawQuery = query.trim().toLowerCase();
  const cleanNumberQuery = rawQuery.replace(/^(?:art(?:icle)?\.?\s*)/i, '');
  const tokens = rawQuery.split(/\s+/).filter(Boolean);

  const results: SearchResult[] = [];

  for (const art of articles) {
    let score = 0;
    let matchedField: 'number' | 'title' | 'fullText' = 'fullText';
    let snippet = '';

    const artNumLower = art.number.toLowerCase();
    const artTitleLower = art.title.toLowerCase();
    const artTextLower = art.fullText.toLowerCase();

    // 1. Check Article Number (Highest priority)
    if (artNumLower === cleanNumberQuery) {
      score += 120;
      matchedField = 'number';
      snippet = `Exact match for Article ${art.number}: ${art.title}`;
    } else if (artNumLower.startsWith(cleanNumberQuery) && cleanNumberQuery.length > 0) {
      score += 80;
      matchedField = 'number';
      snippet = `Article ${art.number}: ${art.title}`;
    }

    // 2. Check Title
    if (artTitleLower.includes(rawQuery)) {
      score += 60;
      if (matchedField !== 'number') {
        matchedField = 'title';
        snippet = art.title;
      }
    } else {
      let matchedTokens = 0;
      for (const t of tokens) {
        if (artTitleLower.includes(t)) matchedTokens++;
      }
      if (matchedTokens > 0) {
        score += matchedTokens * 25;
        if (matchedField !== 'number') {
          matchedField = 'title';
          snippet = art.title;
        }
      }
    }

    // 3. Check Full Text (if score isn't already high)
    if (score < 50) {
      const idx = artTextLower.indexOf(rawQuery);
      if (idx !== -1) {
        score += 30;
        matchedField = 'fullText';
        const start = Math.max(0, idx - 40);
        const end = Math.min(art.fullText.length, idx + rawQuery.length + 80);
        snippet = `...${art.fullText.substring(start, end).replace(/\n/g, ' ')}...`;
      } else {
        let textTokensFound = 0;
        for (const t of tokens) {
          if (t.length > 2 && artTextLower.includes(t)) {
            textTokensFound++;
          }
        }
        if (textTokensFound >= Math.min(2, tokens.length)) {
          score += textTokensFound * 10;
          matchedField = 'fullText';
          snippet = `${art.fullText.slice(0, 120).replace(/\n/g, ' ')}...`;
        }
      }
    }

    if (score > 0) {
      results.push({
        article: art,
        score,
        matchedField,
        snippet: snippet || art.title,
      });
    }
  }

  // Sort descending by score
  results.sort((a, b) => b.score - a.score);

  return results.slice(0, maxResults);
}

