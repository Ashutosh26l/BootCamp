import React from 'react';
import { MapPin, Clock, Bookmark, ExternalLink, DollarSign, Users, Calendar } from 'lucide-react';
import { Job } from '../types/Job';
import { useAuth } from '../contexts/AuthContext';

interface JobCardProps {
  job: Job;
  onViewDetails?: (job: Job) => void;
  onApply?: (job: Job) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onViewDetails, onApply }) => {
  const { user, isAuthenticated, bookmarkJob, applyToJob } = useAuth();
  
  const isBookmarked = user?.bookmarkedJobs.includes(job.id) || false;
  const hasApplied = user?.appliedJobs.includes(job.id) || false;

  const handleBookmark = () => {
    if (isAuthenticated) {
      bookmarkJob(job.id);
    }
  };

  const handleApply = () => {
    if (isAuthenticated && !hasApplied) {
      applyToJob(job.id);
      if (onApply) {
        onApply(job);
      }
    }
  };

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(job);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 hover:border-blue-200 group">
      {/* Header */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-4">
            <img
              src={job.logo}
              alt={`${job.company} logo`}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {job.title}
                </h3>
                {job.featured && (
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                    Featured
                  </span>
                )}
                {job.urgent && (
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                    Urgent
                  </span>
                )}
              </div>
              <p className="text-gray-600 font-medium">{job.company}</p>
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{job.postedDate}</span>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={handleBookmark}
            className={`p-2 rounded-full transition-colors ${
              isBookmarked 
                ? 'bg-blue-100 text-blue-600' 
                : 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600'
            }`}
          >
            <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Job Details */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {job.type}
            </span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              {job.experience}
            </span>
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
              {job.industry}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1 text-gray-600">
              <DollarSign className="h-4 w-4" />
              <span className="font-semibold">{job.salary}</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-500 text-sm">
              <Users className="h-4 w-4" />
              <span>{job.companySize} employees</span>
            </div>
          </div>

          <p className="text-gray-600 text-sm line-clamp-2">
            {job.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {job.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
              >
                {tag}
              </span>
            ))}
            {job.tags.length > 3 && (
              <span className="text-gray-500 text-xs">
                +{job.tags.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-gray-50 rounded-b-xl border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 text-gray-500 text-sm">
            <Calendar className="h-4 w-4" />
            <span>Posted {job.postedDate}</span>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleViewDetails}
              className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center space-x-1"
            >
              <span>View Details</span>
              <ExternalLink className="h-4 w-4" />
            </button>
            <button
              onClick={handleApply}
              disabled={hasApplied}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                hasApplied
                  ? 'bg-green-100 text-green-800 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {hasApplied ? 'Applied' : 'Apply Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;