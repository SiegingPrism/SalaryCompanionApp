export interface SalaryData {
  id: string;
  baseSalary: number;
  hra: number;
  allowances: number;
  bonuses: number;
  overtime: number;
  benefits: number;
  period: 'monthly' | 'yearly';
  date: string;
  currency: 'INR' | 'USD';
}

export interface IndianTaxCalculation {
  grossPay: number;
  incomeTax: number;
  cess: number;
  epf: number;
  esi: number;
  professionalTax: number;
  totalDeductions: number;
  netPay: number;
  taxSlab: string;
}

export interface TaxCalculation {
  grossPay: number;
  federalTax: number;
  stateTax: number;
  socialSecurity: number;
  medicare: number;
  netPay: number;
}

export interface BenefitItem {
  id: string;
  name: string;
  employerContribution: number;
  employeeContribution: number;
  type: 'health' | 'retirement' | 'insurance' | 'other';
}

export interface GoalItem {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  status: 'pending' | 'in-progress' | 'completed';
  currency: 'INR' | 'USD';
}

export interface BudgetCategory {
  id: string;
  name: string;
  allocated: number;
  spent: number;
  color: string;
  currency: 'INR' | 'USD';
}

export interface PaySlip {
  id: string;
  month: string;
  year: number;
  basicSalary: number;
  hra: number;
  allowances: number;
  grossSalary: number;
  epf: number;
  esi: number;
  incomeTax: number;
  professionalTax: number;
  totalDeductions: number;
  netSalary: number;
  currency: 'INR' | 'USD';
}

export interface CompanyBenefit {
  id: string;
  name: string;
  description: string;
  value: number;
  type: 'monetary' | 'non-monetary';
  category: 'health' | 'transport' | 'food' | 'insurance' | 'leave' | 'other';
}