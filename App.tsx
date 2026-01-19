import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { TheoryViewer } from './components/TheoryViewer';
import { AssessmentTool } from './components/AssessmentTool';
import { Dashboard } from './components/Dashboard';
import { DevelopmentPlan } from './components/DevelopmentPlan';
import { HomePage } from './components/HomePage';
import { FrameworkBuilder } from './components/FrameworkBuilder';
import { AppView, UserAssessment, UserPlan, CompetencyArea } from './types';
import { COMPETENCY_AREAS as DEFAULT_FRAMEWORK } from './content/competencies';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);
  
  // State for the loaded Competency Framework
  const [competencyFramework, setCompetencyFramework] = useState<CompetencyArea[]>(DEFAULT_FRAMEWORK);

  // State for user assessment (persisted in memory for session)
  // We initialize with a blank state or try to map default values if it matches default framework
  const [assessment, setAssessment] = useState<UserAssessment>({
      'eng-consuming': 1,
      'eng-creating': 0,
      'eng-interacting': 2,
      'eng-improving': 0,
      'acc-text': 1,
      'acc-images': 0
  });

  // State for the development plan
  const [plan, setPlan] = useState<UserPlan>({
      goals: '',
      strategy: '',
      timeline: ''
  });

  // When framework changes, we should probably reset assessment to avoid mismatched IDs
  const handleFrameworkChange = (newFramework: CompetencyArea[]) => {
      setCompetencyFramework(newFramework);
      setAssessment({}); // Reset assessment
      setPlan({ goals: '', strategy: '', timeline: '' }); // Reset plan
  };

  const renderView = () => {
    switch (currentView) {
      case AppView.HOME:
        return <HomePage setView={setCurrentView} />;
      case AppView.THEORY:
        return <TheoryViewer />;
      case AppView.FRAMEWORK_BUILDER:
        return <FrameworkBuilder 
            currentFramework={competencyFramework} 
            setFramework={handleFrameworkChange} 
            setView={setCurrentView}
        />;
      case AppView.ASSESSMENT:
        return <AssessmentTool 
            framework={competencyFramework} 
            assessment={assessment} 
            setAssessment={setAssessment} 
        />;
      case AppView.PLANNING:
        return <DevelopmentPlan 
            plan={plan} 
            setPlan={setPlan} 
            framework={competencyFramework}
            assessment={assessment}
        />;
      case AppView.DASHBOARD:
        return <Dashboard 
            assessment={assessment} 
            framework={competencyFramework}
        />;
      default:
        return <HomePage setView={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navigation currentView={currentView} setView={setCurrentView} />
      <main className="flex-grow">
        {renderView()}
      </main>
      <footer className="bg-white border-t border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-slate-500">
                Competency Framework based on ACTFL and CEFR. Powered by Google Gemini.
            </p>
        </div>
      </footer>
    </div>
  );
}