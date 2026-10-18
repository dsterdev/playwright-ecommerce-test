import { test, expect } from '@playwright/test';

test.describe('Acceso y presentación del login', () => {
  test('Redirigir a login al abrir ruta privada sin sesión', async ({ page }) => {
    // 1. Abrir la ruta privada directamente sin estar autenticado.
    await page.goto('https://practicesoftwaretesting.com/account');

    // Verificar que se redirige al login y no se muestra contenido de la cuenta.
    await expect(page).toHaveURL(/\/auth\/login$/);
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'My account' })).toHaveCount(0);
    await expect(page.getByTestId('login-submit')).toBeVisible();
  });
});