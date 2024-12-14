import { expect, test } from '@playwright/test';

test('1. 상품(iphone) 검색', async ({ page }) => {
  // 1. 페이지 방문
  await page.goto('/');
  await page.waitForLoadState('networkidle');

  // 2. 검색바
  const searchInput = page.getByTestId('input-search-bar');
  await expect(searchInput).toBeAttached();
  await searchInput.click();
  await searchInput.fill('iphone');

  // 3. 상품 확인
  const product = page.getByRole('link', { name: 'Apple MagSafe Battery Pack' });
  await expect(product).toBeVisible();
});
