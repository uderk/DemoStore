import {
  DEFAULT_CART_QUANTITY,
  PRODUCT_INDEX,
  PRODUCT_INDEX_SECOND,
  TIMEOUTS,
  VALID_SHIPPING_DATA,
} from '../PageObjectModels/Dataset/const';
import { expect, test } from '../PageObjectModels/fixtures/fixtures';

// ============================================================================
// TEST SUITES - CART MANAGEMENT
// ============================================================================

test.describe('Cart Management - Add Items', () => {
  test('should add single product to cart', async ({ homePage, page }) => {
    // Arrange
    await homePage.navigateToHome();

    // Act
    await homePage.clickBuyButton(PRODUCT_INDEX);
    await page.waitForTimeout(TIMEOUTS.SHORT);

    // Assert
    const cartCount = await homePage.getCartCount();
    expect(parseInt(cartCount)).toBe(DEFAULT_CART_QUANTITY);
  });

  test('should add multiple different products to cart', async ({ homePage, page }) => {
    // Arrange
    await homePage.navigateToHome();

    // Act
    await homePage.clickBuyButton(PRODUCT_INDEX);
    await page.waitForTimeout(TIMEOUTS.SHORT);
    await homePage.clickBuyButton(PRODUCT_INDEX_SECOND);
    await page.waitForTimeout(TIMEOUTS.SHORT);

    // Assert
    const cartCount = await homePage.getCartCount();
    expect(parseInt(cartCount)).toBe(2);
  });

  test('should increment cart count when adding same product twice', async ({ homePage, page }) => {
    // Arrange
    await homePage.navigateToHome();

    // Act
    await homePage.clickBuyButton(PRODUCT_INDEX);
    await page.waitForTimeout(TIMEOUTS.SHORT);
    await homePage.clickBuyButton(PRODUCT_INDEX);
    await page.waitForTimeout(TIMEOUTS.SHORT);

    // Assert
    const cartCount = await homePage.getCartCount();
    expect(parseInt(cartCount)).toBeGreaterThanOrEqual(2);
  });

  test('should update cart counter after adding product', async ({ homePage, page }) => {
    // Arrange
    await homePage.navigateToHome();
    const initialCount = await homePage.getCartCount();

    // Act
    await homePage.clickBuyButton(PRODUCT_INDEX);
    await page.waitForTimeout(TIMEOUTS.SHORT);

    // Assert
    const updatedCount = await homePage.getCartCount();
    expect(parseInt(updatedCount)).toBeGreaterThan(parseInt(initialCount));
  });

  test('should persist cart count after page reload', async ({ homePage, page }) => {
    // Arrange
    await homePage.navigateToHome();
    await homePage.clickBuyButton(PRODUCT_INDEX);
    await page.waitForTimeout(TIMEOUTS.SHORT);
    const initialCount = await homePage.getCartCount();

    // Act
    await page.reload();
    await page.waitForTimeout(TIMEOUTS.SHORT);

    // Assert
    const reloadedCount = await homePage.getCartCount();
    expect(reloadedCount).toBe(initialCount);
  });
});

