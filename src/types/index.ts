export interface SalaryData {
  id: string;
  baseSalary: number;
  bonuses: number;
  overtime: number;
  benefits: number;
  period: 'monthly' | 'yearly';
  date: string;
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
}

export interface BudgetCategory {
  id: string;
  name: string;
  allocated: number;
  spent: number;
  color: string;
}