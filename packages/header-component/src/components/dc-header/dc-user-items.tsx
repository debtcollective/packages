import { Component, h, Host, Prop } from "@stencil/core";
import { preffixCommunityURL, getAvatarURL } from "../../utils/community";

@Component({
  assetsDirs: ["assets"],
  tag: "dc-user-items",
  styleUrl: "dc-user-items.css"
})
export class Menu {
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

  render() {
    const {
      unread_high_priority_notifications: inboxNoticeCount,
      unread_notifications: generalNoticeCount
    } = this.user;

    return (
      <Host class="session-user-items">
        <a
          class="notification-link"
          href={preffixCommunityURL(`u/${this.user.username}/messages`)}
        >
          <div class="notification-icon icons">
            <div id="inbox" class="material-icons">
              email
            </div>
            {inboxNoticeCount !== 0 && (
              <span class="badge-notification unread-private-messages">
                {inboxNoticeCount}
              </span>
            )}
          </div>
        </a>
        <a
          class="notification-link"
          href={preffixCommunityURL(`u/${this.user.username}/notifications`)}
        >
          <div class="notification-icon icons">
            <div id="notifications" class="material-icons">
              notifications
            </div>
            {generalNoticeCount !== 0 && (
              <span class="badge-notification unread-notifications">
                {generalNoticeCount}
              </span>
            )}
          </div>
        </a>
        <a
          id="current-user"
          href={preffixCommunityURL(`u/${this.user.username}`)}
          target="_blank"
        >
          <img
            alt="Profile picture"
            width="32"
            height="32"
            src={getAvatarURL(this.user)}
            title={this.user.username}
            class="avatar"
          />
        </a>
      </Host>
    );
  }
}
