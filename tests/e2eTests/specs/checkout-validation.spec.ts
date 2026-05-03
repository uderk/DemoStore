import { TIMEOUTS, VALID_SHIPPING_DATA } from '../PageObjectModels/Dataset/const';
import { expect, test } from '../PageObjectModels/fixtures/fixtures';

// ============================================================================
// TEST SUITES - CHECKOUT FORM VALIDATION
// ============================================================================

test.describe.skip('Checkout Form Validation - Shipping Address', () => {
  test('should accept valid shipping data', async ({ checkoutPage, page }) => {
    // Arrange
    await checkoutPage.navigateToCheckout();

    // Act
    await checkoutPage.fillShippingAddress(VALID_SHIPPING_DATA);
    await page.waitForTimeout(TIMEOUTS.SHORT);

    // Assert
    const firstName = await checkoutPage.getFirstNameValue();
    expect(firstName).toBe(VALID_SHIPPING_DATA.firstName);
  });

  test('should fill shipping form with all valid fields', async ({ checkoutPage, page }) => {
    // Arrange
    await checkoutPage.navigateToCheckout();

    // Act
    await checkoutPage.fillShippingAddress(VALID_SHIPPING_DATA);
    await page.waitForTimeout(TIMEOUTS.SHORT);

    // Assert
    const firstName = await checkoutPage.getFirstNameValue();
    expect(firstName).toBe(VALID_SHIPPING_DATA.firstName);
  });

  test('should display order summary after filling shipping', async ({ checkoutPage, page }) => {
    // Arrange
    await checkoutPage.navigateToCheckout();

    // Act
    await checkoutPage.fillShippingAddress(VALID_SHIPPING_DATA);
    await page.waitForTimeout(TIMEOUTS.SHORT);

    // Assert
    const isOrderSummaryVisible = await checkoutPage.isOrderSummaryVisible();
    expect(isOrderSummaryVisible).toBe(true);
  });

  test('should allow filling form fields sequentially', async ({ checkoutPage, page }) => {
    // Arrange
    await checkoutPage.navigateToCheckout();

    // Act - Fill fields one by one using base methods
    await checkoutPage.fill(checkoutPage.getFirstNameInput(), VALID_SHIPPING_DATA.firstName);
    await page.waitForTimeout(TIMEOUTS.SHORT);
    await checkoutPage.fill(checkoutPage.getLastNameInput(), VALID_SHIPPING_DATA.lastName);
    await page.waitForTimeout(TIMEOUTS.SHORT);
    await checkoutPage.fill(checkoutPage.getEmailInput(), VALID_SHIPPING_DATA.email);
    await page.waitForTimeout(TIMEOUTS.SHORT);

    // Assert
    const firstName = await checkoutPage.getFirstNameValue();
    expect(firstName).toBe(VALID_SHIPPING_DATA.firstName);
  });
});

test.describe.skip('Checkout Form Validation - Payment Information', () => {
  test('should navigate and display checkout page', async ({ checkoutPage, page }) => {
    // Arrange & Act
    await checkoutPage.navigateToCheckout();
    await page.waitForTimeout(TIMEOUTS.SHORT);

    // Assert
    const isOrderSummaryVisible = await checkoutPage.isOrderSummaryVisible();
    expect(isOrderSummaryVisible).toBe(true);
  });

  test('should accept valid payment data', async ({ checkoutPage, page }) => {
    // Arrange
    await checkoutPage.navigateToCheckout();
    await checkoutPage.fillShippingAddress(VALID_SHIPPING_DATA);

    // Act
    await checkoutPage.fillPaymentInformation({
      cardName: 'John Doe',
      cardNumber: '4532 1234 5678 9101',
      expiryMonth: '12',
      expiryYear: '25',
      cvv: '123',
    });
    await page.waitForTimeout(TIMEOUTS.SHORT);

    // Assert
    const cardNameValue = await checkoutPage.getAttribute(checkoutPage.getCardNameInput(), 'value');
    expect(cardNameValue).toBe('John Doe');
  });

  test('should fill payment form fields', async ({ checkoutPage, page }) => {
    // Arrange
    await checkoutPage.navigateToCheckout();
    await checkoutPage.fillShippingAddress(VALID_SHIPPING_DATA);

    // Act
    const testCardName = 'Jane Smith';
    await checkoutPage.fill(checkoutPage.getCardNameInput(), testCardName);
    await page.waitForTimeout(TIMEOUTS.SHORT);

    // Assert
    const cardNameValue = await checkoutPage.getAttribute(checkoutPage.getCardNameInput(), 'value');
    expect(cardNameValue).toBe(testCardName);
  });

  test('should accept expiry month selection', async ({ checkoutPage, page }) => {
    // Arrange
    await checkoutPage.navigateToCheckout();
    await checkoutPage.fillShippingAddress(VALID_SHIPPING_DATA);

    // Act
    await checkoutPage.selectOption(checkoutPage.getExpiryMonthSelect(), '06');
    await page.waitForTimeout(TIMEOUTS.SHORT);

    // Assert
    const selectedMonth = await checkoutPage.getAttribute(
      checkoutPage.getExpiryMonthSelect(),
      'value'
    );
    expect(selectedMonth).toBe('06');
  });

  test('should accept expiry year selection', async ({ checkoutPage, page }) => {
    // Arrange
    await checkoutPage.navigateToCheckout();
    await checkoutPage.fillShippingAddress(VALID_SHIPPING_DATA);

    // Act
    await checkoutPage.selectOption(checkoutPage.getExpiryYearSelect(), '25');
    await page.waitForTimeout(TIMEOUTS.SHORT);

    // Assert
    const selectedYear = await checkoutPage.getAttribute(
      checkoutPage.getExpiryYearSelect(),
      'value'
    );
    expect(selectedYear).toBe('25');
  });
});

