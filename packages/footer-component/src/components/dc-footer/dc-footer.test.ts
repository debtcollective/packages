import { newSpecPage } from '@stencil/core/testing';
import { DcFooter } from './dc-footer';

describe('dc-footer', () => {
  it.only('renders', async () => {
    const { root } = await newSpecPage({
      components: [DcFooter],
      html: '<dc-footer></dc-footer>',
    });

    expect(root).toMatchInlineSnapshot(`
    <dc-footer>
      <footer class="footer">
        <div class="footer__content">
          <section class="footer__section">
            <dc-logo></dc-logo>
            <dc-social-media></dc-social-media>
          </section>
          <section class="footer__section">
            <div class="footer__links">
              <p class="footer__links__title">
                organize
              </p>
              <ul>
                <li class="footer__links__item">
                  <a href="http://chapters.debtcollective.org/" rel="noreferrer" target="_blank">
                    Debt Collective Chapters
                  </a>
                </li>
                <li class="footer__links__item">
                  <a href="https://community.debtcollective.org/" rel="noreferrer" target="_blank">
                    Community Forum
                  </a>
                </li>
              </ul>
            </div>
            <div class="footer__links">
              <p class="footer__links__title">
                take action
              </p>
              <ul>
                <li class="footer__links__item">
                  <a href="https://community.debtcollective.org/calendar" rel="noreferrer" target="_blank">
                    Events
                  </a>
                </li>
                <li class="footer__links__item">
                  <a href="https://tools.debtcollective.org/" rel="noreferrer" target="_blank">
                    Dispute Your Debt
                  </a>
                </li>
                <li class="footer__links__item">
                  <a href="https://strike.debtcollective.org/" rel="noreferrer" target="_blank">
                    Student Debt Strike
                  </a>
                </li>
              </ul>
            </div>
            <div class="footer__links">
              <p class="footer__links__title">
                learn more
              </p>
              <ul>
                <li class="footer__links__item">
                  <a href="https://www.youtube.com/c/DebtCollective" rel="noreferrer" target="_blank">
                    Debt Collective YouTube
                  </a>
                </li>
                <li class="footer__links__item">
                  <a href="https://powerreport.debtcollective.org/" rel="noreferrer" target="_blank">
                    Community Voice: The Power Report
                  </a>
                </li>
              </ul>
            </div>
            <div class="footer__links">
              <p class="footer__links__title">
                more
              </p>
              <ul>
                <li class="footer__links__item">
                  <a href="https://tools.debtcollective.org/contact" rel="noreferrer" target="_blank">
                    Contact
                  </a>
                </li>
                <li class="footer__links__item">
                  <a href="/donate" rel="noreferrer" target="_blank">
                    Donate
                  </a>
                </li>
              </ul>
            </div>
          </section>
          <section class="footer__section">
            <p class="footer__section__copyright">
              Copyright 2020
            </p>
            <a class="footer__section__terms" href="https://community.debtcollective.org/tos" rel="noreferrer noopener" target="_blank">
              Terms and Conditions
            </a>
          </section>
        </div>
      </footer>
    </dc-footer>
    `);
  });
});
