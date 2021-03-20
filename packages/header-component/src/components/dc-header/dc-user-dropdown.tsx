import { Component, h, State, Prop, Listen } from "@stencil/core";
import { getAvatarURL, preffixCommunityURL } from "../../utils/community";
import { logout } from "../../services/session";

const ARROW_UP_KEY = "ArrowUp";
const ARROW_DOWN_KEY = "ArrowDown";

@Component({
  assetsDirs: ["assets"],
  tag: "dc-user-dropdown",
  styleUrl: "dc-user-dropdown.css",
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
    this.itemsRefs = [];
  }

  isKeyDown(key: string): boolean {
    return key === ARROW_DOWN_KEY;
  }

  isKeyUp(key: string): boolean {
    return key === ARROW_UP_KEY;
  }

  handleArrowDown(index: number) {
    const indexOfLastElement = this.itemsRefs.length - 1;
    const isLastElement = index === indexOfLastElement;
    const nextElement = this.itemsRefs[index + 1];

    isLastElement ? this.logoutRef.focus() : nextElement.focus();
  }

  handleArrowUp(index: number) {
    const isFirstElement = index === 0;
    const nextElement = this.itemsRefs[index - 1];

    isFirstElement ? this.usernameRef.focus() : nextElement.focus();
  }

  handleItemKeyDown(event, index) {
    if (this.isKeyDown(event.key)) this.handleArrowDown(index);
    if (this.isKeyUp(event.key)) this.handleArrowUp(index);
  }

  handleAvatarKeyDown(event) {
    if (this.isKeyDown(event.key)) {
      this.openPopup();
      this.usernameRef.focus();
    }
  }

  handleUsernameButtonKeyDown(event) {
    const firstElement = this.itemsRefs[0];

    if (this.isKeyDown(event.key)) firstElement.focus();
    if (this.isKeyUp(event.key)) this.logoutRef.focus();
  }

  handleLogoutButtonKeyDown(event) {
    const lastElement = this.itemsRefs[this.itemsRefs.length - 1];

    if (this.isKeyDown(event.key)) this.usernameRef.focus();
    if (this.isKeyUp(event.key)) lastElement.focus();
  }

  async handleLogout() {
    try {
      await logout(this.community, this.user.username);
    } finally {
      window.location.reload();
    }
  }

  render() {
    const items: Array<{ text: string; href: string; icon: string }> = [
      {
        text: "Member hub",
        href: "https://debtcollective.org/hub",
        icon: "account_circle",
      },
      {
        text: "Activity",
        href: preffixCommunityURL(
          this.community,
          `u/${this.user.username}/activity`
        ),
        icon: "subject",
      },
      {
        text: "Drafts",
        href: preffixCommunityURL(
          this.community,
          `u/${this.user.username}/activity/drafts`
        ),
        icon: "edit",
      },
      {
        text: "Preferences",
        href: preffixCommunityURL(
          this.community,
          `u/${this.user.username}/preferences/account`
        ),
        icon: "settings",
      },
    ];

    return (
      <div class={`user-dropdown-container`}>
        <button
          class="btn btn-transparent"
          onClick={this.togglePopup.bind(this)}
          ref={(el) => (this.popupTriggerElement = el)}
          onKeyDown={this.handleAvatarKeyDown.bind(this)}
        >
          <img
            alt="Profile picture"
            width="32"
            height="32"
            src={getAvatarURL(this.user, this.community)}
            title={this.user.username}
            class={`avatar ${this.open ? "avatar-open" : ""}`}
          />
          <span class="material-icons">
            {this.open ? "keyboard_arrow_up" : "keyboard_arrow_down"}
          </span>
        </button>
        <div
          class={`user-dropdown-items ${this.open ? "open " : "hidden"}`}
          onMouseLeave={this.closePopup.bind(this)}
          ref={(el) => (this.popupItems = el)}
        >
          <a
            href={preffixCommunityURL(
              this.community,
              `u/${this.user.username}`
            )}
            class="user-dropdown-item"
            target="_blank"
            onKeyDown={this.handleUsernameButtonKeyDown.bind(this)}
            ref={(item) => (this.usernameRef = item)}
            id="username"
          >
            {this.user.username}
            <small>Community Profile</small>
          </a>
          {items.map((item, index) => (
            <a
              href={item.href}
              class="user-dropdown-item"
              target="_blank"
              onKeyDown={(event) => this.handleItemKeyDown(event, index)}
              ref={(item) => (this.itemsRefs[index] = item)}
            >
              <span class="material-icons">{item.icon}</span>
              {item.text}
            </a>
          ))}
          <button
            class="btn btn-transparent user-dropdown-item"
            onClick={this.handleLogout.bind(this)}
            ref={(item) => (this.logoutRef = item)}
            onKeyDown={this.handleLogoutButtonKeyDown.bind(this)}
          >
            <span class="material-icons">exit_to_app</span>
            Logout
          </button>
        </div>
      </div>
    );
  }
}
