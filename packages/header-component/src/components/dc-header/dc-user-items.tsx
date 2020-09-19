import { Component, h, Host, Prop } from "@stencil/core";
import { preffixCommunityURL } from "../../utils/community";
import "./dc-user-popup";
@Component({
  assetsDirs: ["assets"],
  tag: "dc-user-items",
  styleUrl: "dc-user-items.css"
})
export class Menu {
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

  render() {
    const {
      unread_high_priority_notifications: inboxNoticeCount,
      unread_notifications: generalNoticeCount
    } = this.user;

    return (
      <Host class="session-user-items">
        <a
          class="notification-link"
          href={preffixCommunityURL(
            this.community,
            `u/${this.user.username}/messages`
          )}
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
          href={preffixCommunityURL(
            this.community,
            `u/${this.user.username}/notifications`
          )}
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
        <dc-user-popup user={this.user} community={this.community} />
      </Host>
    );
  }
}
