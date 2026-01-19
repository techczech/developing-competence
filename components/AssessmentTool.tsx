import React, { useState } from 'react';
import { CompetencyArea, UserAssessment } from '../types';
import { CheckCircle, Bot, Loader2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

interface AssessmentToolProps {
  framework: CompetencyArea[];
  assessment: UserAssessment;
  setAssessment: (newAssessment: UserAssessment) => void;
}

const LEVEL_LABELS = ['Novice', 'Apprentice', 'Practitioner', 'Expert'];
const LEVEL_COLORS = [
    'bg-red-50 hover:bg-red-100 border-red-200 text-red-800', 
    'bg-orange-50 hover:bg-orange-100 border-orange-200 text-orange-800', 
    'bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-800', 
    'bg-emerald-50 hover:bg-emerald-100 border-emerald-200 text-emerald-800'
];
const SELECTED_COLORS = [
    'bg-red-600 text-white border-red-700 ring-2 ring-red-300', 
    'bg-orange-600 text-white border-orange-700 ring-2 ring-orange-300', 
    'bg-blue-600 text-white border-blue-700 ring-2 ring-blue-300', 
    'bg-emerald-600 text-white border-emerald-700 ring-2 ring-emerald-300'
];

export const AssessmentTool: React.FC<AssessmentToolProps> = ({ framework, assessment, setAssessment }) => {
  const [aiAnalysis, setAiAnalysis] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const handleSelect = (dimensionId: string, levelIndex: number) => {
    setAssessment({
      ...assessment,
      [dimensionId]: levelIndex
    });
  };

  const analyzeWithAI = async () => {
    setIsAnalyzing(true);
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        // Construct a summary of the user's assessment
        const summary = framework.map(area => {
            return `Area: ${area.title}\n` + area.dimensions.map(dim => {
                const level = assessment[dim.id] ?? 0;
                const levelDesc = dim.descriptions[level]?.levelName || 'Unknown';
                const descText = dim.descriptions[level]?.description || '';
                return `- ${dim.name}: ${levelDesc} (${descText})`;
            }).join('\n');
        }).join('\n\n');

        const prompt = `Based on the following self-assessment for a competency framework, provide a concise, encouraging, but realistic summary of where the user stands. Identify their key strengths (highest levels) and biggest opportunities for growth (lowest levels). Speak directly to the user.\n\nAssessment Data:\n${summary}`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        if (response.text) {
            setAiAnalysis(response.text);
        }
    } catch (e) {
        console.error(e);
        setAiAnalysis("Sorry, I couldn't analyze the results at this moment.");
    } finally {
        setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6">
      <div className="mb-8 flex justify-between items-end flex-wrap gap-4">
        <div>
            <h2 className="text-3xl font-bold text-slate-900">Self-Assessment</h2>
            <p className="mt-2 text-slate-600">Select the description that best matches your current ability in each dimension.</p>
        </div>
        
        <button
            onClick={analyzeWithAI}
            disabled={isAnalyzing}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
            {isAnalyzing ? <Loader2 className="w-4 h-4 mr-2 animate-spin"/> : <Bot className="w-4 h-4 mr-2" />}
            Analyze My Profile
        </button>
      </div>

      {aiAnalysis && (
          <div className="mb-12 bg-indigo-50 border border-indigo-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center mb-4">
                  <Bot className="w-6 h-6 text-indigo-600 mr-2" />
                  <h3 className="text-lg font-bold text-indigo-900">AI Analysis</h3>
              </div>
              <div className="prose prose-indigo text-indigo-800 max-w-none whitespace-pre-wrap">
                  {aiAnalysis}
              </div>
          </div>
      )}

      {framework.map((area) => (
        <div key={area.id} className="mb-12">
          <div className="flex items-baseline space-x-4 mb-6 border-b border-gray-200 pb-2">
            <h3 className="text-2xl font-bold text-gray-900">{area.title}</h3>
            {area.description && <span className="text-gray-500 italic text-sm">{area.description}</span>}
          </div>

          <div className="space-y-8">
            {area.dimensions.map((dim) => (
              <div key={dim.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <h4 className="text-lg font-semibold text-gray-900">{dim.name}</h4>
                  <div className="text-xs font-medium text-gray-500 bg-white px-2 py-1 rounded border">
                    Current: {LEVEL_LABELS[assessment[dim.id] ?? 0]}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                  {dim.descriptions.map((desc, idx) => {
                    const isSelected = assessment[dim.id] === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelect(dim.id, idx)}
                        className={`text-left p-6 transition-all duration-200 flex flex-col h-full relative group
                            ${isSelected ? SELECTED_COLORS[idx] : 'bg-white hover:bg-gray-50 text-gray-600'}
                        `}
                      >
                        <div className="flex items-center justify-between w-full mb-3">
                            <span className={`text-xs font-bold uppercase tracking-wider ${isSelected ? 'text-white/90' : 'text-gray-400'}`}>
                                {desc.levelName}
                            </span>
                            {isSelected && <CheckCircle className="w-5 h-5 text-white" />}
                        </div>
                        <p className={`text-sm leading-relaxed ${isSelected ? 'text-white' : 'text-gray-600'}`}>
                            {desc.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const CheckCircleIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
);