import { Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  // Product Card Locators
  getProductCard(index: number): Locator {
    return this.page.locator(`[rnd-id="product-card-${index}"]`);
  }

  getProductName(index: number): Locator {
    return this.page.locator(`[rnd-id="product-name-${index}"]`);
  }

  getProductPrice(index: number): Locator {
    return this.page.locator(`[rnd-id="product-price-${index}"]`);
  }

  getProductDescription(index: number): Locator {
    return this.page.locator(`[rnd-id="product-description-${index}"]`);
  }

  getBuyButton(index: number): Locator {
    return this.page.locator(`[rnd-id="button-buy-${index}"]`);
  }

  // Navigation Locators
  getNavigationLink(linkName: string): Locator {
    return this.page.locator(`[rnd-id="nav-${linkName.toLowerCase()}"]`);
  }

  getShoppingCartIcon(): Locator {
    return this.getElementByRndId('shopping-cart');
  }

  getCartItemCount(): Locator {
    return this.getElementByRndId('cart-count');
  }

  getStoreHeader(): Locator {
    return this.getElementByRndId('store-header');
  }

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

  async clickBuyButton(index: number): Promise<void> {
    await this.click(this.getBuyButton(index));
  }

  async getProductPriceText(index: number): Promise<string> {
    return await this.getText(this.getProductPrice(index));
  }

  async getProductNameText(index: number): Promise<string> {
    return await this.getText(this.getProductName(index));
  }

  async clickNavigationLink(linkName: string): Promise<void> {
    await this.click(this.getNavigationLink(linkName));
  }

  async clickShoppingCart(): Promise<void> {
    await this.click(this.getShoppingCartIcon());
  }

  async getCartCount(): Promise<string> {
    return await this.getText(this.getCartItemCount());
  }

  async scrollToProduct(index: number): Promise<void> {
    await this.getProductCard(index).scrollIntoViewIfNeeded();
  }

  async isProductCardVisible(index: number): Promise<boolean> {
    return await this.isVisible(this.getProductCard(index));
  }

  async isHeaderVisible(): Promise<boolean> {
    return await this.isVisible(this.getStoreHeader());
  }

  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  async isHeroSectionVisible(): Promise<boolean> {
    return await this.isVisible(this.getHeroTitle());
  }
}
