export const generateBookingReference = (type: string): string => {
  const prefixes: Record<string, string> = {
    hotel: 'HTL',
    flight: 'FLT',
    car: 'CAR',
    activity: 'ACT',
    restaurant: 'RST',
    rideshare: 'RID'
  };
  
  const prefix = prefixes[type] || 'BKG';
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  
  return `${prefix}-${timestamp.slice(-6)}-${random}`;
};

export const calculatePricing = (basePrice: number, type: string = 'general', options?: {
  nights?: number;
  rooms?: number;
}): {
  basePrice: number;
  taxesAndFees: number;
  total: number;
  currency: string;
} => {
  let taxRate = 0.12; // Default 12%
  let serviceFeeRate = 0.05; // Default 5%
  
  // Adjust rates by category
  if (type === 'hotel') {
    taxRate = 0.14; // Hotel tax typically higher
    serviceFeeRate = 0.08;
  } else if (type === 'flight') {
    taxRate = 0.07;
    serviceFeeRate = 0.10;
  } else if (type === 'car') {
    taxRate = 0.11;
    serviceFeeRate = 0.06;
  } else if (type === 'restaurant') {
    taxRate = 0.08;
    serviceFeeRate = 0.03; // Lower for restaurants
  }
  
  const taxes = basePrice * taxRate;
  const serviceFee = basePrice * serviceFeeRate;
  const total = basePrice + taxes + serviceFee;
  
  return {
    basePrice,
    taxesAndFees: taxes + serviceFee,
    total: Math.round(total * 100) / 100, // Round to 2 decimals
    currency: 'USD'
  };
};

export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

export const validateCardNumber = (cardNumber: string): boolean => {
  const cleaned = cardNumber.replace(/\s/g, '');
  return /^\d{16}$/.test(cleaned);
};

export const validateCVV = (cvv: string): boolean => {
  return /^\d{3,4}$/.test(cvv);
};

export const validateExpiry = (expiry: string): boolean => {
  const match = expiry.match(/^(\d{2})\/(\d{2})$/);
  if (!match) return false;
  
  const month = parseInt(match[1], 10);
  const year = parseInt('20' + match[2], 10);
  
  if (month < 1 || month > 12) return false;
  
  const now = new Date();
  const expiryDate = new Date(year, month - 1);
  
  return expiryDate > now;
};

export const getCardType = (cardNumber: string): string => {
  const cleaned = cardNumber.replace(/\s/g, '');
  
  if (/^4/.test(cleaned)) return 'Visa';
  if (/^5[1-5]/.test(cleaned)) return 'Mastercard';
  if (/^3[47]/.test(cleaned)) return 'American Express';
  if (/^6(?:011|5)/.test(cleaned)) return 'Discover';
  
  return 'Unknown';
};

export const maskCardNumber = (cardNumber: string): string => {
  const cleaned = cardNumber.replace(/\s/g, '');
  if (cleaned.length < 4) return cardNumber;
  return '**** **** **** ' + cleaned.slice(-4);
};

export const simulatePaymentProcessing = (): Promise<{ success: boolean; error?: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // 95% success rate
      const success = Math.random() > 0.05;
      
      if (success) {
        resolve({ success: true });
      } else {
        resolve({ 
          success: false, 
          error: 'Payment declined. Please try a different card or payment method.' 
        });
      }
    }, 2000); // 2 second delay to simulate processing
  });
};
