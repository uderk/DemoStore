// ============================================================================
// GLOBAL SETTINGS
// ============================================================================
export const CURRENCY_SYMBOL = '$';
export const ROOT_PATH = '/';
export const LOCAL_STORAGE_KEY = 'selectedProduct';

// ============================================================================
// PRODUCT DATA
// ============================================================================
export const PRODUCT_INDEX = 0;
export const PRODUCT_PRICE = '149.99';
export const PRODUCT_INDEX_SECOND = 1;
export const PRODUCT_PRICE_SECOND = '99.99';

// ============================================================================
// NAVIGATION
// ============================================================================
export const NAV_LINKS = {
  HOME: 'home',
  PRODUCTS: 'products',
  CHECKOUT: 'checkout',
};

// ============================================================================
// VALID TEST DATA - SHIPPING
// ============================================================================
export const VALID_SHIPPING_DATA = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  phone: '(555) 123-4567',
  address: '123 Main St',
  city: 'New York',
  state: 'NY',
  zipCode: '10001',
};

// ============================================================================
// VALID TEST DATA - PAYMENT
// ============================================================================
export const VALID_PAYMENT_DATA = {
  cardName: 'John Doe',
  cardNumber: '4532 1234 5678 9101',
  expiryMonth: '12',
  expiryYear: '25',
  cvv: '123',
};

// ============================================================================
// ALTERNATIVE VALID DATA (for test variety)
// ============================================================================
export const ALTERNATE_SHIPPING_DATA = {
  firstName: 'Jane',
  lastName: 'Smith',
  email: 'jane.smith@example.com',
  phone: '(555) 987-6543',
  address: '456 Oak Avenue',
  city: 'Los Angeles',
  state: 'CA',
  zipCode: '90001',
};

export const ALTERNATE_PAYMENT_DATA = {
  cardName: 'Jane Smith',
  cardNumber: '5425 2334 3010 9903',
  expiryMonth: '06',
  expiryYear: '26',
  cvv: '456',
};

// ============================================================================
// INVALID TEST DATA - SHIPPING VALIDATION
// ============================================================================
export const INVALID_SHIPPING_DATA = {
  invalidEmail: 'not-an-email',
  invalidEmailTooLong: 'a'.repeat(255) + '@example.com',
  invalidZipShort: '123',
  invalidZipFormat: 'ABCDE',
  invalidPhone: 'abc',
  invalidPhoneTooShort: '123',
  emptyFirstName: '',
  emptyLastName: '',
  specialCharactersAddress: '<script>alert("xss")</script>',
  veryLongAddress: 'A'.repeat(500),
};

// ============================================================================
// INVALID TEST DATA - PAYMENT VALIDATION
// ============================================================================
export const INVALID_PAYMENT_DATA = {
  invalidCardNumber: '1234 5678 9101 1121',
  invalidCardNumberShort: '4532 1234 5678',
  invalidCardNumberNonNumeric: 'ABCD EFGH IJKL MNOP',
  expiredMonth: '01',
  expiredYear: '20',
  invalidCvv: '12',
  invalidCvvNonNumeric: 'ABC',
  emptyCardName: '',
};

// ============================================================================
// ERROR MESSAGES
// ============================================================================
export const ERROR_MESSAGES = {
  REQUIRED_FIELD: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email',
  INVALID_ZIP: 'Please enter a valid zip code',
  INVALID_PHONE: 'Please enter a valid phone number',
  INVALID_CARD_NUMBER: 'Please enter a valid card number',
  INVALID_CVV: 'Please enter a valid CVV',
  EXPIRED_CARD: 'Card has expired',
};

// ============================================================================
// SUCCESS MESSAGES
// ============================================================================
export const SUCCESS_MESSAGES = {
  ORDER_PLACED: 'Order Placed Successfully',
  FORM_SUBMITTED: 'Thank you for your order',
  ITEM_ADDED_TO_CART: 'Item added to cart',
  ITEM_REMOVED_FROM_CART: 'Item removed from cart',
};

// ============================================================================
// TIMEOUTS (in milliseconds)
// ============================================================================
export const TIMEOUTS = {
  SHORT: 5000,
  MEDIUM: 10000,
  LONG: 15000,
};

// ============================================================================
// CART CONSTANTS
// ============================================================================
export const CART_OPERATIONS = {
  ADD: 'add',
  REMOVE: 'remove',
  UPDATE_QUANTITY: 'update',
};

export const DEFAULT_CART_QUANTITY = 1;
export const MAX_CART_QUANTITY = 99;
export const MIN_CART_QUANTITY = 1;
