import { test, expect } from '@playwright/test';


test.describe('Todo App Functional UI Test', () => {
  test('should login and perform CRUD operations on todos', async ({ page }) => {
    // Step 1: Navigate to app
    await page.goto('http://localhost:3000');

    // Step 2: Login
    await page.fill('input[placeholder="Username"]', 'test');
    await page.fill('input[placeholder="Password"]', '123');
    await page.click('button[type="submit"]');
    await expect(page.getByText('Todos')).toBeVisible();

    // Step 3: Create todo
    await page.fill('input[placeholder="Add todo"]', 'Buy milk');
    await page.click('button:text("Add")');
    await expect(page.getByText('Buy milk')).toBeVisible();

    // Step 4: Edit todo
    await page.click('button:text("Edit")');
    await page.fill('input[placeholder="Update todo"]', 'Buy milk and eggs');
    await page.click('button:text("Update")');
    await expect(page.getByText('Buy milk and eggs')).toBeVisible();

    // Step 5: Delete todo
    await page.click('button:text("Delete")');
    await expect(page.getByText('Buy milk and eggs')).not.toBeVisible();
  });
});
