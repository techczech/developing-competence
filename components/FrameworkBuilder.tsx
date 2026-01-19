import React, { useState } from 'react';
import { CompetencyArea, AppView } from '../types';
import { GoogleGenAI, Type } from '@google/genai';
import { Wand2, Loader2, Download, RefreshCw, Check } from 'lucide-react';
import { COMPETENCY_AREAS as DEFAULT_FRAMEWORK } from '../content/competencies';

interface FrameworkBuilderProps {
  currentFramework: CompetencyArea[];
  setFramework: (framework: CompetencyArea[]) => void;
  setView: (view: AppView) => void;
}

export const FrameworkBuilder: React.FC<FrameworkBuilderProps> = ({ currentFramework, setFramework, setView }) => {
  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateFramework = async () => {
    if (!topic.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const prompt = `Create a detailed competency framework for the topic: "${topic}". 
      The framework must be structured with Competency Areas, and each area must have specific Dimensions.
      For each Dimension, provide exactly 4 distinct levels of competence: Novice, Apprentice, Practitioner, Expert.
      Be creative, educational, and specific to the domain of ${topic}.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          systemInstruction: "You are an expert curriculum designer specializing in competency frameworks.",
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                dimensions: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      id: { type: Type.STRING },
                      name: { type: Type.STRING },
                      descriptions: {
                        type: Type.ARRAY,
                        items: {
                          type: Type.OBJECT,
                          properties: {
                            levelName: { type: Type.STRING },
                            description: { type: Type.STRING }
                          },
                          required: ['levelName', 'description']
                        }
                      }
                    },
                    required: ['id', 'name', 'descriptions']
                  }
                }
              },
              required: ['id', 'title', 'dimensions']
            }
          }
        }
      });

      if (response.text) {
        const newFramework = JSON.parse(response.text) as CompetencyArea[];
        setFramework(newFramework);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to generate framework. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadDefault = () => {
    setFramework(DEFAULT_FRAMEWORK);
  };

  const exportFramework = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(currentFramework, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `framework-${new Date().toISOString()}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-slate-900">Develop Competency Framework</h1>
        <p className="mt-4 text-slate-600">
          Create a custom framework using AI, or use the default Digital Competence framework.
        </p>
      </div>

      {/* Input Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 mb-8">
        <div className="flex flex-col gap-4">
          <label htmlFor="topic" className="block text-sm font-medium text-gray-700">
            What skill or domain do you want to assess?
          </label>
          <div className="flex gap-4 flex-col sm:flex-row">
            <input
              type="text"
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Public Speaking, Python Programming, Project Management"
              className="flex-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-3 border"
            />
            <button
              onClick={generateFramework}
              disabled={isLoading || !topic.trim()}
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed min-w-[140px]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5 mr-2" />
                  Generate
                </>
              )}
            </button>
          </div>
          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        </div>
        
        <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between flex-wrap gap-4">
            <span className="text-sm text-slate-500">Or load a preset:</span>
            <div className="flex gap-3">
                <button onClick={loadDefault} className="text-sm text-indigo-600 font-medium hover:text-indigo-800">
                    Default (Digital)
                </button>
                <span className="text-slate-300">|</span>
                <button onClick={() => setTopic('Advanced Cooking')} className="text-sm text-slate-600 hover:text-slate-900" 
                    onMouseDown={() => setTopic('Cooking')} 
                >
                    Example: Cooking
                </button>
                <span className="text-slate-300">|</span>
                 <button onClick={() => setTopic('Strategic Leadership')} className="text-sm text-slate-600 hover:text-slate-900" 
                     onMouseDown={() => setTopic('Leadership')}
                 >
                    Example: Leadership
                </button>
            </div>
        </div>
      </div>

      {/* Preview Section */}
      <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
        <div className="bg-white px-6 py-4 border-b border-slate-200 flex justify-between items-center flex-wrap gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Current Framework</h3>
            <p className="text-sm text-slate-500">{currentFramework.length} Competency Areas</p>
          </div>
          <div className="flex gap-2">
            <button 
                onClick={exportFramework}
                className="inline-flex items-center px-3 py-2 border border-slate-300 shadow-sm text-sm leading-4 font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 focus:outline-none"
            >
                <Download className="w-4 h-4 mr-2" />
                Export JSON
            </button>
            <button 
                onClick={() => setView(AppView.ASSESSMENT)}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
                <Check className="w-4 h-4 mr-2" />
                Start Assessment
            </button>
          </div>
        </div>

        <div className="p-6 max-h-[600px] overflow-y-auto">
            {currentFramework.map((area) => (
                <div key={area.id} className="mb-6 last:mb-0">
                    <h4 className="font-bold text-slate-800 text-lg mb-2">{area.title}</h4>
                    <p className="text-slate-500 text-sm mb-3">{area.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {area.dimensions.map(dim => (
                            <div key={dim.id} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                                <span className="font-semibold text-slate-900 block mb-1">{dim.name}</span>
                                <span className="text-xs text-slate-500">{dim.descriptions.length} Levels Defined</span>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};