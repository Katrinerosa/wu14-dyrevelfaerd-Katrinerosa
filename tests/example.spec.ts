import { test, expect } from '@playwright/test'

test('login with valid credentials', async ({ page }) => {
  await page.goto('http://localhost:3000/admin')
  
  // Fill form
  await page.fill('input[name="username"]', 'admin')
  await page.fill('input[name="password"]', '1234')
  
  // Submit
  await page.click('button[type="submit"]')
  
  // Wait for redirect or success
  await page.waitForNavigation({ timeout: 5000 }).catch(() => {})
  
  console.log('Final URL:', page.url())
  await expect(page).not.toHaveURL(/admin\/?$/)
})