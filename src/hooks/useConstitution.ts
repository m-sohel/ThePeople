import { useMemo } from 'react';
import { Article, Part, Schedule, Preamble, ConstitutionData } from '@/types/constitution';

const rawArticles: Article[] = require('@/assets/data/articles.json');
const rawParts: Part[] = require('@/assets/data/parts.json');
const rawPreamble: Preamble = require('@/assets/data/preamble.json');
const rawSchedules: Schedule[] = require('@/assets/data/schedules.json');
const rawConstitution: ConstitutionData = require('@/assets/data/constitution.json');

// Pre-index articles by ID and Number for O(1) lookup
const articleMapById = new Map<string, Article>();
const articleMapByNumber = new Map<string, Article>();

for (const art of rawArticles) {
  articleMapById.set(art.id, art);
  articleMapById.set(art.id.toLowerCase(), art);
  articleMapByNumber.set(art.number.toLowerCase(), art);
}

// Curated list of high-impact civic articles for daily rotation and citizen empowerment
export const CIVIC_KEY_ARTICLE_NUMBERS = [
  '1',    // Name and territory of the Union (India, that is Bharat)
  '14',   // Equality before law
  '15',   // Prohibition of discrimination
  '16',   // Equality of opportunity in public employment
  '19',   // Protection of six freedoms (Speech, Assembly, Association, Movement, Residence, Profession)
  '21',   // Protection of life and personal liberty
  '21A',  // Right to education
  '22',   // Protection against arrest and detention
  '23',   // Prohibition of human trafficking and forced labour
  '24',   // Prohibition of child labour in factories
  '25',   // Freedom of conscience and religion
  '29',   // Protection of interests of minorities
  '30',   // Right of minorities to establish educational institutions
  '32',   // Remedies for enforcement of Fundamental Rights (Soul of the Constitution)
  '39A',  // Equal justice and free legal aid
  '40',   // Organisation of village panchayats
  '44',   // Uniform civil code for citizens
  '45',   // Provision for early childhood care and education
  '48A',  // Protection and improvement of environment, forests, wildlife
  '51A',  // Fundamental duties of citizens
  '300A', // Persons not to be deprived of property save by authority of law
  '326',  // Adult suffrage (Universal right to vote)
  '368',  // Power of Parliament to amend the Constitution
];

/**
 * Deterministically returns the featured article for today's date.
 * Changes every calendar day at midnight.
 */
export function getDailyFeaturedArticle(): Article {
  const now = new Date();
  // Generate stable day of year: (year * 365 + day_of_year)
  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - startOfYear.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);

  const selectedNumber = CIVIC_KEY_ARTICLE_NUMBERS[dayOfYear % CIVIC_KEY_ARTICLE_NUMBERS.length];
  const article = articleMapByNumber.get(selectedNumber.toLowerCase());

  // Fallback to Article 21 (Life & Liberty) or first article if lookup fails
  return article || rawArticles.find(a => a.number === '21') || rawArticles[0];
}

export function useConstitution() {
  const dailyArticle = useMemo(() => getDailyFeaturedArticle(), []);

  const getArticle = (idOrNumber: string): Article | undefined => {
    if (!idOrNumber) return undefined;
    const clean = idOrNumber.trim().toLowerCase();
    return articleMapById.get(clean) || articleMapByNumber.get(clean.replace('art-', ''));
  };

  const getPart = (partId: string): Part | undefined => {
    return rawParts.find(p => p.id === partId.toLowerCase() || p.header.toLowerCase() === partId.toLowerCase());
  };

  const getArticlesForPart = (partHeader: string): Article[] => {
    if (!partHeader) return [];
    return rawArticles.filter(a => a.part && a.part.toUpperCase() === partHeader.toUpperCase());
  };

  const getFeaturedArticles = (): Article[] => {
    return CIVIC_KEY_ARTICLE_NUMBERS.map(num => articleMapByNumber.get(num.toLowerCase())).filter(
      Boolean
    ) as Article[];
  };

  return {
    articles: rawArticles,
    parts: rawParts,
    preamble: rawPreamble,
    schedules: rawSchedules,
    metadata: rawConstitution.metadata,
    dailyArticle,
    getArticle,
    getPart,
    getArticlesForPart,
    getFeaturedArticles,
  };
}

