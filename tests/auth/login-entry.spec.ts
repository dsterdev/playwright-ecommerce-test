import { test, expect } from '@playwright/test';

test.describe('Acceso y presentación del login', () => {
  test('Abrir login desde la navegación principal', async ({ page }) => {
    // 1. Navegar a la página principal en un contexto sin autenticación.
    await page.goto('https://practicesoftwaretesting.com/');
    await expect(page.getByTestId('nav-sign-in')).toBeVisible();

    // 2. Seleccionar Sign in para abrir el formulario de login.
    await page.getByTestId('nav-sign-in').click();
    await expect(page).toHaveURL(/\/auth\/login$/);
    await expect(page).toHaveTitle('Login - Practice Software Testing - Toolshop - v5.0');
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    await expect(page.getByTestId('email')).toBeVisible();
    await expect(page.getByTestId('password')).toBeVisible();
    await expect(page.getByTestId('login-submit')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign in with Google' })).toBeVisible();
    await expect(page.getByTestId('register-link')).toBeVisible();
    await expect(page.getByTestId('forgot-password-link')).toBeVisible();
  });
});