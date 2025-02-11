
---

## Introduction for the `Task II` and `Task III` (Scroll to the end for detailed notes on `Task I`  )
For the exploratory testing part, I have highlighted the main emphasis in **bold letters**. I have left out performance, accessibility, or non-functional testing, as they may be out of scope for the discussion. However, I would be open to discussing what could be done in that regard in a meeting.

Other considerations, such as testing **cross-device & screen sizes**, have been left out of my testing script below, as I believe they were out of scope. However, I am open to discussing their inclusion if needed. The **matrix of real devices** for testing depends on what the customer base uses. In my current organization, we use **PostHog** to assess popular vendors and specific devices that our customers use and then test on a sample set of devices. These specifics are left out of this discussion as I do not have access to your user base statistics.

I have assumed that users input information in a **left-to-right manner** (i.e., Deutsch or English), not from a script such as Arabic, which renders right-to-left.

---


## Task II: Add error message for character limit for purpose field - Android

I tested this part of the design primarily for `empty state and initial input behavior`, `character counter`, `text area expansion`, and `content and scrolling/ overflow`.

-  Verify that the **"Add purpose"** placeholder text appears when the field is empty.
-  Verify **recently used purposes** are displayed below the input field.
-  Tap on a **recently used item**; it should populate the input field correctly.
-  Verify that tapping the **right arrow (CTA)** is disabled when no text is entered.
-  Verify **keyboard behavior**: 
    - Does the keyboard open automatically when tapping the input field?
    - The keyboard should not actively block text on the screen.


-  Verify that the **character counter appears at 500 characters** and updates onwards.
-  Verify that the **counter correctly reflects** the exact number of characters entered.
-  Verify that the **counter color changes** (e.g., warning color at 1000 characters).
-  Verify that as the user types, the **text area expands** to accommodate more lines.
-  Verify **line breaks are handled correctly**.
-  Verify if **long words (without spaces) break properly** without UI overflow.
-  **Verify typing continuously** to ensure the UI does not lag on the device.
-  Verify **copy-pasting behavior**: Users should be able to copy content into the text box from other apps.
-  Verify that **scrolling is enabled** inside the field when reaching maximum visible rows.
-  Verify **smooth scrolling** when content overflows.


-  Verify that the **text field turns red** when exceeding 1,000 characters (error state).
-  Verify the **CTA button is disabled** when exceeding 1,000 characters.
-  Verify that when characters are reduced to <= 1,000, the **field returns to normal** and the CTA reactivates.
-  Verify that the **error message disappears** immediately when input is reduced to <= 1,000 characters.



---


## Task III: Password Change Flow on iOS

I tested this part primarily for `password input and validation`, `CTA button (Save button) behavior`, `password visibility toggle`, `error handling` and lastly the `happy path` of success.

-  Verify that the **current password field is required** before submitting.
-  Verify that the **new password field is required** before submitting.
-  Verify that the new password **meets the criteria before allowing submission**:
    - At least 8 characters
    - At least one numerical character
    - At least one letter
-  Optional: Verify that each criteria turns green/red as the user types. (I do not have access to the codebase, so I left this as an optional task)
-  Verify that if the **new password does not meet the requirements**, the criteria remain in an unchecked state until fulfilled.
-  Verify that when **all password requirements are met**, the criteria turn green with a checkmark.



-  Verify that the **Save button is disabled when**:
    - The current password field is empty.
    - The new password field does not meet all required criteria.
-  Verify that the Save button is enabled only when:
    - The current password is filled.
    - The new password meets all required criteria.


-  Verify that both current password and new password fields have a visibility toggle (eye icon).
-  Verify that tapping the eye icon **toggles** between hidden (****) and visible (plain text) password format.


-  Verify that if the **current password is incorrect**, the following occurs:
    - The user sees a **red error message**: _"Your password is incorrect, please check it."_
    - The current password field is **highlighted in red**.
    - The **error disappears** when the user edits the current password field.
-  Verify that if the **new password does not meet the criteria**, the user cannot proceed, and the criteria remain unchecked.

 
-  Verify that when a **valid old password and a valid new password** are submitted:
    - The **success message** is displayed: _"Your password was updated"_.
    - The user is automatically navigated back to the settings screen.


---

