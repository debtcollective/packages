import { newE2EPage } from '@stencil/core/testing';

describe('dc-dropdown', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<dc-dropdown label=\'Take Action!\' items=\'[{"text":"Events","href":"https://community.debtcollective.org/calendar","target":"_blank"},{"text":"Student Debt Strike","href":"https://strike.debtcollective.org","target":"_blank"},{"text":"Dispute Your Debt","href":"https://tools.debtcollective.org/","target":"_blank"}]\'></dc-dropdown>');
    const element = await page.find('dc-dropdown');
    expect(element).toHaveClass('hydrated');
  });
});
