import React, { useState, useEffect } from 'react';
import { THEORY_CONTENT } from '../content/theory';
import { SectionRenderer } from './ContentRenderer';
import { ChevronRight, ChevronLeft, BookOpen, List, PlayCircle, CheckCircle2 } from 'lucide-react';

type ViewMode = 'step' | 'scroll';

export const TheoryViewer: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('step');
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [completedSections, setCompletedSections] = useState<Set<number>>(new Set([0]));

  const activeSection = THEORY_CONTENT[activeSectionIndex];
  const progress = Math.round(((activeSectionIndex + 1) / THEORY_CONTENT.length) * 100);

  useEffect(() => {
    setCompletedSections(prev => new Set(prev).add(activeSectionIndex));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeSectionIndex]);

  const handleNext = () => {
    if (activeSectionIndex < THEORY_CONTENT.length - 1) {
      setActiveSectionIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (activeSectionIndex > 0) {
      setActiveSectionIndex(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header / Mode Switcher */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-indigo-600" />
                <span className="hidden sm:inline">Understanding Competence</span>
                <span className="sm:hidden">Competence</span>
            </h2>
            
            <div className="flex bg-slate-100 p-1 rounded-lg">
                <button
                    onClick={() => setViewMode('step')}
                    className={`px-3 py-1.5 text-sm font-medium rounded-md flex items-center transition-all ${
                        viewMode === 'step' 
                        ? 'bg-white text-indigo-600 shadow-sm' 
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                >
                    <PlayCircle className="w-4 h-4 mr-2" />
                    Step by Step
                </button>
                <button
                    onClick={() => setViewMode('scroll')}
                    className={`px-3 py-1.5 text-sm font-medium rounded-md flex items-center transition-all ${
                        viewMode === 'scroll' 
                        ? 'bg-white text-indigo-600 shadow-sm' 
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                >
                    <List className="w-4 h-4 mr-2" />
                    Read All
                </button>
            </div>
        </div>
        
        {/* Progress Bar (Only in Step Mode) */}
        {viewMode === 'step' && (
            <div className="w-full bg-slate-100 h-1">
                <div 
                    className="bg-indigo-600 h-1 transition-all duration-500 ease-out" 
                    style={{ width: `${progress}%` }}
                />
            </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Sidebar Navigation */}
            <div className="lg:w-1/4 flex-shrink-0">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden sticky top-36">
                    <div className="p-4 bg-slate-50 border-b border-slate-200">
                        <h3 className="font-semibold text-slate-700 text-sm uppercase tracking-wider">Table of Contents</h3>
                    </div>
                    <nav className="max-h-[60vh] overflow-y-auto">
                        {THEORY_CONTENT.map((section, idx) => {
                            const isActive = viewMode === 'step' && activeSectionIndex === idx;
                            const isCompleted = completedSections.has(idx);
                            
                            return (
                                <button
                                    key={section.id}
                                    onClick={() => {
                                        setActiveSectionIndex(idx);
                                        setViewMode('step');
                                    }}
                                    className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between border-l-4 transition-colors ${
                                        isActive 
                                            ? 'border-indigo-600 bg-indigo-50 text-indigo-900 font-medium' 
                                            : 'border-transparent hover:bg-slate-50 text-slate-600 hover:text-slate-900'
                                    }`}
                                >
                                    <span className="truncate mr-2">{idx + 1}. {section.title}</span>
                                    {isCompleted && !isActive && <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />}
                                </button>
                            );
                        })}
                    </nav>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:w-3/4">
                {viewMode === 'step' ? (
                    // Step Mode View
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 sm:p-12 min-h-[500px] flex flex-col">
                            {/* Content */}
                            <div className="flex-grow">
                                <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2 block">
                                    Part {activeSectionIndex + 1} of {THEORY_CONTENT.length}
                                </span>
                                <SectionRenderer section={activeSection} />
                            </div>

                            {/* Navigation Buttons */}
                            <div className="mt-12 pt-8 border-t border-slate-100 flex justify-between items-center">
                                <button
                                    onClick={handlePrev}
                                    disabled={activeSectionIndex === 0}
                                    className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                        activeSectionIndex === 0
                                            ? 'text-slate-300 cursor-not-allowed'
                                            : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50'
                                    }`}
                                >
                                    <ChevronLeft className="w-4 h-4 mr-1" />
                                    Previous
                                </button>

                                {activeSectionIndex < THEORY_CONTENT.length - 1 ? (
                                    <button
                                        onClick={handleNext}
                                        className="flex items-center px-6 py-3 rounded-full bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                                    >
                                        Next: {THEORY_CONTENT[activeSectionIndex + 1].title}
                                        <ChevronRight className="w-4 h-4 ml-1" />
                                    </button>
                                ) : (
                                    <button
                                        className="flex items-center px-6 py-3 rounded-full bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 shadow-md"
                                    >
                                        Complete Module
                                        <CheckCircle2 className="w-4 h-4 ml-2" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    // Scroll Mode View
                    <div className="space-y-8">
                         {THEORY_CONTENT.map((section, idx) => (
                             <div key={section.id} id={`section-${idx}`} className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 sm:p-12">
                                <SectionRenderer section={section} />
                             </div>
                         ))}
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};