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
import { getLoginURL } from "../../utils/community";

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
})
export class Header {
  private _logo = "logo.png";
  private _logoSmall = "logo-small.png";
  private _loginUrl = "";

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
   * Wether or not the profile menu is displayed
   */
  @State() isProfileMenuOpen: boolean;

  /**
   * Link to follow in order to prompt user to donate
   */
  @Prop() donateurl: string = "https://membership.debtcollective.org";

  /**
   * URL to the homepage
   * without the latest "/"
   */
  @Prop() homepage: string = "https://debtcollective.org";

  /**
   * URL to the homepage
   * without the latest "/"
   */
  @Prop() union: string = "https://debtcollective.org/debt-union";

  /**
   * URL to the community
   * without the latest "/"
   */
  @Prop() community: string = "https://community.debtcollective.org";

  /**
   * URL to the component host
   * without the latest "/"
   */
  @Prop() host: string;

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

  componentWillLoad() {
    this.generateURLs();
    return this.syncCurrentUser();
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

  generateURLs() {
    this._loginUrl = getLoginURL({
      host: this.host,
      community: this.community,
    });
  }

  render() {
    return (
      <Host>
        <header
          class={`header-top navbar ${
            this.isMenuOpen ? "menu-open" : "menu-hidden"
          }`}
        >
          <div class="logo-container header-item">
            <button
              class="btn-transparent"
              onClick={this.toggleMenuHandler.bind(this)}
            >
              <span class="material-icons">menu</span>
            </button>
            <a class="logo" href={this.homepage}>
              <img
                class="d-sm-none"
                src={getAssetPath(`./assets/${this._logoSmall}`)}
                alt="The Debtcollective"
              />
              <img
                class="d-none d-sm-block ml-2"
                src={getAssetPath(`./assets/${this._logo}`)}
                alt="The Debtcollective"
              />
            </a>
          </div>
          <div class="session header-item">
            {this.user ? (
              <dc-profile
                user={this.user}
                community={this.community}
                expanded={this.isProfileMenuOpen}
              />
            ) : (
              <span class="d-none d-sm-flex ml-auto">
                <a href={this._loginUrl} class="btn-outline">
                  Member login
                </a>
                <a href={this.union} class="btn-primary ml-1">
                  Join the Union
                </a>
              </span>
            )}
          </div>
        </header>
        <div
          class={`header-bottom navbar d-sm-none ${
            this.isMenuOpen ? "menu-open" : "menu-hidden"
          }`}
        >
          <a href={this._loginUrl} class="btn-outline">
            Member login
          </a>
          <a href={this.union} class="btn-primary ml-1">
            Join the Union
          </a>
        </div>
        <dc-menu open={this.isMenuOpen} />
        <div
          class={`document-cloak ${
            this.isMenuOpen || this.isProfileMenuOpen ? "d-block" : "hidden"
          }`}
          onClick={this.closeAll.bind(this)}
        />
      </Host>
    );
  }
}
