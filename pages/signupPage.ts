import { Page, Locator, expect } from '@playwright/test'

export class SignupPage {
  private page: Page
  private consentBox: Locator
  private acceptButton: Locator
  private emailInput: Locator
  private passwordInput: Locator
  private showPasswordButton: Locator
  private tosCheckbox: Locator
  private submitButton: Locator
  public form: Locator

  constructor(page: Page) {
    this.page = page
    this.consentBox = page.locator('[data-testid="uc-default-wall"]').first()
    this.acceptButton = page.locator('[data-testid="uc-accept-all-button"]').first()
    this.emailInput = page.locator('input[name="email"]').first()
    this.passwordInput = page.locator('input[name="password"]').first()
    this.showPasswordButton = page.locator('[aria-label="Show password"]').first()
    this.tosCheckbox = page.locator('input[name="acceptTos"]').first() //Need aria-label or xpaths here since no testid available   
    this.submitButton = page.locator('button[type="submit"]').first() //Need aria-label or xpaths here since no testid available
    this.form = page.locator('[data-testid="signup-form"]').first() //Need aria-label or xpaths here since no testid available
  }

  async goto() {
    await this.page.goto('https://circula-qa-challenge.vercel.app/users/sign_up')
  }

  async handleConsentPopup() {
    
    await this.page.waitForLoadState('domcontentloaded')
    await this.page.click('body')
    await this.consentBox.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {})
   
    if (await this.consentBox.isVisible()) {
      await this.acceptButton.click()
      await expect(this.consentBox).not.toBeVisible() 
    } else {
      await this.page.waitForTimeout(500) // Small wait tfor delayed rendering
    }
  }

  async fillSignupForm(email: string, password: string) {
    await this.emailInput.fill(email)
    await this.passwordInput.fill(password)
    await expect(this.emailInput).toHaveValue(email)
    await expect(this.passwordInput).toHaveValue(password)
  }

  async acceptTerms() {
    const tosLabel = this.page.locator('label:has(input[name="acceptTos"])')
    await tosLabel.click()
    await expect(this.tosCheckbox).toBeChecked()
  }

  async submitForm() {
    await this.submitButton.click()
  }
}
