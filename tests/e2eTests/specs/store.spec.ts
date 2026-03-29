import { expect, test } from '../fixtures/test';

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
    const isProductVisible = await homePage.isProductVisible('Professional Cordless Drill');
    expect(isProductVisible).toBe(true);
  });

  test('should display correct product price', async ({ homePage }) => {
    // Arrange & Act
    await homePage.navigateToHome();

    // Assert
    const price = await homePage.getProductPriceText('Professional Cordless Drill');
    expect(price).toContain('149.99');
  });

  test('should display product description', async ({ homePage }) => {
    // Arrange & Act
    await homePage.navigateToHome();

    // Assert
    const description = await homePage.getProductDescriptionText('Professional Cordless Drill');
    expect(description.length).toBeGreaterThan(0);
  });

  test('should store product data when clicking buy button', async ({ page, homePage }) => {
    // Arrange
    await homePage.navigateToHome();

    // Act
    await homePage.clickBuyButton('Professional Cordless Drill');

    // Assert - Verify localStorage contains selected product
    const storageData = await page.evaluate(() => localStorage.getItem('selectedProduct'));
    expect(storageData).toBeTruthy();

    const productData = JSON.parse(storageData || '{}');
    expect(productData.name).toBe('Professional Cordless Drill');
    expect(productData.price).toBe(149.99);
  });
});

test.describe('Checkout Flow', () => {
  const validShippingData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '(555) 123-4567',
    address: '123 Main St',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
  };

  const validPaymentData = {
    cardName: 'John Doe',
    cardNumber: '4532 1234 5678 9101',
    expiryMonth: '12',
    expiryYear: '25',
    cvv: '123',
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
    expect(firstName).toBe('John');
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
    expect(totalPrice).toContain('$');
  });

  test('should return to store from success page', async ({ checkoutPage, page }) => {
    // Arrange
    await checkoutPage.navigateToCheckout();
    await checkoutPage.fillCompleteCheckout(validShippingData, validPaymentData);

    // Act
    await checkoutPage.goBackToStore();

    // Assert
    const currentURL = page.url();
    expect(currentURL).toContain('/');
  });
});

test.describe('Navigation', () => {
  test('should click home link and navigate', async ({ homePage }) => {
    // Arrange
    await homePage.navigateToHome();

    // Act
    await homePage.clickHomeLink();

    // Assert
    const isHeaderVisible = await homePage.isHeaderVisible();
    expect(isHeaderVisible).toBe(true);
  });

  test('should click products link', async ({ homePage }) => {
    // Arrange
    await homePage.navigateToHome();

    // Act
    await homePage.clickProductsLink();

    // Assert
    const isProductVisible = await homePage.isProductVisible('Professional Cordless Drill');
    expect(isProductVisible).toBe(true);
  });
});
