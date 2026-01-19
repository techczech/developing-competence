import React, { useState } from 'react';
import { UserPlan, CompetencyArea, UserAssessment } from '../types';
import { Bot, Loader2 } from 'lucide-react';
import { GoogleGenAI, Type } from '@google/genai';

interface DevelopmentPlanProps {
    plan: UserPlan;
    setPlan: (plan: UserPlan) => void;
    framework: CompetencyArea[];
    assessment: UserAssessment;
}

export const DevelopmentPlan: React.FC<DevelopmentPlanProps> = ({ plan, setPlan, framework, assessment }) => {
    const [isGenerating, setIsGenerating] = useState(false);
    
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setPlan({ ...plan, [name]: value });
    };

    const generateAIPlan = async () => {
        setIsGenerating(true);
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            
            // Summarize assessment context
            const assessmentSummary = framework.map(area => {
                return `Area: ${area.title}\n` + area.dimensions.map(dim => {
                    const level = assessment[dim.id] ?? 0;
                    return `- ${dim.name}: Level ${level}/3 (${dim.descriptions[level]?.levelName})`;
                }).join('\n');
            }).join('\n\n');

            const prompt = `You are a professional development coach. Create a development plan for a user with the following assessment profile:
            
            ${assessmentSummary}
            
            Focus on moving them from their current level to the next level in their weakest areas, while maintaining strengths.
            
            Return the plan as a JSON object with exactly these fields:
            - goals: A specific paragraph describing competency targets.
            - strategy: A paragraph describing activities and resources (mention "mental maps" and "repetition").
            - timeline: A paragraph describing milestones and review dates.`;

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: {
                    responseMimeType: 'application/json',
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            goals: { type: Type.STRING },
                            strategy: { type: Type.STRING },
                            timeline: { type: Type.STRING }
                        },
                        required: ['goals', 'strategy', 'timeline']
                    }
                }
            });

            if (response.text) {
                const aiPlan = JSON.parse(response.text) as UserPlan;
                setPlan(aiPlan);
            }

        } catch (e) {
            console.error(e);
            alert("Failed to generate plan. Please try again.");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-slate-900">Your Development Plan</h2>
                <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                    Transform your assessment into action. Use the "Developing Competence" pedagogy to structure your growth.
                </p>
                <div className="mt-6">
                    <button
                        onClick={generateAIPlan}
                        disabled={isGenerating}
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-md text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                    >
                        {isGenerating ? (
                            <>
                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                Designing Plan...
                            </>
                        ) : (
                            <>
                                <Bot className="w-5 h-5 mr-2" />
                                Generate Plan with AI
                            </>
                        )}
                    </button>
                </div>
            </div>

            <div className="grid gap-8">
                {/* Section 1: Goals */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="bg-indigo-50 px-6 py-4 border-b border-indigo-100">
                        <h3 className="text-lg font-semibold text-indigo-900">1. Define Goals</h3>
                        <p className="text-sm text-indigo-700 mt-1">What areas do you want to move from Novice/Apprentice to Practitioner?</p>
                    </div>
                    <div className="p-6">
                        <label htmlFor="goals" className="block text-sm font-medium text-gray-700 mb-2">Specific Competency Targets</label>
                        <textarea
                            id="goals"
                            name="goals"
                            rows={4}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-3 border"
                            placeholder="E.g., I want to reach Practitioner level in Accessibility to ensure my documents are readable by everyone..."
                            value={plan.goals}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* Section 2: Strategy */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="bg-emerald-50 px-6 py-4 border-b border-emerald-100">
                        <h3 className="text-lg font-semibold text-emerald-900">2. Learning Strategy</h3>
                        <p className="text-sm text-emerald-700 mt-1">Combine conceptual (mental maps) and procedural (practice) learning.</p>
                    </div>
                    <div className="p-6">
                        <label htmlFor="strategy" className="block text-sm font-medium text-gray-700 mb-2">Activities & Resources</label>
                        <div className="text-xs text-gray-500 mb-2">
                            Tip: For "Learn How", schedule reflective repetition. For "Learn That", find guides/workshops.
                        </div>
                        <textarea
                            id="strategy"
                            name="strategy"
                            rows={4}
                            className="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 rounded-md p-3 border"
                            placeholder="E.g., Every Tuesday morning I will use the accessibility checker on my old documents (Repetition/Reflection)..."
                            value={plan.strategy}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* Section 3: Timeline */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="bg-orange-50 px-6 py-4 border-b border-orange-100">
                        <h3 className="text-lg font-semibold text-orange-900">3. Timeline & Review</h3>
                        <p className="text-sm text-orange-700 mt-1">When will you review your progress?</p>
                    </div>
                    <div className="p-6">
                        <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-2">Milestones</label>
                        <textarea
                            id="timeline"
                            name="timeline"
                            rows={3}
                            className="shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border-gray-300 rounded-md p-3 border"
                            placeholder="E.g., Review progress in 1 month. Aim to complete online course by next Friday."
                            value={plan.timeline}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>

            <div className="mt-8 flex justify-end">
                <button
                    onClick={() => window.print()}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Print Plan
                </button>
            </div>
        </div>
    );
};