test.describe.skip('Checkout Form Validation - Complete Workflow', () => {
  test('should complete checkout with valid data', async ({ checkoutPage, page }) => {
    // Arrange
    await checkoutPage.navigateToCheckout();

    // Act
    await checkoutPage.fillCompleteCheckout(VALID_SHIPPING_DATA, {
      cardName: 'John Doe',
      cardNumber: '4532 1234 5678 9101',
      expiryMonth: '12',
      expiryYear: '25',
      cvv: '123',
    });
    await page.waitForTimeout(TIMEOUTS.MEDIUM);

    // Assert
    const isSuccessVisible = await checkoutPage.isSuccessMessageVisible();
    expect(isSuccessVisible).toBe(true);
  });

  test('should show order confirmation after successful checkout', async ({
    checkoutPage,
    page,
  }) => {
    // Arrange
    await checkoutPage.navigateToCheckout();

    // Act
    await checkoutPage.fillCompleteCheckout(VALID_SHIPPING_DATA, {
      cardName: 'John Doe',
      cardNumber: '4532 1234 5678 9101',
      expiryMonth: '12',
      expiryYear: '25',
      cvv: '123',
    });
    await page.waitForTimeout(TIMEOUTS.MEDIUM);

    // Assert
    const orderDetailsVisible = await checkoutPage.isVisible(checkoutPage.getOrderConfirmation());
    expect(orderDetailsVisible).toBe(true);
  });

  test('should display total price in checkout', async ({ checkoutPage, page }) => {
    // Arrange
    await checkoutPage.navigateToCheckout();

    // Act
    await checkoutPage.fillShippingAddress(VALID_SHIPPING_DATA);
    await page.waitForTimeout(TIMEOUTS.SHORT);

    // Assert
    const totalPrice = await checkoutPage.getTotalPrice();
    expect(totalPrice).toBeTruthy();
    expect(parseFloat(totalPrice.replace('$', ''))).toBeGreaterThan(0);
  });

  test('should display subtotal in order summary', async ({ checkoutPage, page }) => {
    // Arrange
    await checkoutPage.navigateToCheckout();

    // Act
    await checkoutPage.fillShippingAddress(VALID_SHIPPING_DATA);
    await page.waitForTimeout(TIMEOUTS.SHORT);

    // Assert
    const subtotalText = await checkoutPage.getText(checkoutPage.getSubtotalAmount());
    expect(subtotalText).toBeTruthy();
  });

  test('should display shipping cost in order summary', async ({ checkoutPage, page }) => {
    // Arrange
    await checkoutPage.navigateToCheckout();

    // Act
    await checkoutPage.fillShippingAddress(VALID_SHIPPING_DATA);
    await page.waitForTimeout(TIMEOUTS.SHORT);

    // Assert
    const shippingText = await checkoutPage.getText(checkoutPage.getShippingAmount());
    expect(shippingText).toBeTruthy();
  });

  test('should display tax in order summary', async ({ checkoutPage, page }) => {
    // Arrange
    await checkoutPage.navigateToCheckout();

    // Act
    await checkoutPage.fillShippingAddress(VALID_SHIPPING_DATA);
    await page.waitForTimeout(TIMEOUTS.SHORT);

    // Assert
    const taxText = await checkoutPage.getText(checkoutPage.getTaxAmount());
    expect(taxText).toBeTruthy();
  });

  test('should have complete order button visible', async ({ checkoutPage, page }) => {
    // Arrange
    await checkoutPage.navigateToCheckout();

    // Act
    await checkoutPage.fillShippingAddress(VALID_SHIPPING_DATA);
    await page.waitForTimeout(TIMEOUTS.SHORT);
    await checkoutPage.fillPaymentInformation({
      cardName: 'John Doe',
      cardNumber: '4532 1234 5678 9101',
      expiryMonth: '12',
      expiryYear: '25',
      cvv: '123',
    });
    await page.waitForTimeout(TIMEOUTS.SHORT);

    // Assert
    const isButtonVisible = await checkoutPage.isVisible(checkoutPage.getCompleteOrderButton());
    expect(isButtonVisible).toBe(true);
  });

  test('should navigate back to store from success screen', async ({ checkoutPage, page }) => {
    // Arrange
    await checkoutPage.navigateToCheckout();
    await checkoutPage.fillCompleteCheckout(VALID_SHIPPING_DATA, {
      cardName: 'John Doe',
      cardNumber: '4532 1234 5678 9101',
      expiryMonth: '12',
      expiryYear: '25',
      cvv: '123',
    });
    await page.waitForTimeout(TIMEOUTS.MEDIUM);

    // Act
    const isBackLinkVisible = await checkoutPage.isVisible(checkoutPage.getBackToStoreLink());

    // Assert
    expect(isBackLinkVisible).toBe(true);
  });
});