## Coding & Automation Practices for `Task I`

I would be happy to discuss this part with you, Nataša and Aleksandr, in a meeting if you have any questions.

### My Considerations:
- **Left some commented code:** I did not remove it, as they highlight some of the things I tried and failed to implement.
- **Selectors:** I prioritized `data-testid` where available. If not, used other attributes instead of brittle `XPath`.
- **Did not address too many edge cases:** I focused on the main functionality and the most common use case/ happy path for this assignment. If you want to test more edge cases, we can arrange a meeting to discuss what should be tested, and how I would implement it.
- **Assertions:** Used a few web-first assertions to avoid flaky tests.
- **Chaining & Filtering:** Tried to minimize reliance on explicit waits in some places, and used Playwright’s auto-waiting capabilities instead.
- **Used Page Object Model (POM):** Encapsulation, reusability, and maintainability were prioritized as much as they could be.
- **Sharding:** Tests can be split across multiple environments. However, since the test suite is small and singular, it is not necessary.
- **Linting & Formatting:** Ensured consistency via `ESLint` & `Prettier`.
- **CI/CD Integration:** I did not deem it to be in the scope for any CI/CD discussion for this assignment. However, these tests are usually expected to be run with every commit. We can arrange that using GitHub Actions or any other CI/CD tool that Circula uses.

## How to Set Up the Project on Your Machine

1. **Clone the repo:**
   ```sh
   git clone https://github.com/hanzlasajid/circula-playwright-typescript.git
   cd circula-playwright-typescript
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Run Playwright setup:**
   ```sh
   npx playwright install
   ```
4. **Execute the tests:**
   ```sh
   npx playwright test
   ```

##   Checklist for Task 1 - Signup Flow @ https://circula-qa-challenge.vercel.app/users/sign_up

`I have added a detailed checklist for the test cases for Task 1. As this is a very detailed checklist (and the task said to 'prepare a few automated tests for the main check), not all of the following are included in my current implementation. However, if need be, I can add them to the current implementation to highlight any skill you want to assess.`

### Consent Popup Handling
    Verify that the consent popup appears on the first visit.
    Accept the consent and verify that it disappears.
    Verify that the popup does not reappear after acceptance (set cookies to local storage)

 ### Work Email & Password Screen
    Enter a valid email and password, then verify they are accepted.
    Try to submit without entering an email and check for an error message.

`At my current company, we used the guidelines for Regex enforced password/emails by using something similar to` https://formulashq.com/the-ultimate-guide-to-regex-for-password-validation/

    Enter an invalid email format (e.g., test@com) and verify the error message.
    Try to submit without entering a password and check for an error message.
    Enter a short password (e.g., abc) and verify an error is displayed
    Enter a password without special characters and check if it's accepted.
    Use a password with spaces at the beginning or end and verify behavior.


    Try signup with an already registered email and verify error handling
    Try sign up without the 'I agree to the Terms and Conditions and Privacy Policy' box checked
    Click the “Show password” button and verify that the password becomes visible.


Success Path: Submit a valid email and password, accept TOS, and verify navigation to Step 2/3.
The page should display “Step 2/3” upon successful transition.

### Navigation to Step 2/3 (Personal Details Page)

    Verify submitting without a first name (we can also decide if numbers or symbols can be parts of a name)
    Verify submitting without a last name (same exception as above, if it is the company policy)
    TVerify submitting without a phone number
    Verify entering an invalid phone number format (e.g., abcd1234) and verify an error message.

Success Path: Fill out first name, last name, and phone number correctly and proceed.

### Company Details (Step 3/3) Validation
    Verify the company name field accepts valid input.
    Verify submision without a company name and verify the error.
    Verify that dropdowns for 'Country' and 'How did you hear about us?' work correctly: In our case, I picked Sweden and DATEV.
    Verify that the “Create an Account” button is enabled only when all required fields are filled.
    
### Email verification 

This can be also be done via integration with Mailinator (or internally):

    Verify if a verification email is sent after successful signup. 
    Verify that the email contains a confirmation link and clicking it activates the account.
    Verify logging in before email verification and ensure the system blocks access.
    Verify the expiration of the verification link and check for error.
    Verify the use oif verification link multiple times and ensure only the first attempt succeeds.