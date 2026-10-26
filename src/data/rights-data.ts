export interface RightGroup {
  id: string;
  category: string;
  articleRange: string;
  badge: 'green' | 'saffron' | 'navy';
  description: string;
  articles: {
    number: string;
    id: string;
    title: string;
    shortSummary: string;
  }[];
}

export interface CivicDuty {
  number: number;
  clause: string;
  title: string;
  description: string;
  everydayAction: string;
  badge: 'saffron' | 'green' | 'navy';
}

export interface DirectivePrinciple {
  number: string;
  id: string;
  title: string;
  focus: string;
  description: string;
}

export const FUNDAMENTAL_RIGHTS_GROUPS: RightGroup[] = [
  {
    id: 'equality',
    category: 'Right to Equality',
    articleRange: 'Articles 14 – 18',
    badge: 'green',
    description: 'Guarantees equal treatment under the law, forbids caste/gender/religion discrimination, and abolishes untouchability.',
    articles: [
      {
        number: '14',
        id: 'art-14',
        title: 'Equality before law',
        shortSummary: 'The government and courts must treat every person equally without favor or privilege.',
      },
      {
        number: '15',
        id: 'art-15',
        title: 'Prohibition of discrimination',
        shortSummary: 'No citizen can be denied access to shops, restaurants, public wells, or schools based on caste, religion, or gender.',
      },
      {
        number: '16',
        id: 'art-16',
        title: 'Equality of opportunity in public employment',
        shortSummary: 'All citizens have equal right to apply for government jobs, with affirmative action for disadvantaged groups.',
      },
      {
        number: '17',
        id: 'art-17',
        title: 'Abolition of Untouchability',
        shortSummary: 'Untouchability in all forms is completely abolished and punishable by criminal law.',
      },
      {
        number: '18',
        id: 'art-18',
        title: 'Abolition of titles',
        shortSummary: 'Abolishes feudal royal titles like Maharaja or Rai Bahadur; only military and academic honours are recognized.',
      },
    ],
  },
  {
    id: 'freedom',
    category: 'Right to Freedom',
    articleRange: 'Articles 19 – 22',
    badge: 'saffron',
    description: 'The foundation of individual liberty: speech, peaceful assembly, movement, life with dignity, and free education.',
    articles: [
      {
        number: '19',
        id: 'art-19',
        title: 'Protection of Six Democratic Freedoms',
        shortSummary: 'Freedom of speech, peaceful assembly, forming associations, traveling, residing, and working anywhere in India.',
      },
      {
        number: '20',
        id: 'art-20',
        title: 'Protection in criminal prosecutions',
        shortSummary: 'Protects against retroactive penal laws, being tried twice for the same crime, and forced self-incrimination.',
      },
      {
        number: '21',
        id: 'art-21',
        title: 'Protection of Life & Personal Liberty',
        shortSummary: 'No person shall be deprived of life or personal liberty except by law. Includes right to dignity and privacy.',
      },
      {
        number: '21A',
        id: 'art-21a',
        title: 'Right to Education',
        shortSummary: 'Free and compulsory schooling for all children between the ages of 6 and 14 years.',
      },
      {
        number: '22',
        id: 'art-22',
        title: 'Protection against unlawful arrest',
        shortSummary: 'Must be told reasons for arrest, right to consult a lawyer, and must be produced before a magistrate within 24 hours.',
      },
    ],
  },
  {
    id: 'exploitation',
    category: 'Right against Exploitation',
    articleRange: 'Articles 23 – 24',
    badge: 'navy',
    description: 'Prohibits human trafficking, forced bonded labour without pay, and employing children in hazardous industries.',
    articles: [
      {
        number: '23',
        id: 'art-23',
        title: 'Prohibition of human trafficking & forced labour',
        shortSummary: 'Bans buying or selling humans and forcing anyone to work without fair wages.',
      },
      {
        number: '24',
        id: 'art-24',
        title: 'Prohibition of child labour in factories',
        shortSummary: 'Strictly forbids employing children below 14 years in factories, mines, or hazardous jobs.',
      },
    ],
  },
  {
    id: 'religion',
    category: 'Freedom of Religion',
    articleRange: 'Articles 25 – 28',
    badge: 'green',
    description: 'Guarantees freedom of conscience and the equal right to profess, practice, and propagate any religion.',
    articles: [
      {
        number: '25',
        id: 'art-25',
        title: 'Freedom of conscience & free profession of religion',
        shortSummary: 'Every individual has complete liberty to follow, practice, or change their faith peacefully.',
      },
      {
        number: '26',
        id: 'art-26',
        title: 'Freedom to manage religious affairs',
        shortSummary: 'Religious communities can establish and maintain charitable institutions and manage their own internal affairs.',
      },
      {
        number: '27',
        id: 'art-27',
        title: 'Freedom from religious taxation',
        shortSummary: 'No citizen can be forced to pay any tax specifically levied to promote a particular religion.',
      },
      {
        number: '28',
        id: 'art-28',
        title: 'Freedom from religious instruction in state schools',
        shortSummary: 'Government-funded schools cannot compel students to attend religious worship.',
      },
    ],
  },
  {
    id: 'culture',
    category: 'Cultural & Educational Rights',
    articleRange: 'Articles 29 – 30',
    badge: 'saffron',
    description: 'Protects minority communities to preserve their distinct language, script, and cultural heritage.',
    articles: [
      {
        number: '29',
        id: 'art-29',
        title: 'Protection of interests of minorities',
        shortSummary: 'Any group of citizens with a distinct language, script, or culture has the right to conserve it.',
      },
      {
        number: '30',
        id: 'art-30',
        title: 'Right of minorities to establish educational institutions',
        shortSummary: 'Religious and linguistic minorities can establish and manage schools and colleges of their choice.',
      },
    ],
  },
  {
    id: 'remedies',
    category: 'Right to Constitutional Remedies',
    articleRange: 'Articles 32 – 35',
    badge: 'navy',
    description: 'The supreme shield: gives every citizen the right to petition the Supreme Court directly when rights are infringed.',
    articles: [
      {
        number: '32',
        id: 'art-32',
        title: 'Remedies for enforcement of Fundamental Rights',
        shortSummary: 'The "Heart and Soul of the Constitution": Direct access to the Supreme Court through constitutional Writs.',
      },
    ],
  },
];

