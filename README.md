---
name: "Developing Competence"
description: "Connects skill assessment, progress visualisation and personalised development planning in one learning experience."
categories: [content-distribution, web-app, built-by-ai, powered-by-ai]
updated: 2026-07-16
deployments:
  Appsite:
    "Developing Competence": https://developingcompetence.edutools.fyi/
---
# Developing Competence: From Mental Maps to Fluent Performance

An interactive, AI-powered competency development application designed to help users assess skills, visualize progress, and generate personalized professional development plans based on the "Developing Competence" pedagogy.

## 🏗 Architecture

This application is built as a **Client-Side Single Page Application (SPA)** using React 19 and TypeScript. It operates entirely in the browser without a custom backend server, leveraging Google's Gemini API for dynamic content generation.

### Tech Stack
*   **Core**: React 19, ReactDOM 19
*   **Language**: TypeScript (ES Modules)
*   **Styling**: Tailwind CSS
*   **AI Engine**: Google Gemini API (`@google/genai` SDK)
*   **Visualization**: Recharts
*   **Icons**: Lucide React
*   **Module System**: Native Browser ES Modules (via Import Maps)

### Key Components

1.  **State Management (`App.tsx`)**
    *   Acts as the centralized store for the `competencyFramework` (structure), `assessment` (scores), and `plan` (text).
    *   Manages the "routing" between views (`AppView` enum).
    *   Ensures data persistence during the session as users switch between building, assessing, and planning.

2.  **Framework Builder (`components/FrameworkBuilder.tsx`)**
    *   **AI Integration**: Uses `gemini-2.5-flash` with JSON Schema output to generate structured competency frameworks (Areas -> Dimensions -> Levels) for any user-provided topic.
    *   Allows users to "Export" their custom frameworks as JSON files.

3.  **Assessment Engine (`components/AssessmentTool.tsx`)**
    *   Renders a dynamic form based on the currently loaded framework.
    *   **AI Integration**: Sends the user's scoring pattern to Gemini to generate a qualitative analysis of strengths and weaknesses.

4.  **Pedagogical Content (`components/TheoryViewer.tsx`)**
    *   Implements a custom "Course Mode" vs. "Scroll Mode" viewer.
    *   Renders semantic content blocks (Callouts, Tables, Lists) defined in `content/theory.ts`.

5.  **Analytics (`components/Dashboard.tsx`)**
    *   Visualizes competence coverage using Radar and Bar charts from `recharts`.
    *   Calculates the "Development Phase" metrics.

6.  **Planning Agent (`components/DevelopmentPlan.tsx`)**
    *   **AI Integration**: Acts as a professional development coach. It takes the structured assessment data and generates a JSON-structured plan (Goals, Strategy, Timeline) tailored to the specific "Conceptual vs. Procedural" learning model.

## 🧠 Theory of Operation

The app implements a specific pedagogical model:
1.  **Competence** is split into **Conceptual** (Mental Maps) and **Procedural** (Fluency).
2.  **Levels**: The framework strictly follows the Novice → Apprentice → Practitioner → Expert progression.
3.  **AI Agents**: The AI is prompted not just to "chat", but to act as an instructional designer, converting raw topics into this specific pedagogical structure.

## 🚀 Deployment

The application is static and uses an `importmap` in `index.html` to load dependencies from a CDN.

### Prerequisites
*   **Google Gemini API Key**: A valid API key is required to use the Generator, Assessment Analysis, and Planning features.

### Configuration
The application accesses the API key via `process.env.API_KEY`.
*   **Production**: Ensure your build environment or hosting provider injects this variable.
*   **Security Note**: As a client-side app, the API key is exposed in the browser network requests. For public production deployments, it is recommended to proxy these requests through a lightweight backend or use API key restrictions (referrer restrictions) in the Google AI Studio console.

### Directory Structure
```
/
├── index.html              # Entry point with Import Maps
├── index.tsx               # React Root
├── App.tsx                 # Main Logic & State
├── types.ts                # TypeScript Interfaces & Enums
├── data.ts                 # Static Theory Content
├── components/             # React UI Components
│   ├── FrameworkBuilder.tsx
│   ├── TheoryViewer.tsx
│   └── ...
└── content/                # Static Framework Data
```
