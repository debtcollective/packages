import { Component, h, Host } from '@stencil/core';
import './dc-logo';
import './dc-social-media';

const CURRENT_YEAR = new Date().getFullYear();

@Component({
  assetsDirs: ['assets'],
  styleUrl: 'dc-footer.css',
  tag: 'dc-footer',
})
export class DcFooter {
  private footerSections = [
    {
      title: 'organize',
      links: [
        {
          label: 'Debt Collective Chapters',
          href: 'http://chapters.debtcollective.org/',
        },
        {
          label: 'Debt Collective Volunteer',
          href: 'https://volunteer.debtcollective.org/',
        },
        {
          label: 'Community Forum',
          href: 'https://community.debtcollective.org/',
        },
      ],
    },
    {
      title: 'take action',
      links: [
        {
          label: 'Biden Jubilee 100',
          href: 'https://biden100.debtcollective.org/',
        },
        {
          label: 'Events',
          href: 'https://community.debtcollective.org/calendar',
        },
        {
          label: 'Dispute Your Debt',
          href: 'https://tools.debtcollective.org/',
        },
        {
          label: 'Student Debt Strike',
          href: 'https://strike.debtcollective.org/',
        },
      ],
    },
    {
      title: 'learn more',
      links: [
        {
          label: 'Debt Collective YouTube',
          href: 'https://www.youtube.com/c/DebtCollective',
        },
        {
          label: 'Community Voice: The Power Report',
          href: 'https://powerreport.debtcollective.org/',
        },
      ],
    },
    {
      title: 'more',
      links: [
        {
          label: 'Contact',
          href: 'https://tools.debtcollective.org/contact',
        },
        {
          label: 'Donate',
          href: '/donate',
        },
      ],
    },
  ];

  render() {
    return (
      <Host>
        <footer class="footer">
          <div class="footer__content">
            <section class="footer__section">
              <dc-logo />
              <dc-social-media />
            </section>
            <section class="footer__section">
              {this.footerSections.map(item => (
                <div class="footer__links">
                  <p class="footer__links__title">{item.title}</p>
                  <ul>
                    {item.links?.map(link => (
                      <li class="footer__links__item">
                        <a href={link.href} target="_blank" rel="noreferrer">
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
            <section class="footer__section">
              <p class="footer__section__copyright">Copyright {CURRENT_YEAR}</p>
              <a class="footer__section__terms" href="https://community.debtcollective.org/tos" target="_blank" rel="noreferrer noopener">
                Terms and Conditions
              </a>
            </section>
          </div>
        </footer>
      </Host>
    );
  }
}
