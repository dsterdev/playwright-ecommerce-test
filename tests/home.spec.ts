import { test, expect } from '@playwright/test';


test('TC02 Order Products by Name A-Z', async ({ page }) => {

    await page.goto('https://practicesoftwaretesting.com/');
    //validate the title of the page
    await expect(page).toHaveTitle(/Practice Software Testing - Toolshop - v5.0/);

    await page.getByRole('link', { name: 'Sign in' }).click();

    await page.getByRole('textbox', { name: 'Email address *' }).fill('customer3@practicesoftwaretesting.com');
    await page.getByRole('textbox', { name: 'Password *' }).fill('pass123');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.locator('h1')).toHaveText('My account');
    await page.getByRole('link', { name: 'Home' }).click();


    //obtener lista al dar click en inicio 
    const productListAntes = page.getByTestId('product-name');
    await expect(productListAntes.first()).not.toHaveText('');
    const innertextAntes = await productListAntes.first().innerText();
    console.log(`innertextAntes: ${innertextAntes}`);


    await page.getByRole('combobox', { name: 'sort' }).selectOption({ label: 'Name (A - Z)' });

    const productList = page.getByTestId('product-name');
    await expect(productList.first()).not.toHaveText(innertextAntes);

    const products = await productList.allInnerTexts();
    console.log(`products: ${products}`);
    const sortedProducts = [...products].sort();
    // ordenar los sortedProduct alfabeticamente
    // const expectedTitles = [...sortedProducts].sort((a, b) => a.localeCompare(b));
    expect(sortedProducts).toEqual(products);

})