import { IndianTaxCalculation } from '../types';

export const calculateIndianTax = (
  annualSalary: number,
  age: number = 30,
  hasHRA: boolean = true,
  hraAmount: number = 0,
  cityType: 'metro' | 'non-metro' = 'metro'
): IndianTaxCalculation => {
  // Standard deduction
  const standardDeduction = Math.min(50000, annualSalary);
  
  // HRA exemption calculation
  let hraExemption = 0;
  if (hasHRA && hraAmount > 0) {
    const basicSalary = annualSalary * 0.5; // Assuming basic is 50% of gross
    const hraReceived = hraAmount * 12;
    const rentPaid = hraReceived * 1.2; // Assuming rent is 120% of HRA
    
    const hraExemptionOptions = [
      hraReceived,
      rentPaid - (basicSalary * 0.1),
      cityType === 'metro' ? basicSalary * 0.5 : basicSalary * 0.4
    ];
    
    hraExemption = Math.min(...hraExemptionOptions.filter(val => val > 0));
  }
  
  // Taxable income after deductions
  const taxableIncome = Math.max(0, annualSalary - standardDeduction - hraExemption);
  
  // Income tax calculation based on new tax regime (2023-24)
  let incomeTax = 0;
  let taxSlab = '';
  
  if (taxableIncome <= 300000) {
    incomeTax = 0;
    taxSlab = 'No Tax (Up to ₹3L)';
  } else if (taxableIncome <= 600000) {
    incomeTax = (taxableIncome - 300000) * 0.05;
    taxSlab = '5% (₹3L - ₹6L)';
  } else if (taxableIncome <= 900000) {
    incomeTax = 15000 + (taxableIncome - 600000) * 0.10;
    taxSlab = '10% (₹6L - ₹9L)';
  } else if (taxableIncome <= 1200000) {
    incomeTax = 45000 + (taxableIncome - 900000) * 0.15;
    taxSlab = '15% (₹9L - ₹12L)';
  } else if (taxableIncome <= 1500000) {
    incomeTax = 90000 + (taxableIncome - 1200000) * 0.20;
    taxSlab = '20% (₹12L - ₹15L)';
  } else {
    incomeTax = 150000 + (taxableIncome - 1500000) * 0.30;
    taxSlab = '30% (Above ₹15L)';
  }
  
  // Health and Education Cess (4% of income tax)
  const cess = incomeTax * 0.04;
  
  // EPF calculation (12% of basic salary, max ₹1800 per month)
  const basicSalary = annualSalary * 0.4; // Assuming basic is 40% of gross
  const monthlyBasic = basicSalary / 12;
  const epfContribution = Math.min(monthlyBasic * 0.12, 1800) * 12;
  
  // ESI calculation (0.75% of gross salary if salary <= ₹21,000 per month)
  const monthlySalary = annualSalary / 12;
  const esiContribution = monthlySalary <= 21000 ? annualSalary * 0.0075 : 0;
  
  // Professional Tax (varies by state, assuming ₹2400 per year)
  const professionalTax = Math.min(2400, annualSalary * 0.005);
  
  const totalDeductions = incomeTax + cess + epfContribution + esiContribution + professionalTax;
  const netPay = annualSalary - totalDeductions;
  
  return {
    grossPay: annualSalary,
    incomeTax,
    cess,
    epf: epfContribution,
    esi: esiContribution,
    professionalTax,
    totalDeductions,
    netPay,
    taxSlab
  };
};