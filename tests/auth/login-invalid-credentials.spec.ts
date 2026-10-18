import { test, expect } from '@playwright/test';

test.describe('Validación de campos y errores de autenticación', () => {
  test('Mostrar error seguro ante credenciales incorrectas', async ({ page }) => {
    // 1. Introducir una cuenta de demostración y una contraseña incorrecta.
    await page.goto('https://practicesoftwaretesting.com/');
    await page.getByTestId('nav-sign-in').click();
    await page.getByTestId('email').fill('customer3@practicesoftwaretesting.com');
    await page.getByTestId('password').fill('definitely-wrong-password');

    // Enviar las credenciales incorrectas.
    await page.getByTestId('login-submit').click();

    // Verificar el mensaje genérico y que la sesión no se inicia.
    await expect(page).toHaveURL(/\/auth\/login$/);
    await expect(page.getByText('Invalid email or password')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'My account' })).toHaveCount(0);
    await expect(page.getByTestId('email')).toBeVisible();
    await expect(page.getByTestId('password')).toBeVisible();
  });
});