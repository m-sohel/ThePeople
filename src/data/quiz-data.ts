export interface QuizQuestion {
  id: string;
  topicId: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  relatedArticle?: string;
}

export interface QuizTopic {
  id: string;
  title: string;
  subtitle: string;
  badge: 'green' | 'saffron' | 'navy';
  icon: string;
  questions: QuizQuestion[];
}

export const QUIZ_TOPICS: QuizTopic[] = [
  {
    id: 'rights',
    title: 'Fundamental Rights',
    subtitle: 'Test your knowledge of Part III (Articles 12 – 35)',
    badge: 'green',
    icon: 'shield-checkmark',
    questions: [
      {
        id: 'r-1',
        topicId: 'rights',
        question: 'Which Fundamental Right was described by Dr. B.R. Ambedkar as the "very soul and heart of the Constitution"?',
        options: [
          'Right to Freedom of Speech (Article 19)',
          'Right to Equality (Article 14)',
          'Right to Constitutional Remedies (Article 32)',
          'Right to Freedom of Religion (Article 25)',
        ],
        correctIndex: 2,
        explanation:
          'Dr. Ambedkar declared Article 32 to be the heart and soul of the Constitution because without the power to petition the Supreme Court directly to enforce rights, all other rights would be meaningless.',
        relatedArticle: 'art-32',
      },
      {
        id: 'r-2',
        topicId: 'rights',
        question: 'Under Article 21A, what is the age group of children guaranteed free and compulsory education?',
        options: [
          'Birth to 6 years',
          '6 to 14 years',
          '6 to 18 years',
          '10 to 16 years',
        ],
        correctIndex: 1,
        explanation:
          'Article 21A, inserted by the 86th Constitutional Amendment Act in 2002, guarantees free and compulsory education to all children aged 6 to 14 years as a fundamental right.',
        relatedArticle: 'art-21a',
      },
      {
        id: 'r-3',
        topicId: 'rights',
        question: 'Which Article of the Constitution completely abolishes "Untouchability" and makes its practice a punishable offence?',
        options: [
          'Article 15',
          'Article 17',
          'Article 19',
          'Article 23',
        ],
        correctIndex: 1,
        explanation:
          'Article 17 explicitly abolishes untouchability in all forms and declares that the enforcement of any disability arising out of it shall be an offence punishable in accordance with law.',
        relatedArticle: 'art-17',
      },
      {
        id: 'r-4',
        topicId: 'rights',
        question: 'If a person is arrested by the police, within how many hours must they be produced before the nearest judicial magistrate?',
        options: [
          '12 hours',
          '24 hours (excluding journey time)',
          '48 hours',
          '7 days',
        ],
        correctIndex: 1,
        explanation:
          'Article 22(2) mandates that every person arrested and detained in custody must be produced before the nearest magistrate within a period of 24 hours of such arrest, excluding travel time.',
        relatedArticle: 'art-22',
      },
      {
        id: 'r-5',
        topicId: 'rights',
        question: 'The Supreme Court ruled that the "Right to Privacy" is protected under which Fundamental Right?',
        options: [
          'Article 14 (Equality)',
          'Article 19 (Speech)',
          'Article 21 (Life and Personal Liberty)',
          'Article 25 (Religion)',
        ],
        correctIndex: 2,
        explanation:
          'In the historic 2017 Justice K.S. Puttaswamy judgment, a 9-judge bench of the Supreme Court held unanimously that the Right to Privacy is an intrinsic part of the Right to Life and Personal Liberty under Article 21.',
        relatedArticle: 'art-21',
      },
    ],
  },
  {
    id: 'preamble',
    title: 'The Preamble & Values',
    subtitle: 'The Guiding Spirit and Identity of India',
    badge: 'saffron',
    icon: 'document-text',
    questions: [
      {
        id: 'p-1',
        topicId: 'preamble',
        question: 'On which historic day was the Constitution of India formally adopted by the Constituent Assembly?',
        options: [
          '15 August 1947',
          '26 November 1949',
          '26 January 1950',
          '2 October 1948',
        ],
        correctIndex: 1,
        explanation:
          'The Constitution was formally adopted and enacted on 26 November 1949, which is commemorated every year across the country as National Constitution Day (Samvidhan Divas).',
      },
      {
        id: 'p-2',
        topicId: 'preamble',
        question: 'Which two words were added to the description of the Indian Republic in the Preamble by the 42nd Amendment in 1976?',
        options: [
          'SOVEREIGN and DEMOCRATIC',
          'SOCIALIST and SECULAR',
          'JUSTICE and LIBERTY',
          'FEDERAL and REPUBLIC',
        ],
        correctIndex: 1,
        explanation:
          'The 42nd Constitutional Amendment Act, 1976 added the words "SOCIALIST" and "SECULAR" to the Preamble, and amended "unity of the Nation" to "unity and integrity of the Nation".',
      },
      {
        id: 'p-3',
        topicId: 'preamble',
        question: 'According to the opening words of the Preamble, where does the ultimate sovereignty and power of the Constitution originate from?',
        options: [
          'The British Crown',
          'The Supreme Court of India',
          'The President of India',
          '"We, the People of India"',
        ],
        correctIndex: 3,
        explanation:
          'The Preamble begins with "WE, THE PEOPLE OF INDIA", signifying that sovereignty resides with the citizens of India and that the government derives all its powers from the people.',
      },
      {
        id: 'p-4',
        topicId: 'preamble',
        question: 'What does the term "REPUBLIC" mean in the Preamble of India?',
        options: [
          'The country has a royal monarch as ceremonial head',
          'The head of state (President) is an elected citizen for a fixed term',
          'The country is part of the British Commonwealth',
          'Laws can only be made by unanimous agreement',
        ],
        correctIndex: 1,
        explanation:
          'In a Republic, the head of state is elected by the people (directly or indirectly) for a fixed tenure, with no hereditary or dynastic privilege.',
      },
      {
        id: 'p-5',
        topicId: 'preamble',
        question: 'How many types of "JUSTICE" are promised to every citizen in the Preamble?',
        options: [
          'Two: Civil and Criminal',
          'Three: Social, Economic, and Political',
          'One: Judicial Justice',
          'Four: Moral, Social, Legal, and Physical',
        ],
        correctIndex: 1,
        explanation:
          'The Preamble specifically promises three forms of justice to every citizen: "JUSTICE, social, economic and political".',
      },
    ],
  },
  {
    id: 'duties',
    title: '11 Fundamental Duties',
    subtitle: 'Civic responsibilities under Article 51A',
    badge: 'navy',
    icon: 'ribbon',
    questions: [
      {
        id: 'd-1',
        topicId: 'duties',
        question: 'In which Part of the Constitution are Fundamental Duties located?',
        options: [
          'Part III',
          'Part IV',
          'Part IVA (Article 51A)',
          'Part IX',
        ],
        correctIndex: 2,
        explanation:
          'Fundamental Duties were incorporated into Part IVA of the Constitution through Article 51A upon the recommendation of the Swaran Singh Committee in 1976.',
        relatedArticle: 'art-51a',
      },
      {
        id: 'd-2',
        topicId: 'duties',
        question: 'How many Fundamental Duties are currently listed under Article 51A of the Constitution of India?',
        options: [
          '7 Duties',
          '10 Duties',
          '11 Duties',
          '15 Duties',
        ],
        correctIndex: 2,
        explanation:
          'Originally, 10 duties were added in 1976. The 11th duty—obligating parents to provide educational opportunities to children aged 6–14—was added by the 86th Amendment in 2002.',
        relatedArticle: 'art-51a',
      },
      {
        id: 'd-3',
        topicId: 'duties',
        question: 'Which of the following is an explicit Fundamental Duty under Article 51A(h)?',
        options: [
          'To pay income tax on time',
          'To vote in every national election',
          'To develop scientific temper, humanism, and spirit of inquiry',
          'To join the military for two years',
        ],
        correctIndex: 2,
        explanation:
          'Article 51A(h) explicitly calls upon every Indian citizen "to develop the scientific temper, humanism and the spirit of inquiry and reform".',
        relatedArticle: 'art-51a',
      },
      {
        id: 'd-4',
        topicId: 'duties',
        question: 'Under Article 51A(e), every citizen has a duty to renounce practices derogatory to the dignity of whom?',
        options: [
          'Government officials',
          'Women',
          'Foreign guests',
          'Monarchs',
        ],
        correctIndex: 1,
        explanation:
          'Article 51A(e) specifically commands citizens to promote harmony and brotherhood and "to renounce practices derogatory to the dignity of women".',
        relatedArticle: 'art-51a',
      },
      {
        id: 'd-5',
        topicId: 'duties',
        question: 'What duty do citizens have regarding public property under Article 51A(i)?',
        options: [
          'To sell public property for profit',
          'To safeguard public property and abjure violence',
          'To build private homes on public land',
          'To only use public property on weekends',
        ],
        correctIndex: 1,
        explanation:
          'Article 51A(i) emphasizes the duty "to safeguard public property and to abjure violence" during all civil activities and protests.',
        relatedArticle: 'art-51a',
      },
    ],
  },
  {
    id: 'history',
    title: 'Making of the Constitution',
    subtitle: 'History, Constituent Assembly & Drafters',
    badge: 'green',
    icon: 'time',
    questions: [
      {
        id: 'h-1',
        topicId: 'history',
        question: 'Who was the Chairman of the Drafting Committee of the Constituent Assembly?',
        options: [
          'Pandit Jawaharlal Nehru',
          'Dr. B.R. Ambedkar',
          'Dr. Rajendra Prasad',
          'Sardar Vallabhbhai Patel',
        ],
        correctIndex: 1,
        explanation:
          'Dr. Bhimrao Ramji Ambedkar was appointed Chairman of the Drafting Committee on 29 August 1947 and is revered as the Chief Architect of the Constitution of India.',
      },
      {
        id: 'h-2',
        topicId: 'history',
        question: 'Who was the President of the Constituent Assembly that debated and signed the Constitution?',
        options: [
          'Dr. Rajendra Prasad',
          'Dr. B.R. Ambedkar',
          'Lord Mountbatten',
          'Mahatma Gandhi',
        ],
        correctIndex: 0,
        explanation:
          'Dr. Rajendra Prasad was elected permanent President of the Constituent Assembly on 11 December 1946 and later became the first President of the Republic of India.',
      },
      {
        id: 'h-3',
        topicId: 'history',
        question: 'How long did the Constituent Assembly take to draft and finalize the Constitution of India?',
        options: [
          '6 months',
          '1 year, 5 months',
          '2 years, 11 months, and 18 days',
          '5 years exactly',
        ],
        correctIndex: 2,
        explanation:
          'The Constituent Assembly held 11 sessions over a total span of 2 years, 11 months, and 18 days to finalize the draft of the Constitution.',
      },
      {
        id: 'h-4',
        topicId: 'history',
        question: 'Who calligraphed the original Constitution of India by hand in flowing italic style?',
        options: [
          'Prem Behari Narain Raizada',
          'Nandalal Bose',
          'Rabindranath Tagore',
          'Sardar Patel',
        ],
        correctIndex: 0,
        explanation:
          'The original Constitution of India was handwritten and calligraphed by master calligrapher Prem Behari Narain Raizada in English, while artists from Santiniketan under Nandalal Bose illuminated each page.',
      },
      {
        id: 'h-5',
        topicId: 'history',
        question: 'Why was 26th January chosen as the date for the Constitution to come into full legal effect in 1950?',
        options: [
          'It was Dr. Ambedkar’s birthday',
          'To commemorate the 1930 Purna Swaraj (Declaration of Complete Independence) day',
          'It was the day India gained independence from Britain',
          'It was chosen at random by the Governor-General',
        ],
        correctIndex: 1,
        explanation:
          '26 January was specifically selected to honor the historic 26 January 1930 date when the Indian National Congress declared Purna Swaraj (Complete Independence).',
      },
    ],
  },
];

