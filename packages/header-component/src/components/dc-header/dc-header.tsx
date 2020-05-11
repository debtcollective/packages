import { Component, Prop, State, h, Watch, getAssetPath } from "@stencil/core";
import { syncCurrentUser } from "../../services/session";
import {
  preffixCommunityURL,
  getAvatarURL,
  signupURL,
  loginURL,
} from "../../utils/community";

type User = {
  id: number;
  admin: boolean;
  avatar_template: string;
  username: string;
};

@Component({
  assetsDirs: ["assets"],
  tag: "dc-header",
  styleUrl: "dc-header.css",
  shadow: true,
})
export class Header {
  /**
   * The links you need to display within the header
   * this string needs to be JSON (able to JSON.parse)
   */
  @Prop() links: string;

  /**
   * An object with the user data. Follows Discourse structure as
   * https://docs.discourse.org/#tag/Users/paths/~1users~1{username}.json/get
   */
  @State() user?: User;

  /**
   * Logo image
   */
  private _logo = "logo.png";

  /**
   * Host the value of "links" parsed to an actual Array
   */
  private _links: Array<{ text: string; href: string }>;

  @Watch("links")
  linksDidChangeHandler(newValue) {
    this._links = JSON.parse(newValue);
  }

  async syncCurrentUser() {
    const user = await syncCurrentUser(process.env.COMMUNITY_URL);
    this.user = user;
  }

  componentWillLoad() {
    this.linksDidChangeHandler(this.links);
    return this.syncCurrentUser();
  }

  render() {
    const user = this.user;

    return (
      <header class="header">
        <a class="logo-link" href="/">
          <img
            class="logo"
            src={getAssetPath(`./assets/${this._logo}`)}
            alt="The Debtcollective"
          />
        </a>
        <nav class="nav">
          {this._links.map(({ text, href }) => (
            <div class="nav-item">
              <a class="nav-link" href={href}>
                {text}
              </a>
            </div>
          ))}
          <div class="session-items">
            {user ? (
              <a
                id="current-user"
                href={preffixCommunityURL(`u/${user.username}`)}
                target="_blank"
              >
                <img
                  alt="Profile picture"
                  width="32"
                  height="32"
                  src={getAvatarURL(user)}
                  title={user.username}
                  class="avatar"
                />
              </a>
            ) : (
              <div class="session-links">
                <a href={signupURL} class="btn btn-session">
                  Sign up
                </a>
                <a href={loginURL} class="btn btn-session">
                  Login
                </a>
              </div>
            )}
          </div>
        </nav>
      </header>
    );
  }
}
