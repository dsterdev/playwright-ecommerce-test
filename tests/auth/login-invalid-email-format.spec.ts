import { test, expect } from '@playwright/test';

test.describe('Validación de campos y errores de autenticación', () => {
  test('Rechazar formatos de email inválidos', async ({ page }) => {
    // 1. Abrir el login y completar campos con formato de email inválido.
    await page.goto('https://practicesoftwaretesting.com/');
    await page.getByTestId('nav-sign-in').click();
    await page.getByTestId('email').fill('not-an-email');
    await page.getByTestId('password').fill('test-password');

    // Enviar el formulario con el email mal formado.
    await page.getByTestId('login-submit').click();

    // Verificar la validación de formato y que no se inicia sesión.
    await expect(page).toHaveURL(/\/auth\/login$/);
    await expect(page.getByText('Email format is invalid')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'My account' })).toHaveCount(0);
  });
});