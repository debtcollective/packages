import { Component, Prop, State, h } from "@stencil/core";

@Component({
  tag: "tdc-popup",
  styleUrl: "popup.scss",
  shadow: true
})
export class MyComponent {
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

  private close(e: UIEvent): void {
    e.stopPropagation();
    this.open = false;
  }

  render() {
    if (!this.open) {
      return null;
    }

    return (
      <div class="notification" onClick={() => window.open(this.url)}>
        <div class="notification-col">
          <div class="notification__title">{this.hero}</div>
          {this.date ? (
            <div class="notification__date">Updated {this.date}</div>
          ) : null}
        </div>
        <div class="notification-col">
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
    );
  }
}
