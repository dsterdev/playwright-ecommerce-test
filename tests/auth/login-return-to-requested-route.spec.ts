import { test, expect } from '@playwright/test';

test.describe('Autenticación, navegación y sesión', () => {
  test('Completar login tras solicitar una ruta privada', async ({ page }) => {
    const email = process.env.E2E_USER_EMAIL;
    const password = process.env.E2E_USER_PASSWORD;
    test.skip(!email || !password, 'Configure E2E_USER_EMAIL y E2E_USER_PASSWORD para ejecutar este escenario.');

    // 1. Solicitar la ruta privada estando sin autenticar.
    await page.goto('https://practicesoftwaretesting.com/account');
    await expect(page).toHaveURL(/\/auth\/login$/);
    await expect(page.getByRole('heading', { name: 'My account' })).toHaveCount(0);

    // 2. Autenticarse y volver a la ruta solicitada.
    await page.getByTestId('email').fill(email!);
    await page.getByTestId('password').fill(password!);
    await page.getByTestId('login-submit').click();
    await expect(page).toHaveURL(/\/account$/);
    await expect(page.getByRole('heading', { name: 'My account' })).toBeVisible();
  });
});