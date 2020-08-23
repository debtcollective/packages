import {
  Component,
  Prop,
  State,
  h,
  Watch,
  getAssetPath,
  Host,
  Listen
} from "@stencil/core";
import { syncCurrentUser } from "../../services/session";
import "./dc-menu";
import {
  preffixCommunityURL,
  getAvatarURL,
  loginURL
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
  shadow: true
})
export class Header {
  /**
   * The links you need to display within the header
   * this string needs to be JSON (able to JSON.parse)
   */
  @Prop() links: string;

  /**
   * Link to follow in order to prompt user to donate
   */
  @Prop() donateURL: string;

  /**
   * An object with the user data. Follows Discourse structure as
   * https://docs.discourse.org/#tag/Users/paths/~1users~1{username}.json/get
   */
  @State() user?: User;

  /**
   * Wether or not the menu is displayed
   */
  @State() isMenuOpen: boolean;

  /**
   * Logo image
   */
  private _logo = "logo.png";
  private _logoSmall = "logo-small.png";

  /**
   * Host the value of "links" parsed to an actual Array
   */
  private _links: Array<{ text: string; href: string }>;

  @Watch("links")
  linksDidChangeHandler(newValue) {
    this._links = JSON.parse(newValue);
  }

  @Listen("toggleMenu")
  toggleMenuHandler() {
    this.toggleMenu();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
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
      <Host>
        <header class="header">
          <a class="logo-link d-md-flex" href="/">
            <img
              class="logo"
              src={getAssetPath(`./assets/${this._logo}`)}
              alt="The Debtcollective"
            />
          </a>
          <button
            class="btn-transparent logo-link d-md-none"
            onClick={this.toggleMenuHandler.bind(this)}
          >
            <img
              class="logo"
              src={getAssetPath(`./assets/${this._logoSmall}`)}
              alt="The Debtcollective"
            />
            <span class="material-icons ml-1">keyboard_arrow_right</span>
          </button>
          <nav class="nav">
            {this._links.map(({ text, href }) => (
              <div class="nav-item d-md-flex">
                <a class="nav-link" href={href}>
                  {text}
                </a>
              </div>
            ))}
          </nav>
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
                <a href={loginURL} class="btn btn-outline">
                  <span class="d-md-flex">Member</span>&nbsp;Login
                </a>
                <a href={this.donateURL} class="btn btn-primary">
                  Donate
                </a>
              </div>
            )}
          </div>
        </header>
        <dc-menu open={this.isMenuOpen} links={this._links} />
      </Host>
    );
  }
}
