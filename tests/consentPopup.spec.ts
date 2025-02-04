import { test, expect } from '@playwright/test'
import { SignupPage } from '../pages/signupPage'

test.describe('Consent Popup Handling', () => {
  test.beforeEach(async ({ page }) => {
    const signupPage = new SignupPage(page)
    await signupPage.goto()
    await signupPage.handleConsentPopup()
  })

  test('Verify user lands on sign-up page after consent is accepted', async ({ page }) => {
    const signupPage = new SignupPage(page)
    await expect(signupPage.form).toBeVisible()
  })
})
