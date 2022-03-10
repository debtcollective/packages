import "./menu";
import "./profile";
import "./link";
import {
  Component,
  Prop,
  State,
  h,
  getAssetPath,
  Host,
  Listen,
  Event,
  EventEmitter,
} from "@stencil/core";
import { syncCurrentUser } from "../../services/session";
import { getGuestActions } from "../../utils/config";
import { addSlash } from "../../utils/normalise";

type User = {
  id: number;
  admin: boolean;
  avatar_template: string;
  username: string;
  unread_notifications: number;
  unread_high_priority_notifications: number;
};
@Component({
  assetsDirs: ["assets"],
  tag: "dc-header",
  styleUrl: "header.scss",
  shadow: true,
})
export class Header {
  private _logo;
  private _logoSmall;
  private _defaultLogo = getAssetPath("./assets/logo.png");
  private _defaultLogoSmall = getAssetPath("./assets/logo-small.png");
  private config: ReturnType<typeof getGuestActions>;

  /**
   * An object with the user data. Follows Discourse structure as
   * https://docs.discourse.org/#tag/Users/paths/~1users~1{username}.json/get
   */
  @State() user?: User;

  /**
   * Whether or not the header is shrink
   */
  @State() isShrink: boolean;

  /**
   * Current scroll position to allow to infer scroll direction
   */
  @State() scrollTop: number;

  /**
   * Whether or not the menu is displayed
   */
  @State() isMenuOpen: boolean;

  /**
   * Whether or not the profile menu is displayed
   */
  @State() isProfileMenuOpen: boolean;

  /**
   * URL to the homepage
   * with the latest "/"
   */
  @Prop() homepage: string = "https://debtcollective.org/";

  /**
   * URL to the community
   * with the latest "/"
   */
  @Prop() community: string = "https://community.debtcollective.org/";

  /**
   * URL to the wordpress menu
   * with the latest "/"
   */
  @Prop() wordpress: string = "https://debtcollective.org/wp-json/menus/v1/menus/2";

  /**
   * URL to use after login processed typically full URL from host
   * with the latest "/"
   */
  @Prop() returnurl: string;

  /**
   * Due to the complexity to make assets available for now we will allow
   * host application to indicate where the logo asset can be found
   * https://stenciljs.com/docs/custom-elements#making-assets-available
   */
  @Prop() logo;
  @Prop() logosmall;

  /**
   * Emit event to exposed fetched user on host application
   */
  @Event({
    eventName: "userSynced",
    composed: true,
    cancelable: true,
    bubbles: true,
  })
  userSynced: EventEmitter<User>;

  componentWillRender() {
    this.config = getGuestActions({
      community: this.community,
      homepage: this.homepage,
      returnUrl: this.returnurl,
    });
  }

  // A return promise here will force to wait before first render
  componentWillLoad() {
    // Make sure to get the logo from prop or use default
    this._logo = this.logo || this._defaultLogo;
    this._logoSmall = this.logosmall || this._defaultLogoSmall;
    // normalise the links to make sure they match the expected format
    this.homepage = addSlash(this.homepage);
    this.community = addSlash(this.community);
    // Allow to fetch users session
    this.syncCurrentUser();
  }

  @Listen("scroll", { target: "window" })
  handleScroll(e) {
    const scrollTop = e.target?.scrollingElement?.scrollTop;
    // set shrink to true whenever the scroll direction is down
    this.isShrink = scrollTop > this.scrollTop;
    this.scrollTop = scrollTop;
  }

  @Listen("toggleMenu")
  toggleMenuHandler() {
    this.toggleMenu();
  }

  @Listen("toggleProfileMenu")
  toggleProfileMenuHandler() {
    this.toggleProfileMenu();
  }

  @Listen("closeAll")
  closeAll() {
    this.isMenuOpen = false;
    this.isProfileMenuOpen = false;
  }

  async syncCurrentUser() {
    const user = await syncCurrentUser(this.community);

    this.user = user;
    this.userSynced.emit(user);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleProfileMenu() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  render() {
    return (
      <Host>
        <header
          class={`navbar-top navbar l-header ${
            this.isMenuOpen ? "is-moved" : ""
          } ${this.isShrink ? "is-shrink" : ""}`}
        >
          <div class="l-header-item btn-container navbar-item">
            <button
              class="btn-transparent"
              onClick={this.toggleMenuHandler.bind(this)}
            >
              <span class="material-icons">menu</span>
            </button>
          </div>
          <div class="l-header-item logo-container navbar-item">
            <a
              class={`logo ${this.isShrink ? "logo-shrink" : ""}`}
              href={this.homepage}
            >
              <img
                class="d-sm-none"
                src={this._logoSmall}
                alt="The Debtcollective"
              />
              <img
                class="d-none d-sm-block ml-2 fixed-size"
                src={this._logo}
                alt="The Debtcollective"
              />
            </a>
          </div>
          <div class="l-header-item session-container navbar-item">
            {this.user ? (
              <dc-profile
                shrank={this.isShrink}
                user={this.user}
                homepage={this.homepage}
                community={this.community}
                expanded={this.isProfileMenuOpen}
              />
            ) : (
              <span class="d-none d-sm-flex ml-auto">
                <a href={this.config.login.url} class="btn-outline">
                  {this.config.login.text}
                </a>
                <a href={this.config.join.url} class="btn-primary ml-1">
                  {this.config.join.text}
                </a>
              </span>
            )}
          </div>
        </header>
        {this.user ? null : (
          <div
            class={`navbar-bottom navbar d-sm-none ${
              this.isMenuOpen ? "is-moved" : ""
            } ${this.isShrink ? "is-shrink" : ""}`}
          >
            <a href={this.config.login.url} class="btn-outline">
              {this.config.login.text}
            </a>
            <a href={this.config.join.url} class="btn-primary ml-1">
              {this.config.join.text}
            </a>
          </div>
        )}
        <dc-menu
          open={this.isMenuOpen}
          user={this.user}
          homepage={this.homepage}
          community={this.community}
          wordpress={this.wordpress}
        />
        <div
          class={`document-cloak ${
            this.isMenuOpen || this.isProfileMenuOpen ? "d-block" : "hidden"
          }`}
          onClick={this.closeAll.bind(this)}
          hidden={!this.isMenuOpen}
        />
      </Host>
    );
  }
}
