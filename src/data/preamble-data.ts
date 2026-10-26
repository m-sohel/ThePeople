export interface PreambleWord {
  id: string;
  word: string;
  hindi: string;
  meaning: string;
  simpleExplanation: string;
  realLifeExample: string;
  accent: 'saffron' | 'navy' | 'green';
}

export const PREAMBLE_TERMS: PreambleWord[] = [
  {
    id: 'sovereign',
    word: 'SOVEREIGN',
    hindi: 'संप्रभु',
    meaning: 'Supreme, independent, and self-governing.',
    simpleExplanation:
      'India is completely independent. No foreign country or outside power can dictate how India is governed. The people of India, through their elected representatives, have the ultimate authority to make all laws and decisions.',
    realLifeExample:
      'India decides its own foreign policies, trade agreements, and domestic laws without seeking approval from any other nation.',
    accent: 'saffron',
  },
  {
    id: 'socialist',
    word: 'SOCIALIST',
    hindi: 'समाजवादी',
    meaning: 'Committed to social and economic justice for all.',
    simpleExplanation:
      'The government strives to reduce economic inequality, fight poverty, and ensure that wealth and natural resources benefit all citizens, rather than concentrating in just a few hands.',
    realLifeExample:
      'Welfare programs like free public schooling, government hospitals, food security schemes (rations), and pension plans for the elderly.',
    accent: 'green',
  },
  {
    id: 'secular',
    word: 'SECULAR',
    hindi: 'पंथनिरपेक्ष / धर्मनिरपेक्ष',
    meaning: 'Equal respect and freedom for all religions.',
    simpleExplanation:
      'The Republic of India has no official State religion. The government treats all faiths with equal respect and neutrality. Every citizen has the fundamental right to practice, preach, or not practice any religion of their choice.',
    realLifeExample:
      'A Hindu, Muslim, Sikh, Christian, Buddhist, Jain, or atheist has identical rights to vote, run for public office, and secure government jobs without religious discrimination.',
    accent: 'navy',
  },
  {
    id: 'democratic',
    word: 'DEMOCRATIC',
    hindi: 'लोकतांत्रिक',
    meaning: 'Rule of the people, by the people, for the people.',
    simpleExplanation:
      'Power originates from the citizens. Every Indian citizen aged 18 or above has one vote, and every vote has equal value. Citizens elect their leaders to govern, and can change them through peaceful, regular elections.',
    realLifeExample:
      'Lok Sabha and State Assembly elections where ordinary citizens cast their secret ballot to elect Members of Parliament and MLAs.',
    accent: 'saffron',
  },
  {
    id: 'republic',
    word: 'REPUBLIC',
    hindi: 'गणराज्य',
    meaning: 'A country headed by an elected representative, not a king or queen.',
    simpleExplanation:
      'The highest office in the country—the President of India—is elected by the representatives of the people for a fixed term. There is no hereditary monarchy or dynastic privilege in governance.',
    realLifeExample:
      'Any citizen from any background, regardless of wealth or lineage, can rise to become the President or Prime Minister of India.',
    accent: 'green',
  },
  {
    id: 'justice',
    word: 'JUSTICE',
    hindi: 'न्याय',
    meaning: 'Fairness in society, the economy, and the legal system.',
    simpleExplanation:
      'The Constitution promises three kinds of justice: Social (no discrimination based on caste, gender, or birth), Economic (reducing wealth gaps and guaranteeing fair pay), and Political (equal access to political participation).',
    realLifeExample:
      'The abolition of untouchability (Article 17) and free legal aid for citizens who cannot afford a private lawyer in court.',
    accent: 'navy',
  },
  {
    id: 'liberty',
    word: 'LIBERTY',
    hindi: 'स्वतंत्रता',
    meaning: 'Freedom to think, express, believe, and live with dignity.',
    simpleExplanation:
      'Citizens are free to express opinions, pursue professions of their choice, travel anywhere in India, and follow their faith, so long as it does not infringe on others’ safety or rights.',
    realLifeExample:
      'Writing articles, expressing opinions peacefully, choosing your career, and traveling freely to any state in India.',
    accent: 'saffron',
  },
  {
    id: 'equality',
    word: 'EQUALITY',
    hindi: 'समानता',
    meaning: 'Equal status and equal opportunity before the law.',
    simpleExplanation:
      'The law applies equally to everyone—from a daily wage earner to the Prime Minister. No citizen is granted special privileges, and all citizens have equal opportunity to apply for public employment and education.',
    realLifeExample:
      'Article 14 ensures that a police officer or court treats every person under the exact same legal standards without favoritism.',
    accent: 'green',
  },
  {
    id: 'fraternity',
    word: 'FRATERNITY',
    hindi: 'बंधुत्व',
    meaning: 'A feeling of common brotherhood and mutual dignity.',
    simpleExplanation:
      'Because India has immense diversity of languages, religions, and cultures, fraternity encourages all citizens to feel like members of one single family, assuring both individual dignity and national unity.',
    realLifeExample:
      'Celebrating national festivals together and standing up against communal hatred or violence to preserve India’s shared unity.',
    accent: 'navy',
  },
];

export const HISTORICAL_MILESTONES = [
  {
    title: 'Objective Resolution Moved',
    date: '13 December 1946',
    description: 'Pandit Jawaharlal Nehru presented the historic Objective Resolution in the Constituent Assembly, outlining the vision and foundational philosophy of the Constitution.',
  },
  {
    title: 'Drafting Committee Formed',
    date: '29 August 1947',
    description: 'Dr. B. R. Ambedkar was appointed Chairman of the Drafting Committee to prepare the draft Constitution for independent India.',
  },
  {
    title: 'Adoption of the Constitution',
    date: '26 November 1949',
    description: 'The Constituent Assembly finalized and formally adopted the Constitution of India. Celebrated annually nationwide as National Constitution Day (Samvidhan Divas).',
  },
  {
    title: 'Commencement of the Republic',
    date: '26 January 1950',
    description: 'The Constitution came into full legal effect, transforming the Dominion of India into the sovereign Republic of India. Celebrated annually as Republic Day.',
  },
  {
    title: '42nd Constitutional Amendment',
    date: '1976 (Effective 3 Jan 1977)',
    description: 'The words "SOCIALIST" and "SECULAR" were added to describe the Republic, and "unity of the Nation" was amended to "unity and integrity of the Nation".',
  },
];

