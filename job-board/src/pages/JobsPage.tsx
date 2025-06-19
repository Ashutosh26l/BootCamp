import React, { useState, useMemo } from 'react';
import Hero from '../components/Hero';
import SearchFilters from '../components/SearchFilters';
import JobGrid from '../components/JobGrid';
import JobDetailsModal from '../components/JobDetailsModal';
import { Job } from '../types/Job';
import { jobsData } from '../data/jobsData';

const JobsPage: React.FC = () => {
  const [jobs] = useState<Job[]>(jobsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedJobType, setSelectedJobType] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('');
  const [salaryRange, setSalaryRange] = useState('');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);

  const checkSalaryRange = (jobSalary: string, range: string): boolean => {
    if (!range) return true;
    
    const salaryNumbers = jobSalary.match(/\d+,?\d*/g);
    if (!salaryNumbers) return false;
    
    const minSalary = parseInt(salaryNumbers[0].replace(',', ''));
    const maxSalary = salaryNumbers.length > 1 ? parseInt(salaryNumbers[1].replace(',', '')) : minSalary;
    const avgSalary = (minSalary + maxSalary) / 2;

    switch (range) {
      case '0-50000':
        return avgSalary <= 50000;
      case '50000-75000':
        return avgSalary >= 50000 && avgSalary <= 75000;
      case '75000-100000':
        return avgSalary >= 75000 && avgSalary <= 100000;
      case '100000-150000':
        return avgSalary >= 100000 && avgSalary <= 150000;
      case '150000+':
        return avgSalary >= 150000;
      default:
        return true;
    }
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesLocation = !selectedLocation || job.location.toLowerCase().includes(selectedLocation.toLowerCase());
      const matchesJobType = !selectedJobType || job.type === selectedJobType;
      const matchesExperience = !selectedExperience || job.experience === selectedExperience;
      const matchesSalary = !salaryRange || checkSalaryRange(job.salary, salaryRange);

      return matchesSearch && matchesLocation && matchesJobType && matchesExperience && matchesSalary;
    });
  }, [jobs, searchTerm, selectedLocation, selectedJobType, selectedExperience, salaryRange]);

  const handleHeroSearch = (term: string, location: string) => {
    setSearchTerm(term);
    setSelectedLocation(location);
  };

  const handleViewDetails = (job: Job) => {
    setSelectedJob(job);
    setIsJobModalOpen(true);
  };

  const handleApply = (job: Job) => {
    // Handle job application logic here
    console.log('Applied to job:', job.title);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero onSearch={handleHeroSearch} />
      <SearchFilters
        selectedJobType={selectedJobType}
        selectedExperience={selectedExperience}
        salaryRange={salaryRange}
        onJobTypeChange={setSelectedJobType}
        onExperienceChange={setSelectedExperience}
        onSalaryRangeChange={setSalaryRange}
        jobCount={filteredJobs.length}
      />
      <JobGrid 
        jobs={filteredJobs} 
        onViewDetails={handleViewDetails}
        onApply={handleApply}
      />
      
      <JobDetailsModal
        job={selectedJob}
        isOpen={isJobModalOpen}
        onClose={() => setIsJobModalOpen(false)}
        onApply={handleApply}
      />
    </div>
  );
};

export default JobsPage;