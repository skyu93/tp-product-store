import { expect, test } from '@playwright/test';

test('장바구니', async ({ page }) => {
  const productName = 'Essence Mascara Lash Princess';

  // 1. 페이지 방문
  await page.goto('/');
  await page.waitForLoadState('networkidle');

  await test.step('1. 장바구니에 상품 넣기', async () => {
    // 2. 상품 상세페이지 이동
    const product = page.getByRole('link', { name: productName });
    await product.click();

    //3. 장바구니 담기
    const addCartButton = page.getByRole('button', { name: '장바구니 추가' });
    await addCartButton.click();

    const countBadge = page.getByTestId('count-badge');
    await expect(countBadge).toContainText('1');
  });

  // 페이지 이동
  await page.goto('/#/cart');

  await test.step('2. 장바구니에 상품 확인', async () => {
    const products = await page.getByTestId('cart-item').all();
    expect(products.length).toBe(1);

    const orderButton = page.getByRole('button', { name: '주문하기' });
    await expect(orderButton).toBeVisible();
    await expect(orderButton).toBeDisabled();
  });

  await test.step('3. 장바구니 첫번째 상품 주문하기', async () => {
    const products = await page.getByTestId('cart-item').all();
    expect(products.length).toBe(1);

    const checkBox = products[0].locator('input');
    await checkBox.click();
    const isChecked = await checkBox.isChecked();
    expect(isChecked).toBe(true);

    const orderButton = page.getByRole('button', { name: '주문하기' });
    await expect(orderButton).toBeEnabled();
    await orderButton.click();
  });

  await test.step('4. 장바구니에 첫번째 상품 삭제하기', async () => {
    const deleteButton = page.getByRole('button', { name: 'X 선택 삭제' });
    await expect(deleteButton).toBeVisible();
    await expect(deleteButton).toBeEnabled();

    await deleteButton.click();

    const products = await page.getByTestId('cart-item').all();
    expect(products.length).toBe(0);
  });
});
