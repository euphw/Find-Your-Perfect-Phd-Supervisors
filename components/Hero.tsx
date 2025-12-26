import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-academic-900 text-white pt-24 pb-32 overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      <div className="relative container mx-auto px-6 text-center z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-800/50 border border-blue-700 mb-6 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          <span className="text-sm font-medium text-blue-100">AI-Powered Research Matching</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight">
          Find Your Perfect <span className="text-blue-300">PhD Supervisor</span>
        </h1>
        <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-10 leading-relaxed">
          Navigate the global academic landscape with ease. We use Gemini AI to analyze your research interests and match you with active professors worldwide.
        </p>
      </div>
    </div>
  );
};

export default Hero;