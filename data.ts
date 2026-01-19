import { CompetencyArea, TheorySection } from './types';

// This file contains the static content extracted from the user's prompt.
// It separates the data from the presentation logic.

export const THEORY_CONTENT: TheorySection[] = [
  {
    id: 'overview',
    title: 'Overview',
    content: [
      "This is an outline of a general competency framework that can be applied to much narrower areas of competence. It is inspired by frameworks for language competence.",
      "Its purpose is to make it possible to:",
      "1. Self-assess areas of competence generally",
      "2. Track progress of individuals and set development goals",
      "3. Design professional development strategies and goals",
      "4. Make judgements about individuals’ ability to succeed in particular areas",
      "5. Use the framework for specific areas of competence",
      "6. Estimate levels of effort and time required to improve competence",
      "It is proposed as a more practical alternative to JISC digital capabilities framework."
    ]
  },
  {
    id: 'dimensions',
    title: 'Dimensions & Levels',
    content: [
      "**Dimensions:** Engagement with digital content and tools (Consuming, Producing, Interacting, Improving), Primary Modality, Ways of demonstrating competence, Area of competence, Method of engagement.",
      "**Levels:**",
      "- **Novice:** Can only perform selected basic tasks with assistance...",
      "- **Apprentice (Intermediate):** Can perform all common tasks fully with limited assistance...",
      "- **Practitioner (Advanced):** Can perform even most uncommon tasks with ease...",
      "- **Expert:** Can perform advanced tasks across a number of areas of competence..."
    ]
  },
  {
    id: 'development',
    title: 'Developing Competence',
    content: [
      "Moving from one level of competence to another requires two kinds of learning:",
      "**1. Conceptual:** Developing mental maps. Developed through engagement with content.",
      "**2. Procedural:** Developing fluency. Developed through a feedback loop of repetition and reflection.",
      "In the early stages, procedural learning is more effective but to move to higher levels of competence, conceptual learning plays a more important role."
    ],
    subsections: [
        {
            id: 'dev-goals',
            title: 'Developmental Goals',
            content: [
                "To increase competence you need to develop:",
                "1. **Mental maps** (Context, reflection, systematization)",
                "2. **Perceptive eye** (Recognize good examples, mistakes, gaps)",
                "3. **Fluent muscle** (Speed, accuracy, lack of frustration)"
            ]
        },
        {
            id: 'knowledge-fluency',
            title: 'From Knowledge to Fluency',
            content: "Not all knowledge is usable in fluent action. We distinguish between Conceptual (Encyclopaedic - 'Look up and know') and Procedural (Practical - 'Look and know'). Only the second type can be a foundation for fluent competent practice."
        }
    ]
  }
];

export const COMPETENCY_AREAS: CompetencyArea[] = [
  {
    id: 'engagement',
    title: 'Engagement Types',
    description: 'Generic description of skills across modes of engagement.',
    dimensions: [
      {
        id: 'eng-consuming',
        name: 'Consuming',
        descriptions: [
          { levelName: 'Novice', description: 'Can consume content in default setting using predefined tools. Struggles with non-default settings or compatibility.' },
          { levelName: 'Apprentice', description: 'Can choose right tool. Uses basic features. Aware of content locations but struggles with format compatibility.' },
          { levelName: 'Practitioner', description: 'Uses multiple tools. Uses hidden features/customization. Troubleshoots incompatibilities. Good storage strategies.' },
          { levelName: 'Expert', description: 'Full understanding of formats. Converts between formats. Uses keyboard shortcuts. Participates in expert forums.' }
        ]
      },
      {
        id: 'eng-creating',
        name: 'Creating',
        descriptions: [
          { levelName: 'Novice', description: 'Text modality only. Abandons efforts due to lack of skill. Frequently recreates content due to saving issues.' },
          { levelName: 'Apprentice', description: 'Multiple modalities at basic level. Uses predefined functions. Struggles with complex instructions.' },
          { levelName: 'Practitioner', description: 'Creates in several modalities. Customizes tools. Relies on sophisticated abstractions when troubleshooting.' },
          { levelName: 'Expert', description: 'Professional level. Advanced workflows. Discovers and shares new methods of troubleshooting.' }
        ]
      },
      {
        id: 'eng-interacting',
        name: 'Interacting',
        descriptions: [
          { levelName: 'Novice', description: 'Basic text/audio visual. No troubleshooting ability. Frequently does not participate due to lack of skill.' },
          { levelName: 'Apprentice', description: 'Interacts across most modalities. Default features only. Asks for help with complex interactions.' },
          { levelName: 'Practitioner', description: 'Interacts across all modalities. Customizes tools. Troubleshoots for the group.' },
          { levelName: 'Expert', description: 'Effortlessly switches modes. Uses hidden features. Anticipates problems like security.' }
        ]
      },
      {
        id: 'eng-improving',
        name: 'Improving',
        descriptions: [
          { levelName: 'Novice', description: 'Resistant to change. Relies on defaults. Never installs new tools.' },
          { levelName: 'Apprentice', description: 'Basic strategies (observing, asking). Occasional basic customization.' },
          { levelName: 'Practitioner', description: 'Advanced strategies. Reads manuals. Focuses on productivity. Installs new tools.' },
          { levelName: 'Expert', description: 'Participates in communities. Seeks improvement of existing tools. Tests multiple tools.' }
        ]
      }
    ]
  },
  {
    id: 'accessibility',
    title: 'Accessibility',
    description: 'Focused on creation mode of engagement.',
    dimensions: [
      {
        id: 'acc-text',
        name: 'Text Accessibility',
        descriptions: [
          { levelName: 'Novice', description: 'Basic awareness. Inconsistent structure. Default apps only.' },
          { levelName: 'Apprentice', description: 'Uses headings/lists consistently. Misses advanced features. Can use accessibility check but not always fix.' },
          { levelName: 'Practitioner', description: 'Advanced features. Adds structure where missing. Modifies styles/templates. Produces accessible docs in multiple formats.' },
          { levelName: 'Expert', description: 'Detailed awareness of screen readers. Can conduct basic accessibility audit.' }
        ]
      },
      {
        id: 'acc-images',
        name: 'Images Accessibility',
        descriptions: [
          { levelName: 'Novice', description: 'Awareness but inconsistent application of descriptions.' },
          { levelName: 'Apprentice', description: 'Consistently applies ALT text but relies on visual description.' },
          { levelName: 'Practitioner', description: 'Consistently applies ALT text in context. Distinguishes decorative vs functional.' },
          { levelName: 'Expert', description: 'Understands screen reader interaction. Makes judgements across variety of contexts.' }
        ]
      }
    ]
  }
];

// Special case for the "Digital Foundations" table which has a 2-column layout (Novice Mid vs Practitioner High)
export const FOUNDATIONS_DATA = [
  {
    area: 'Files',
    novice: 'Aware files exist. Idiosyncratic storage. Struggles finding. Email attachments only.',
    practitioner: 'Rich mental map of file locations. Synched/Backed up. System for discovery. Uses online sharing systems.'
  },
  {
    area: 'Accounts',
    novice: 'Log in with user/pass. No password management. Frequently forgets access. Confused about account purposes.',
    practitioner: 'Rich mental map of services. Adjusts settings. Digital password manager. Multiple recovery routes.'
  }
];
