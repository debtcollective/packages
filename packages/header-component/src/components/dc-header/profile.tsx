import { Component, h, Prop, Listen, EventEmitter, Event } from "@stencil/core";
import "./link";
import { getAvatarURL, preffixCommunityURL } from "../../utils/community";
import { logout } from "../../services/session";
import { getUserMenuConfig } from "../../utils/config";

@Component({
  assetsDirs: ["assets"],
  tag: "dc-profile",
  styleUrl: "profile.scss",
  shadow: true,
})
export class Profile {
  private _hasNotifications = false;
  private config: ReturnType<typeof getUserMenuConfig>;

  @Prop() expanded: boolean = false;
  @Prop() community: string;
  @Prop() homepage: string;

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

  @Event() toggleProfileMenu: EventEmitter<void>;

  componentWillRender() {
    this.config = getUserMenuConfig({
      community: this.community,
      user: this.user,
      homepage: this.homepage,
    });
    this._hasNotifications =
      this.user.unread_high_priority_notifications > 0 ||
      this.user.unread_notifications > 0;
  }

  @Listen("keydown", { target: "document" })
  handleEscapeKey(event) {
    if (event.keyCode === 27 && this.expanded) this.toggleDropdown();
  }

  async handleLogout() {
    try {
      await logout(this.community, this.user.username);
    } finally {
      window.location.reload();
    }
  }

  toggleDropdown() {
    this.toggleProfileMenu.emit();
  }

  render() {
    return (
      <div class={`profile-dropdown-container`}>
        <button
          aria-label={`toggle user menu ${
            this._hasNotifications ? "(You have notifications)" : ""
          }`}
          class="btn btn-transparent profile-toggle"
          onClick={this.toggleDropdown.bind(this)}
        >
          <span
            class={`notification-badge ${
              this._hasNotifications ? "d-block" : "d-none"
            }`}
          ></span>
          <img
            alt="Profile picture"
            src={getAvatarURL(this.user, this.community)}
            aria-hidden="true"
            class={`avatar ${this.expanded ? "avatar-open" : ""} ${
              this._hasNotifications ? "has-notifications" : ""
            }`}
          />
          <span class="material-icons icon" aria-hidden="true">
            {this.expanded ? "keyboard_arrow_up" : "keyboard_arrow_down"}
          </span>
        </button>
        <div
          class={`profile-dropdown ${
            this.expanded ? "profile-expanded " : "profile-collapsed"
          }`}
        >
          <div class="profile-dropdown-section">
            <p class="text-underlined m-0">{this.user.username}</p>
            <div class="section-links">
              {this.config.profile.items.map((item) => (
                <dc-link
                  class="link-text-icon"
                  namespace="profile"
                  to={item.url}
                >
                  <span aria-hidden="true" class="material-icons mb-1">
                    {item.figure}
                  </span>
                  {item.text}
                </dc-link>
              ))}
            </div>
          </div>

          <div class="profile-dropdown-section mb-1">
            <p class="text-underlined mb-0">Community</p>
            <div class="section-links">
              <dc-link
                class="link-text-icon"
                namespace="profile"
                to={preffixCommunityURL(
                  this.community,
                  `u/${this.user.username}/notifications`
                )}
              >
                <span
                  aria-hidden="true"
                  class={`material-icons mb-1 ${
                    this._hasNotifications ? "notification-color" : ""
                  }`}
                >
                  {this._hasNotifications
                    ? "notifications_active"
                    : "notifications"}
                </span>
                Notifications
              </dc-link>
              {this.config.community.items.map((item) => (
                <dc-link
                  class="link-text-icon"
                  namespace="profile"
                  to={item.url}
                >
                  <span aria-hidden="true" class="material-icons mb-1">
                    {item.figure}
                  </span>
                  {item.text}
                </dc-link>
              ))}
            </div>
          </div>

          <div class="profile-dropdown-footer">
            {this.config.footer.items.map((item) => (
              <dc-link class="btn btn-transparent text-sm" to={item.url}>
                <span class="material-icons mr-1">{item.figure}</span>
                {item.text}
              </dc-link>
            ))}
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
