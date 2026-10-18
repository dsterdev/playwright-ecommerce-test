import { test, expect } from '@playwright/test';

test.describe('Enlaces y métodos de autenticación alternativos', () => {
  test('Comprobar opción de inicio de sesión con Google', async ({ page }) => {
    // 1. Abrir login y activar la opción Google sin autorizar una cuenta externa.
    await page.goto('https://practicesoftwaretesting.com/');
    await page.getByTestId('nav-sign-in').click();
    await page.getByRole('button', { name: 'Sign in with Google' }).click();

    // Verificar que no se declara una sesión autenticada sin completar OAuth.
    await expect(page).toHaveURL(/\/auth\/login$/);
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    await expect(page.getByTestId('nav-sign-in')).toBeVisible();
  });
});