import React, { useState } from 'react';
import { Plus, Edit3, Trash2, Calendar } from 'lucide-react';

export const SalaryTracker: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    baseSalary: '',
    bonuses: '',
    overtime: '',
    benefits: '',
    period: 'monthly' as 'monthly' | 'yearly',
    date: new Date().toISOString().split('T')[0]
  });

  const salaryEntries = [
    {
      id: '1',
      baseSalary: 7083,
      bonuses: 500,
      overtime: 0,
      benefits: 577,
      period: 'monthly' as const,
      date: '2024-12-01'
    },
    {
      id: '2',
      baseSalary: 7083,
      bonuses: 0,
      overtime: 200,
      benefits: 577,
      period: 'monthly' as const,
      date: '2024-11-01'
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    setShowForm(false);
    setFormData({
      baseSalary: '',
      bonuses: '',
      overtime: '',
      benefits: '',
      period: 'monthly',
      date: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Salary Tracker</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Entry</span>
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Salary Entry</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Salary History</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Base Salary</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Bonuses</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Overtime</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Benefits</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Total</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {salaryEntries.map((entry) => {
                  const total = entry.baseSalary + entry.bonuses + entry.overtime + entry.benefits;
                  return (
                    <tr key={entry.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span>{new Date(entry.date).toLocaleDateString()}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-medium">${entry.baseSalary.toLocaleString()}</td>
                      <td className="py-3 px-4">${entry.bonuses.toLocaleString()}</td>
                      <td className="py-3 px-4">${entry.overtime.toLocaleString()}</td>
                      <td className="py-3 px-4">${entry.benefits.toLocaleString()}</td>
                      <td className="py-3 px-4 font-bold text-green-600">${total.toLocaleString()}</td>
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