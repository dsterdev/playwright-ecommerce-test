import { test, expect } from '@playwright/test';

test.describe('Autenticación, navegación y sesión', () => {
  test('Cerrar sesión e impedir acceso privado posterior', async ({ page }) => {
    const email = process.env.E2E_USER_EMAIL;
    const password = process.env.E2E_USER_PASSWORD;
    test.skip(!email || !password, 'Configure E2E_USER_EMAIL y E2E_USER_PASSWORD para ejecutar este escenario.');

    // 1. Iniciar sesión y abrir el menú de usuario.
    await page.goto('https://practicesoftwaretesting.com/');
    await page.getByTestId('nav-sign-in').click();
    await page.getByTestId('email').fill(email!);
    await page.getByTestId('password').fill(password!);
    await page.getByTestId('login-submit').click();
    await page.getByTestId('nav-menu').click();
    await expect(page.getByTestId('nav-sign-out')).toBeVisible();

    // 2. Cerrar sesión y verificar la navegación de invitado.
    await page.getByTestId('nav-sign-out').click();
    await expect(page).toHaveURL(/\/auth\/login$/);
    await expect(page.getByTestId('nav-sign-in')).toBeVisible();
    await expect(page.getByTestId('nav-menu')).toHaveCount(0);

    // 3. Intentar abrir la cuenta privada tras cerrar sesión.
    await page.goto('https://practicesoftwaretesting.com/account');
    await expect(page).toHaveURL(/\/auth\/login$/);
    await expect(page.getByRole('heading', { name: 'My account' })).toHaveCount(0);
  });
});