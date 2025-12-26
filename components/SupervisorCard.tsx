import React from 'react';
import { Supervisor } from '../types';

interface SupervisorCardProps {
  supervisor: Supervisor;
}

const SupervisorCard: React.FC<SupervisorCardProps> = ({ supervisor }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow duration-300 flex flex-col h-full group">
      <div className="mb-4">
        <div className="flex justify-between items-start">
          <div>
             <h3 className="text-xl font-serif font-bold text-slate-900 group-hover:text-academic-900 transition-colors">
              {supervisor.name}
            </h3>
            <p className="text-academic-500 font-medium">{supervisor.university}</p>
          </div>
          <div className="bg-blue-50 p-2 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-academic-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
        </div>
        <p className="text-sm text-slate-500 mt-1 border-b border-slate-100 pb-3">{supervisor.department}</p>
      </div>
      
      <div className="mb-4 flex-grow">
        <p className="text-slate-700 text-sm leading-relaxed italic">
          "{supervisor.matchReason}"
        </p>
      </div>

      <div className="space-y-4 mt-auto">
        <div className="flex flex-wrap gap-2">
          {supervisor.researchKeywords.map((keyword, idx) => (
            <span key={idx} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md font-medium">
              #{keyword}
            </span>
          ))}
        </div>

        {supervisor.website ? (
          <a
            href={supervisor.website}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center py-2 px-4 rounded-lg bg-white border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-50 hover:border-slate-400 transition-all flex items-center justify-center gap-2"
          >
            <span>View Profile / Lab</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        ) : (
            <button disabled className="block w-full text-center py-2 px-4 rounded-lg bg-slate-50 border border-slate-200 text-slate-400 text-sm font-semibold cursor-not-allowed">
                Profile Not Linked
            </button>
        )}
      </div>
    </div>
  );
};

export default SupervisorCard;