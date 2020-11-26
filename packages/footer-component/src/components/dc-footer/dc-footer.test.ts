import { newSpecPage } from '@stencil/core/testing';
import { DcFooter } from './dc-footer';

describe('dc-footer', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [DcFooter],
      html: '<dc-footer></dc-footer>',
    });
    expect(root).toEqualHtml(`
      <dc-footer>
        <mock:shadow-root>
          <div>
            Hello, World! I'm
          </div>
        </mock:shadow-root>
      </dc-footer>
    `);
  });

  it('renders with values', async () => {
    const { root } = await newSpecPage({
      components: [DcFooter],
      html: `<dc-footer first="Stencil" last="'Don't call me a framework' JS"></dc-footer>`,
    });
    expect(root).toEqualHtml(`
      <dc-footer first="Stencil" last="'Don't call me a framework' JS">
        <mock:shadow-root>
          <div>
            Hello, World! I'm Stencil 'Don't call me a framework' JS
          </div>
        </mock:shadow-root>
      </dc-footer>
    `);
  });
});
