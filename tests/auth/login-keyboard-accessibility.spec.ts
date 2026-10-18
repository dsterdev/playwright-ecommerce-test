import { test, expect } from '@playwright/test';

test.describe('Usabilidad y accesibilidad del login', () => {
  test('Operar el formulario de login sin ratón', async ({ page }) => {
    // 1. Abrir login y enfocar el campo email para recorrer el formulario con Tab.
    await page.goto('https://practicesoftwaretesting.com/');
    await page.getByTestId('nav-sign-in').click();
    const email = page.getByTestId('email');
    const password = page.getByTestId('password');
    const visibilityToggle = page.getByTestId('login-form').getByRole('button').filter({ hasText: /^$/ });
    const submit = page.getByTestId('login-submit');

    await email.focus();
    await expect(email).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(password).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(visibilityToggle).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(submit).toBeFocused();

    // 2. Enviar el formulario vacío con Enter y verificar la validación.
    await page.keyboard.press('Enter');
    await expect(page.getByText('Email is required')).toBeVisible();
    await expect(page.getByText('Password is required')).toBeVisible();
  });
});