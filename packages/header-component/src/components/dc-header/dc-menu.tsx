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
          <nav class="menu-section menu-nav">
            <a href="/join-union" class="menu-nav-item menu-nav-text-lg">
              Join the Union
            </a>
            <a href="/browse-events" class="menu-nav-item menu-nav-text-lg">
              Browse Events
            </a>
            <details class="menu-nav-item-collapsable">
              <summary class="menu-nav-text-lg">
                Cancel Student Debt
                <div class="material-icons icon icon-more">expand_more</div>{" "}
                <div class="material-icons icon icon-less">expand_less</div>
              </summary>
              <div class="menu-nav-item-nested">
                <a href="/sign" class="menu-nav-text">
                  Sign the petition
                </a>
                <a href="/sign" class="menu-nav-text">
                  Email your reps
                </a>
              </div>
            </details>
            <details class="menu-nav-item-collapsable">
              <summary class="menu-nav-text-lg">
                For Members
                <div class="material-icons icon icon-more">
                  expand_more
                </div>{" "}
                <div class="material-icons icon icon-less">expand_less</div>
              </summary>
              <div class="menu-nav-item-nested">
                <a href="/sign" class="menu-nav-text">
                  Dispute your Debt
                </a>
                <a href="/sign" class="menu-nav-text">
                  Connect with other debtors
                </a>
                <a href="/sign" class="menu-nav-text">
                  Join a working group
                </a>
                <a href="/sign" class="menu-nav-text">
                  Join or start a local branch
                </a>
                <a href="/sign" class="menu-nav-text">
                  Join a Committee
                </a>
                <a href="/sign" class="menu-nav-text">
                  View Past Trainings
                </a>
              </div>
            </details>
            <details class="menu-nav-item-collapsable">
              <summary class="menu-nav-text-lg">
                About{" "}
                <div class="material-icons icon icon-more">expand_more</div>{" "}
                <div class="material-icons icon icon-less">expand_less</div>
              </summary>
              <div class="menu-nav-item-nested">
                <a href="/sign" class="menu-nav-text">
                  Our Union
                </a>
                <a href="/sign" class="menu-nav-text">
                  Learn about debt
                </a>
              </div>
            </details>
          </nav>
          <div class="menu-section menu-footer mt-auto">
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
