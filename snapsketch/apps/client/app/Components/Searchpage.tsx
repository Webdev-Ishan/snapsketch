"use client"
import React, { useState } from 'react';
import { Search } from 'lucide-react';

export default function Searchpage() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      // Add your search logic here
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="w-full max-w-2xl px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Search
          </h1>
          <p className="text-xl text-gray-300">
            Find what you are looking for
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="relative">
          <div className="relative group">
            <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-pink-400 transition-colors z-10" size={24} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Type your search here..."
              className="w-full bg-gray-900/50 backdrop-blur-sm border-2 border-gray-700 focus:border-pink-500 focus:bg-gray-900/70 rounded-2xl pl-16 pr-6 py-6 text-lg transition-all duration-300 outline-none"
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
          </div>
          
          {/* Search Button */}
          <button
            type="submit"
            className="mt-6 w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Search
          </button>
        </form>

        {/* Search Query Display */}
        {searchQuery && (
          <div className="mt-8 text-center">
            <p className="text-gray-400">
              Ready to search for: <span className="text-pink-400 font-medium">{searchQuery}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

