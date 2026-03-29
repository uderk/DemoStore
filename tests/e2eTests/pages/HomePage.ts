import { Locator } from '@playwright/test';
import { BasePage } from './BasePage';



















































































































































































}  }    return await this.isVisible(this.getErrorMessage(fieldName));  async isFieldHasError(fieldName: string): Promise<boolean> {  }    return await this.getText(this.getErrorMessage(fieldName));  async getErrorMessageText(fieldName: string): Promise<string> {  }    return await this.isVisible(this.getSuccessMessage());  async isSuccessMessageVisible(): Promise<boolean> {  }    return await this.isVisible(this.getOrderSummary());  async isOrderSummaryVisible(): Promise<boolean> {  }    return await this.getText(this.getTotalAmount());  async getTotalPrice(): Promise<string> {  }    return await this.getAttribute(this.getFirstNameInput(), 'value');  async getFirstNameValue(): Promise<string | null> {  }    await this.click(this.getBackToStoreLink());  async goBackToStore(): Promise<void> {  }    await this.completeOrder();    await this.fillPaymentInformation(paymentData);    await this.fillShippingAddress(shippingData);  async fillCompleteCheckout(shippingData: any, paymentData: any): Promise<void> {  }    await this.click(this.getCompleteOrderButton());  async completeOrder(): Promise<void> {  }    await this.fill(this.getCVVInput(), data.cvv);    await this.selectOption(this.getExpiryYearSelect(), data.expiryYear);    await this.selectOption(this.getExpiryMonthSelect(), data.expiryMonth);    await this.fill(this.getCardNumberInput(), data.cardNumber);    await this.fill(this.getCardNameInput(), data.cardName);  }): Promise<void> {    cvv: string;    expiryYear: string;    expiryMonth: string;    cardNumber: string;    cardName: string;  async fillPaymentInformation(data: {  }    await this.fill(this.getZipCodeInput(), data.zipCode);    await this.fill(this.getStateInput(), data.state);    await this.fill(this.getCityInput(), data.city);    await this.fill(this.getAddressInput(), data.address);    await this.fill(this.getPhoneInput(), data.phone);    await this.fill(this.getEmailInput(), data.email);    await this.fill(this.getLastNameInput(), data.lastName);    await this.fill(this.getFirstNameInput(), data.firstName);  }): Promise<void> {    zipCode: string;    state: string;    city: string;    address: string;    phone: string;    email: string;    lastName: string;    firstName: string;  async fillShippingAddress(data: {  }    await this.goto('/checkout');  async navigateToCheckout(): Promise<void> {  // Actions  }    return this.getElementByRndId('order-confirmation');  getOrderConfirmation(): Locator {  }    return this.getElementByRndId('success-message');  getSuccessMessage(): Locator {  // Success Screen Locators  }    return this.getElementByRndId(`error-${fieldName}`);  getErrorMessage(fieldName: string): Locator {  // Error Message Locators  }    return this.getElementByRndId('link-backToStore');  getBackToStoreLink(): Locator {  }    return this.getElementByRndId('button-completeOrder');  getCompleteOrderButton(): Locator {  // Button Locators  }    return this.getElementByRndId('total-amount');  getTotalAmount(): Locator {  }    return this.getElementByRndId('tax-amount');  getTaxAmount(): Locator {  }    return this.getElementByRndId('shipping-amount');  getShippingAmount(): Locator {  }    return this.getElementByRndId('subtotal-amount');  getSubtotalAmount(): Locator {  }    return this.getElementByRndId('order-summary');  getOrderSummary(): Locator {  // Order Summary Locators  }    return this.getElementByRndId('input-cvv');  getCVVInput(): Locator {  }    return this.getElementByRndId('select-expiryYear');  getExpiryYearSelect(): Locator {  }    return this.getElementByRndId('select-expiryMonth');  getExpiryMonthSelect(): Locator {  }    return this.getElementByRndId('input-cardNumber');  getCardNumberInput(): Locator {  }    return this.getElementByRndId('input-cardName');  getCardNameInput(): Locator {  // Payment Information Locators  }    return this.getElementByRndId('input-zipCode');  getZipCodeInput(): Locator {  }    return this.getElementByRndId('input-state');  getStateInput(): Locator {  }    return this.getElementByRndId('input-city');  getCityInput(): Locator {  }    return this.getElementByRndId('input-address');  getAddressInput(): Locator {  }    return this.getElementByRndId('input-phone');  getPhoneInput(): Locator {  }    return this.getElementByRndId('input-email');  getEmailInput(): Locator {  }    return this.getElementByRndId('input-lastName');  getLastNameInput(): Locator {  }    return this.getElementByRndId('input-firstName');  getFirstNameInput(): Locator {  // Form Locators - Shipping Addressexport class CheckoutPage extends BasePage {import { Locator } from '@playwright/test';import { Locator } from '@playwright/test';

export class HomePage extends BasePage {
  // Product Card Locators
  getProductCard(productName: string): Locator {
    return this.getElementByCss(`[rnd-id="product-card-${productName.toLowerCase().replace(/\s+/g, '-')}"]`);
  }

  getProductByName(productName: string): Locator {
    return this.getElementByCss(`text="${productName}"`);
  }

  getBuyButton(productName: string): Locator {
    return this.getProductCard(productName).locator('[rnd-id="buy-button"]');
  }

  getProductPrice(productName: string): Locator {
    return this.getProductCard(productName).locator('[rnd-id="product-price"]');
  }

  getProductDescription(productName: string): Locator {
    return this.getProductCard(productName).locator('[rnd-id="product-description"]');
  }

  // Navigation Locators
  getNavigationLink(linkName: string): Locator {
    return this.getElementByCss(`nav a:has-text("${linkName}")`);
  }

  getHomeLink(): Locator {
    return this.getElementByRndId('nav-home');
  }

  getProductsLink(): Locator {
    return this.getElementByRndId('nav-products');
  }

  getAboutLink(): Locator {
    return this.getElementByRndId('nav-about');
  }

  getContactLink(): Locator {
    return this.getElementByRndId('nav-contact');
  }

  getShoppingCartIcon(): Locator {
    return this.getElementByRndId('shopping-cart');
  }

  getCartItemCount(): Locator {
    return this.getShoppingCartIcon().locator('[rnd-id="cart-count"]');
  }

  // Header Locators
  getStoreHeader(): Locator {
    return this.getElementByRndId('store-header');
  }

  // Hero Section Locators
  getHeroTitle(): Locator {
    return this.getElementByRndId('hero-title');
  }

  getHeroDescription(): Locator {
    return this.getElementByRndId('hero-description');
  }

  // Actions
  async navigateToHome(): Promise<void> {
    await this.goto('/');
  }

  async clickBuyButton(productName: string): Promise<void> {
    await this.click(this.getBuyButton(productName));
  }

  async getProductPriceText(productName: string): Promise<string> {
    return await this.getText(this.getProductPrice(productName));
  }

  async getProductDescriptionText(productName: string): Promise<string> {
    return await this.getText(this.getProductDescription(productName));
  }

  async isProductVisible(productName: string): Promise<boolean> {
    return await this.isVisible(this.getProductCard(productName));
  }

  async clickShoppingCart(): Promise<void> {
    await this.click(this.getShoppingCartIcon());
  }

  async getCartCount(): Promise<string> {
    return await this.getText(this.getCartItemCount());
  }

  async clickHomeLink(): Promise<void> {
    await this.click(this.getHomeLink());
  }

  async clickProductsLink(): Promise<void> {
    await this.click(this.getProductsLink());
  }

  async isHeaderVisible(): Promise<boolean> {
    return await this.isVisible(this.getStoreHeader());
  }

  async scrollToProduct(productName: string): Promise<void> {
    await this.getProductCard(productName).scrollIntoViewIfNeeded();
  }
}
