import { Component, h, Event, EventEmitter, Prop } from "@stencil/core";

@Component({
  assetsDirs: ["assets"],
  tag: "dc-menu",
  styleUrl: "menu.scss",
})
export class Menu {
  /**
   * Wether or not the mobile menu is displayed
   */
  @Prop() open: boolean;

  @Event() toggleMenu: EventEmitter<void>;

  toggleMenuHandler() {
    this.toggleMenu.emit();
  }

  render() {
    return (
      <div class={`menu-container ${this.open ? "open " : "hidden"}`}>
        <div class="menu-cloak" onClick={this.toggleMenuHandler.bind(this)} />
        <div class="menu">
          <div class="menu-section menu-header">
            <button
              class="btn-transparent menu-close material-icons"
              aria-label="close menu"
              onClick={this.toggleMenuHandler.bind(this)}
            >
              close
            </button>
          </div>
          <nav class="menu-section menu-nav">Menu nav</nav>
          <div class="menu-section menu-footer">
            <a class="icon" href="#">
              tw
            </a>
            <a class="icon" href="#">
              fb
            </a>
            <a class="icon" href="#">
              ig
            </a>
          </div>
        </div>
      </div>
    );
  }
}
