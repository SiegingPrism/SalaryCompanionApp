import React, { useState, useEffect } from 'react';
import { Calculator, IndianRupee, Percent, FileText, Download } from 'lucide-react';
import { formatCurrency } from '../utils/currency';
import { calculateIndianTax } from '../utils/indianTaxCalculator';

export const TaxCalculator: React.FC = () => {
  const [grossPay, setGrossPay] = useState('1200000');
  const [payPeriod, setPayPeriod] = useState<'annual' | 'monthly'>('annual');
  const [age, setAge] = useState('30');
  const [hasHRA, setHasHRA] = useState(true);
  const [hraAmount, setHraAmount] = useState('20000');
  const [cityType, setCityType] = useState<'metro' | 'non-metro'>('metro');
  const [taxRegime, setTaxRegime] = useState<'old' | 'new'>('new');
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
  const [indianTaxCalculation, setIndianTaxCalculation] = useState({
    grossPay: 0,
    incomeTax: 0,
    cess: 0,
    epf: 0,
    esi: 0,
    professionalTax: 0,
    totalDeductions: 0,
    netPay: 0,
    taxSlab: ''
  });

  useEffect(() => {
    if (currency === 'INR') {
      calculateIndianTaxes();
    }
  }, [grossPay, payPeriod, age, hasHRA, hraAmount, cityType, taxRegime, currency]);

  const calculateIndianTaxes = () => {
    const gross = parseFloat(grossPay) || 0;
    let annualGross = gross;

    if (payPeriod === 'monthly') {
      annualGross = gross * 12;
    }

    const calculation = calculateIndianTax(
      annualGross,
      parseInt(age),
      hasHRA,
      parseFloat(hraAmount) || 0,
      cityType
    );

    setIndianTaxCalculation(calculation);
  };

  const getPercentage = (amount: number) => {
    return ((amount / indianTaxCalculation.grossPay) * 100).toFixed(1);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Calculator className="h-8 w-8 text-green-600" />
        <h2 className="text-2xl font-bold text-gray-900">Indian Tax Calculator</h2>
        <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
          FY 2024-25
        </span>
      </div>

      {/* Tax Regime Selection */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Tax Regime</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div 
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
              taxRegime === 'new' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setTaxRegime('new')}
          >
            <div className="flex items-center space-x-3">
              <input 
                type="radio" 
                checked={taxRegime === 'new'} 
                onChange={() => setTaxRegime('new')}
                className="text-green-600"
              />
              <div>
                <h4 className="font-semibold text-gray-900">New Tax Regime</h4>
                <p className="text-sm text-gray-600">Lower tax rates, limited deductions</p>
              </div>
            </div>
          </div>
          <div 
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
              taxRegime === 'old' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setTaxRegime('old')}
          >
            <div className="flex items-center space-x-3">
              <input 
                type="radio" 
                checked={taxRegime === 'old'} 
                onChange={() => setTaxRegime('old')}
                className="text-green-600"
              />
              <div>
                <h4 className="font-semibold text-gray-900">Old Tax Regime</h4>
                <p className="text-sm text-gray-600">Higher rates, more deductions available</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Salary & Personal Details</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Currency
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as 'INR' | 'USD')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="INR">Indian Rupee (₹)</option>
                <option value="USD">US Dollar ($)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Annual Gross Salary
              </label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="number"
                  value={grossPay}
                  onChange={(e) => setGrossPay(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter annual gross salary"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter your age"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City Type
              </label>
              <select
                value={cityType}
                onChange={(e) => setCityType(e.target.value as 'metro' | 'non-metro')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="metro">Metro City</option>
                <option value="non-metro">Non-Metro City</option>
              </select>
            </div>

            <div>
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="hasHRA"
                  checked={hasHRA}
                  onChange={(e) => setHasHRA(e.target.checked)}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <label htmlFor="hasHRA" className="text-sm font-medium text-gray-700">
                  I receive HRA
                </label>
              </div>
            </div>

            {hasHRA && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly HRA Amount
                </label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="number"
                    value={hraAmount}
                    onChange={(e) => setHraAmount(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter monthly HRA"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Tax Breakdown</h3>
            <div className="flex space-x-2">
              <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
                <FileText className="h-4 w-4" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
                <Download className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
              <span className="font-medium text-green-900">Annual Gross Salary</span>
              <span className="font-bold text-green-900">{formatCurrency(indianTaxCalculation.grossPay, currency)}</span>
            </div>

            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-blue-900">Tax Slab</span>
                <span className="text-sm text-blue-700">{indianTaxCalculation.taxSlab}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-700">Income Tax</span>
                  <span className="text-xs text-gray-500">({getPercentage(indianTaxCalculation.incomeTax)}%)</span>
                </div>
                <span className="text-red-600">-{formatCurrency(indianTaxCalculation.incomeTax, currency)}</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-700">Health & Education Cess</span>
                  <span className="text-xs text-gray-500">({getPercentage(indianTaxCalculation.cess)}%)</span>
                </div>
                <span className="text-red-600">-{formatCurrency(indianTaxCalculation.cess, currency)}</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-700">EPF Contribution</span>
                  <span className="text-xs text-gray-500">({getPercentage(indianTaxCalculation.epf)}%)</span>
                </div>
                <span className="text-red-600">-{formatCurrency(indianTaxCalculation.epf, currency)}</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-700">ESI Contribution</span>
                  <span className="text-xs text-gray-500">({getPercentage(indianTaxCalculation.esi)}%)</span>
                </div>
                <span className="text-red-600">-{formatCurrency(indianTaxCalculation.esi, currency)}</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-700">Professional Tax</span>
                  <span className="text-xs text-gray-500">({getPercentage(indianTaxCalculation.professionalTax)}%)</span>
                </div>
                <span className="text-red-600">-{formatCurrency(indianTaxCalculation.professionalTax, currency)}</span>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                <span className="font-bold text-green-900">Annual Take-Home</span>
                <span className="font-bold text-green-900 text-xl">{formatCurrency(indianTaxCalculation.netPay, currency)}</span>
              </div>
            </div>

            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Monthly Take-Home</h4>
                  <p className="text-xl font-bold text-gray-900">{formatCurrency(indianTaxCalculation.netPay / 12, currency)}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Effective Tax Rate</h4>
                  <p className="text-xl font-bold text-red-600">{getPercentage(indianTaxCalculation.totalDeductions)}%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tax Saving Tips */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Tax Saving Opportunities</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Section 80C</h4>
            <p className="text-sm text-blue-700">Save up to ₹46,800 by investing ₹1.5L in EPF, ELSS, PPF, etc.</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-semibold text-green-900 mb-2">Section 80D</h4>
            <p className="text-sm text-green-700">Health insurance premium deduction up to ₹25,000</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <h4 className="font-semibold text-purple-900 mb-2">HRA Exemption</h4>
            <p className="text-sm text-purple-700">Optimize your HRA to reduce taxable income</p>
          </div>
        </div>
      </div>
    </div>
  );
};