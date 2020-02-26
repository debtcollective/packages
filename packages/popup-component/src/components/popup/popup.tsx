import { Component, Prop, State, h } from "@stencil/core";

@Component({
  tag: "tdc-popup",
  styleUrl: "popup.scss",
  shadow: true
})
export class MyComponent {
  /**
   * Title
   */
  @Prop() title: string;

  /**
   * Date
   */
  @Prop() date: string;

  /**
   * If false the component will be hidden
   */
  @State() open: boolean = true;

  private close(): void {
    this.open = false;
  }

  render() {
    if (!this.open) {
      return null;
    }

    return (
      <div class="notification alert" role="alert">
        <div class="notification-col">
          <div class="notification__title">{this.title}</div>
          <div class="notification__date">Updated {this.date}</div>
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
          data-dismiss="alert"
          aria-label="Close"
          onClick={() => this.close()}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    );
  }
}
