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
  private firstNameInput: Locator //locators on page 2/3: First name, last name, phone number
  private lastNameInput: Locator
  private phoneNumberInput: Locator
  private signupIndicator: Locator // Identifies the screen for step 2/3: First name, last name, phone number
  private continueButton: Locator
  private companyNameIndicator: Locator
  private countryDropdown: Locator
  private channelDropdown: Locator


  constructor(page: Page) {
    this.page = page
    this.signupIndicator = page.locator('[data-testid="signup"]') // Identifies the screen for step 2/3: First name, last name, phone number
    this.firstNameInput = page.locator('input[name="firstname"]')
    this.lastNameInput = page.locator('input[name="lastname"]')
    this.phoneNumberInput = page.locator('input[name="phoneNumber"]')
    this.consentBox = page.locator('[data-testid="uc-default-wall"]').first()
    this.acceptButton = page.locator('[data-testid="uc-accept-all-button"]').first()
    this.emailInput = page.locator('input[name="email"]').first()
    this.passwordInput = page.locator('input[name="password"]').first()
    this.showPasswordButton = page.locator('[aria-label="Show password"]').first()
    //this.tosCheckbox = page.locator('input[name="acceptTos"]').first()
    this.tosCheckbox = page.locator('div.sc-94818dec-1.ItvoJ svg[role="img"]').first()  
    this.submitButton = page.locator('button[type="submit"]').first() 
    this.form = page.locator('[data-testid="signup-form"]').first() //Need aria-label or xpaths here since no testid available
    
    this.signupIndicator = page.locator('div[aria-live="polite"]:has-text("Step 2/3")')
    this.firstNameInput = page.locator('input[name="firstname"]')
    this.lastNameInput = page.locator('input[name="lastname"]')
    this.phoneNumberInput = page.locator('input[name="phoneNumber"]')
    this.continueButton = page.locator('button[type="submit"]')
    this.companyNameIndicator = page.locator('input[name="organizationName"]')

    this.countryDropdown = page.locator('input[name="country"]')
    this.channelDropdown = page.locator('input[name="hdyhau"]')
  }

  async goto() {
    await this.page.goto('https://circula-qa-challenge.vercel.app/users/sign_up')
  }

  async handleConsentPopup() {
    await this.page.waitForLoadState('domcontentloaded')
    await this.consentBox.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {})
    if (await this.consentBox.isVisible()) {
      await this.acceptButton.click()
      await expect(this.consentBox).not.toBeVisible()
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
    
    const mainWindow = this.page.context().pages()[0]
  
    // Click the checkbox to trigger Terms page opening
    await this.tosCheckbox.click({ force: true });
  
    const [newTab] = await Promise.all([
      this.page.context().waitForEvent('page'),
      tosLabel.click({ force: true })  // Click the label once
    ]);
  
    if (newTab.url() === 'https://www.circula.com/en/terms') {
      // If Terms page opens, close the new tab
      await newTab.close()
      await mainWindow.bringToFront()
    }
  
    // Close any other tabs that may have opened
    const allPages = this.page.context().pages()
    for (const page of allPages) {
      if (page !== mainWindow) {
        await page.close()
      }
    }
  
    
  }

  async submitForm() {
    await this.submitButton.click()
    await expect(this.page.locator('[data-testid="signup"]')).toBeVisible()
  }

async verifySignupScreen() {
    // Check if the "Step 2/3" text is visible on the second page
    const stepIndicator = this.page.locator('div[aria-live="polite"]:has-text("Step 2/3")')
    await expect(stepIndicator).toBeVisible()  
  }

  async fillPersonalDetails(firstName: string, lastName: string, phoneNumber: string) {
    await this.verifySignupScreen() 
    await this.firstNameInput.fill(firstName)
    await this.lastNameInput.fill(lastName)
    await this.phoneNumberInput.fill(phoneNumber)

    await expect(this.firstNameInput).toHaveValue(firstName)
    await expect(this.lastNameInput).toHaveValue(lastName)
    await expect(this.phoneNumberInput).toHaveValue(phoneNumber)
  }

  async submitDetails() {
    await this.continueButton.click()
    await this.page.waitForLoadState('domcontentloaded') 
  }

  async fillCompanyDetails(companyName: string) {
    await this.companyNameIndicator.fill(companyName)
    await expect(this.companyNameIndicator).toHaveValue(companyName)
  }

  async selectFromDropdown(dropdown: Locator, value: string) {
    await dropdown.click(); // Open the dropdown
    await this.page.locator(`text="${value}"`).click() // Select the desired value
  }

  async selectCountry(country: string) {

    // const firstOption = this.page.locator('.dropdown-class li').first()
    // await firstOption.waitFor({ state: 'visible' })
    // await firstOption.press('Enter')
    await this.countryDropdown.click() // Open dropdown
    await this.page.waitForTimeout(500) // Ensure dropdown is ready
    await this.countryDropdown.fill("Sweden") // Type the first few letters

//     await this.page.waitForSelector('[aria-controls="downshift-:rl:-menu"] [role="option"]', { state: 'visible' })
//     const firstOption = this.page.locator('[aria-controls="downshift-:rl:-menu"] [role="option"]').first()
//     await this.page.keyboard.press('ArrowDown') // Navigate to first option
    await this.page.keyboard.press('Enter')
   // await this.page.locator('body').click()
    //await this.page.locator('[data-testid="hdyhau-dropdown"]').click()
    // await firstOption.click()
  }

  async selectChannel(channel: string) {
    
    await this.channelDropdown.click()
    //await this.page.waitForSelector('[role="menu"]', { state: 'visible' })
    await this.page.locator('text="DATEV"', { hasText: 'DATEV' }).click()
    // Click the "Create an account" button
    await this.page.locator('button:has-text("Create an account")').click()

    //await this.page.locator('/html/body/div[1]/div/div/main/div/form/div[3]/div[2]/label/div[2]/input').click()

    //await this.channelDropdown.fill("DATEV")
    //await expect(this.page.locator('[data-testid="hdyhau-dropdown"]')).toHaveText('DATEV')

    // await this.selectFromDropdown(this.channelDropdown, channel)
    // await this.channelDropdown.focus()
  }
}