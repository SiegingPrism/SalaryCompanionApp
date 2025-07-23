class IndianTaxCalculator:
    def __init__(self):
        self.standard_deduction = 50000
        self.new_tax_slabs = [
            (300000, 0),      # Up to 3L - 0%
            (600000, 0.05),   # 3L to 6L - 5%
            (900000, 0.10),   # 6L to 9L - 10%
            (1200000, 0.15),  # 9L to 12L - 15%
            (1500000, 0.20),  # 12L to 15L - 20%
            (float('inf'), 0.30)  # Above 15L - 30%
        ]
    
    def calculate_tax(self, annual_salary, age=30, has_hra=True, hra_amount=0, city_type="metro"):
        # Calculate HRA exemption
        hra_exemption = 0
        if has_hra and hra_amount > 0:
            basic_salary = annual_salary * 0.5  # Assuming basic is 50% of gross
            hra_received = hra_amount * 12
            rent_paid = hra_received * 1.2  # Assuming rent is 120% of HRA
            
            hra_exemption_options = [
                hra_received,
                rent_paid - (basic_salary * 0.1),
                basic_salary * 0.5 if city_type == "metro" else basic_salary * 0.4
            ]
            
            hra_exemption = min([val for val in hra_exemption_options if val > 0])
        
        # Taxable income
        taxable_income = max(0, annual_salary - self.standard_deduction - hra_exemption)
        
        # Calculate income tax
        income_tax = 0
        remaining_income = taxable_income
        
        for i, (limit, rate) in enumerate(self.new_tax_slabs):
            if remaining_income <= 0:
                break
            
            if i == 0:
                taxable_at_this_slab = min(remaining_income, limit)
            else:
                prev_limit = self.new_tax_slabs[i-1][0]
                taxable_at_this_slab = min(remaining_income, limit - prev_limit)
            
            income_tax += taxable_at_this_slab * rate
            remaining_income -= taxable_at_this_slab
        
        # Health and Education Cess (4% of income tax)
        cess = income_tax * 0.04
        total_income_tax = income_tax + cess
        
        # EPF calculation (12% of basic salary, max ₹1800 per month)
        basic_salary = annual_salary * 0.4  # Assuming basic is 40% of gross
        monthly_basic = basic_salary / 12
        epf_contribution = min(monthly_basic * 0.12, 1800) * 12
        
        # ESI calculation (0.75% of gross salary if salary <= ₹21,000 per month)
        monthly_salary = annual_salary / 12
        esi_contribution = annual_salary * 0.0075 if monthly_salary <= 21000 else 0
        
        # Professional Tax (varies by state, assuming ₹2400 per year)
        professional_tax = min(2400, annual_salary * 0.005)
        
        # Total deductions
        total_deductions = total_income_tax + epf_contribution + esi_contribution + professional_tax
        net_salary = annual_salary - total_deductions
        
        return {
            'gross_salary': annual_salary,
            'taxable_income': taxable_income,
            'income_tax': total_income_tax,
            'epf': epf_contribution,
            'esi': esi_contribution,
            'professional_tax': professional_tax,
            'total_deductions': total_deductions,
            'net_salary': net_salary,
            'monthly_net': net_salary / 12,
            'tax_percentage': (total_deductions / annual_salary) * 100
        }