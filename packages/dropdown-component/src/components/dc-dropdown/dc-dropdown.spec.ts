import { newSpecPage } from '@stencil/core/testing';
import { DcDropdown } from './dc-dropdown';

describe('dc-dropdown', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [DcDropdown],
      html:
        '<dc-dropdown label=\'Take Action!\' items=\'[{"text":"Events","href":"https://community.debtcollective.org/calendar","target":"_blank"},{"text":"Student Debt Strike","href":"https://strike.debtcollective.org","target":"_blank"},{"text":"Dispute Your Debt","href":"https://tools.debtcollective.org/","target":"_blank"}]\'></dc-dropdown>',
    });
    expect(root).toMatchInlineSnapshot(`
      <dc-dropdown items="[{&quot;text&quot;:&quot;Events&quot;,&quot;href&quot;:&quot;https://community.debtcollective.org/calendar&quot;,&quot;target&quot;:&quot;_blank&quot;},{&quot;text&quot;:&quot;Student Debt Strike&quot;,&quot;href&quot;:&quot;https://strike.debtcollective.org&quot;,&quot;target&quot;:&quot;_blank&quot;},{&quot;text&quot;:&quot;Dispute Your Debt&quot;,&quot;href&quot;:&quot;https://tools.debtcollective.org/&quot;,&quot;target&quot;:&quot;_blank&quot;}]" label="Take Action!">
        <mock:shadow-root>
          <div class="dropdown-container nav-item">
            <button class="btn btn-transparent nav-link">
              Take Action!
              <span class="material-icons">
                keyboard_arrow_down
              </span>
            </button>
            <div class="dropdown-items hidden">
              <a class="dropdown-item" href="https://community.debtcollective.org/calendar" target="_blank">
                Events
              </a>
              <a class="dropdown-item" href="https://strike.debtcollective.org" target="_blank">
                Student Debt Strike
              </a>
              <a class="dropdown-item" href="https://tools.debtcollective.org/" target="_blank">
                Dispute Your Debt
              </a>
            </div>
          </div>
        </mock:shadow-root>
      </dc-dropdown>
    `);
  });
});
