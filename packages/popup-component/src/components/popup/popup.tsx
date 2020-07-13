import { Component, Prop, State, h } from "@stencil/core";
import Cookies from 'js-cookie';

@Component({
  tag: "dc-popup",
  styleUrl: "popup.scss",
  shadow: true
})
export class DcPopup {
  /**
   * Hero
   */
  @Prop() hero: string;

  /**
   * URL
   */
  @Prop() url: string = "https://strike.debtcollective.org";

  /**
   * Date
   */
  @Prop() date: string;

  /**
   * If false the component will be hidden
   */
  @State() open: boolean = true;

  componentWillLoad() {
    const heroMessageCookie = Cookies.get('hero-message');
    const isSameMessage = heroMessageCookie === this.hero;

    if (heroMessageCookie && isSameMessage) {
      this.open = false;
    }
  }

  private close(e: UIEvent): void {
    e.stopPropagation();
    this.open = false;
  }

  private closeAndStoreCookie(e: UIEvent): void {
    this.close(e);
    Cookies.set("hero-message", this.hero);
  }

  render() {
    if (!this.open) {
      return null;
    }

    return (
      <div class="notification" onClick={() => window.open(this.url)}>
        <div class="flex-row">
          <div class="notification-col">
            <div class="notification__title">{this.hero}</div>
            {this.date ? (
              <div class="notification__date">Updated {this.date}</div>
            ) : null}
            <div class="notification__content">
              {/* This is used by Stencil to pass HTML to components, just like react's children */}
              <slot />
            </div>
          </div>
          <button
            type="button"
            class="close"
            aria-label="Close"
            onClick={e => this.close(e)}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <button
          type="button"
          class="notification__action"
          aria-label="close popup"
          onClick={e => this.closeAndStoreCookie(e)}
          >
            Ok, got it!
        </button>
      </div>
    );
  }
}
