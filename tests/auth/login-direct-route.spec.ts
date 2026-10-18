import { test, expect } from '@playwright/test';

test.describe('Acceso y presentación del login', () => {
  test('Abrir directamente la ruta de login', async ({ page }) => {
    // 1. Navegar directamente al login sin sesión previa.
    await page.goto('https://practicesoftwaretesting.com/auth/login');

    // Verificar que ambos campos aparecen vacíos y listos para usarse.
    await expect(page).toHaveURL(/\/auth\/login$/);
    await expect(page.getByTestId('email')).toBeVisible();
    await expect(page.getByTestId('email')).toBeEnabled();
    await expect(page.getByTestId('email')).toBeEmpty();
    await expect(page.getByTestId('password')).toBeVisible();
    await expect(page.getByTestId('password')).toBeEnabled();
    await expect(page.getByTestId('password')).toBeEmpty();
  });
});