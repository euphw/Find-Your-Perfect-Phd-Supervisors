import React from 'react';
import { Supervisor } from '../types';

interface SupervisorCardProps {
  supervisor: Supervisor;
  onFindNetwork?: (supervisor: Supervisor) => void;
}

const SupervisorCard: React.FC<SupervisorCardProps> = ({ supervisor, onFindNetwork }) => {
  const isHiring = supervisor.hiringStatus?.toLowerCase().includes('hiring');

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow duration-300 flex flex-col h-full group">
      <div className="mb-4">
        <div className="flex justify-between items-start">
          <div>
             <h3 className="text-lg font-serif font-bold text-slate-900 group-hover:text-academic-900 transition-colors">
              {supervisor.name}
            </h3>
            {supervisor.title && (
                 <p className="text-xs font-semibold text-academic-900 uppercase tracking-wide mb-1">{supervisor.title}</p>
            )}
            <div className="text-academic-500 font-medium text-sm flex items-center gap-1.5 flex-wrap">
                <span>{supervisor.university}</span>
                {supervisor.country && (
                    <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded border border-slate-200">
                        {supervisor.country}
                    </span>
                )}
            </div>
            {supervisor.universityRank && (
                <p className="text-xs text-slate-400 mt-1">{supervisor.universityRank}</p>
            )}
          </div>
          
          <div className="flex flex-col items-end gap-2">
            <div className="bg-blue-50 p-2 rounded-lg shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-academic-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            </div>
          </div>
        </div>
        
        {/* Badges Row */}
        <div className="mt-3 flex flex-wrap gap-2">
            {/* Hiring Badge */}
            {isHiring ? (
                 <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5 animate-pulse"></span>
                    {supervisor.hiringStatus} {supervisor.intakeTerm && `(${supervisor.intakeTerm})`}
                 </span>
            ) : (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                    {supervisor.hiringStatus || "Status Unknown"}
                </span>
            )}

            {/* Scholarship Badge */}
            {supervisor.scholarshipAvailable && (
                 <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    Scholarship Avail.
                 </span>
            )}
        </div>

        <p className="text-sm text-slate-500 mt-3 border-b border-slate-100 pb-3">{supervisor.department}</p>
      </div>
      
      <div className="mb-4 flex-grow space-y-3">
        <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">Fit</h4>
            <p className="text-slate-700 text-sm leading-relaxed line-clamp-3">
            "{supervisor.matchReason}"
            </p>
        </div>

        {supervisor.hookPaperTitle && (
            <div className="bg-amber-50 p-3 rounded-md border border-amber-100">
                <h4 className="text-xs font-bold text-amber-700 uppercase tracking-wide mb-1 flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                        <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                    </svg>
                    2024-25 Hook Paper
                </h4>
                {supervisor.hookPaperUrl ? (
                    <a 
                        href={supervisor.hookPaperUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-amber-900 text-xs italic hover:underline hover:text-amber-700 block line-clamp-2"
                        title="Read paper"
                    >
                        {supervisor.hookPaperTitle} ↗
                    </a>
                ) : (
                    <p className="text-amber-900 text-xs italic line-clamp-2">
                        {supervisor.hookPaperTitle}
                    </p>
                )}
            </div>
        )}
      </div>

      <div className="space-y-4 mt-auto">
        <div className="flex flex-wrap gap-2">
          {supervisor.researchKeywords.map((keyword, idx) => (
            <span key={idx} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md font-medium">
              #{keyword}
            </span>
          ))}
        </div>

        <div className="flex flex-col gap-2 mt-2">
            {onFindNetwork && (
                <button
                    onClick={() => onFindNetwork(supervisor)}
                    className="w-full py-2 px-4 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 font-semibold text-sm transition-colors flex items-center justify-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Find Co-authors & Network
                </button>
            )}

            {supervisor.website ? (
            <a
                href={supervisor.website}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-4 rounded-lg bg-white border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-50 hover:border-slate-400 transition-all flex items-center justify-center gap-2"
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
    </div>
  );
};

export default SupervisorCard;