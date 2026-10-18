import { test, expect } from '@playwright/test';

test.describe('Validación de campos y errores de autenticación', () => {
  test('Validar email obligatorio cuando la contraseña está completa', async ({ page }) => {
    // 1. Abrir login, dejar el email vacío y completar la contraseña.
    await page.goto('https://practicesoftwaretesting.com/');
    await page.getByTestId('nav-sign-in').click();
    await page.getByTestId('password').fill('test-password');

    // Enviar el formulario sin email.
    await page.getByTestId('login-submit').click();

    // Verificar que se solicita el email y no se inicia sesión.
    await expect(page).toHaveURL(/\/auth\/login$/);
    await expect(page.getByText('Email is required')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'My account' })).toHaveCount(0);
  });
});