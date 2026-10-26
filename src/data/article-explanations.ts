export interface ArticleExplanation {
  explanation: string;
  realLifeExample: string;
  keyTakeaway: string;
}

export const ARTICLE_EXPLANATIONS: Record<string, ArticleExplanation> = {
  '1': {
    explanation:
      'Declares that India, also officially called Bharat, is a Union of States. This means India is an indivisible federation where states do not have the right to secede or break away.',
    realLifeExample:
      'Official passports, government orders, and currency use both "India" and "Bharat" interchangeably as the official names of our sovereign country.',
    keyTakeaway: 'India is one united nation composed of diverse states and union territories.',
  },
  '12': {
    explanation:
      'Defines what "the State" means for the purpose of Fundamental Rights. "The State" includes the Government and Parliament of India, state governments, state legislatures, local panchayats, municipalities, and all government-controlled authorities.',
    realLifeExample:
      'If a government department, public university, or state police force violates your basic rights, you can challenge their action under the Constitution because they are "the State".',
    keyTakeaway: 'Fundamental Rights protect you against all government bodies and state authorities.',
  },
  '13': {
    explanation:
      'Any law, regulation, ordinance, or custom that violates or conflicts with Fundamental Rights is automatically void (invalid and unenforceable) to the extent of that violation.',
    realLifeExample:
      'If Parliament or a state assembly passes a law stopping women from working or censoring lawful speech, the Supreme Court or High Courts can strike it down as unconstitutional.',
    keyTakeaway: 'No law in India can override or take away your Fundamental Rights.',
  },
  '14': {
    explanation:
      'Guarantees equality before the law and equal protection of the laws to every person in India. The government cannot treat citizens arbitrarily or create unfair privileges.',
    realLifeExample:
      'A traffic police officer or court must apply the exact same speed limits and criminal penal codes to a high-ranking politician as they do to an everyday autorickshaw driver.',
    keyTakeaway: 'The law treats everyone equally without fear or favor.',
  },
  '15': {
    explanation:
      'Prohibits discrimination against any citizen on grounds only of religion, race, caste, sex, or place of birth. Guarantees equal access to shops, public restaurants, hotels, public wells, and public spaces.',
    realLifeExample:
      'No shopkeeper, hotel owner, or school can deny admission or service to a person simply because of their caste, religion, or gender.',
    keyTakeaway: 'You cannot be denied access to public places or services based on your identity.',
  },
  '16': {
    explanation:
      'Ensures equality of opportunity for all citizens in matters of government employment. No citizen can be disqualified from a public job solely due to religion, race, caste, sex, or birthplace.',
    realLifeExample:
      'Any eligible Indian citizen can apply for UPSC civil services, railway jobs, or public bank exams, with affirmative action reservations provided to support historically disadvantaged communities.',
    keyTakeaway: 'Every citizen has a fair chance to apply for government jobs.',
  },
  '17': {
    explanation:
      'Completely abolishes "Untouchability" in all forms. Practicing untouchability or enforcing any disability arising out of it is a punishable criminal offence under the law.',
    realLifeExample:
      'Preventing anyone from entering a village temple, drawing drinking water from a public community tap, or sitting together at a public school is strictly illegal under the SC/ST (Prevention of Atrocities) Act.',
    keyTakeaway: 'Untouchability is an absolute criminal offence with zero exceptions.',
  },
  '18': {
    explanation:
      'Abolishes all hereditary titles of nobility (such as Rai Bahadur, Maharaja, Nawab, Sir). The State can only confer military and academic distinctions.',
    realLifeExample:
      'National honours like Bharat Ratna or Padma Bhushan are awards for exceptional service, not hereditary titles to be prefixed to someone’s name like a royal title.',
    keyTakeaway: 'India recognizes personal merit, not feudal or inherited royal titles.',
  },
  '19': {
    explanation:
      'Guarantees six essential democratic freedoms: (1) freedom of speech and expression, (2) freedom to assemble peacefully without arms, (3) freedom to form associations or unions, (4) freedom to move freely throughout India, (5) freedom to reside and settle anywhere in India, and (6) freedom to practice any trade or profession.',
    realLifeExample:
      'A journalist investigating civic corruption, workers forming a registered union, or a family from Bihar moving to work and live peacefully in Karnataka are all protected under Article 19.',
    keyTakeaway: 'Your bedrock civic freedoms to speak, organize, travel, live, and work anywhere in India.',
  },
  '20': {
    explanation:
      'Protects citizens accused of crimes: (1) no retroactive criminal laws (you cannot be punished for an act that was not illegal when committed), (2) protection against double jeopardy (no one can be tried twice for the same crime), and (3) protection against self-incrimination (you cannot be compelled to be a witness against yourself).',
    realLifeExample:
      'Police cannot torture an arrested suspect into signing a confession and use that coerced statement as evidence in court.',
    keyTakeaway: 'Fair trial guarantees preventing police abuse and double punishment.',
  },
  '21': {
    explanation:
      'Declares that no person shall be deprived of their life or personal liberty except according to procedure established by law. The Supreme Court has expanded this to include the right to live with dignity, right to privacy, right to clean drinking water, and right to healthcare.',
    realLifeExample:
      'In landmark judgments (Puttaswamy case), the Supreme Court ruled that personal digital privacy and biometric data security are protected fundamental rights under Article 21.',
    keyTakeaway: 'The heart of the Constitution: your sacred right to life, liberty, and personal dignity.',
  },
  '21A': {
    explanation:
      'Mandates that the State must provide free and compulsory education to all children between the ages of 6 and 14 years.',
    realLifeExample:
      'Under the Right to Education (RTE) Act, government schools cannot charge fees from children aged 6–14, and private unaided schools must reserve 25% of entry-level seats for underprivileged children.',
    keyTakeaway: 'Every Indian child aged 6 to 14 has a constitutional right to go to school for free.',
  },
  '22': {
    explanation:
      'Protects individuals who are arrested: (1) right to be informed immediately of the grounds for arrest, (2) right to consult and be defended by a legal practitioner of choice, and (3) must be produced before the nearest magistrate within 24 hours of arrest.',
    realLifeExample:
      'If police detain an individual, they cannot keep them locked up in a police station past 24 hours without presenting them before a judicial magistrate.',
    keyTakeaway: 'Police must tell you why you are arrested and present you to a judge within 24 hours.',
  },
  '23': {
    explanation:
      'Strictly prohibits human trafficking, forced bonded labour (begar), and any form of compulsory labour without wages.',
    realLifeExample:
      'Brick kiln owners or contractors cannot force workers to work without statutory minimum wages or trap families in generational debt bondage.',
    keyTakeaway: 'No person can be bought, sold, or forced into unpaid labour.',
  },
  '24': {
    explanation:
      'Forbids employing children below the age of 14 years in any factory, mine, or hazardous occupation.',
    realLifeExample:
      'Employing a 12-year-old child in firecracker factories, chemical plants, or construction sites is a serious criminal offence.',
    keyTakeaway: 'Children belong in school, never in hazardous work.',
  },
  '25': {
    explanation:
      'Guarantees freedom of conscience and the right to freely profess, practice, and propagate any religion, subject to public order, morality, and health.',
    realLifeExample:
      'Citizens of all communities are free to wear religious attire, celebrate religious festivals, and worship according to their beliefs.',
    keyTakeaway: 'Complete freedom of faith and conscience for every individual.',
  },
  '29': {
    explanation:
      'Protects any section of citizens residing in India with a distinct language, script, or culture of their own, guaranteeing the right to conserve and preserve it.',
    realLifeExample:
      'Linguistic minority communities (e.g. Tamil speakers in Delhi or Bengali speakers in Maharashtra) have the right to maintain schools in their mother tongue.',
    keyTakeaway: 'India’s rich linguistic and cultural heritage is constitutionally shielded.',
  },
  '30': {
    explanation:
      'Gives all religious and linguistic minorities the right to establish and administer educational institutions of their choice.',
    realLifeExample:
      'Christian missionary colleges (like St. Stephen’s) or minority institutions (like Aligarh Muslim University) can establish and run their academic programs.',
    keyTakeaway: 'Minorities have the constitutional autonomy to manage educational institutions.',
  },
  '32': {
    explanation:
      'Guarantees the right to move the Supreme Court directly for the enforcement of Fundamental Rights. Dr. B.R. Ambedkar called this Article the "very soul of the Constitution and the very heart of it". The Court can issue Writs: Habeas Corpus, Mandamus, Prohibition, Quo Warranto, and Certiorari.',
    realLifeExample:
      'If an activist or citizen is unlawfully imprisoned by authorities, their family can file a Habeas Corpus writ petition under Article 32 to compel police to produce the person before court immediately.',
    keyTakeaway: 'The ultimate shield: you can take the government directly to the Supreme Court if your rights are violated.',
  },
  '39A': {
    explanation:
      'Directs the State to ensure equal justice and provide free legal aid to poor and weaker sections of society, so that justice is not denied due to economic hardship.',
    realLifeExample:
      'The National Legal Services Authority (NALSA) provides free government-appointed defense advocates in court for anyone who cannot afford private legal counsel.',
    keyTakeaway: 'Poverty should never prevent an Indian citizen from getting justice in court.',
  },
  '40': {
    explanation:
      'Directs the State to organize village panchayats and endow them with such powers and authority as necessary to enable them to function as units of self-government.',
    realLifeExample:
      'Village Gram Panchayats holding Gram Sabha meetings where local residents directly vote on village roads, drinking water, and development funds.',
    keyTakeaway: 'Democratic self-governance starting right at the village level.',
  },
  '44': {
    explanation:
      'Directs the State to endeavor to secure for all citizens a Uniform Civil Code throughout the territory of India, providing uniform civil laws for marriage, divorce, and inheritance.',
    realLifeExample:
      'Goa’s civil code, which provides uniform rules of marriage and property rights across all communities in the state.',
    keyTakeaway: 'A guiding directive towards uniform civil rules for marriage, succession, and family law.',
  },
  '48A': {
    explanation:
      'Directs the State to protect and improve the natural environment and to safeguard the forests and wildlife of the country.',
    realLifeExample:
      'National parks, tiger reserves, pollution control laws, and green tribunals established to prevent industrial waste dumping into rivers.',
    keyTakeaway: 'The government has a duty to protect India’s rivers, air, forests, and wildlife.',
  },
  '51A': {
    explanation:
      'Lists the 11 Fundamental Duties of every citizen of India, including respecting the National Flag and Anthem, cherishing our freedom struggle, protecting the unity and integrity of India, promoting harmony, renouncing practices derogatory to women, safeguarding public property, and developing a scientific temper.',
    realLifeExample:
      'Standing with respect for the National Anthem, refraining from vandalizing public buses or trains during protests, and encouraging girl-child education are direct applications of Article 51A.',
    keyTakeaway: 'Rights and duties go hand-in-hand: 11 civic responsibilities we owe to India.',
  },
  '300A': {
    explanation:
      'Provides that no person shall be deprived of their private property except by authority of law.',
    realLifeExample:
      'The government cannot arbitrarily seize someone’s home or agricultural land without passing a formal statutory law and paying fair compensation under Land Acquisition rules.',
    keyTakeaway: 'Your home and land cannot be seized without legal process and fair compensation.',
  },
  '326': {
    explanation:
      'Guarantees universal adult suffrage: elections to the Lok Sabha and State Legislative Assemblies shall be on the basis of adult suffrage. Every citizen aged 18 or above who is not otherwise disqualified has the right to vote.',
    realLifeExample:
      'Election Day in India, where over 900 million citizens of every social class, faith, and gender stand in the same queue to cast their vote with a single blue indelible ink mark.',
    keyTakeaway: 'One person, one vote: the bedrock of Indian democracy.',
  },
  '368': {
    explanation:
      'Specifies the formal procedure by which Parliament can amend the Constitution, requiring special majorities in both Houses and, for federal provisions, ratification by at least half of the State Legislatures.',
    realLifeExample:
      'Major amendments like the GST constitutional amendment or the 103rd EWS amendment were passed strictly following the procedure under Article 368.',
    keyTakeaway: 'The Constitution can adapt to modern times through a strict, transparent democratic amendment process.',
  },
  '370': {
    explanation:
      'Originally provided temporary, transitional autonomous status to the State of Jammu and Kashmir. Following Presidential Orders C.O. 272 and C.O. 273 in August 2019, all operative clauses of Article 370 were made inoperative, applying the entire Indian Constitution equally to Jammu and Kashmir.',
    realLifeExample:
      'All central Indian laws, including the Right to Education, Right to Information, and reservation laws, now apply fully in the Union Territories of Jammu & Kashmir and Ladakh.',
    keyTakeaway: 'The entire Indian Constitution now applies uniformly across Jammu, Kashmir, and Ladakh.',
  },
};

