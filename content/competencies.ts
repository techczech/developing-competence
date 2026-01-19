
import { CompetencyArea } from '../types';

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
