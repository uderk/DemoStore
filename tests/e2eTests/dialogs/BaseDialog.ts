import { Locator, Page } from '@playwright/test';

export class BaseDialog {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  protected getElementByRndId(rndId: string): Locator {
    return this.page.locator(`[rnd-id="${rndId}"]`);
  }

  protected getElementByCss(selector: string): Locator {
    return this.page.locator(selector);
  }

  async click(locator: Locator): Promise<void> {
    await locator.click();
  }

  async fill(locator: Locator, text: string): Promise<void> {
    await locator.fill(text);
  }

  async getText(locator: Locator): Promise<string> {
    return (await locator.textContent()) || '';
  }

  async isVisible(locator: Locator): Promise<boolean> {
    return await locator.isVisible();
  }

  async waitForElement(locator: Locator, timeout: number = 5000): Promise<void> {
    await locator.waitFor({ timeout });
  }

  async selectOption(locator: Locator, value: string): Promise<void> {
    await locator.selectOption(value);
  }

  async getAttribute(locator: Locator, attribute: string): Promise<string | null> {
    return await locator.getAttribute(attribute);
  }

  async isDialogVisible(): Promise<boolean> {
    await this.waitForElement(this.getDialogContainer());
    return await this.isVisible(this.getDialogContainer());
  }

  protected getDialogContainer(): Locator {
    return this.page.locator('[role="dialog"], .modal, [rnd-id*="dialog"]').first();
  }
}
