import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types/Job';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  bookmarkJob: (jobId: string) => void;
  applyToJob: (jobId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for stored user data on app load
    const storedUser = localStorage.getItem('jobboard_user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication - in real app, this would be an API call
    if (email && password) {
      const userData: User = {
        id: '1',
        name: 'John Doe',
        email: email,
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
        bookmarkedJobs: [],
        appliedJobs: [],
        profile: {
          title: 'Software Developer',
          bio: 'Passionate developer with 5 years of experience',
          skills: ['React', 'TypeScript', 'Node.js'],
          experience: 'Mid',
          location: 'San Francisco, CA'
        }
      };
      
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('jobboard_user', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock registration - in real app, this would be an API call
    if (name && email && password) {
      const userData: User = {
        id: Date.now().toString(),
        name: name,
        email: email,
        bookmarkedJobs: [],
        appliedJobs: [],
        profile: {
          title: '',
          bio: '',
          skills: [],
          experience: 'Entry',
          location: ''
        }
      };
      
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('jobboard_user', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('jobboard_user');
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('jobboard_user', JSON.stringify(updatedUser));
    }
  };

  const bookmarkJob = (jobId: string) => {
    if (user) {
      const bookmarkedJobs = user.bookmarkedJobs.includes(jobId)
        ? user.bookmarkedJobs.filter(id => id !== jobId)
        : [...user.bookmarkedJobs, jobId];
      
      updateUser({ bookmarkedJobs });
    }
  };

  const applyToJob = (jobId: string) => {
    if (user && !user.appliedJobs.includes(jobId)) {
      const appliedJobs = [...user.appliedJobs, jobId];
      updateUser({ appliedJobs });
    }
  };

  const value = {
    user,
    isAuthenticated,
    login,
    register,
    logout,
    updateUser,
    bookmarkJob,
    applyToJob
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};