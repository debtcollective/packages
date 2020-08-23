import {
  Component,
  h,
  Event,
  EventEmitter,
  Prop,
  getAssetPath
} from "@stencil/core";

@Component({
  assetsDirs: ["assets"],
  tag: "dc-menu",
  styleUrl: "dc-menu.css"
})
export class Menu {
  /**
   * Wether or not the mobile menu is displayed
   */
  @Prop() open: boolean;

  @Prop() links: Array<{ text: string; href: string }>;

  @Event() toggleMenu: EventEmitter<void>;

  /**
   * Logo image
   */
  private _logo = "logo.png";

  toggleMenuHandler() {
    this.toggleMenu.emit();
  }

  render() {
    return (
      <div class={`menu-container ${this.open ? "open " : "hidden"}`}>
        <div class="menu-cloak" onClick={this.toggleMenuHandler.bind(this)} />
        <div class="menu">
          <div class="nav-header">
            <a href="/" class="btn-transparent">
              <img
                class="menu-logo"
                src={getAssetPath(`./assets/${this._logo}`)}
                alt="The Debtcollective"
              />
            </a>
            <button
              class="btn-transparent menu-close material-icons"
              aria-label="close menu"
              onClick={this.toggleMenuHandler.bind(this)}
            >
              close
            </button>
          </div>
          <nav class="menu-nav">
            {this.links.map(({ text, href }) => (
              <div class="nav-item">
                <a class="nav-link" href={href}>
                  {text}
                </a>
              </div>
            ))}
          </nav>
        </div>
      </div>
    );
  }
}
