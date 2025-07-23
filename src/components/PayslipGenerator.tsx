import React, { useState } from 'react';
import { FileText, Download, Calendar, Building, User, IndianRupee } from 'lucide-react';
import { formatCurrency } from '../utils/currency';

export const PayslipGenerator: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState('2024-12');
  
  const payslipData = {
    employee: {
      name: 'Ishan',
      id: 'EMP001',
      designation: 'Senior Software Engineer',
      department: 'Technology',
      dateOfJoining: '2022-03-15',
      panNumber: 'ABCDE1234F',
      uanNumber: '123456789012'
    },
    company: {
      name: 'TechCorp Solutions Pvt Ltd',
      address: 'Sector 62, Noida, UP - 201301',
      pfNumber: 'DL/12345/2022'
    },
    salary: {
      basicSalary: 50000,
      hra: 20000,
      conveyanceAllowance: 1600,
      medicalAllowance: 1250,
      specialAllowance: 15000,
      performanceBonus: 10000,
      grossSalary: 97850,
      epfEmployee: 6000,
      epfEmployer: 6000,
      esi: 734,
      professionalTax: 200,
      incomeTax: 8500,
      totalDeductions: 15434,
      netSalary: 82416
    },
    payPeriod: {
      month: 'December',
      year: 2024,
      workingDays: 22,
      paidDays: 22,
      lop: 0
    }
  };

  const downloadPayslip = () => {
    // In a real app, this would generate and download a PDF
    alert('Payslip download functionality would be implemented here');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <FileText className="h-8 w-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Payslip Generator</h2>
        </div>
        <div className="flex space-x-3">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="2024-12">December 2024</option>
            <option value="2024-11">November 2024</option>
            <option value="2024-10">October 2024</option>
            <option value="2024-09">September 2024</option>
          </select>
          <button
            onClick={downloadPayslip}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* Payslip */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-white p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-bold">{payslipData.company.name}</h3>
              <p className="text-blue-100 mt-1">{payslipData.company.address}</p>
            </div>
            <div className="text-right">
              <p className="text-blue-100">Salary Slip</p>
              <p className="text-xl font-semibold">{payslipData.payPeriod.month} {payslipData.payPeriod.year}</p>
            </div>
          </div>
        </div>

        {/* Employee Details */}
        <div className="p-6 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <User className="h-5 w-5 mr-2 text-blue-600" />
                Employee Details
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-medium">{payslipData.employee.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Employee ID:</span>
                  <span className="font-medium">{payslipData.employee.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Designation:</span>
                  <span className="font-medium">{payslipData.employee.designation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Department:</span>
                  <span className="font-medium">{payslipData.employee.department}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">PAN Number:</span>
                  <span className="font-medium">{payslipData.employee.panNumber}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                Pay Period Details
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Pay Period:</span>
                  <span className="font-medium">{payslipData.payPeriod.month} {payslipData.payPeriod.year}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Working Days:</span>
                  <span className="font-medium">{payslipData.payPeriod.workingDays}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Paid Days:</span>
                  <span className="font-medium">{payslipData.payPeriod.paidDays}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">LOP Days:</span>
                  <span className="font-medium">{payslipData.payPeriod.lop}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">UAN Number:</span>
                  <span className="font-medium">{payslipData.employee.uanNumber}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Salary Breakdown */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Earnings */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                <IndianRupee className="h-5 w-5 mr-2 text-green-600" />
                Earnings
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-700">Basic Salary</span>
                  <span className="font-medium">{formatCurrency(payslipData.salary.basicSalary, 'INR')}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-700">House Rent Allowance</span>
                  <span className="font-medium">{formatCurrency(payslipData.salary.hra, 'INR')}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-700">Conveyance Allowance</span>
                  <span className="font-medium">{formatCurrency(payslipData.salary.conveyanceAllowance, 'INR')}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-700">Medical Allowance</span>
                  <span className="font-medium">{formatCurrency(payslipData.salary.medicalAllowance, 'INR')}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-700">Special Allowance</span>
                  <span className="font-medium">{formatCurrency(payslipData.salary.specialAllowance, 'INR')}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-700">Performance Bonus</span>
                  <span className="font-medium text-green-600">{formatCurrency(payslipData.salary.performanceBonus, 'INR')}</span>
                </div>
                <div className="flex justify-between py-3 bg-green-50 px-3 rounded-lg font-semibold text-green-800">
                  <span>Total Earnings</span>
                  <span>{formatCurrency(payslipData.salary.grossSalary, 'INR')}</span>
                </div>
              </div>
            </div>

            {/* Deductions */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                <IndianRupee className="h-5 w-5 mr-2 text-red-600" />
                Deductions
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-700">EPF (Employee)</span>
                  <span className="font-medium">{formatCurrency(payslipData.salary.epfEmployee, 'INR')}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-700">ESI</span>
                  <span className="font-medium">{formatCurrency(payslipData.salary.esi, 'INR')}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-700">Professional Tax</span>
                  <span className="font-medium">{formatCurrency(payslipData.salary.professionalTax, 'INR')}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-700">Income Tax (TDS)</span>
                  <span className="font-medium">{formatCurrency(payslipData.salary.incomeTax, 'INR')}</span>
                </div>
                <div className="flex justify-between py-3 bg-red-50 px-3 rounded-lg font-semibold text-red-800">
                  <span>Total Deductions</span>
                  <span>{formatCurrency(payslipData.salary.totalDeductions, 'INR')}</span>
                </div>
                
                {/* Employer Contributions */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <h5 className="font-medium text-gray-900 mb-3">Employer Contributions</h5>
                  <div className="flex justify-between py-2 text-sm">
                    <span className="text-gray-600">EPF (Employer)</span>
                    <span className="font-medium text-blue-600">{formatCurrency(payslipData.salary.epfEmployer, 'INR')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Net Salary */}
          <div className="mt-8 pt-6 border-t-2 border-gray-200">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-xl">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-blue-100 text-sm">Net Salary</p>
                  <p className="text-3xl font-bold">{formatCurrency(payslipData.salary.netSalary, 'INR')}</p>
                </div>
                <div className="text-right">
                  <p className="text-blue-100 text-sm">In Words</p>
                  <p className="text-sm font-medium">Eighty Two Thousand Four Hundred Sixteen Rupees Only</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-gray-200 text-center text-sm text-gray-600">
            <p>This is a computer-generated payslip and does not require a signature.</p>
            <p className="mt-1">For any queries, please contact HR at hr@techcorp.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};