import { test, expect } from '@playwright/test';

test.describe('Autenticación, navegación y sesión', () => {
  test('Enviar credenciales con el teclado', async ({ page }) => {
    const email = process.env.E2E_USER_EMAIL;
    const password = process.env.E2E_USER_PASSWORD;
    test.skip(!email || !password, 'Configure E2E_USER_EMAIL y E2E_USER_PASSWORD para ejecutar este escenario.');

    // 1. Abrir login y completar credenciales válidas configuradas para QA.
    await page.goto('https://practicesoftwaretesting.com/');
    await page.getByTestId('nav-sign-in').click();
    await page.getByTestId('email').fill(email!);
    await page.getByTestId('password').fill(password!);

    // 2. Enviar con Enter desde el campo de contraseña.
    await page.getByTestId('password').press('Enter');

    // Verificar que el envío por teclado autentica correctamente.
    await expect(page).toHaveURL(/\/account$/);
    await expect(page.getByRole('heading', { name: 'My account' })).toBeVisible();
  });
});