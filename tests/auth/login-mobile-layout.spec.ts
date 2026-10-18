import { test, expect } from '@playwright/test';

test.describe('Usabilidad y accesibilidad del login', () => {
  test('Usar login en viewport móvil', async ({ page }) => {
    // 1. Abrir login en un viewport móvil y verificar que los controles caben.
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('https://practicesoftwaretesting.com/auth/login');
    const email = page.getByTestId('email');
    const password = page.getByTestId('password');
    const submit = page.getByTestId('login-submit');

    await expect(email).toBeVisible();
    await expect(email).toBeInViewport();
    await expect(password).toBeVisible();
    await expect(password).toBeInViewport();
    await expect(submit).toBeVisible();
    await expect(submit).toBeInViewport();

    // 2. Completar el formulario y confirmar que se puede enviar desde móvil.
    await email.fill('mobile-check@example.com');
    await password.fill('incorrect-password');
    await submit.click();
    await expect(page).toHaveURL(/\/auth\/login$/);
    await expect(page.getByText('Invalid email or password')).toBeVisible();
  });
});