import { test, expect } from '@playwright/test';

test.describe('Enlaces y métodos de autenticación alternativos', () => {
  test('Abrir registro desde login', async ({ page }) => {
    // 1. Abrir login y seleccionar el enlace de registro.
    await page.goto('https://practicesoftwaretesting.com/');
    await page.getByTestId('nav-sign-in').click();
    await page.getByTestId('register-link').click();

    // Verificar que el formulario de registro aparece y ofrece volver al login.
    await expect(page).toHaveURL(/\/auth\/register$/);
    await expect(page.getByTestId('register-submit')).toBeVisible();
    await expect(page.getByTestId('nav-sign-in')).toBeVisible();

    // 2. Regresar al login sin crear una cuenta.
    await page.getByTestId('nav-sign-in').click();
    await expect(page).toHaveURL(/\/auth\/login$/);
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
  });
});