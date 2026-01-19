
import { ContentSection } from '../types';

export const THEORY_CONTENT: ContentSection[] = [
  {
    id: 'overview',
    title: 'Overview',
    blocks: [
      { 
        type: 'paragraph', 
        content: "This framework provides a structure for understanding and developing competence in any domain, though it is particularly optimized for digital skills. It draws inspiration from language acquisition frameworks like CEFR." 
      },
      { 
        type: 'paragraph', 
        content: "The framework enables you to:" 
      },
      { 
        type: 'list-ol', 
        items: [
          "**Self-assess** your current skill level honestly.",
          "**Track progress** from being a novice to an expert.",
          "**Design strategies** that actually work for your current level.",
          "**Estimate effort** required to reach the next milestone."
        ]
      },
      {
        type: 'callout',
        style: 'info',
        content: "This approach focuses on the *process* of becoming competent, not just a checklist of things you know."
      }
    ]
  },
  {
    id: 'dimensions',
    title: 'Dimensions & Levels',
    blocks: [
      { type: 'paragraph', content: "Competence is measured across specific dimensions using four distinct levels. Understanding these levels is crucial for accurate self-assessment." },
      { type: 'h3', content: 'The Four Levels' },
      { 
        type: 'list-ul', 
        items: [
          "**Novice:** Can perform basic tasks only with assistance or by following strict recipes. Makes frequent errors. Focus is on *survival*.",
          "**Apprentice (Intermediate):** Can perform common tasks independently. Can solve simple problems. Focus is on *functionality*.",
          "**Practitioner (Advanced):** Can perform uncommon tasks with ease. Troubleshoots complex issues. Focus is on *efficiency*.",
          "**Expert:** Innovates and understands the deep system. Helps others. Focus is on *mastery and strategy*."
        ]
      },
      {
        type: 'callout',
        style: 'warning',
        content: "Progression is non-linear. Moving from Novice to Apprentice is often faster than moving from Apprentice to Practitioner."
      }
    ]
  },
  {
    id: 'learning_types',
    title: 'Two Types of Learning',
    blocks: [
      { type: 'paragraph', content: "To move between levels, you must engage in two distinct types of learning. Most people fail because they focus on only one." },
      { 
        type: 'list-ol', 
        items: [
          "**Conceptual Learning (Mental Maps):** Understanding *what* things are and *why* they work. This is 'book smarts'. You develop this by reading, watching tutorials, and studying the system.",
          "**Procedural Learning (Fluency):** Developing the 'muscle memory' to do things quickly and accurately. This is 'street smarts'. You develop this only through repetition and practice."
        ]
      },
      { 
        type: 'paragraph', 
        content: "In the early stages (Novice), procedural recipes are effective. To become an Expert, however, deep conceptual understanding is required." 
      }
    ]
  },
  {
    id: 'components_expertise',
    title: 'Three Elements of Expertise',
    blocks: [
        { type: 'paragraph', content: "When planning your development, you need to build three specific internal tools:" },
        { 
          type: 'list-ol', 
          items: [
            "**1. Mental Maps:** The ability to place a new problem in context. A mental map helps you predict what will happen before you click.",
            "**2. The Perceptive Eye:** The ability to spot the difference between 'good' and 'bad' work instantly. You must learn to recognize your own mistakes.",
            "**3. The Fluent Muscle:** The ability to execute tasks without conscious thought, freeing up your brain for higher-level problem solving."
          ]
        },
        {
          type: 'callout',
          style: 'tip',
          content: "Goal setting is simple: Ask yourself, 'Do I need a better map (knowledge), a sharper eye (standards), or a faster muscle (practice)?'"
        }
    ]
  },
  {
    id: 'knowledge_vs_fluency',
    title: 'From Knowledge to Fluency',
    blocks: [
        { type: 'paragraph', content: "There is a critical difference between knowing *about* something and being able to *do* it. We distinguish between:" },
        {
            type: 'table',
            table: {
                headers: ["Feature", "Encyclopaedic Knowledge", "Practical Fluency"],
                rows: [
                    ["Definition", "Look up and know", "Look and know"],
                    ["Memory", "Retrieves from long-term memory", "Immediate access"],
                    ["Mental Effort", "High cognitive load", "Low cognitive load"],
                    ["Utility", "Good for planning/strategy", "Necessary for performance"]
                ]
            }
        },
        { type: 'paragraph', content: "You cannot think your way to fluency. You must practice your way there." }
    ]
  },
  {
    id: 'complexity_scale',
    title: 'Competence Complexity',
    blocks: [
      { type: 'paragraph', content: "Not all skills are created equal. When designing your learning plan, identify the complexity of the skill:" },
      {
        type: 'list-ol',
        items: [
          "**Discrete/Modular Skills:** Can be learned in isolation in a short time. \n*Example: Saving a file as a PDF.* \n*Strategy: Learn it once, use it immediately.*",
          "**Diffuse/Integrated Skills:** Can only be developed over time within a context. \n*Example: Managing a complex project file system.* \n*Strategy: Requires consistent habit formation over weeks.*"
        ]
      }
    ]
  },
  {
    id: 'foundations',
    title: 'Example: Digital Foundations',
    blocks: [
      { type: 'paragraph', content: "To illustrate, here is a comparison of Novice vs. Practitioner mindsets in key digital productivity areas." },
      {
        type: 'table',
        table: {
          headers: ["Area", "Novice (Avoid)", "Practitioner (Target)"],
          columnStyles: ["font-medium text-slate-900 w-1/5", "text-red-800 bg-red-50/50", "text-emerald-800 bg-emerald-50/50"],
          rows: [
            [
              "Files", 
              "Idiosyncratic system. Loses files. Uses email for version control.", 
              "Rich mental map of storage. Synced and backed up. Uses version history."
            ],
            [
              "Accounts",
              "Uses same password everywhere. Forgets logins. No recovery plan.",
              "Uses password manager. Understands 2FA. Distinct accounts for services."
            ],
            [
              "Troubleshooting",
              "Gives up immediately. 'Computer hates me'.",
              "Isolates variables. Searches error codes. Reads documentation."
            ]
          ]
        }
      }
    ]
  }
];
