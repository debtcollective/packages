import {
  Component,
  h,
  Event,
  EventEmitter,
  Prop,
  getAssetPath
} from "@stencil/core";
import { HOME_PAGE_LINK } from "./dc-header";

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

  /**
   * Logo src to use a custom image for the header
   */
  @Prop() logo: string;

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
            <a href={HOME_PAGE_LINK}>
              <img
                class="menu-logo"
                src={this.logo || getAssetPath(`./assets/${this._logo}`)}
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
            <slot />
          </nav>
        </div>
      </div>
    );
  }
}
