import { test, expect } from '@playwright/test';

test.describe('Autenticación, navegación y sesión', () => {
  test('Iniciar sesión con una cuenta QA válida', async ({ page }) => {
    const email = process.env.E2E_USER_EMAIL;
    const password = process.env.E2E_USER_PASSWORD;
    test.skip(!email || !password, 'Configure E2E_USER_EMAIL y E2E_USER_PASSWORD para ejecutar este escenario.');

    // 1. Abrir login y completar las credenciales desde variables de entorno.
    await page.goto('https://practicesoftwaretesting.com/');
    await page.getByTestId('nav-sign-in').click();
    await page.getByTestId('email').fill(email!);
    await page.getByTestId('password').fill(password!);

    // 2. Enviar credenciales válidas y comprobar la cuenta autenticada.
    await page.getByTestId('login-submit').click();
    await expect(page).toHaveURL(/\/account$/);
    await expect(page.getByRole('heading', { name: 'My account' })).toBeVisible();
    await expect(page.getByTestId('nav-menu')).toBeVisible();
    await expect(page.getByText('Invalid email or password')).toHaveCount(0);
  });
});