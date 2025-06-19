import React, { useState } from 'react';
import { Search, MapPin, Briefcase } from 'lucide-react';

interface HeroProps {
  onSearch: (searchTerm: string, location: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm, location);
  };

  return (
    <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Find Your Dream
            <span className="block text-yellow-300">Career Today</span>
          </h1>
          <p className="text-xl sm:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Discover thousands of job opportunities from top companies worldwide. Your next career move starts here.
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-2 shadow-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Job title, keywords, or company"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 text-gray-900 bg-transparent border-0 focus:ring-0 focus:outline-none placeholder-gray-500"
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="City, state, or remote"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 text-gray-900 bg-transparent border-0 focus:ring-0 focus:outline-none placeholder-gray-500"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition-colors duration-200 flex items-center justify-center"
                >
                  <Briefcase className="h-5 w-5 mr-2" />
                  Search Jobs
                </button>
              </div>
            </div>
          </form>

          {/* Popular Searches */}
          <div className="mt-8">
            <p className="text-blue-200 mb-4">Popular searches:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {['Frontend Developer', 'Product Manager', 'Data Scientist', 'UX Designer', 'DevOps Engineer'].map((term) => (
                <button
                  key={term}
                  onClick={() => onSearch(term, '')}
                  className="bg-blue-500 bg-opacity-30 hover:bg-opacity-50 text-white px-4 py-2 rounded-full text-sm transition-all duration-200 border border-blue-400 hover:border-blue-300"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold text-yellow-300">10K+</div>
              <div className="text-blue-200">Active Jobs</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-300">5K+</div>
              <div className="text-blue-200">Companies</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-300">50K+</div>
              <div className="text-blue-200">Job Seekers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-300">95%</div>
              <div className="text-blue-200">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;