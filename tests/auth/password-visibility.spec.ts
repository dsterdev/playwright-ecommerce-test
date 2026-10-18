import { test, expect } from '@playwright/test';

test.describe('Acceso y presentación del login', () => {
  test('Alternar visibilidad de la contraseña', async ({ page }) => {
    // 1. Abrir login e introducir una contraseña de prueba.
    await page.goto('https://practicesoftwaretesting.com/');
    await page.getByTestId('nav-sign-in').click();
    const password = page.getByTestId('password');
    await password.fill('visibility-test-value');

    // Verificar que el valor está inicialmente enmascarado.
    await expect(password).toHaveAttribute('type', 'password');

    // 2. Mostrar la contraseña con el control de visibilidad.
    const visibilityToggle = page.getByTestId('login-form').getByRole('button').filter({ hasText: /^$/ });
    await visibilityToggle.click();
    await expect(password).toHaveAttribute('type', 'text');
    await expect(password).toHaveValue('visibility-test-value');

    // 3. Volver a enmascarar la contraseña sin perder el valor.
    await visibilityToggle.click();
    await expect(password).toHaveAttribute('type', 'password');
    await expect(password).toHaveValue('visibility-test-value');
  });
});