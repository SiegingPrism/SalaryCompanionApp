export const formatCurrency = (amount: number, currency: 'INR' | 'USD' = 'INR') => {
  if (currency === 'INR') {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  }
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatNumber = (amount: number) => {
  return new Intl.NumberFormat('en-IN').format(amount);
};

export const convertCurrency = (amount: number, from: 'INR' | 'USD', to: 'INR' | 'USD') => {
  // Simplified conversion rate (in real app, use live rates)
  const USD_TO_INR = 83;
  
  if (from === to) return amount;
  if (from === 'USD' && to === 'INR') return amount * USD_TO_INR;
  if (from === 'INR' && to === 'USD') return amount / USD_TO_INR;
  
  return amount;
};