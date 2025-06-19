import React from 'react';
import { X, MapPin, Clock, DollarSign, Users, Calendar, ExternalLink, Bookmark, Building } from 'lucide-react';
import { Job } from '../types/Job';
import { useAuth } from '../contexts/AuthContext';

interface JobDetailsModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
  onApply?: (job: Job) => void;
}

const JobDetailsModal: React.FC<JobDetailsModalProps> = ({ job, isOpen, onClose, onApply }) => {
  const { user, isAuthenticated, bookmarkJob, applyToJob } = useAuth();

  if (!isOpen || !job) return null;

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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <img
                src={job.logo}
                alt={`${job.company} logo`}
                className="w-16 h-16 rounded-xl object-cover"
              />
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <h2 className="text-2xl font-bold text-gray-900">{job.title}</h2>
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
                <p className="text-xl text-gray-600 font-medium mb-3">{job.company}</p>
                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{job.postedDate}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{job.companySize} employees</span>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4 mt-6">
            <button
              onClick={handleApply}
              disabled={hasApplied}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                hasApplied
                  ? 'bg-green-100 text-green-800 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {hasApplied ? 'Applied' : 'Apply Now'}
            </button>
            <button
              onClick={handleBookmark}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2 ${
                isBookmarked
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-current' : ''}`} />
              <span>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Job Overview */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <DollarSign className="h-5 w-5 text-blue-600" />
                    <span className="text-sm font-medium text-blue-600">Salary</span>
                  </div>
                  <p className="font-semibold text-gray-900">{job.salary}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Building className="h-5 w-5 text-green-600" />
                    <span className="text-sm font-medium text-green-600">Type</span>
                  </div>
                  <p className="font-semibold text-gray-900">{job.type}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Users className="h-5 w-5 text-purple-600" />
                    <span className="text-sm font-medium text-purple-600">Experience</span>
                  </div>
                  <p className="font-semibold text-gray-900">{job.experience}</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Calendar className="h-5 w-5 text-orange-600" />
                    <span className="text-sm font-medium text-orange-600">Deadline</span>
                  </div>
                  <p className="font-semibold text-gray-900">{job.applicationDeadline || 'Open'}</p>
                </div>
              </div>

              {/* Job Description */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Job Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {job.fullDescription || job.description}
                </p>
              </div>

              {/* Responsibilities */}
              {job.responsibilities && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Responsibilities</h3>
                  <ul className="space-y-2">
                    {job.responsibilities.map((responsibility, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600">{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Requirements */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Requirements</h3>
                <ul className="space-y-2">
                  {job.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Qualifications */}
              {job.qualifications && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Qualifications</h3>
                  <ul className="space-y-2">
                    {job.qualifications.map((qualification, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600">{qualification}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Benefits */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Benefits & Perks</h3>
                <div className="grid grid-cols-2 gap-3">
                  {job.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-2 bg-gray-50 p-3 rounded-lg">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Skills */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {job.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Company Info */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">About {job.company}</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Building className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{job.industry} Industry</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{job.companySize} employees</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{job.location}</span>
                  </div>
                </div>
                <button className="w-full mt-4 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                  <span>View Company Profile</span>
                  <ExternalLink className="h-4 w-4" />
                </button>
              </div>

              {/* Contact */}
              {job.contactEmail && (
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Contact</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Have questions about this role?
                  </p>
                  <a
                    href={`mailto:${job.contactEmail}`}
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    {job.contactEmail}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsModal;