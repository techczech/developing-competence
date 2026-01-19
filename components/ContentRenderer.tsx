
import React from 'react';
import { ContentBlock, ContentSection, BlockType } from '../types';
import { Info, AlertTriangle, Lightbulb, CheckCircle2 } from 'lucide-react';

const formatText = (text: string) => {
  return text.split('\n').map((line, i) => {
    // Basic bold parsing for **text**
    const parts = line.split(/(\*\*.*?\*\*)/g);
    return (
      <React.Fragment key={i}>
        {parts.map((part, j) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={j} className="font-semibold text-slate-900">{part.slice(2, -2)}</strong>;
          }
          return part;
        })}
        {i < line.split('\n').length - 1 && <br />}
      </React.Fragment>
    );
  });
};

const BlockRenderer: React.FC<{ block: ContentBlock }> = ({ block }) => {
  switch (block.type) {
    case 'h2':
      return <h2 className="text-3xl font-bold text-slate-900 mb-6 mt-12">{formatText(block.content || '')}</h2>;
    
    case 'h3':
      return <h3 className="text-xl font-bold text-slate-800 mb-4 mt-8">{formatText(block.content || '')}</h3>;
    
    case 'paragraph':
      return <p className="mb-4 text-slate-700 leading-relaxed text-lg">{formatText(block.content || '')}</p>;
    
    case 'list-ul':
      return (
        <ul className="list-disc list-outside ml-6 mb-6 space-y-2 text-slate-700">
          {block.items?.map((item, idx) => (
            <li key={idx} className="pl-2">{formatText(item)}</li>
          ))}
        </ul>
      );

    case 'list-ol':
      return (
        <ol className="list-decimal list-outside ml-6 mb-6 space-y-2 text-slate-700">
          {block.items?.map((item, idx) => (
            <li key={idx} className="pl-2">{formatText(item)}</li>
          ))}
        </ol>
      );

    case 'callout':
      const styles = {
        info: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-900', icon: Info },
        warning: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-900', icon: AlertTriangle },
        tip: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-900', icon: Lightbulb },
        accent: { bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-900', icon: CheckCircle2 },
      };
      const style = styles[block.style || 'info'];
      const Icon = style.icon;
      
      return (
        <div className={`${style.bg} border-l-4 ${style.border} p-4 my-6 rounded-r-lg flex items-start`}>
          <Icon className={`w-6 h-6 mr-3 flex-shrink-0 ${style.text}`} />
          <div className={`${style.text} text-base`}>{formatText(block.content || '')}</div>
        </div>
      );

    case 'table':
      if (!block.table) return null;
      return (
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg my-8">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                {block.table.headers.map((header, idx) => (
                  <th key={idx} className={`py-3.5 px-3 text-left text-sm font-semibold ${block.table?.columnStyles?.[idx] || 'text-gray-900'}`}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {block.table.rows.map((row, rIdx) => (
                <tr key={rIdx}>
                  {row.map((cell, cIdx) => (
                     <td key={cIdx} className={`px-3 py-4 text-sm ${block.table?.columnStyles?.[cIdx] || 'text-gray-500'} align-top`}>
                       {formatText(cell)}
                     </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    default:
      return null;
  }
};

export const SectionRenderer: React.FC<{ section: ContentSection }> = ({ section }) => {
  return (
    <div className="mb-12 border-b border-slate-200 pb-8 last:border-0">
      <h2 className="text-3xl font-bold text-slate-900 mb-6">{section.title}</h2>
      
      {section.blocks.map((block, idx) => (
        <BlockRenderer key={idx} block={block} />
      ))}

      {section.subsections?.map(sub => (
        <div key={sub.id} className="mt-8 ml-0 sm:ml-6 pl-0 sm:pl-6 border-l-0 sm:border-l-4 border-indigo-100">
          <h3 className="text-2xl font-semibold text-slate-800 mb-4">{sub.title}</h3>
          {sub.blocks.map((block, idx) => (
            <BlockRenderer key={idx} block={block} />
          ))}
        </div>
      ))}
    </div>
  );
};
