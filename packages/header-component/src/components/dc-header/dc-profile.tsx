import { Component, h, State, Prop, Listen } from "@stencil/core";
import { getAvatarURL } from "../../utils/community";
import { logout } from "../../services/session";

@Component({
  assetsDirs: ["assets"],
  tag: "dc-profile",
  styleUrl: "profile.scss",
})
export class UserPopup {
  @State() open: boolean = false;

  @State() itemsRefs: HTMLElement[] = [];
  /**
   * URL to the community
   */
  @Prop() community: string;

  /**
   * An object with the user data. Follows Discourse structure as
   * https://docs.discourse.org/#tag/Users/paths/~1users~1{username}.json/get
   */
  @Prop() user: {
    id: number;
    admin: boolean;
    avatar_template: string;
    username: string;
    unread_notifications: number;
    unread_high_priority_notifications: number;
  };

  /**
   * Event to detect outside clicks from the popup
   */
  @Listen("click", { target: "document" })
  handleClickOutside(event) {
    const target = event.composedPath()[0];

    if (
      this?.popupTriggerElement?.contains(target) ||
      this?.popupItems?.contains(target)
    ) {
      return;
    }

    this.closePopup();
  }

  /**
   *  Event to detect escape key press
   */
  @Listen("keydown", { target: "document" })
  handleEscapeKey(event) {
    if (event.keyCode === 27) this.closePopup();
  }

  popupTriggerElement!: Node;
  popupItems!: Node;
  logoutRef: HTMLElement;
  usernameRef: HTMLElement;

  togglePopup() {
    this.open = !this.open;
  }

  openPopup() {
    this.open = true;
  }

  closePopup() {
    this.open = false;
  }

  async handleLogout() {
    try {
      await logout(this.community, this.user.username);
    } finally {
      window.location.reload();
    }
  }

  render() {
    return (
      <div class={`profile-dropdown-container`}>
        <button
          class="btn btn-transparent"
          onClick={this.togglePopup.bind(this)}
        >
          <img
            alt="Profile picture"
            width="48"
            height="48"
            src={getAvatarURL(this.user, this.community)}
            title={this.user.username}
            class={`avatar ${this.open ? "avatar-open" : ""}`}
          />
          <span class="material-icons">
            {this.open ? "keyboard_arrow_up" : "keyboard_arrow_down"}
          </span>
        </button>
        <div
          class={`profile-dropdown ${this.open ? "open " : "hidden"}`}
          onMouseLeave={this.closePopup.bind(this)}
          ref={(el) => (this.popupItems = el)}
        >
          <div class="profile-dropdown-section">
            <p class="text-underlined m-0">{this.user.username}</p>
            <div class="section-links">
              <a class="link-text-icon" href="#">
                <span aria-hidden="true" class="material-icons mb-1">
                  face
                </span>
                Profile
              </a>
              <a class="link-text-icon" href="#">
                <span aria-hidden="true" class="material-icons mb-1">
                  account_circle
                </span>
                Membership
              </a>
              <a class="link-text-icon" href="#">
                <span aria-hidden="true" class="material-icons mb-1">
                  money_off
                </span>
                My Disputes
              </a>
              <a class="link-text-icon" href="#">
                <span aria-hidden="true" class="material-icons mb-1">
                  savings
                </span>
                Events
              </a>
            </div>
          </div>

          <div class="profile-dropdown-section mb-1">
            <p class="text-underlined mb-0">Community</p>
            <div class="section-links">
              <a class="link-text-icon" href="#">
                <span aria-hidden="true" class="material-icons mb-1">
                  notifications
                </span>
                Notifications
              </a>
              <a class="link-text-icon" href="#">
                <span aria-hidden="true" class="material-icons mb-1">
                  event
                </span>
                Events
              </a>
              <a class="link-text-icon" href="#">
                <span aria-hidden="true" class="material-icons mb-1">
                  edit
                </span>
                Drafts
              </a>
              <a class="link-text-icon" href="#">
                <span aria-hidden="true" class="material-icons mb-1">
                  forum
                </span>
                Messages
              </a>
            </div>
          </div>

          <div class="profile-dropdown-footer">
            <button class="btn btn-transparent text-sm">
              <span class="material-icons mr-1">settings</span>
              Preferences
            </button>
            <button
              class="btn btn-transparent text-sm"
              onClick={this.handleLogout.bind(this)}
            >
              <span class="material-icons mr-1">exit_to_app</span>
              Logout
            </button>
          </div>
        </div>
        <div class="connector"></div>
      </div>
    );
  }
}
