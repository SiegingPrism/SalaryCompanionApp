import React from 'react';
import { 
  BarChart3, 
  Calculator, 
  Target, 
  PieChart, 
  TrendingUp, 
  FileText,
  Home
} from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'salary', label: 'Salary Tracker', icon: BarChart3 },
    { id: 'calculator', label: 'Tax Calculator', icon: Calculator },
    { id: 'benefits', label: 'Benefits', icon: PieChart },
    { id: 'goals', label: 'Goals', icon: Target },
    { id: 'budget', label: 'Budget', icon: TrendingUp },
    { id: 'reports', label: 'Reports', icon: FileText },
  ];

  return (
    <nav className="bg-white rounded-lg shadow-sm border border-gray-200 p-2 mb-8">
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};