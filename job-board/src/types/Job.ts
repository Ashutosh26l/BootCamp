export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
  experience: 'Entry' | 'Mid' | 'Senior' | 'Executive';
  salary: string;
  description: string;
  requirements: string[];
  benefits: string[];
  postedDate: string;
  logo: string;
  featured: boolean;
  urgent: boolean;
  companySize: string;
  industry: string;
  tags: string[];
  fullDescription?: string;
  responsibilities?: string[];
  qualifications?: string[];
  applicationDeadline?: string;
  contactEmail?: string;
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  description: string;
  industry: string;
  size: string;
  location: string;
  website: string;
  rating: number;
  jobCount: number;
  featured: boolean;
  founded?: string;
  employees?: string;
  headquarters?: string;
  culture?: string[];
  benefits?: string[];
  socialMedia?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bookmarkedJobs: string[];
  appliedJobs: string[];
  profile?: {
    title?: string;
    bio?: string;
    skills?: string[];
    experience?: string;
    education?: string;
    location?: string;
  };
}

export interface SalaryData {
  id: string;
  title: string;
  industry: string;
  location: string;
  experience: string;
  averageSalary: number;
  salaryRange: {
    min: number;
    max: number;
  };
  growth: number;
  demand: 'High' | 'Medium' | 'Low';
}

export interface CareerAdvice {
  id: string;
  title: string;
  category: string;
  author: string;
  publishDate: string;
  readTime: string;
  excerpt: string;
  content: string;
  tags: string[];
  featured: boolean;
  image: string;
}