export const FUNDAMENTAL_DUTIES: CivicDuty[] = [
  {
    number: 1,
    clause: '(a)',
    title: 'Respect National Symbols & Constitution',
    description: 'Abide by the Constitution and respect its ideals, institutions, the National Flag, and the National Anthem.',
    everydayAction: 'Stand with dignity when the National Anthem plays and honor the Tricolour.',
    badge: 'saffron',
  },
  {
    number: 2,
    clause: '(b)',
    title: 'Cherish Freedom Struggle Ideals',
    description: 'Cherish and follow the noble ideals that inspired our national struggle for independence.',
    everydayAction: 'Remember the sacrifices of freedom fighters and uphold democracy, truth, and non-violence.',
    badge: 'green',
  },
  {
    number: 3,
    clause: '(c)',
    title: 'Uphold Sovereignty & Integrity',
    description: 'Uphold and protect the sovereignty, unity, and integrity of India.',
    everydayAction: 'Reject divisive propaganda that tries to break India along regional or communal lines.',
    badge: 'navy',
  },
  {
    number: 4,
    clause: '(d)',
    title: 'Defend the Nation',
    description: 'Defend the country and render national service when called upon to do so.',
    everydayAction: 'Support national relief efforts during floods, natural disasters, or public emergencies.',
    badge: 'saffron',
  },
  {
    number: 5,
    clause: '(e)',
    title: 'Promote Harmony & Dignity of Women',
    description: 'Promote harmony and common brotherhood among all people of India, transcending religious, linguistic, and regional diversities; renounce practices derogatory to the dignity of women.',
    everydayAction: 'Call out harassment, respect women in workplaces and public spaces, and celebrate India’s diversity.',
    badge: 'green',
  },
  {
    number: 6,
    clause: '(f)',
    title: 'Preserve Composite Culture',
    description: 'Value and preserve the rich heritage of our composite culture.',
    everydayAction: 'Protect historical monuments, traditional art forms, and indigenous knowledge.',
    badge: 'navy',
  },
  {
    number: 7,
    clause: '(g)',
    title: 'Protect Natural Environment & Wildlife',
    description: 'Protect and improve the natural environment, including forests, lakes, rivers, and wildlife, and have compassion for living creatures.',
    everydayAction: 'Avoid littering plastic, conserve water, plant trees, and treat animals with kindness.',
    badge: 'green',
  },
  {
    number: 8,
    clause: '(h)',
    title: 'Develop Scientific Temper & Inquiry',
    description: 'Develop scientific temper, humanism, and the spirit of inquiry and reform.',
    everydayAction: 'Question superstitions, verify facts before sharing online rumors, and champion rational thinking.',
    badge: 'navy',
  },
  {
    number: 9,
    clause: '(i)',
    title: 'Safeguard Public Property & Abjure Violence',
    description: 'Safeguard public property and abjure violence.',
    everydayAction: 'Never damage public buses, trains, or government buildings during protests or strikes.',
    badge: 'saffron',
  },
  {
    number: 10,
    clause: '(j)',
    title: 'Strive for Excellence',
    description: 'Strive towards excellence in all spheres of individual and collective activity so that the nation constantly rises to higher levels of endeavor and achievement.',
    everydayAction: 'Perform your job, studies, or craft with sincerity, raising the standard of work across India.',
    badge: 'navy',
  },
  {
    number: 11,
    clause: '(k)',
    title: 'Duty of Education for Children',
    description: 'Provide educational opportunities to your child or ward between the ages of 6 and 14 years.',
    everydayAction: 'Ensure every boy and girl in your family or care attends school regularly.',
    badge: 'green',
  },
];

export const DIRECTIVE_PRINCIPLES_SUMMARY: DirectivePrinciple[] = [
  {
    number: '38',
    id: 'art-38',
    title: 'State to secure a social order for welfare of the people',
    focus: 'Social Justice',
    description: 'Minimizing income inequalities and eliminating status disparities among individuals and regions.',
  },
  {
    number: '39A',
    id: 'art-39a',
    title: 'Equal justice & free legal aid',
    focus: 'Access to Courts',
    description: 'Ensuring that opportunities for securing justice are not denied to any citizen by reason of economic disabilities.',
  },
  {
    number: '40',
    id: 'art-40',
    title: 'Organisation of village panchayats',
    focus: 'Local Self-Governance',
    description: 'Endowing village panchayats with powers to function as autonomous units of local government.',
  },
  {
    number: '42',
    id: 'art-42',
    title: 'Just and humane conditions of work & maternity relief',
    focus: 'Worker Welfare',
    description: 'Creating safe working environments and statutory maternity benefits for working mothers.',
  },
  {
    number: '43',
    id: 'art-43',
    title: 'Living wage for workers',
    focus: 'Economic Security',
    description: 'Securing a living wage, decent conditions of work, and full enjoyment of leisure for all workers.',
  },
  {
    number: '44',
    id: 'art-44',
    title: 'Uniform civil code for citizens',
    focus: 'Civil Law Harmony',
    description: 'Endeavoring to secure uniform civil rules for marriage, divorce, and inheritance across India.',
  },
  {
    number: '45',
    id: 'art-45',
    title: 'Early childhood care and education',
    focus: 'Child Development',
    description: 'Providing early childhood care and education for all children until they complete the age of six years.',
  },
  {
    number: '48A',
    id: 'art-48a',
    title: 'Protection of environment, forests & wildlife',
    focus: 'Ecology & Climate',
    description: 'Directs the State to protect forests, rivers, and wildlife across the nation.',
  },
  {
    number: '50',
    id: 'art-50',
    title: 'Separation of Judiciary from Executive',
    focus: 'Rule of Law',
    description: 'Ensuring judges and courts operate independently without political or police interference.',
  },
];

