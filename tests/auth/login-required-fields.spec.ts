import { test, expect } from '@playwright/test';

test.describe('Validación de campos y errores de autenticación', () => {
  test('Rechazar el envío con ambos campos vacíos', async ({ page }) => {
    // 1. Abrir el login desde la página principal en un contexto limpio.
    await page.goto('https://practicesoftwaretesting.com/');
    await page.getByTestId('nav-sign-in').click();

    // Enviar el formulario sin completar ninguno de los campos.
    await page.getByTestId('login-submit').click();

    // Verificar que el formulario muestra los errores requeridos y no autentica.
    await expect(page).toHaveURL(/\/auth\/login$/);
    await expect(page.getByText('Email is required')).toBeVisible();
    await expect(page.getByText('Password is required')).toBeVisible();
  });
});