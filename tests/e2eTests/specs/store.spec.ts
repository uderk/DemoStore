import { expect, test } from '../PageObjectModels/fixtures/fixtures';

// ============================================================================
// GLOBAL CONSTANTS
// ============================================================================
const PRODUCT_INDEX = 0;
const PRODUCT_PRICE = '149.99';
const LOCAL_STORAGE_KEY = 'selectedProduct';
const CURRENCY_SYMBOL = '$';
const ROOT_PATH = '/';

// Navigation Links
const NAV_LINKS = {
  HOME: 'home',
  PRODUCTS: 'products',
};

// ============================================================================
// TEST SUITES
// ============================================================================

test.describe('Home Page - Product Display', () => {
  test('should navigate to home page and verify header is visible', async ({ homePage }) => {
    // Arrange & Act
    await homePage.navigateToHome();

    // Assert
    const isHeaderVisible = await homePage.isHeaderVisible();
    expect(isHeaderVisible).toBe(true);
  });

  test('should display all products on home page', async ({ homePage }) => {
    // Arrange & Act
    await homePage.navigateToHome();

    // Assert - Verify at least first product is visible
    const isProductVisible = await homePage.isProductCardVisible(PRODUCT_INDEX);
    expect(isProductVisible).toBe(true);
  });

  test('should display correct product price', async ({ homePage }) => {
    // Arrange & Act
    await homePage.navigateToHome();

    // Assert
    const price = await homePage.getProductPriceText(PRODUCT_INDEX);
    expect(price).toContain(PRODUCT_PRICE);
  });

  test('should display product description', async ({ homePage }) => {
    // Arrange & Act
    await homePage.navigateToHome();

    // Assert
    const description = await homePage.getText(homePage.getProductDescription(PRODUCT_INDEX));
    expect(description.length).toBeGreaterThan(0);
  });

  test('should store product data when clicking buy button', async ({ page, homePage }) => {
    // Arrange
    await homePage.navigateToHome();

    // Act
    await homePage.clickBuyButton(PRODUCT_INDEX);

    // Assert - Verify localStorage contains selected product
    const storageData = await page.evaluate(() => localStorage.getItem(LOCAL_STORAGE_KEY));
    expect(storageData).toBeTruthy();

    const productData = JSON.parse(storageData || '{}');
    expect(productData.name).toBeTruthy();
    expect(productData.price).toBeGreaterThan(0);
  });
});

test.describe('Checkout Flow', () => {
  // Test Data - Shipping Address
  const SHIPPING_FIRST_NAME = 'John';
  const SHIPPING_LAST_NAME = 'Doe';
  const SHIPPING_EMAIL = 'john@example.com';
  const SHIPPING_PHONE = '(555) 123-4567';
  const SHIPPING_ADDRESS = '123 Main St';
  const SHIPPING_CITY = 'New York';
  const SHIPPING_STATE = 'NY';
  const SHIPPING_ZIP = '10001';

  // Test Data - Payment Information
  const PAYMENT_CARD_NAME = 'John Doe';
  const PAYMENT_CARD_NUMBER = '4532 1234 5678 9101';
  const PAYMENT_EXPIRY_MONTH = '12';
  const PAYMENT_EXPIRY_YEAR = '25';
  const PAYMENT_CVV = '123';

  const validShippingData = {
    firstName: SHIPPING_FIRST_NAME,
    lastName: SHIPPING_LAST_NAME,
    email: SHIPPING_EMAIL,
    phone: SHIPPING_PHONE,
    address: SHIPPING_ADDRESS,
    city: SHIPPING_CITY,
    state: SHIPPING_STATE,
    zipCode: SHIPPING_ZIP,
  };

  const validPaymentData = {
    cardName: PAYMENT_CARD_NAME,
    cardNumber: PAYMENT_CARD_NUMBER,
    expiryMonth: PAYMENT_EXPIRY_MONTH,
    expiryYear: PAYMENT_EXPIRY_YEAR,
    cvv: PAYMENT_CVV,
  };

  test('should navigate to checkout page', async ({ checkoutPage }) => {
    // Arrange & Act
    await checkoutPage.navigateToCheckout();

    // Assert
    const isOrderSummaryVisible = await checkoutPage.isOrderSummaryVisible();
    expect(isOrderSummaryVisible).toBe(true);
  });

  test('should fill shipping address form', async ({ checkoutPage }) => {
    // Arrange
    await checkoutPage.navigateToCheckout();

    // Act
    await checkoutPage.fillShippingAddress(validShippingData);

    // Assert
    const firstName = await checkoutPage.getFirstNameValue();
    expect(firstName).toBe(SHIPPING_FIRST_NAME);
  });

  test('should fill complete form and submit order', async ({ checkoutPage }) => {
    // Arrange
    await checkoutPage.navigateToCheckout();

    // Act
    await checkoutPage.fillCompleteCheckout(validShippingData, validPaymentData);

    // Assert - Wait for success message
    const isSuccessVisible = await checkoutPage.isSuccessMessageVisible();
    expect(isSuccessVisible).toBe(true);
  });

  test('should display order summary with pricing', async ({ checkoutPage }) => {
    // Arrange & Act
    await checkoutPage.navigateToCheckout();

    // Assert
    const totalPrice = await checkoutPage.getTotalPrice();
    expect(totalPrice).toBeTruthy();
    expect(totalPrice).toContain(CURRENCY_SYMBOL);
  });

  test('should return to store from success page', async ({ checkoutPage, page }) => {
    // Arrange
    await checkoutPage.navigateToCheckout();
    await checkoutPage.fillCompleteCheckout(validShippingData, validPaymentData);

    // Act
    await checkoutPage.goBackToStore();

    // Assert
    const currentURL = page.url();
    expect(currentURL).toContain(ROOT_PATH);
  });
});

test.describe('Navigation', () => {
  test('should click home link and navigate', async ({ homePage }) => {
    // Arrange
    await homePage.navigateToHome();

    // Act
    await homePage.clickNavigationLink(NAV_LINKS.HOME);

    // Assert
    const isHeaderVisible = await homePage.isHeaderVisible();
    expect(isHeaderVisible).toBe(true);
  });

  test('should click products link', async ({ homePage }) => {
    // Arrange
    await homePage.navigateToHome();

    // Act
    await homePage.clickNavigationLink(NAV_LINKS.PRODUCTS);

    // Assert
    const isProductVisible = await homePage.isProductCardVisible(PRODUCT_INDEX);
    expect(isProductVisible).toBe(true);
  });
});
