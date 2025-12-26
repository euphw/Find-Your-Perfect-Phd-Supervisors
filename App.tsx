import React, { useState } from 'react';
import Hero from './components/Hero';
import SearchForm from './components/SearchForm';
import SupervisorList from './components/SupervisorList';
import { findSupervisors, findCoAuthors } from './services/geminiService';
import { SearchCriteria, SearchResult, Supervisor } from './types';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentTopic, setCurrentTopic] = useState<string>('');

  const handleSearch = async (criteria: SearchCriteria) => {
    setIsLoading(true);
    setError(null);
    setSearchResult(null);
    setCurrentTopic(criteria.topic);

    try {
      // Updated to pass the full criteria object
      const result = await findSupervisors(criteria);
      setSearchResult(result);
    } catch (err) {
      console.error(err);
      setError("We encountered an issue while searching for supervisors. Please try again later or refine your topic.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFindNetwork = async (supervisor: Supervisor) => {
    setIsLoading(true);
    setError(null);
    setSearchResult(null);
    
    // Scroll to top to ensure the user sees the loading state in the form button
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      const result = await findCoAuthors(
        supervisor.name,
        supervisor.university,
        currentTopic
      );
      setSearchResult(result);
    } catch (err) {
      console.error(err);
      setError(`We encountered an issue while searching for network of ${supervisor.name}. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-20 bg-slate-50 font-sans">
      <Hero />
      <SearchForm onSearch={handleSearch} isLoading={isLoading} />
      
      {error && (
        <div className="container mx-auto px-6 mt-12 mb-4">
          <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-200 text-center flex items-center justify-center gap-2 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>{error}</span>
          </div>
        </div>
      )}

      <SupervisorList data={searchResult} onFindNetwork={handleFindNetwork} />
    </div>
  );
}

export default App;