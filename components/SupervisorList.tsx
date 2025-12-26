import React, { useState, useMemo } from 'react';
import { SearchResult, Supervisor } from '../types';
import SupervisorCard from './SupervisorCard';

interface SupervisorListProps {
  data: SearchResult | null;
  onFindNetwork: (supervisor: Supervisor) => void;
}

const SupervisorList: React.FC<SupervisorListProps> = ({ data, onFindNetwork }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [countryFilter, setCountryFilter] = useState('All');
  const [universityFilter, setUniversityFilter] = useState('All');
  const [hiringFilter, setHiringFilter] = useState('All');

  const filteredSupervisors = useMemo(() => {
    if (!data?.supervisors) return [];

    return data.supervisors.filter(s => {
      // Text Search
      const matchesSearch = 
        searchTerm === '' ||
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.department.toLowerCase().includes(searchTerm.toLowerCase());

      // Country Filter
      const matchesCountry = 
        countryFilter === 'All' || 
        (s.country && s.country === countryFilter);

      // University Filter
      const matchesUniversity = 
        universityFilter === 'All' ||
        s.university === universityFilter;

      // Hiring Status Filter
      const matchesHiring = 
        hiringFilter === 'All' ||
        (hiringFilter === 'Hiring' && s.hiringStatus?.toLowerCase().includes('hiring')) ||
        (hiringFilter === 'Unknown/Other' && !s.hiringStatus?.toLowerCase().includes('hiring'));

      return matchesSearch && matchesCountry && matchesUniversity && matchesHiring;
    });
  }, [data, searchTerm, countryFilter, universityFilter, hiringFilter]);

  // Extract unique countries
  const uniqueCountries = useMemo(() => {
    if (!data?.supervisors) return [];
    const countries = data.supervisors.map(s => s.country).filter(Boolean) as string[];
    return Array.from(new Set(countries)).sort();
  }, [data]);

  // Extract unique universities
  const uniqueUniversities = useMemo(() => {
    if (!data?.supervisors) return [];
    const unis = data.supervisors.map(s => s.university).filter(Boolean) as string[];
    return Array.from(new Set(unis)).sort();
  }, [data]);

  if (!data) return null;

  const handleExport = () => {
    if (!filteredSupervisors.length) return;

    // Excel Column Headers
    const headers = [
      "Name", 
      "Title",
      "School", 
      "Country",
      "Rank", 
      "Wealth",
      "Scholarship",
      "Profile Link",
      "Hook Paper", 
      "Paper Link",
      "Tech Fit", 
      "Hiring",
      "Term"
    ];

    // Map data to rows
    const rows = filteredSupervisors.map(s => [
      `"${s.name}"`,
      `"${s.title || 'Professor'}"`,
      `"${s.university}"`,
      `"${s.country || ''}"`,
      `"${s.universityRank || 'N/A'}"`,
      `"${s.fundingEstimate || 'Unknown'}"`,
      `"${s.scholarshipAvailable ? 'Yes' : 'No/Unclear'}"`,
      `"${s.website || ''}"`,
      `"${s.hookPaperTitle || 'N/A'}"`,
      `"${s.hookPaperUrl || ''}"`,
      `"${s.matchReason}"`,
      `"${s.hiringStatus || 'Unknown'}"`,
      `"${s.intakeTerm || ''}"`
    ]);

    // Create CSV content
    const csvContent = [
      headers.join(','),
      ...rows.map(r => r.join(','))
    ].join('\n');

    // Trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'supervisors_export.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="flex flex-col gap-6 mb-8">
        
        {/* Header and Export */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <h2 className="text-2xl font-serif font-bold text-slate-800">
            Recommended Supervisors
            <span className="ml-3 text-sm font-sans font-normal bg-blue-100 text-blue-700 py-1 px-3 rounded-full">
              {filteredSupervisors.length} / {data.supervisors.length}
            </span>
          </h2>

          <button 
            onClick={handleExport}
            disabled={filteredSupervisors.length === 0}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-slate-300 text-white px-5 py-2.5 rounded-lg shadow-sm transition-colors font-medium text-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Export Filtered
          </button>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm grid md:grid-cols-4 gap-4">
            
            {/* Text Search */}
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                         <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                </div>
                <input
                    type="text"
                    placeholder="Filter by name..."
                    className="pl-10 block w-full rounded-lg border-slate-300 bg-slate-50 border focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Country Filter */}
            <div>
                <select 
                    value={countryFilter} 
                    onChange={(e) => setCountryFilter(e.target.value)}
                    className="block w-full rounded-lg border-slate-300 bg-slate-50 border focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2"
                >
                    <option value="All">All Countries</option>
                    {uniqueCountries.map(c => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>
            </div>

            {/* University Filter */}
            <div>
                <select 
                    value={universityFilter} 
                    onChange={(e) => setUniversityFilter(e.target.value)}
                    className="block w-full rounded-lg border-slate-300 bg-slate-50 border focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 truncate"
                >
                    <option value="All">All Universities</option>
                    {uniqueUniversities.map(u => (
                        <option key={u} value={u}>{u}</option>
                    ))}
                </select>
            </div>

            {/* Hiring Filter */}
            <div>
                 <select 
                    value={hiringFilter} 
                    onChange={(e) => setHiringFilter(e.target.value)}
                    className="block w-full rounded-lg border-slate-300 bg-slate-50 border focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2"
                >
                    <option value="All">All Hiring Status</option>
                    <option value="Hiring">Actively Hiring</option>
                    <option value="Unknown/Other">Other / Unknown</option>
                </select>
            </div>
        </div>
      </div>
      
      {filteredSupervisors.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300 shadow-sm">
            <p className="text-slate-500 text-lg">
                {data.supervisors.length > 0 
                 ? "No supervisors match your filters." 
                 : "No specific supervisors found. Try broadening your research topic."}
            </p>
            {data.supervisors.length > 0 && (
                <button 
                    onClick={() => {
                        setSearchTerm('');
                        setCountryFilter('All');
                        setUniversityFilter('All');
                        setHiringFilter('All');
                    }}
                    className="mt-4 text-blue-600 hover:text-blue-800 underline"
                >
                    Clear Filters
                </button>
            )}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredSupervisors.map((supervisor, index) => (
            <SupervisorCard 
                key={`${supervisor.name}-${index}`} 
                supervisor={supervisor} 
                onFindNetwork={onFindNetwork}
            />
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