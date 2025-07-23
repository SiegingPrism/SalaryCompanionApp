from datetime import datetime
from .currency_formatter import CurrencyFormatter

class PayslipGenerator:
    def __init__(self):
        self.employee_data = {
            'name': 'Ishan',
            'id': 'EMP001',
            'designation': 'Senior Software Engineer',
            'department': 'Technology',
            'date_of_joining': '2022-03-15',
            'pan_number': 'ABCDE1234F',
            'uan_number': '123456789012'
        }
        
        self.company_data = {
            'name': 'TechCorp Solutions Pvt Ltd',
            'address': 'Sector 62, Noida, UP - 201301',
            'pf_number': 'DL/12345/2022'
        }
    
    def generate_payslip(self, month_year):
        """Generate payslip data for given month"""
        try:
            month, year = month_year.split('-')
            month_name = datetime.strptime(month, '%m').strftime('%B')
        except:
            month_name = 'December'
            year = '2024'
        
        salary_data = {
            'basic_salary': 50000,
            'hra': 20000,
            'conveyance_allowance': 1600,
            'medical_allowance': 1250,
            'special_allowance': 15000,
            'performance_bonus': 10000 if month_name == 'December' else 0,
            'epf_employee': 6000,
            'epf_employer': 6000,
            'esi': 734,
            'professional_tax': 200,
            'income_tax': 8500
        }
        
        # Calculate totals
        gross_salary = (salary_data['basic_salary'] + salary_data['hra'] + 
                       salary_data['conveyance_allowance'] + salary_data['medical_allowance'] + 
                       salary_data['special_allowance'] + salary_data['performance_bonus'])
        
        total_deductions = (salary_data['epf_employee'] + salary_data['esi'] + 
                           salary_data['professional_tax'] + salary_data['income_tax'])
        
        net_salary = gross_salary - total_deductions
        
        payslip_data = {
            'employee': self.employee_data,
            'company': self.company_data,
            'salary': {
                **salary_data,
                'gross_salary': gross_salary,
                'total_deductions': total_deductions,
                'net_salary': net_salary
            },
            'pay_period': {
                'month': month_name,
                'year': int(year),
                'working_days': 22,
                'paid_days': 22,
                'lop': 0
            }
        }
        
        return payslip_data