import React from 'react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid
} from 'recharts';
import { UserAssessment, CompetencyArea } from '../types';

interface DashboardProps {
  assessment: UserAssessment;
  framework: CompetencyArea[];
}

export const Dashboard: React.FC<DashboardProps> = ({ assessment, framework }) => {
  
  // Transform data for Radar Chart
  const radarData = framework.flatMap(area => 
    area.dimensions.map(dim => ({
      subject: dim.name,
      A: ((assessment[dim.id] as number) || 0) + 1, // 1-4 scale for better visual
      fullMark: 4,
    }))
  );

  // Calculate overall progress
  const totalPoints = (Object.values(assessment) as number[]).reduce((a, b) => a + b, 0);
  const maxPoints = radarData.length * 3; // Max index is 3
  const percentage = maxPoints > 0 ? Math.round((totalPoints / maxPoints) * 100) : 0;

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Welcome / Stats Panel */}
        <div className="lg:col-span-1 space-y-8">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Your Progress</h2>
                <div className="flex items-end space-x-2">
                    <span className="text-6xl font-extrabold text-indigo-600">{percentage}%</span>
                    <span className="text-gray-500 pb-2 mb-1">competence coverage</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                    <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div>
                </div>
                <p className="mt-4 text-sm text-gray-600">
                    Based on your self-assessment across {radarData.length} dimensions.
                </p>
            </div>

            <div className="bg-gradient-to-br from-indigo-900 to-indigo-700 rounded-xl shadow-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-3">Development Phase</h3>
                <div className="space-y-4">
                    <div className="flex items-start">
                        <div className="bg-white/20 p-2 rounded-lg mr-3">
                            <span className="font-bold">1</span>
                        </div>
                        <div>
                            <p className="font-semibold">Learn That (Concepts)</p>
                            <p className="text-indigo-200 text-xs">Minutes to Hours</p>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <div className="bg-white/20 p-2 rounded-lg mr-3">
                            <span className="font-bold">2</span>
                        </div>
                        <div>
                            <p className="font-semibold">Learn How (Practice)</p>
                            <p className="text-indigo-200 text-xs">Days to Weeks</p>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <div className="bg-white/20 p-2 rounded-lg mr-3">
                            <span className="font-bold">3</span>
                        </div>
                        <div>
                            <p className="font-semibold">Learn To (Fluency)</p>
                            <p className="text-indigo-200 text-xs">Months to Years</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Charts Panel */}
        <div className="lg:col-span-2 space-y-8">
             {/* Radar Chart */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Competency Map</h3>
                <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                            <PolarGrid stroke="#e2e8f0" />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                            <PolarRadiusAxis angle={30} domain={[0, 4]} tick={false} axisLine={false} />
                            <Radar
                                name="Competence"
                                dataKey="A"
                                stroke="#4f46e5"
                                strokeWidth={3}
                                fill="#6366f1"
                                fillOpacity={0.4}
                            />
                            <Tooltip 
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                formatter={(value: number) => [`Level ${value}`, 'Level']}
                            />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Bar Chart Summary */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Levels by Area</h3>
                 <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={radarData}
                            layout="vertical"
                            margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                            <XAxis type="number" domain={[0, 4]} hide />
                            <YAxis dataKey="subject" type="category" width={100} tick={{fontSize: 12, fill: '#475569'}} />
                            <Tooltip cursor={{fill: 'transparent'}} />
                            <Bar dataKey="A" fill="#818cf8" radius={[0, 4, 4, 0]} barSize={20} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};