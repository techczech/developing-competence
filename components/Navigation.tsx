import React from 'react';
import { AppView } from '../types';
import { LayoutDashboard, BookOpen, CheckSquare, PenTool, Hammer } from 'lucide-react';

interface NavigationProps {
  currentView: AppView;
  setView: (view: AppView) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentView, setView }) => {
  const navItems = [
    { id: AppView.THEORY, label: 'Competence', icon: BookOpen },
    { id: AppView.FRAMEWORK_BUILDER, label: 'Framework Builder', icon: Hammer },
    { id: AppView.ASSESSMENT, label: 'Assessment', icon: CheckSquare },
    { id: AppView.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { id: AppView.PLANNING, label: 'Plan', icon: PenTool },
  ];

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <button 
              onClick={() => setView(AppView.HOME)}
              className="flex-shrink-0 flex items-center hover:opacity-80 transition-opacity focus:outline-none group"
            >
              <span className="text-indigo-600 font-bold text-xl tracking-tight group-hover:text-indigo-500 transition-colors">Developing<span className="text-slate-900">Competence</span></span>
            </button>
            <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setView(item.id)}
                  className={`${
                    currentView === item.id
                      ? 'border-indigo-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200`}
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          {/* Mobile menu button could go here */}
        </div>
      </div>
      {/* Mobile Menu */}
      <div className="sm:hidden border-t border-gray-200 bg-gray-50 flex justify-around p-2 overflow-x-auto">
         {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`${
                currentView === item.id ? 'text-indigo-600' : 'text-gray-500'
              } flex flex-col items-center p-2 text-xs font-medium min-w-[60px]`}
            >
              <item.icon className="w-5 h-5 mb-1" />
              <span className="whitespace-nowrap">{item.label}</span>
            </button>
          ))}
      </div>
    </nav>
  );
};