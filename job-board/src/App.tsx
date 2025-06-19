import React, { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import FeaturedCompanies from './components/FeaturedCompanies';
import JobsPage from './pages/JobsPage';
import CompaniesPage from './pages/CompaniesPage';
import SalaryGuidePage from './pages/SalaryGuidePage';
import CareerAdvicePage from './pages/CareerAdvicePage';

function App() {
  const [currentPage, setCurrentPage] = useState('jobs');

  const renderPage = () => {
    switch (currentPage) {
      case 'jobs':
        return (
          <>
            <JobsPage />
            <FeaturedCompanies />
          </>
        );
      case 'companies':
        return <CompaniesPage />;
      case 'salary-guide':
        return <SalaryGuidePage />;
      case 'career-advice':
        return <CareerAdvicePage />;
      default:
        return (
          <>
            <JobsPage />
            <FeaturedCompanies />
          </>
        );
    }
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Header currentPage={currentPage} onNavigate={setCurrentPage} />
        {renderPage()}
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;