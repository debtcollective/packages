import "./dc-menu";
import "./dc-profile";
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
   * An object with the user data. Follows Discourse structure as
   * https://docs.discourse.org/#tag/Users/paths/~1users~1{username}.json/get
   */
  @State() user?: User;

  /**
   * Wether or not the menu is displayed
   */
  @State() isMenuOpen: boolean;

  /**
   * Emit event to exposed fetched user on host application
   * TODO: Cannot find name User on EventEmitter<User>
   */
  @Event({
    eventName: "userSynced",
    composed: true,
    cancelable: true,
    bubbles: true,
  })
  userSynced: EventEmitter;

  /**
   * Logo image
   */
  private _logo = "logo.png";
  private _logoSmall = "logo-small.png";
  private _loginUrl = "";

  @Listen("toggleMenu")
  toggleMenuHandler() {
    this.toggleMenu();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  async syncCurrentUser() {
    const user = await syncCurrentUser(this.community);

    this.user = user;
    this.userSynced.emit(user);
  }

  generateURLs() {
    this._loginUrl = getLoginURL({
      host: this.host,
      community: this.community,
    });
  }

  componentWillLoad() {
    this.generateURLs();
    return this.syncCurrentUser();
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
              <dc-profile user={this.user} community={this.community} />
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
        <div class="header-bottom navbar d-sm-none">
          <a href={this._loginUrl} class="btn-outline">
            Member login
          </a>
          <a href={this.union} class="btn-primary ml-1">
            Join the Union
          </a>
        </div>
        <dc-menu open={this.isMenuOpen} />
      </Host>
    );
  }
}
