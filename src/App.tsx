import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { SalaryTracker } from './components/SalaryTracker';
import { TaxCalculator } from './components/TaxCalculator';
import { Goals } from './components/Goals';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'salary':
        return <SalaryTracker />;
      case 'calculator':
        return <TaxCalculator />;
      case 'benefits':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Benefits Tracker</h2>
            <p className="text-gray-600">Track your health insurance, 401(k), and other benefits here.</p>
          </div>
        );
      case 'goals':
        return <Goals />;
      case 'budget':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Budget Planner</h2>
            <p className="text-gray-600">Plan and track your budget based on your salary data.</p>
          </div>
        );
      case 'reports':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Reports & Analytics</h2>
            <p className="text-gray-600">Generate comprehensive reports on your salary and career progress.</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout>
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      {renderContent()}
    </Layout>
  );
}

export default App;