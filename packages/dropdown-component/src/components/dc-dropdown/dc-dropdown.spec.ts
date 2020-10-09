import { newSpecPage } from '@stencil/core/testing';
import { DcDropdown } from './dc-dropdown';

describe('dc-dropdown', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [DcDropdown],
      html: '<dc-dropdown></dc-dropdown>',
    });
    expect(root).toEqualHtml(`
      <dc-dropdown>
        <mock:shadow-root>
          <div>
            Hello, World! I'm
          </div>
        </mock:shadow-root>
      </dc-dropdown>
    `);
  });

  it('renders with values', async () => {
    const { root } = await newSpecPage({
      components: [DcDropdown],
      html: `<dc-dropdown first="Stencil" last="'Don't call me a framework' JS"></dc-dropdown>`,
    });
    expect(root).toEqualHtml(`
      <dc-dropdown first="Stencil" last="'Don't call me a framework' JS">
        <mock:shadow-root>
          <div>
            Hello, World! I'm Stencil 'Don't call me a framework' JS
          </div>
        </mock:shadow-root>
      </dc-dropdown>
    `);
  });
});
