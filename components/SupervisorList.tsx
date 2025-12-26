import React from 'react';
import { SearchResult } from '../types';
import SupervisorCard from './SupervisorCard';

interface SupervisorListProps {
  data: SearchResult | null;
}

const SupervisorList: React.FC<SupervisorListProps> = ({ data }) => {
  if (!data) return null;

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-serif font-bold text-slate-800">
          Recommended Supervisors
          <span className="ml-3 text-sm font-sans font-normal bg-blue-100 text-blue-700 py-1 px-3 rounded-full">
            {data.supervisors.length} Found
          </span>
        </h2>
      </div>
      
      {data.supervisors.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300 shadow-sm">
            <p className="text-slate-500 text-lg">No specific supervisors found. Try broadening your research topic.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {data.supervisors.map((supervisor, index) => (
            <SupervisorCard key={index} supervisor={supervisor} />
          ))}
        </div>
      )}

      {/* Grounding / Sources Section */}
      {data.groundingChunks && data.groundingChunks.length > 0 && (
        <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
          <div className="flex items-center gap-2 mb-4">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">
              Verified Sources
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.groundingChunks.map((chunk, idx) => {
               if (chunk.web?.uri && chunk.web?.title) {
                 return (
                    <a 
                      key={idx}
                      href={chunk.web.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs bg-white text-blue-600 hover:text-blue-800 border border-slate-300 hover:border-blue-400 px-3 py-1.5 rounded-full transition-colors truncate max-w-xs shadow-sm"
                    >
                      {chunk.web.title}
                    </a>
                 )
               }
               return null;
            })}
          </div>
          <p className="text-xs text-slate-400 mt-3 italic">
            * Information retrieved via Gemini using Google Search Grounding. Please verify specific details on university websites.
          </p>
        </div>
      )}
    </div>
  );
};

export default SupervisorList;