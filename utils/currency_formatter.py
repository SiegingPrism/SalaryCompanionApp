def format_indian_currency(amount):
    """Format currency in Indian numbering system"""
    if amount >= 10000000:  # 1 crore
        return f"₹{amount/10000000:.1f} Cr"
    elif amount >= 100000:  # 1 lakh
        return f"₹{amount/100000:.1f} L"
    elif amount >= 1000:  # 1 thousand
        return f"₹{amount/1000:.1f} K"
    else:
        return f"₹{amount:,.0f}"

def format_number_indian(number):
    """Format numbers in Indian style with commas"""
    s = str(int(number))
    if len(s) <= 3:
        return s
    
    # Indian numbering system: last 3 digits, then groups of 2
    result = s[-3:]
    s = s[:-3]
    
    while len(s) > 2:
        result = s[-2:] + ',' + result
        s = s[:-2]
    
    if s:
        result = s + ',' + result
    
    return result