import { test, expect } from '@playwright/test'
import { SignupPage } from '../pages/signupPage'

test.describe('Signup Flow Tests', () => {
   test.beforeEach(async ({ page }) => {
     const signupPage = new SignupPage(page)
     await signupPage.goto()
     await signupPage.handleConsentPopup()
   })

  test('User can complete step 1/2/3 of the signup form', async ({ page }) => {
    const signupPage = new SignupPage(page)
    await signupPage.fillSignupForm('testuser@example.com', 'Test1234')
    await signupPage.acceptTerms()
    await signupPage.submitForm()

    // Verify the next page has loaded
    await signupPage.verifySignupScreen()

    await signupPage.fillPersonalDetails('Jan', 'Kowalski', '+1234567890')
    await signupPage.submitDetails()

    await signupPage.fillCompanyDetails('QA Test')
    await signupPage.selectCountry('Sweden')
    await signupPage.selectChannel('DATEV')
  })

  
})