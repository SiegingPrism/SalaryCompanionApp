import React, { useState } from 'react';
import { Plus, Edit3, Trash2, Calendar, IndianRupee, Download, Filter } from 'lucide-react';
import { formatCurrency } from '../utils/currency';

export const SalaryTracker: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    baseSalary: '',
    hra: '',
    allowances: '',
    bonuses: '',
    overtime: '',
    benefits: '',
    period: 'monthly' as 'monthly' | 'yearly',
    date: new Date().toISOString().split('T')[0],
    currency: 'INR' as 'INR' | 'USD'
  });

  const salaryEntries = [
    {
      id: '1',
      baseSalary: 50000,
      hra: 20000,
      allowances: 15000,
      bonuses: 10000,
      overtime: 0,
      benefits: 5000,
      period: 'monthly' as const,
      date: '2024-12-01',
      currency: 'INR' as const
    },
    {
      id: '2',
      baseSalary: 50000,
      hra: 20000,
      allowances: 15000,
      bonuses: 0,
      overtime: 5000,
      benefits: 5000,
      period: 'monthly' as const,
      date: '2024-11-01',
      currency: 'INR' as const
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    setShowForm(false);
    setFormData({
      baseSalary: '',
      hra: '',
      allowances: '',
      bonuses: '',
      overtime: '',
      benefits: '',
      period: 'monthly',
      date: new Date().toISOString().split('T')[0],
      currency: 'INR'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <IndianRupee className="h-8 w-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Salary Tracker</h2>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </button>
          <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Add Entry</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl text-white p-6">
          <h3 className="text-sm font-medium text-blue-100">Average Monthly</h3>
          <p className="text-2xl font-bold">{formatCurrency(95000, 'INR')}</p>
          <p className="text-sm text-blue-100">+5% from last quarter</p>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl text-white p-6">
          <h3 className="text-sm font-medium text-green-100">Highest Month</h3>
          <p className="text-2xl font-bold">{formatCurrency(110000, 'INR')}</p>
          <p className="text-sm text-green-100">December 2024</p>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl text-white p-6">
          <h3 className="text-sm font-medium text-purple-100">Total Bonuses</h3>
          <p className="text-2xl font-bold">{formatCurrency(50000, 'INR')}</p>
          <p className="text-sm text-purple-100">This year</p>
        </div>
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl text-white p-6">
          <h3 className="text-sm font-medium text-orange-100">Annual Growth</h3>
          <p className="text-2xl font-bold">12%</p>
          <p className="text-sm text-orange-100">Year over year</p>
        </div>
      </div>
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Salary Entry</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Base Salary
              </label>
              <input
                type="number"
                value={formData.baseSalary}
                onChange={(e) => setFormData({ ...formData, baseSalary: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter base salary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                HRA
              </label>
              <input
                type="number"
                value={formData.hra}
                onChange={(e) => setFormData({ ...formData, hra: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter HRA amount"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Other Allowances
              </label>
              <input
                type="number"
                value={formData.allowances}
                onChange={(e) => setFormData({ ...formData, allowances: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter allowances"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bonuses
              </label>
              <input
                type="number"
                value={formData.bonuses}
                onChange={(e) => setFormData({ ...formData, bonuses: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter bonuses"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Overtime
              </label>
              <input
                type="number"
                value={formData.overtime}
                onChange={(e) => setFormData({ ...formData, overtime: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter overtime pay"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Benefits Value
              </label>
              <input
                type="number"
                value={formData.benefits}
                onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter benefits value"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Currency
              </label>
              <select
                value={formData.currency}
                onChange={(e) => setFormData({ ...formData, currency: e.target.value as 'INR' | 'USD' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="INR">Indian Rupee (₹)</option>
                <option value="USD">US Dollar ($)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Period
              </label>
              <select
                value={formData.period}
                onChange={(e) => setFormData({ ...formData, period: e.target.value as 'monthly' | 'yearly' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="md:col-span-3 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Entry
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Detailed Salary History</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>Showing {salaryEntries.length} entries</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Base Salary</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">HRA</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Allowances</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Bonuses</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Overtime</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Benefits</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Gross Total</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {salaryEntries.map((entry) => {
                  const total = entry.baseSalary + (entry.hra || 0) + (entry.allowances || 0) + entry.bonuses + entry.overtime + entry.benefits;
                  return (
                    <tr key={entry.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span>{new Date(entry.date).toLocaleDateString()}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-medium">{formatCurrency(entry.baseSalary, entry.currency)}</td>
                      <td className="py-3 px-4">{formatCurrency(entry.hra || 0, entry.currency)}</td>
                      <td className="py-3 px-4">{formatCurrency(entry.allowances || 0, entry.currency)}</td>
                      <td className="py-3 px-4">{formatCurrency(entry.bonuses, entry.currency)}</td>
                      <td className="py-3 px-4">{formatCurrency(entry.overtime, entry.currency)}</td>
                      <td className="py-3 px-4">{formatCurrency(entry.benefits, entry.currency)}</td>
                      <td className="py-3 px-4 font-bold text-green-600">{formatCurrency(total, entry.currency)}</td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button className="p-1 text-blue-600 hover:bg-blue-100 rounded">
                            <Edit3 className="h-4 w-4" />
                          </button>
                          <button className="p-1 text-red-600 hover:bg-red-100 rounded">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};