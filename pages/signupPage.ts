import { Page, Locator, expect } from '@playwright/test';

export class SignupPage {
  private page: Page
  private consentBox: Locator
  private acceptButton: Locator
  public form: Locator

  constructor(page: Page) {
    this.page = page
    this.consentBox = page.locator('[data-testid="uc-header-wrapper"]').first()
    this.acceptButton = page.locator('[data-testid="uc-accept-all-button"]').first()
    this.form = page.locator('[data-testid="signup"]').first()
  }

  async goto() {
    await this.page.goto('https://circula-qa-challenge.vercel.app/users/sign_up')
  }

  async handleConsentPopup() {
    if (await this.consentBox.isVisible()) {
      await this.acceptButton.click()
      await expect(this.consentBox).not.toBeVisible() 
    }
  }
}
