import React, { useState } from 'react';
import { Target, Plus, CheckCircle, Clock, AlertCircle, IndianRupee, TrendingUp } from 'lucide-react';
import { formatCurrency } from '../utils/currency';

export const Goals: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    targetAmount: '',
    currentAmount: '',
    deadline: '',
    currency: 'INR' as 'INR' | 'USD'
  });

  const goals = [
    {
      id: '1',
      title: 'Reach ₹15 LPA Salary',
      targetAmount: 1500000,
      currentAmount: 1200000,
      deadline: '2025-06-01',
      status: 'in-progress' as const,
      currency: 'INR' as const
    },
    {
      id: '2',
      title: 'Emergency Fund',
      targetAmount: 500000,
      currentAmount: 350000,
      deadline: '2025-12-31',
      status: 'in-progress' as const,
      currency: 'INR' as const
    },
    {
      id: '3',
      title: 'AWS Certification',
      targetAmount: 50000,
      currentAmount: 50000,
      deadline: '2024-11-30',
      status: 'completed' as const,
      currency: 'INR' as const
    },
    {
      id: '4',
      title: 'Home Down Payment',
      targetAmount: 2000000,
      currentAmount: 800000,
      deadline: '2026-03-31',
      status: 'in-progress' as const,
      currency: 'INR' as const
    }
  ];

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-blue-600" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    setShowForm(false);
    setFormData({
      title: '',
      targetAmount: '',
      currentAmount: '',
      deadline: '',
      currency: 'INR'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Target className="h-8 w-8 text-indigo-600" />
          <h2 className="text-2xl font-bold text-gray-900">Financial & Career Goals</h2>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Goal</span>
        </button>
      </div>

      {/* Goals Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Completed Goals</p>
              <p className="text-2xl font-bold">1</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-200" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">In Progress</p>
              <p className="text-2xl font-bold">3</p>
            </div>
            <Clock className="h-8 w-8 text-blue-200" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Total Target</p>
              <p className="text-2xl font-bold">{formatCurrency(4050000, 'INR')}</p>
            </div>
            <Target className="h-8 w-8 text-purple-200" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Achieved</p>
              <p className="text-2xl font-bold">{formatCurrency(2400000, 'INR')}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-orange-200" />
          </div>
        </div>
      </div>
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Goal</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Goal Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter goal title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Currency
              </label>
              <select
                value={formData.currency}
                onChange={(e) => setFormData({ ...formData, currency: e.target.value as 'INR' | 'USD' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="INR">Indian Rupee (₹)</option>
                <option value="USD">US Dollar ($)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Amount
              </label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="number"
                  value={formData.targetAmount}
                  onChange={(e) => setFormData({ ...formData, targetAmount: e.target.value })}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Target amount"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Amount
              </label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="number"
                  value={formData.currentAmount}
                  onChange={(e) => setFormData({ ...formData, currentAmount: e.target.value })}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Current amount"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Date
              </label>
              <input
                type="date"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div className="md:col-span-2 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Save Goal
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6">
        {goals.map((goal) => {
          const progress = getProgressPercentage(goal.currentAmount, goal.targetAmount);
          const isOverdue = new Date(goal.deadline) < new Date() && goal.status !== 'completed';
          const remainingAmount = goal.targetAmount - goal.currentAmount;
          const monthsRemaining = Math.ceil((new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24 * 30));
          const monthlyTarget = remainingAmount > 0 ? remainingAmount / Math.max(monthsRemaining, 1) : 0;
          
          return (
            <div key={goal.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{goal.title}</h3>
                  <p className="text-sm text-gray-600">
                    Due: {new Date(goal.deadline).toLocaleDateString()}
                    {isOverdue && <span className="text-red-600 ml-2">(Overdue)</span>}
                  </p>
                  {goal.status !== 'completed' && monthlyTarget > 0 && (
                    <p className="text-xs text-blue-600 mt-1">
                      Save {formatCurrency(monthlyTarget, goal.currency)}/month to achieve goal
                    </p>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(goal.status)}
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(goal.status)}`}>
                    {goal.status.replace('-', ' ')}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium">{progress.toFixed(1)}%</span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      goal.status === 'completed'
                        ? 'bg-green-600'
                        : progress >= 75
                        ? 'bg-indigo-600'
                        : progress >= 50
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {formatCurrency(goal.currentAmount, goal.currency)} / {formatCurrency(goal.targetAmount, goal.currency)}
                  </span>
                  <span className={`${goal.status === 'completed' ? 'text-green-600' : 'text-gray-600'}`}>
                    {goal.status === 'completed' 
                      ? 'Completed!' 
                      : `${formatCurrency(remainingAmount, goal.currency)} remaining`
                    }
                  </span>
                </div>

                {goal.status !== 'completed' && (
                  <div className="mt-4 pt-3 border-t border-gray-100">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">Time remaining</span>
                      <span className="text-xs font-medium text-gray-700">
                        {monthsRemaining > 0 ? `${monthsRemaining} months` : 'Overdue'}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};