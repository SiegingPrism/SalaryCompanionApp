class IndianTaxCalculator:
    def __init__(self):
        self.tax_slabs_new = [
            (300000, 0.0),
            (600000, 0.05),
            (900000, 0.10),
            (1200000, 0.15),
            (1500000, 0.20),
            (float('inf'), 0.30)
        ]
        
        self.tax_slabs_old = [
            (250000, 0.0),
            (500000, 0.05),
            (1000000, 0.20),
            (float('inf'), 0.30)
        ]
    
    def calculate_tax(self, annual_salary, age=30, has_hra=True, hra_amount=0, city_type='metro', tax_regime='new'):
        # Standard deduction
        standard_deduction = min(50000, annual_salary)
        
        # HRA exemption calculation
        hra_exemption = 0
        if has_hra and hra_amount > 0:
            basic_salary = annual_salary * 0.5
            hra_received = hra_amount * 12
            rent_paid = hra_received * 1.2
            
            hra_exemption_options = [
                hra_received,
                rent_paid - (basic_salary * 0.1),
                basic_salary * 0.5 if city_type == 'metro' else basic_salary * 0.4
            ]
            
            hra_exemption = min([opt for opt in hra_exemption_options if opt > 0])
        
        # Taxable income
        taxable_income = max(0, annual_salary - standard_deduction - hra_exemption)
        
        # Calculate income tax based on regime
        slabs = self.tax_slabs_new if tax_regime == 'new' else self.tax_slabs_old
        income_tax = self._calculate_tax_from_slabs(taxable_income, slabs)
        
        # Health and Education Cess (4% of income tax)
        cess = income_tax * 0.04
        
        # EPF calculation
        basic_salary = annual_salary * 0.4
        monthly_basic = basic_salary / 12
        epf_contribution = min(monthly_basic * 0.12, 1800) * 12
        
        # ESI calculation
        monthly_salary = annual_salary / 12
        esi_contribution = annual_salary * 0.0075 if monthly_salary <= 21000 else 0
        
        # Professional Tax
        professional_tax = min(2400, annual_salary * 0.005)
        
        total_deductions = income_tax + cess + epf_contribution + esi_contribution + professional_tax
        net_pay = annual_salary - total_deductions
        
        # Determine tax slab
        tax_slab = self._get_tax_slab_description(taxable_income, tax_regime)
        
        return {
            'gross_pay': annual_salary,
            'income_tax': income_tax,
            'cess': cess,
            'epf': epf_contribution,
            'esi': esi_contribution,
            'professional_tax': professional_tax,
            'total_deductions': total_deductions,
            'net_pay': net_pay,
            'tax_slab': tax_slab
        }
    
    def _calculate_tax_from_slabs(self, taxable_income, slabs):
        tax = 0
        previous_limit = 0
        
        for limit, rate in slabs:
            if taxable_income <= previous_limit:
                break
            
            taxable_in_slab = min(taxable_income, limit) - previous_limit
            tax += taxable_in_slab * rate
            previous_limit = limit
            
            if taxable_income <= limit:
                break
        
        return tax
    
    def _get_tax_slab_description(self, taxable_income, regime):
        if regime == 'new':
            if taxable_income <= 300000:
                return 'No Tax (Up to ₹3L)'
            elif taxable_income <= 600000:
                return '5% (₹3L - ₹6L)'
            elif taxable_income <= 900000:
                return '10% (₹6L - ₹9L)'
            elif taxable_income <= 1200000:
                return '15% (₹9L - ₹12L)'
            elif taxable_income <= 1500000:
                return '20% (₹12L - ₹15L)'
            else:
                return '30% (Above ₹15L)'
        else:
            if taxable_income <= 250000:
                return 'No Tax (Up to ₹2.5L)'
            elif taxable_income <= 500000:
                return '5% (₹2.5L - ₹5L)'
            elif taxable_income <= 1000000:
                return '20% (₹5L - ₹10L)'
            else:
                return '30% (Above ₹10L)'