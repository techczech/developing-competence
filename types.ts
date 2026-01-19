
export enum AppView {
  HOME = 'HOME',
  FRAMEWORK_BUILDER = 'FRAMEWORK_BUILDER',
  DASHBOARD = 'DASHBOARD',
  THEORY = 'THEORY',
  ASSESSMENT = 'ASSESSMENT',
  PLANNING = 'PLANNING'
}

// --- Competency Framework Schema ---

export interface LevelDescription {
  levelName: string; // e.g., "Novice", "Apprentice"
  description: string;
}

export interface Dimension {
  id: string;
  name: string;
  descriptions: LevelDescription[];
}

export interface CompetencyArea {
  id: string;
  title: string;
  description?: string;
  dimensions: Dimension[];
}

// --- Legacy Data Types ---

export interface TheorySection {
  id: string;
  title: string;
  content: string | string[];
  subsections?: TheorySection[];
}

// --- Semantic Content Schema ---

export type BlockType = 
  | 'paragraph' 
  | 'h2' 
  | 'h3' 
  | 'list-ul' 
  | 'list-ol' 
  | 'callout' 
  | 'table';

export interface TableData {
  headers: string[];
  rows: (string[])[];
  columnStyles?: string[]; // Optional CSS classes for columns
}

export interface ContentBlock {
  type: BlockType;
  content?: string;       // For paragraphs, headers, callouts
  items?: string[];       // For lists
  table?: TableData;      // For tables
  style?: 'info' | 'warning' | 'tip' | 'accent'; // Contextual styling
}

export interface ContentSection {
  id: string;
  title: string;
  blocks: ContentBlock[];
  subsections?: ContentSection[];
}

// --- User Data Types ---

export interface UserAssessment {
  [dimensionId: string]: number; // 0 to 3 index of the level
}

export interface UserPlan {
  goals: string;
  strategy: string;
  timeline: string;
}