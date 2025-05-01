import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) =>
{
	// Runs before each test and signs in each page.
	await page.goto('https://cpnb.hostmh.com/cpnb/mapplogin.aspx');
	await page.locator('#ctl00_MPFormContent_UcLabeledTextUsername_MomTextEdit1').fill('admin');
	await page.locator('#ctl00_MPFormContent_UcLabeledTextUsername_MomTextEdit1').press('Tab');
	await page.locator('#ctl00_MPFormContent_UcLabeledEditPassword_MomTextEdit1').fill('Momentum1');
	await page.locator('#ctl00_MPFormContent_UcLabeledEditPassword_MomTextEdit1').press('Enter');
});
test('NFLD ID Validation', async ({ page }) =>
{
	test.setTimeout(120_000);
	await page.getByRole('cell', { name: 'NFLD - Home Care (Main)' }).dblclick();
	await page.getByText('Client Management').click();
	await page.getByText('Search', { exact: true }).click();
    await page.locator('#ctl00_MPFormContent_UcClientChartSearchResults1_UcLabeledGrid1_EditableGrid_ctl00_ctl04_gbcSelect').click();
	await page.locator('#ctl00_MPToolbarContent_UcToolbar1_MomWebTab1').getByText('Assessment').click();
	await page.getByRole('button', { name: 'New' }).click();
	await page.getByRole('cell', { name: 'interRAI™ ID v9.3.0 (NFLD v1)' }).dblclick();
	await page.locator('#ctl00_MPFormContent_IFRAMEShim').contentFrame().getByText('Routine reassessment (2)').click();
	await page.locator('#ctl00_MPFormContent_IFRAMEShim').contentFrame().getByRole('button', { name: 'Toggle calendar' }).click();
	await page.locator('#ctl00_MPFormContent_IFRAMEShim').contentFrame().getByRole('button', { name: 'Today' }).click();
	await page.locator('#ctl00_MPFormContent_IFRAMEShim').contentFrame().locator('#control137').getByText('Check Errors').click();
	await expect(page.locator('#ctl00_MPFormContent_IFRAMEShim').contentFrame().getByText('A12a. Admitted From this field is required')).toBeVisible();
	await page.locator('#ctl00_MPFormContent_IFRAMEShim').contentFrame().getByRole('button', { name: 'OK', exact: true }).click();
	await page.getByRole('button', { name: 'Return' }).click();
	await page.getByRole('button', { name: 'Delete' }).click();
	await page.getByRole('button', { name: 'OK' }).click();
});