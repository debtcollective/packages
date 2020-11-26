import { newE2EPage } from '@stencil/core/testing';

describe('dc-footer', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<dc-footer></dc-footer>');
    const element = await page.find('dc-footer');
    expect(element).toHaveClass('hydrated');
  });
});