/**
 * Returns a plain-language summary for any article.
 * Uses curated explanation if available, or generates a structured plain-language summary from title & part.
 */
export function getExplanationForArticle(
  artNumber: string,
  artTitle: string,
  artPart: string | null
): ArticleExplanation {
  const cleanNum = artNumber.toUpperCase().trim();
  if (ARTICLE_EXPLANATIONS[cleanNum]) {
    return ARTICLE_EXPLANATIONS[cleanNum];
  }

  // Fallback synthesis for articles not in curated top 30
  const isOmitted = artTitle.toLowerCase().includes('omitted') || artTitle.toLowerCase().includes('repealed');
  if (isOmitted) {
    return {
      explanation: `This article was omitted or repealed from the Constitution by a constitutional amendment and is no longer operative law.`,
      realLifeExample: `Historical provisions that were removed to streamline governance as India's legal system developed.`,
      keyTakeaway: `Repealed / Omitted provision (historical record only).`,
    };
  }

  return {
    explanation: `Article ${artNumber} governs provisions regarding "${artTitle.replace(/\.$/, '')}" under ${artPart || 'the Constitution of India'}. It outlines the legal boundaries, constitutional powers, and procedural rules that public authorities must follow.`,
    realLifeExample: `Ensures government departments and institutions operate under clear written constitutional procedures rather than personal discretion.`,
    keyTakeaway: `Official constitutional rule governing ${artTitle.toLowerCase().replace(/\.$/, '')}.`,
  };
}

