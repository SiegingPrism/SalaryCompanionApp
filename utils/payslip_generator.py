def generate_payslip_data(month_year):
    """Generate payslip data for given month"""
    
    # Sample payslip data
    payslip_data = {
        'employee': {
            'name': 'Ishan',
            'id': 'EMP001',
            'designation': 'Senior Software Engineer',
            'department': 'Technology',
            'pan_number': 'ABCDE1234F',
            'uan_number': '123456789012'
        },
        'company': {
            'name': 'TechCorp Solutions Pvt Ltd',
            'address': 'Sector 62, Noida, UP - 201301'
        },
        'salary': {
            'basic_salary': 50000,
            'hra': 20000,
            'conveyance_allowance': 1600,
            'medical_allowance': 1250,
            'special_allowance': 15000,
            'performance_bonus': 10000 if 'December' in month_year else 0,
            'epf_employee': 6000,
            'esi': 734,
            'professional_tax': 200,
            'income_tax': 8500
        },
        'pay_period': {
            'month_year': month_year,
            'working_days': 22,
            'paid_days': 22,
            'lop': 0
        }
    }
    
    # Calculate totals
    earnings = (payslip_data['salary']['basic_salary'] + 
               payslip_data['salary']['hra'] + 
               payslip_data['salary']['conveyance_allowance'] + 
               payslip_data['salary']['medical_allowance'] + 
               payslip_data['salary']['special_allowance'] + 
               payslip_data['salary']['performance_bonus'])
    
    deductions = (payslip_data['salary']['epf_employee'] + 
                 payslip_data['salary']['esi'] + 
                 payslip_data['salary']['professional_tax'] + 
                 payslip_data['salary']['income_tax'])
    
    payslip_data['salary']['gross_salary'] = earnings
    payslip_data['salary']['total_deductions'] = deductions
    payslip_data['salary']['net_salary'] = earnings - deductions
    
    return payslip_data