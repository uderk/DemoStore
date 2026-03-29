import { calculateTotal, formatPrice, validateCardNumber, validateEmail } from '@/utils/formatters';

describe('formatPrice', () => {
  it('should format a number to a price string with two decimal places', () => {
    expect(formatPrice(149.99)).toBe('$149.99');
  });

  it('should add .00 for whole numbers', () => {
    expect(formatPrice(100)).toBe('$100.00');
  });

  it('should handle single decimal places', () => {
    expect(formatPrice(50.5)).toBe('$50.50');
  });

  it('should handle zero', () => {
    expect(formatPrice(0)).toBe('$0.00');
  });
});

describe('validateEmail', () => {
  it('should validate correct email addresses', () => {
    expect(validateEmail('test@example.com')).toBe(true);
    expect(validateEmail('user.name@domain.co.uk')).toBe(true);
  });

  it('should reject invalid email addresses', () => {
    expect(validateEmail('invalid.email')).toBe(false);
    expect(validateEmail('@example.com')).toBe(false);
    expect(validateEmail('test@')).toBe(false);
  });

  it('should reject empty strings', () => {
    expect(validateEmail('')).toBe(false);
  });
});

describe('validateCardNumber', () => {
  it('should validate correct card numbers', () => {
    expect(validateCardNumber('4532123456789101')).toBe(true);
    expect(validateCardNumber('4532 1234 5678 9101')).toBe(true);
  });

  it('should reject invalid card numbers', () => {
    expect(validateCardNumber('123')).toBe(false);
    expect(validateCardNumber('invalid')).toBe(false);
  });

  it('should accept numbers with spaces', () => {
    expect(validateCardNumber('4532 1234 5678 9101')).toBe(true);
  });
});

describe('calculateTotal', () => {
  it('should calculate total with subtotal, shipping, and tax', () => {
    const subtotal = 100;
    const shipping = 9.99;
    const taxRate = 0.08;
    const total = calculateTotal(subtotal, shipping, taxRate);
    expect(total).toBeCloseTo(118.79, 2);
  });

  it('should handle zero values', () => {
    expect(calculateTotal(0, 0, 0)).toBe(0);
  });

  it('should calculate correctly with different tax rates', () => {
    const total = calculateTotal(150, 10, 0.1);
    expect(total).toBeCloseTo(176, 1);
  });
});
