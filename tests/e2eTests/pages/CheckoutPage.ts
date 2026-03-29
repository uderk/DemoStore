import { Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  // Form Locators - Shipping Address
  getFirstNameInput(): Locator {
    return this.getElementByRndId('input-firstName');
  }

  getLastNameInput(): Locator {
    return this.getElementByRndId('input-lastName');
  }

  getEmailInput(): Locator {
    return this.getElementByRndId('input-email');
  }

  getPhoneInput(): Locator {
    return this.getElementByRndId('input-phone');
  }

  getAddressInput(): Locator {
    return this.getElementByRndId('input-address');
  }

  getCityInput(): Locator {
    return this.getElementByRndId('input-city');
  }

  getStateInput(): Locator {
    return this.getElementByRndId('input-state');
  }

  getZipCodeInput(): Locator {
    return this.getElementByRndId('input-zipCode');
  }

  // Payment Information Locators
  getCardNameInput(): Locator {
    return this.getElementByRndId('input-cardName');
  }

  getCardNumberInput(): Locator {
    return this.getElementByRndId('input-cardNumber');
  }

  getExpiryMonthSelect(): Locator {
    return this.getElementByRndId('select-expiryMonth');
  }

  getExpiryYearSelect(): Locator {
    return this.getElementByRndId('select-expiryYear');
  }

  getCVVInput(): Locator {
    return this.getElementByRndId('input-cvv');
  }

  // Order Summary Locators
  getOrderSummary(): Locator {
    return this.getElementByRndId('section-orderSummary');
  }

  getSubtotalAmount(): Locator {
    return this.getElementByRndId('text-subtotal');
  }

  getShippingAmount(): Locator {
    return this.getElementByRndId('text-shipping');
  }

  getTaxAmount(): Locator {
    return this.getElementByRndId('text-tax');
  }

  getTotalAmount(): Locator {
    return this.getElementByRndId('text-total');
  }

  // Button Locators
  getCompleteOrderButton(): Locator {
    return this.getElementByRndId('button-completeOrder');
  }

  getBackToStoreLink(): Locator {
    return this.getElementByRndId('link-backToStore');
  }

  // Error Message Locators
  getErrorMessage(fieldName: string): Locator {
    return this.getElementByRndId(`error-${fieldName}`);
  }

  // Success Screen Locators
  getSuccessMessage(): Locator {
    return this.getElementByRndId('section-successMessage');
  }

  getOrderConfirmation(): Locator {
    return this.getElementByRndId('section-orderDetails');
  }

  // Actions
  async navigateToCheckout(): Promise<void> {
    await this.goto('/checkout');
  }

  async fillShippingAddress(data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  }): Promise<void> {
    await this.fill(this.getFirstNameInput(), data.firstName);
    await this.fill(this.getLastNameInput(), data.lastName);
    await this.fill(this.getEmailInput(), data.email);
    await this.fill(this.getPhoneInput(), data.phone);
    await this.fill(this.getAddressInput(), data.address);
    await this.fill(this.getCityInput(), data.city);
    await this.fill(this.getStateInput(), data.state);
    await this.fill(this.getZipCodeInput(), data.zipCode);
  }

  async fillPaymentInformation(data: {
    cardName: string;
    cardNumber: string;
    expiryMonth: string;
    expiryYear: string;
    cvv: string;
  }): Promise<void> {
    await this.fill(this.getCardNameInput(), data.cardName);
    await this.fill(this.getCardNumberInput(), data.cardNumber);
    await this.selectOption(this.getExpiryMonthSelect(), data.expiryMonth);
    await this.selectOption(this.getExpiryYearSelect(), data.expiryYear);
    await this.fill(this.getCVVInput(), data.cvv);
  }

  async completeOrder(): Promise<void> {
    await this.click(this.getCompleteOrderButton());
  }

  async fillCompleteCheckout(shippingData: any, paymentData: any): Promise<void> {
    await this.fillShippingAddress(shippingData);
    await this.fillPaymentInformation(paymentData);
    await this.completeOrder();
  }

  async goBackToStore(): Promise<void> {
    await this.click(this.getBackToStoreLink());
  }

  async getFirstNameValue(): Promise<string | null> {
    return await this.getAttribute(this.getFirstNameInput(), 'value');
  }

  async getTotalPrice(): Promise<string> {
    return await this.getText(this.getTotalAmount());
  }

  async isOrderSummaryVisible(): Promise<boolean> {
    return await this.isVisible(this.getOrderSummary());
  }

  async isSuccessMessageVisible(): Promise<boolean> {
    return await this.isVisible(this.getSuccessMessage());
  }

  async getErrorMessageText(fieldName: string): Promise<string> {
    return await this.getText(this.getErrorMessage(fieldName));
  }

  async isFieldHasError(fieldName: string): Promise<boolean> {
    return await this.isVisible(this.getErrorMessage(fieldName));
  }
}
