import React from 'react';
import { Filter, SlidersHorizontal } from 'lucide-react';

interface SearchFiltersProps {
  selectedJobType: string;
  selectedExperience: string;
  salaryRange: string;
  onJobTypeChange: (type: string) => void;
  onExperienceChange: (experience: string) => void;
  onSalaryRangeChange: (range: string) => void;
  jobCount: number;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  selectedJobType,
  selectedExperience,
  salaryRange,
  onJobTypeChange,
  onExperienceChange,
  onSalaryRangeChange,
  jobCount
}) => {
  return (
    <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-2">
            <SlidersHorizontal className="h-5 w-5 text-gray-500" />
            <span className="text-gray-900 font-medium">Filters</span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-600">{jobCount.toLocaleString()} jobs found</span>
          </div>
          
          <div className="flex flex-wrap items-center space-x-4 space-y-2 sm:space-y-0">
            {/* Job Type Filter */}
            <select
              value={selectedJobType}
              onChange={(e) => onJobTypeChange(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Job Types</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Remote">Remote</option>
            </select>

            {/* Experience Filter */}
            <select
              value={selectedExperience}
              onChange={(e) => onExperienceChange(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Experience</option>
              <option value="Entry">Entry Level</option>
              <option value="Mid">Mid Level</option>
              <option value="Senior">Senior Level</option>
              <option value="Executive">Executive</option>
            </select>

            {/* Salary Range Filter */}
            <select
              value={salaryRange}
              onChange={(e) => onSalaryRangeChange(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Salaries</option>
              <option value="0-50000">$0 - $50k</option>
              <option value="50000-75000">$50k - $75k</option>
              <option value="75000-100000">$75k - $100k</option>
              <option value="100000-150000">$100k - $150k</option>
              <option value="150000+">$150k+</option>
            </select>

            {/* Clear Filters */}
            {(selectedJobType || selectedExperience || salaryRange) && (
              <button
                onClick={() => {
                  onJobTypeChange('');
                  onExperienceChange('');
                  onSalaryRangeChange('');
                }}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Clear all
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;