test.describe('Cart Management - Navigation', () => {
  test('should navigate to checkout from home page', async ({ homePage, page }) => {
    // Arrange
    await homePage.navigateToHome();
    await homePage.clickBuyButton(PRODUCT_INDEX);
    await page.waitForTimeout(TIMEOUTS.SHORT);

    // Act
    await homePage.clickShoppingCart();
    await page.waitForTimeout(TIMEOUTS.SHORT);

    // Assert
    const currentUrl = page.url();
    expect(currentUrl).toContain('/checkout');
  });

  test('should display order summary in checkout', async ({ homePage, checkoutPage, page }) => {
    // Arrange
    await homePage.navigateToHome();
    await homePage.clickBuyButton(PRODUCT_INDEX);
    await page.waitForTimeout(TIMEOUTS.SHORT);

    // Act
    await checkoutPage.navigateToCheckout();
    await page.waitForTimeout(TIMEOUTS.SHORT);

    // Assert
    const isOrderSummaryVisible = await checkoutPage.isOrderSummaryVisible();
    expect(isOrderSummaryVisible).toBe(true);
  });

  test('should display total amount in checkout', async ({ homePage, checkoutPage, page }) => {
    // Arrange
    await homePage.navigateToHome();
    await homePage.clickBuyButton(PRODUCT_INDEX);
    await page.waitForTimeout(TIMEOUTS.SHORT);
    await homePage.clickBuyButton(PRODUCT_INDEX_SECOND);
    await page.waitForTimeout(TIMEOUTS.SHORT);

    // Act
    await checkoutPage.navigateToCheckout();
    await page.waitForTimeout(TIMEOUTS.SHORT);

    // Assert
    const totalText = await checkoutPage.getText(checkoutPage.getTotalAmount());
    expect(totalText).toBeTruthy();
    expect(parseFloat(totalText.replace('$', ''))).toBeGreaterThan(0);
  });

  test('should display subtotal in order summary', async ({ homePage, checkoutPage, page }) => {
    // Arrange
    await homePage.navigateToHome();
    await homePage.clickBuyButton(PRODUCT_INDEX);
    await page.waitForTimeout(TIMEOUTS.SHORT);

    // Act
    await checkoutPage.navigateToCheckout();
    await page.waitForTimeout(TIMEOUTS.SHORT);

    // Assert
    const subtotalText = await checkoutPage.getText(checkoutPage.getSubtotalAmount());
    expect(subtotalText).toBeTruthy();
    expect(parseFloat(subtotalText.replace('$', ''))).toBeGreaterThan(0);
  });
});

test.describe('Cart Management - Checkout with Multiple Items', () => {
  test('should navigate to checkout with multiple products', async ({
    homePage,
    checkoutPage,
    page,
  }) => {
    // Arrange
    await homePage.navigateToHome();
    await homePage.clickBuyButton(PRODUCT_INDEX);
    await page.waitForTimeout(TIMEOUTS.SHORT);
    await homePage.clickBuyButton(PRODUCT_INDEX_SECOND);
    await page.waitForTimeout(TIMEOUTS.SHORT);

    // Act
    await checkoutPage.navigateToCheckout();
    await page.waitForTimeout(TIMEOUTS.SHORT);

    // Assert
    const cartCount = await homePage.getCartCount();
    expect(parseInt(cartCount)).toBe(2);
  });

  test('should fill and submit checkout form with multiple items', async ({
    homePage,
    checkoutPage,
    page,
  }) => {
    // Arrange
    await homePage.navigateToHome();
    await homePage.clickBuyButton(PRODUCT_INDEX);
    await page.waitForTimeout(TIMEOUTS.SHORT);
    await checkoutPage.navigateToCheckout();

    // Act
    await checkoutPage.fillShippingAddress(VALID_SHIPPING_DATA);
    await page.waitForTimeout(TIMEOUTS.SHORT);
    await checkoutPage.completeOrder();
    await page.waitForTimeout(TIMEOUTS.MEDIUM);

    // Assert
    const isSuccessVisible = await checkoutPage.isSuccessMessageVisible();
    expect(isSuccessVisible).toBe(true);
  });

  test('should display correct total with multiple items', async ({
    homePage,
    checkoutPage,
    page,
  }) => {
    // Arrange
    await homePage.navigateToHome();
    await homePage.clickBuyButton(PRODUCT_INDEX);
    await page.waitForTimeout(TIMEOUTS.SHORT);
    await homePage.clickBuyButton(PRODUCT_INDEX_SECOND);
    await page.waitForTimeout(TIMEOUTS.SHORT);
    await checkoutPage.navigateToCheckout();

    // Act & Assert
    const totalText = await checkoutPage.getText(checkoutPage.getTotalAmount());
    expect(totalText).toBeTruthy();
    const totalAmount = parseFloat(totalText.replace('$', ''));
    expect(totalAmount).toBeGreaterThan(0);
  });
});
