import React from 'react';
import { DollarSign, TrendingUp, Calendar, Target } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  color: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, icon, color }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
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
  return (
    <div className="space-y-8">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Annual Salary"
          value="$85,000"
          change="+5% from last year"
          icon={<DollarSign className="h-6 w-6 text-green-600" />}
          color="text-green-600"
        />
        <MetricCard
          title="Monthly Take-Home"
          value="$5,240"
          change="After taxes & benefits"
          icon={<TrendingUp className="h-6 w-6 text-blue-600" />}
          color="text-blue-600"
        />
        <MetricCard
          title="Next Review"
          value="3 months"
          change="Performance review due"
          icon={<Calendar className="h-6 w-6 text-purple-600" />}
          color="text-purple-600"
        />
        <MetricCard
          title="Salary Goal"
          value="$95,000"
          change="89% progress"
          icon={<Target className="h-6 w-6 text-orange-600" />}
          color="text-orange-600"
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Pay Periods</h3>
          <div className="space-y-4">
            {[
              { period: 'December 2024', gross: '$7,083', net: '$5,240' },
              { period: 'November 2024', gross: '$7,083', net: '$5,240' },
              { period: 'October 2024', gross: '$7,083', net: '$5,240' },
            ].map((pay, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{pay.period}</p>
                  <p className="text-sm text-gray-600">Gross: {pay.gross}</p>
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
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Benefits Overview</h3>
          <div className="space-y-4">
            {[
              { name: '401(k) Match', value: '$212/month', status: 'Active' },
              { name: 'Health Insurance', value: '$340/month', status: 'Active' },
              { name: 'Life Insurance', value: '$25/month', status: 'Active' },
            ].map((benefit, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{benefit.name}</p>
                  <p className="text-sm text-gray-600">{benefit.value}</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                  {benefit.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};