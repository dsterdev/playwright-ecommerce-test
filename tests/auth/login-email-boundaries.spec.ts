import { test, expect } from '@playwright/test';

test.describe('Validación de campos y errores de autenticación', () => {
  test('Validar límites y normalización del email', async ({ page }) => {
    // 1. Comprobar cómo responde el login ante formatos próximos al límite.
    await page.goto('https://practicesoftwaretesting.com/');
    await page.getByTestId('nav-sign-in').click();
    await page.getByTestId('email').fill('missing@domain');
    await page.getByTestId('password').fill('test-password');
    await page.getByTestId('login-submit').click();

    // El sitio acepta el formato en el cliente, pero rechaza las credenciales.
    await expect(page).toHaveURL(/\/auth\/login$/);
    await expect(page.getByText('Invalid email or password')).toBeVisible();

    // Comprobar el rechazo de una dirección sin parte local.
    await page.getByTestId('email').fill('@missing.local');
    await page.getByTestId('login-submit').click();
    await expect(page.getByText('Email format is invalid')).toBeVisible();
    await expect(page).toHaveURL(/\/auth\/login$/);
  });
});