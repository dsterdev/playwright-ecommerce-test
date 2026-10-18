import { test, expect } from '@playwright/test';

test.describe('Validación de campos y errores de autenticación', () => {
  test('Validar contraseña obligatoria cuando el email está completo', async ({ page }) => {
    // 1. Abrir login e introducir un email válido dejando la contraseña vacía.
    await page.goto('https://practicesoftwaretesting.com/');
    await page.getByTestId('nav-sign-in').click();
    await page.getByTestId('email').fill('test@example.com');

    // Enviar el formulario sin contraseña.
    await page.getByTestId('login-submit').click();

    // Verificar que la aplicación solicita la contraseña y no autentica.
    await expect(page).toHaveURL(/\/auth\/login$/);
    await expect(page.getByText('Password is required')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'My account' })).toHaveCount(0);
  });
});