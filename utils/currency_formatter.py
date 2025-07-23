class CurrencyFormatter:
    @staticmethod
    def format_inr(amount):
        """Format amount in Indian Rupee format"""
        if amount >= 10000000:  # 1 crore
            return f"₹{amount/10000000:.1f}Cr"
        elif amount >= 100000:  # 1 lakh
            return f"₹{amount/100000:.1f}L"
        else:
            return f"₹{amount:,.0f}"
    
    @staticmethod
    def format_usd(amount):
        """Format amount in USD format"""
        return f"${amount:,.0f}"
    
    @staticmethod
    def format_currency(amount, currency='INR'):
        """Format amount based on currency"""
        if currency == 'INR':
            return CurrencyFormatter.format_inr(amount)
        else:
            return CurrencyFormatter.format_usd(amount)
    
    @staticmethod
    def convert_currency(amount, from_currency, to_currency):
        """Convert between currencies (simplified)"""
        USD_TO_INR = 83
        
        if from_currency == to_currency:
            return amount
        elif from_currency == 'USD' and to_currency == 'INR':
            return amount * USD_TO_INR
        elif from_currency == 'INR' and to_currency == 'USD':
            return amount / USD_TO_INR
        
        return amount