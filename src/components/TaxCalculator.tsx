import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, Percent } from 'lucide-react';

export const TaxCalculator: React.FC = () => {
  const [grossPay, setGrossPay] = useState('85000');
  const [payPeriod, setPayPeriod] = useState<'annual' | 'monthly' | 'biweekly'>('annual');
  const [filingStatus, setFilingStatus] = useState('single');
  const [state, setState] = useState('CA');
  const [taxCalculation, setTaxCalculation] = useState({
    grossPay: 0,
    federalTax: 0,
    stateTax: 0,
    socialSecurity: 0,
    medicare: 0,
    netPay: 0
  });

  useEffect(() => {
    calculateTaxes();
  }, [grossPay, payPeriod, filingStatus, state]);

  const calculateTaxes = () => {
    const gross = parseFloat(grossPay) || 0;
    let annualGross = gross;

    // Convert to annual
    if (payPeriod === 'monthly') {
      annualGross = gross * 12;
    } else if (payPeriod === 'biweekly') {
      annualGross = gross * 26;
    }

    // Simplified tax calculations (rates are approximate)
    const federalRate = annualGross <= 40525 ? 0.12 : annualGross <= 86375 ? 0.22 : 0.24;
    const stateRate = state === 'CA' ? 0.06 : state === 'NY' ? 0.065 : 0.04;
    
    const federalTax = annualGross * federalRate;
    const stateTax = annualGross * stateRate;
    const socialSecurity = Math.min(annualGross * 0.062, 9932.40); // 2024 SS wage base
    const medicare = annualGross * 0.0145;
    
    const totalDeductions = federalTax + stateTax + socialSecurity + medicare;
    const netPay = annualGross - totalDeductions;

    setTaxCalculation({
      grossPay: annualGross,
      federalTax,
      stateTax,
      socialSecurity,
      medicare,
      netPay
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getPercentage = (amount: number) => {
    return ((amount / taxCalculation.grossPay) * 100).toFixed(1);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Calculator className="h-8 w-8 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">Tax Calculator</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Income Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gross Pay
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="number"
                  value={grossPay}
                  onChange={(e) => setGrossPay(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter gross pay"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pay Period
              </label>
              <select
                value={payPeriod}
                onChange={(e) => setPayPeriod(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="annual">Annual</option>
                <option value="monthly">Monthly</option>
                <option value="biweekly">Bi-weekly</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filing Status
              </label>
              <select
                value={filingStatus}
                onChange={(e) => setFilingStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="single">Single</option>
                <option value="married-joint">Married Filing Jointly</option>
                <option value="married-separate">Married Filing Separately</option>
                <option value="head-of-household">Head of Household</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State
              </label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="CA">California</option>
                <option value="NY">New York</option>
                <option value="TX">Texas</option>
                <option value="FL">Florida</option>
                <option value="WA">Washington</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tax Breakdown</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
              <span className="font-medium text-blue-900">Gross Pay (Annual)</span>
              <span className="font-bold text-blue-900">{formatCurrency(taxCalculation.grossPay)}</span>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-700">Federal Tax</span>
                  <span className="text-xs text-gray-500">({getPercentage(taxCalculation.federalTax)}%)</span>
                </div>
                <span className="text-red-600">-{formatCurrency(taxCalculation.federalTax)}</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-700">State Tax</span>
                  <span className="text-xs text-gray-500">({getPercentage(taxCalculation.stateTax)}%)</span>
                </div>
                <span className="text-red-600">-{formatCurrency(taxCalculation.stateTax)}</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-700">Social Security</span>
                  <span className="text-xs text-gray-500">({getPercentage(taxCalculation.socialSecurity)}%)</span>
                </div>
                <span className="text-red-600">-{formatCurrency(taxCalculation.socialSecurity)}</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-700">Medicare</span>
                  <span className="text-xs text-gray-500">({getPercentage(taxCalculation.medicare)}%)</span>
                </div>
                <span className="text-red-600">-{formatCurrency(taxCalculation.medicare)}</span>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                <span className="font-bold text-green-900">Net Pay (Annual)</span>
                <span className="font-bold text-green-900 text-xl">{formatCurrency(taxCalculation.netPay)}</span>
              </div>
            </div>

            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Monthly Take-Home</h4>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(taxCalculation.netPay / 12)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};