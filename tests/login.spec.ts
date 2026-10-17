import { test, expect } from '@playwright/test';

test('TC01 Happy-Test-login-test', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');
    //validate the title of the page
    await expect(page).toHaveTitle(/Practice Software Testing - Toolshop - v5.0/);

    await page.getByRole('link', { name: 'Sign in' }).click();

    await page.getByRole('textbox', { name: 'Email address *' }).fill('customer3@practicesoftwaretesting.com');
    await page.getByRole('textbox', { name: 'Password *' }).fill('pass123');

    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.locator('h1')).toHaveText('My account');

    await page.getByRole('link', { name: 'Home' }).click();

    await page.getByRole('combobox', { name: 'sort' }).selectOption({ label: 'Name (A - Z)' });

})