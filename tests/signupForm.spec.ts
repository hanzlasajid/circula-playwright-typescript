import { test, expect } from '@playwright/test'
import { SignupPage } from '../pages/signupPage'

test.describe('Signup Form Tests', () => {
  test.beforeEach(async ({ page }) => {
    const signupPage = new SignupPage(page)
    await signupPage.goto()
    await signupPage.handleConsentPopup()
  })

  

  test('User can fill and submit the signup form', async ({ page }) => {
    const signupPage = new SignupPage(page)

    await signupPage.fillSignupForm('testuser@circula.com', 'Test@circula1234')
    await signupPage.acceptTerms()
    await signupPage.submitForm()

    
  })
})