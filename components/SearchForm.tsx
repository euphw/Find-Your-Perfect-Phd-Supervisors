import React, { useState } from 'react';
import { SearchCriteria } from '../types';

interface SearchFormProps {
  onSearch: (criteria: SearchCriteria) => void;
  isLoading: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, isLoading }) => {
  const [topic, setTopic] = useState('');
  const [countries, setCountries] = useState('Global');
  const [maxRank, setMaxRank] = useState('Any');
  const [requireScholarship, setRequireScholarship] = useState(false);
  const [background, setBackground] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    onSearch({ topic, countries, maxRank, requireScholarship, background });
  };

  return (
    <div className="w-full max-w-4xl mx-auto -mt-20 relative z-20 px-6">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-12 gap-6">
            
            {/* Topic - Full Width */}
            <div className="md:col-span-12 space-y-2">
              <label htmlFor="topic" className="block text-sm font-semibold text-slate-700">
                Research Interest / Topic
              </label>
              <textarea
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="E.g., Deep Reinforcement Learning for robotics, CRISPR applications in agriculture..."
                className="w-full p-4 rounded-xl border border-slate-200 focus:border-academic-500 focus:ring-4 focus:ring-blue-50 transition-all outline-none resize-none h-24 text-slate-800 placeholder:text-slate-400"
                required
              />
            </div>
            
            {/* Countries */}
            <div className="md:col-span-6 space-y-2">
              <label htmlFor="countries" className="block text-sm font-semibold text-slate-700">
                Target Countries (Comma separated)
              </label>
              <input
                type="text"
                id="countries"
                value={countries}
                onChange={(e) => setCountries(e.target.value)}
                placeholder="E.g. USA, UK, Singapore, Germany"
                className="w-full p-3 rounded-xl border border-slate-200 focus:border-academic-500 focus:ring-4 focus:ring-blue-50 transition-all outline-none text-slate-800"
              />
            </div>

            {/* QS Rank Limit */}
            <div className="md:col-span-3 space-y-2">
              <label htmlFor="rank" className="block text-sm font-semibold text-slate-700">
                University Rank (QS)
              </label>
              <select
                id="rank"
                value={maxRank}
                onChange={(e) => setMaxRank(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 focus:border-academic-500 focus:ring-4 focus:ring-blue-50 transition-all outline-none bg-white text-slate-800"
              >
                <option value="Any">Any Rank</option>
                <option value="50">Top 50</option>
                <option value="100">Top 100</option>
                <option value="200">Top 200</option>
              </select>
            </div>

             {/* Background */}
             <div className="md:col-span-3 space-y-2">
              <label htmlFor="background" className="block text-sm font-semibold text-slate-700">
                Your Background
              </label>
              <input
                type="text"
                id="background"
                value={background}
                onChange={(e) => setBackground(e.target.value)}
                placeholder="E.g., MSc CS, 3.8 GPA"
                className="w-full p-3 rounded-xl border border-slate-200 focus:border-academic-500 focus:ring-4 focus:ring-blue-50 transition-all outline-none text-slate-800 placeholder:text-slate-400"
              />
            </div>
            
            {/* Scholarship Toggle */}
             <div className="md:col-span-12 flex items-center gap-3 bg-slate-50 p-3 rounded-lg border border-slate-100">
                <input
                    type="checkbox"
                    id="scholarship"
                    checked={requireScholarship}
                    onChange={(e) => setRequireScholarship(e.target.checked)}
                    className="w-5 h-5 text-academic-500 rounded focus:ring-academic-500 border-gray-300"
                />
                <label htmlFor="scholarship" className="text-sm text-slate-700 font-medium select-none cursor-pointer">
                    Prioritize positions with explicit Scholarship / Funding available
                </label>
             </div>

          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading || !topic.trim()}
              className={`w-full py-4 px-6 rounded-xl font-bold text-white shadow-lg shadow-blue-500/30 transition-all transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-2
                ${isLoading ? 'bg-slate-400 cursor-not-allowed' : 'bg-academic-900 hover:bg-blue-800'}
              `}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Searching & Analyzing...</span>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                  <span>Find Supervisors</span>
                </>
              )}
            </button>
            <p className="text-center text-xs text-slate-400 mt-3">
              Uses Gemini 3 Flash to find global supervisors matching your criteria.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchForm;