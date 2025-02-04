import { Page, Locator, expect } from '@playwright/test';

export class SignupPage {
  private page: Page
  private consentBox: Locator
  private acceptButton: Locator
  public form: Locator

  constructor(page: Page) {
    this.page = page
    this.consentBox = page.locator('#consent-box').first(); // Using chaining for robustness
    this.acceptButton = page.locator('#accept-button').first()
    this.form = page.locator('form').first()
  }

  async goto() {
    await this.page.goto('https://circula-qa-challenge.vercel.app/users/sign_up')
  }

  async handleConsentPopup() {
    if (await this.consentBox.isVisible()) {
      await this.acceptButton.click()
      await expect(this.consentBox).not.toBeVisible() // Web-first assertion
    }
  }
}