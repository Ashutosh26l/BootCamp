import React, { useState } from 'react';
import { TrendingUp, DollarSign, MapPin, Briefcase, Search, Filter } from 'lucide-react';
import { salaryData } from '../data/jobsData';
import { SalaryData } from '../types/Job';

const SalaryGuidePage: React.FC = () => {
  const [salaries] = useState<SalaryData[]>(salaryData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('');

  const filteredSalaries = salaries.filter(salary => {
    const matchesSearch = salary.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         salary.industry.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !selectedLocation || salary.location.toLowerCase().includes(selectedLocation.toLowerCase());
    const matchesExperience = !selectedExperience || salary.experience === selectedExperience;

    return matchesSearch && matchesLocation && matchesExperience;
  });

  const locations = [...new Set(salaries.map(s => s.location))];
  const experiences = [...new Set(salaries.map(s => s.experience))];

  const formatSalary = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'High':
        return 'bg-green-100 text-green-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Salary Guide
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
              Discover competitive salary ranges for your role and location. Make informed career decisions with real market data.
            </p>

            {/* Search */}
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-2xl p-2 shadow-2xl">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search job titles or industries..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 text-gray-900 bg-transparent border-0 focus:ring-0 focus:outline-none placeholder-gray-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <span className="text-gray-600">{filteredSalaries.length} salary insights</span>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Locations</option>
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
              
              <select
                value={selectedExperience}
                onChange={(e) => setSelectedExperience(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Experience Levels</option>
                {experiences.map(experience => (
                  <option key={experience} value={experience}>{experience}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Salary Data */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredSalaries.map((salary) => (
            <div
              key={salary.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 hover:border-blue-200 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{salary.title}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center space-x-1">
                      <Briefcase className="h-4 w-4" />
                      <span>{salary.industry}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{salary.location}</span>
                    </div>
                  </div>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {salary.experience} Level
                  </span>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDemandColor(salary.demand)}`}>
                  {salary.demand} Demand
                </span>
              </div>

              {/* Salary Information */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <DollarSign className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-medium text-gray-600">Average Salary</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatSalary(salary.averageSalary)}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingUp className="h-5 w-5 text-blue-600" />
                      <span className="text-sm font-medium text-gray-600">Growth Rate</span>
                    </div>
                    <p className="text-2xl font-bold text-green-600">
                      +{salary.growth}%
                    </p>
                  </div>
                </div>
              </div>

              {/* Salary Range */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span>Salary Range</span>
                  <span>{formatSalary(salary.salaryRange.min)} - {formatSalary(salary.salaryRange.max)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full relative"
                    style={{ width: '100%' }}
                  >
                    <div 
                      className="absolute top-0 left-0 h-2 bg-blue-800 rounded-full"
                      style={{ 
                        width: `${((salary.averageSalary - salary.salaryRange.min) / (salary.salaryRange.max - salary.salaryRange.min)) * 100}%` 
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                View Similar Jobs
              </button>
            </div>
          ))}
        </div>

        {filteredSalaries.length === 0 && (
          <div className="text-center py-12">
            <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
              <DollarSign className="h-12 w-12" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No salary data found</h3>
            <p className="text-gray-500">Try adjusting your search filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalaryGuidePage;