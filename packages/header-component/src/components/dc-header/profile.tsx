import "./link";
import { Component, h, Prop, Listen, EventEmitter, Event } from "@stencil/core";
import { getAvatarURL, preffixCommunityURL } from "../../utils/community";
import { logout } from "../../services/session";

@Component({
  assetsDirs: ["assets"],
  tag: "dc-profile",
  styleUrl: "profile.scss",
})
export class Profile {
  private _hasNotifications = false;

  @Prop() expanded: boolean = false;
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

  @Event() toggleProfileMenu: EventEmitter<void>;

  componentWillRender() {
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
            width="48"
            height="48"
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
              <dc-link
                class="link-text-icon"
                namespace="profile"
                to={preffixCommunityURL(
                  this.community,
                  `u/${this.user.username}`
                )}
              >
                <span aria-hidden="true" class="material-icons mb-1">
                  face
                </span>
                Profile
              </dc-link>
              <dc-link class="link-text-icon" namespace="profile" to="#">
                <span aria-hidden="true" class="material-icons mb-1">
                  account_circle
                </span>
                Membership
              </dc-link>
              <dc-link class="link-text-icon" namespace="profile" to="#">
                <span aria-hidden="true" class="material-icons mb-1">
                  money_off
                </span>
                My Disputes
              </dc-link>
              <dc-link class="link-text-icon" namespace="profile" to="#">
                <span aria-hidden="true" class="material-icons mb-1">
                  savings
                </span>
                My Debt
              </dc-link>
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
              <dc-link
                class="link-text-icon"
                namespace="profile"
                to={preffixCommunityURL(this.community, `upcoming-events`)}
              >
                <span aria-hidden="true" class="material-icons mb-1">
                  event
                </span>
                Events
              </dc-link>
              <dc-link
                class="link-text-icon"
                namespace="profile"
                to={preffixCommunityURL(this.community, `new-topic`)}
              >
                <span aria-hidden="true" class="material-icons mb-1">
                  edit
                </span>
                New Topic
              </dc-link>
              <dc-link
                class="link-text-icon"
                namespace="profile"
                to={preffixCommunityURL(
                  this.community,
                  `u/${this.user.username}/messages`
                )}
              >
                <span aria-hidden="true" class="material-icons mb-1">
                  forum
                </span>
                Messages
              </dc-link>
            </div>
          </div>

          <div class="profile-dropdown-footer">
            <dc-link
              class="btn btn-transparent text-sm"
              to={preffixCommunityURL(
                this.community,
                `u/${this.user.username}/preferences`
              )}
            >
              <span class="material-icons mr-1">settings</span>
              Preferences
            </dc-link>
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
