import React from 'react';
import { DollarSign, TrendingUp, Calendar, Target, IndianRupee, PiggyBank, Award } from 'lucide-react';
import { formatCurrency } from '../utils/currency';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  color: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, icon, color }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        <p className={`text-sm mt-1 ${color}`}>{change}</p>
      </div>
      <div className={`p-3 rounded-full ${color.includes('green') ? 'bg-green-100' : 'bg-blue-100'}`}>
        {icon}
      </div>
    </div>
  </div>
);

export const Dashboard: React.FC = () => {
  const currentSalary = 1200000; // ₹12 LPA
  const monthlyTakeHome = 85000;
  const annualTakeHome = monthlyTakeHome * 12;
  
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Welcome back, Rahul!</h2>
            <p className="text-blue-100 text-lg">Here's your salary overview for December 2024</p>
          </div>
          <div className="text-right">
            <p className="text-blue-100 text-sm">Current CTC</p>
            <p className="text-4xl font-bold">{formatCurrency(currentSalary, 'INR')}</p>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Annual CTC"
          value={formatCurrency(currentSalary, 'INR')}
          change="+8% from last year"
          icon={<IndianRupee className="h-6 w-6 text-green-600" />}
          color="text-green-600"
        />
        <MetricCard
          title="Monthly Take-Home"
          value={formatCurrency(monthlyTakeHome, 'INR')}
          change="After tax & deductions"
          icon={<TrendingUp className="h-6 w-6 text-blue-600" />}
          color="text-blue-600"
        />
        <MetricCard
          title="Tax Saved"
          value={formatCurrency(150000, 'INR')}
          change="Under 80C & other sections"
          icon={<PiggyBank className="h-6 w-6 text-purple-600" />}
          color="text-purple-600"
        />
        <MetricCard
          title="Performance Bonus"
          value={formatCurrency(50000, 'INR')}
          change="Q4 2024 achievement"
          icon={<Award className="h-6 w-6 text-orange-600" />}
          color="text-orange-600"
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Payslips</h3>
          <div className="space-y-4">
            {[
              { period: 'December 2024', gross: formatCurrency(100000, 'INR'), net: formatCurrency(85000, 'INR'), bonus: formatCurrency(10000, 'INR') },
              { period: 'November 2024', gross: formatCurrency(100000, 'INR'), net: formatCurrency(85000, 'INR'), bonus: formatCurrency(0, 'INR') },
              { period: 'October 2024', gross: formatCurrency(100000, 'INR'), net: formatCurrency(85000, 'INR'), bonus: formatCurrency(5000, 'INR') },
            ].map((pay, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div>
                  <p className="font-medium text-gray-900">{pay.period}</p>
                  <p className="text-sm text-gray-600">Gross: {pay.gross}</p>
                  {pay.bonus !== formatCurrency(0, 'INR') && (
                    <p className="text-sm text-green-600">Bonus: {pay.bonus}</p>
                  )}
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">{pay.net}</p>
                  <p className="text-xs text-gray-500">Net Pay</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Benefits & Deductions</h3>
          <div className="space-y-4">
            {[
              { name: 'EPF Contribution', value: formatCurrency(1800, 'INR') + '/month', status: 'Active', type: 'deduction' },
              { name: 'Health Insurance', value: formatCurrency(5000, 'INR') + '/month', status: 'Active', type: 'benefit' },
              { name: 'Meal Allowance', value: formatCurrency(2000, 'INR') + '/month', status: 'Active', type: 'benefit' },
              { name: 'Professional Tax', value: formatCurrency(200, 'INR') + '/month', status: 'Active', type: 'deduction' },
            ].map((benefit, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div>
                  <p className="font-medium text-gray-900">{benefit.name}</p>
                  <p className="text-sm text-gray-600">{benefit.value}</p>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                    benefit.type === 'benefit' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {benefit.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};