import { test, expect } from '@playwright/test';

test.describe('Enlaces y métodos de autenticación alternativos', () => {
  test('Abrir recuperación de contraseña desde login', async ({ page }) => {
    // 1. Abrir login y seleccionar el enlace de recuperación.
    await page.goto('https://practicesoftwaretesting.com/');
    await page.getByTestId('nav-sign-in').click();
    await page.getByTestId('forgot-password-link').click();

    // Verificar ruta y controles de recuperación de contraseña.
    await expect(page).toHaveURL(/\/auth\/forgot-password$/);
    await expect(page.getByRole('heading', { name: 'Forgot Password' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Email address *' })).toBeVisible();
    await expect(page.getByTestId('forgot-password-submit')).toBeVisible();

    // 2. Enviar el formulario vacío.
    await page.getByTestId('forgot-password-submit').click();

    // Verificar que se solicita un email antes de procesar la solicitud.
    await expect(page).toHaveURL(/\/auth\/forgot-password$/);
    await expect(page.getByText('Email is required')).toBeVisible();
  });
});