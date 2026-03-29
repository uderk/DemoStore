// Utility functions for testing
export const formatPrice = (price: number): string => {
  return `$${price.toFixed(2)}`;
};

export const validateEmail = (email: string): boolean => {
  return /\S+@\S+\.\S+/.test(email);
};

export const validateCardNumber = (cardNumber: string): boolean => {
  const cleaned = cardNumber.replace(/\s/g, '');
  return /^\d{13,19}$/.test(cleaned);
};

export const calculateTotal = (subtotal: number, shippingCost: number, taxRate: number): number => {
  return subtotal + shippingCost + (subtotal + shippingCost) * taxRate;
};
