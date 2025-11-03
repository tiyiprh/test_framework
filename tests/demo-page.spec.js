import { test, expect } from '@playwright/test';

test.describe('Ansible UI Framework Demo Page', () => {
  test('should load demo page with correct title', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: 'Ansible UI Framework Demo', level: 1 })).toBeVisible();
    await expect(page.getByText('A demonstration of Ansible UI Framework components with PatternFly')).toBeVisible();
  });

  test('should display table with automation jobs', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('grid', { name: 'Simple table' })).toBeVisible();

    await expect(page.getByRole('gridcell', { name: 'Automation Job 1', exact: true })).toBeVisible();
    await expect(page.getByRole('gridcell', { name: 'Automation Job 2', exact: true })).toBeVisible();
    await expect(page.getByRole('gridcell', { name: 'Automation Job 3', exact: true })).toBeVisible();
    await expect(page.getByRole('gridcell', { name: 'Automation Job 4', exact: true })).toBeVisible();
    await expect(page.getByRole('gridcell', { name: 'Automation Job 5', exact: true })).toBeVisible();
  });

  test('should display table headers', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('columnheader', { name: 'Name' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Status' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Created' })).toBeVisible();
  });

  test('should display job statuses correctly', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('gridcell', { name: 'Success', exact: true }).first()).toBeVisible();
    await expect(page.getByRole('gridcell', { name: 'Running', exact: true })).toBeVisible();
    await expect(page.getByRole('gridcell', { name: 'Failed', exact: true })).toBeVisible();
    await expect(page.getByRole('gridcell', { name: 'Pending', exact: true })).toBeVisible();
  });

  test('should display created dates and correct row count', async ({ page }) => {
    await page.goto('/');

    const rows = page.locator('tbody tr');
    await expect(rows).toHaveCount(5);

    await expect(page.getByRole('gridcell', { name: '2024-11-03', exact: true }).first()).toBeVisible();
    await expect(page.getByRole('gridcell', { name: '2024-11-02', exact: true }).first()).toBeVisible();
    await expect(page.getByRole('gridcell', { name: '2024-11-01', exact: true })).toBeVisible();
  });

  test('should display table view toggle buttons', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('button', { name: 'table view', pressed: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'list view' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'card view' })).toBeVisible();
  });

  test('should display pagination controls', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('navigation', { name: 'Pagination' })).toBeVisible();
    await expect(page.getByText('1 - 5')).toBeVisible();
    await expect(page.getByText('of 5')).toBeVisible();
  });
});
