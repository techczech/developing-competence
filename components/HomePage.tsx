import React from 'react';
import { AppView } from '../types';
import { LayoutDashboard, BookOpen, CheckSquare, PenTool, ArrowRight, Hammer } from 'lucide-react';

interface HomePageProps {
  setView: (view: AppView) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ setView }) => {
  const cards = [
    {
      id: AppView.THEORY,
      title: 'Understanding Competence',
      description: 'Explore the framework, dimensions, and levels of competence to build your mental maps.',
      icon: BookOpen,
      color: 'bg-indigo-600',
      textColor: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    },
    {
      id: AppView.FRAMEWORK_BUILDER,
      title: 'Develop Framework',
      description: 'Use AI to generate a custom competency framework for any topic, or load the default digital skills framework.',
      icon: Hammer,
      color: 'bg-purple-600',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      id: AppView.ASSESSMENT,
      title: 'Self Assessment',
      description: 'Evaluate your current skill levels using the currently loaded framework.',
      icon: CheckSquare,
      color: 'bg-emerald-600',
      textColor: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    {
      id: AppView.PLANNING,
      title: 'Development Plan',
      description: 'Use AI to generate a personalized strategy to move from knowledge to fluent performance.',
      icon: PenTool,
      color: 'bg-orange-600',
      textColor: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
          Developing <span className="text-indigo-600">Competence</span>
        </h1>
        <p className="max-w-2xl mx-auto text-xl text-slate-500 leading-relaxed">
          From Mental Maps to Fluent Performance. Design your own competency frameworks, track skills, and use AI to plan professional development.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => setView(card.id)}
            className="group relative bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-lg hover:border-indigo-100 transition-all duration-300 text-left flex flex-col h-full"
          >
            <div className={`w-14 h-14 rounded-2xl ${card.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
              <card.icon className={`w-7 h-7 ${card.textColor}`} />
            </div>
            
            <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
              {card.title}
            </h3>
            
            <p className="text-slate-600 mb-6 flex-grow leading-relaxed">
              {card.description}
            </p>

            <div className="flex items-center text-sm font-bold text-slate-400 group-hover:text-indigo-600 transition-colors mt-auto">
              Open Section <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};