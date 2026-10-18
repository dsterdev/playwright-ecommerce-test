import { test, expect } from '@playwright/test';

test.describe('Autenticación, navegación y sesión', () => {
  test('Mantener sesión al recargar la cuenta', async ({ page }) => {
    const email = process.env.E2E_USER_EMAIL;
    const password = process.env.E2E_USER_PASSWORD;
    test.skip(!email || !password, 'Configure E2E_USER_EMAIL y E2E_USER_PASSWORD para ejecutar este escenario.');

    // 1. Iniciar sesión con credenciales QA configuradas de forma segura.
    await page.goto('https://practicesoftwaretesting.com/');
    await page.getByTestId('nav-sign-in').click();
    await page.getByTestId('email').fill(email!);
    await page.getByTestId('password').fill(password!);
    await page.getByTestId('login-submit').click();
    await expect(page).toHaveURL(/\/account$/);
    await expect(page.getByRole('heading', { name: 'My account' })).toBeVisible();

    // 2. Recargar la cuenta para comprobar que la sesión persiste.
    await page.goto('https://practicesoftwaretesting.com/account');
    await expect(page).toHaveURL(/\/account$/);
    await expect(page.getByRole('heading', { name: 'My account' })).toBeVisible();
    await expect(page.getByTestId('nav-menu')).toBeVisible();
  });
});