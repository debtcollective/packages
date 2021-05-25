import "./link";
import { Component, h, Event, EventEmitter, Prop, Listen } from "@stencil/core";

@Component({
  assetsDirs: ["assets"],
  tag: "dc-menu",
  styleUrl: "menu.scss",
})
export class Menu {
  @Prop() open: boolean;

  @Event() toggleMenu: EventEmitter<void>;

  @Listen("keydown", { target: "document" })
  handleEscapeKey(event) {
    if (event.keyCode === 27 && this.open) this.toggleMenuHandler();
  }

  toggleMenuHandler() {
    this.toggleMenu.emit();
  }

  render() {
    return (
      <div class={`menu-container ${this.open ? "open " : "hidden"}`}>
        <div class="menu">
          <div class="menu-section menu-header">
            <button
              class="btn-transparent menu-close material-icons"
              aria-label="close menu"
              onClick={this.toggleMenuHandler.bind(this)}
            >
              close
            </button>
          </div>
          <nav class="menu-section menu-nav">
            <dc-link
              class="menu-nav-item text-lg"
              namespace="menu"
              to="https://debtcollective.org/debt-union"
            >
              Join the Union
            </dc-link>
            <dc-link
              class="menu-nav-item text-lg"
              namespace="menu"
              to="https://community.debtcollective.org/upcoming-events"
            >
              Browse Events
            </dc-link>
            <details class="menu-nav-item-collapsable">
              <summary class="text-lg">
                Cancel Student Debt
                <div class="material-icons icon icon-more">
                  expand_more
                </div>{" "}
                <div class="material-icons icon icon-less">expand_less</div>
              </summary>
              <div class="menu-nav-item-nested">
                <dc-link
                  class="text"
                  namespace="menu"
                  target="_blank"
                  to="https://actionnetwork.org/petitions/bidenjubilee100"
                >
                  Sign the petition
                </dc-link>
                <dc-link
                  class="text"
                  namespace="menu"
                  target="_blank"
                  to="https://actionnetwork.org/letters/cancel-all-student-debt-today"
                >
                  Email your reps
                </dc-link>
              </div>
            </details>
            <details class="menu-nav-item-collapsable">
              <summary class="text-lg">
                For Members
                <div class="material-icons icon icon-more">
                  expand_more
                </div>{" "}
                <div class="material-icons icon icon-less">expand_less</div>
              </summary>
              <div class="menu-nav-item-nested">
                <dc-link
                  class="text"
                  namespace="menu"
                  to="https://tools.debtcollective.org/"
                >
                  Dispute your Debt
                </dc-link>
                <dc-link
                  class="text"
                  namespace="menu"
                  to="https://community.debtcollective.org/"
                >
                  Connect with other debtors
                </dc-link>
                <dc-link
                  class="text"
                  namespace="menu"
                  to="https://community.debtcollective.org/t/join-a-working-group/4957/2"
                >
                  Join a working group
                </dc-link>
                <dc-link
                  class="text"
                  namespace="menu"
                  to="https://community.debtcollective.org/c/working-groups/local-organizing/20"
                >
                  Join or start a local branch
                </dc-link>
                <dc-link
                  class="text"
                  namespace="menu"
                  to="https://community.debtcollective.org/t/debt-collective-higher-education-committee/4958"
                >
                  Join a Committee
                </dc-link>
                <dc-link
                  class="text"
                  namespace="menu"
                  to="https://community.debtcollective.org/t/training-educational-videos/4959"
                >
                  View Past Trainings
                </dc-link>
              </div>
            </details>
            <details class="menu-nav-item-collapsable">
              <summary class="text-lg">
                About{" "}
                <div class="material-icons icon icon-more">expand_more</div>{" "}
                <div class="material-icons icon icon-less">expand_less</div>
              </summary>
              <div class="menu-nav-item-nested">
                <dc-link
                  class="text"
                  namespace="menu"
                  to="https://debtcollective.org/about-us/"
                >
                  Our Union
                </dc-link>
                <dc-link
                  class="text"
                  namespace="menu"
                  target="_blank"
                  to="https://www.youtube.com/playlist?list=PLnQCwElJCNf9NHOqHicDrb03RX04nNl-h"
                >
                  Learn about debt
                </dc-link>
                <dc-link
                  class="text"
                  namespace="menu"
                  to="https://debtcollective.org/our-team/"
                >
                  Our Team
                </dc-link>
                <dc-link
                  class="text"
                  namespace="menu"
                  target="_blank"
                  to="https://www.haymarketbooks.org/books/1520-can-t-pay-won-t-pay"
                >
                  Our Book
                </dc-link>
                <dc-link
                  class="text"
                  namespace="menu"
                  to="https://debtcollective.org/contact-us/"
                >
                  Contact
                </dc-link>
              </div>
            </details>
            <details class="menu-nav-item-collapsable">
              <summary class="text-lg">
                Support Us{" "}
                <div class="material-icons icon icon-more">expand_more</div>{" "}
                <div class="material-icons icon icon-less">expand_less</div>
              </summary>
              <div class="menu-nav-item-nested">
                <dc-link
                  class="text"
                  namespace="menu"
                  to="https://volunteer.debtcollective.org/"
                >
                  Volunteer
                </dc-link>
                <dc-link
                  class="text"
                  namespace="menu"
                  to="https://debt-collective.creator-spring.com/"
                >
                  Shop
                </dc-link>
                <dc-link
                  class="text"
                  namespace="menu"
                  to="https://debtcollective.org/donate/"
                >
                  Donate
                </dc-link>
              </div>
            </details>
          </nav>
          <div class="menu-section menu-footer mt-auto">
            <dc-link class="icon" to="https://twitter.com/StrikeDebt">
              <span class="d-none">Go to Debtcollective's Twitter page</span>
              <svg
                aria-hidden="true"
                width="32"
                height="22"
                viewBox="0 0 32 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M31.391 2.54176C30.2714 2.97352 29.0664 3.26476 27.802 3.39509C29.0929 2.72466 30.0827 1.66269 30.5495 0.395825C29.3421 1.01746 28.0055 1.46853 26.5816 1.71203C25.4421 0.658636 23.818 0 22.0206 0C18.5702 0 15.7725 2.42698 15.7725 5.42088C15.7725 5.84514 15.8276 6.25866 15.9345 6.6561C10.7412 6.42976 6.13636 4.27202 3.05435 0.992246C2.51646 1.79248 2.20857 2.72358 2.20857 3.71798C2.20857 5.59842 3.31154 7.25788 4.98826 8.22974C3.96442 8.20132 3.00056 7.95728 2.15787 7.55126C2.15725 7.57379 2.15725 7.59685 2.15725 7.61992C2.15725 10.2459 4.31126 12.4364 7.1701 12.9352C6.64582 13.0585 6.09371 13.125 5.52367 13.125C5.12056 13.125 4.72921 13.0913 4.34774 13.0274C5.14344 15.1809 7.45078 16.7486 10.1847 16.7921C8.04617 18.2461 5.35241 19.1128 2.42433 19.1128C1.92046 19.1128 1.42276 19.0871 0.933716 19.0367C3.6998 20.5755 6.98399 21.4722 10.5124 21.4722C22.0064 21.4722 28.2911 13.2125 28.2911 6.04895C28.2911 5.81403 28.2855 5.57964 28.2737 5.34687C29.4942 4.58418 30.5538 3.62894 31.391 2.54176Z"
                  fill="#434343"
                />
              </svg>
            </dc-link>
            <dc-link class="icon" to="https://www.facebook.com/DebtCollective">
              <span class="d-none">Go to Debtcollective's Facebook page</span>
              <svg
                aria-hidden="true"
                width="28"
                height="24"
                viewBox="0 0 28 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0.292114 22.0001C0.292114 23.1051 1.29658 24 2.53648 24H24.9815C26.2215 24 27.2258 23.1051 27.2258 22.0001V1.99991C27.2258 0.89501 26.2215 0 24.9815 0H2.53654C1.29658 0 0.292176 0.895062 0.292176 1.99991L0.292114 22.0001ZM14.3202 21V13H12.0756V9.99994H14.3202C14.3202 4.84496 14.5667 4.50002 21.6148 4.50002V7.50004C17.9 7.50004 18.248 7.68506 18.248 10H21.6148V13.0001H18.248V21H14.3202Z"
                  fill="#343434"
                />
              </svg>
            </dc-link>
            <dc-link
              class="icon"
              to="https://www.instagram.com/thedebtcollective/"
            >
              <span class="d-none">
                Go to Debtcollective's Instagram profile
              </span>
              <svg
                aria-hidden="true"
                width="28"
                height="25"
                viewBox="0 0 28 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.8601 0H5.33332C2.46257 0 0.127075 2.08063 0.127075 4.63867V9.53882V19.3657C0.127075 21.9238 2.46257 24.0044 5.33332 24.0044H21.8605C24.7314 24.0044 27.0663 21.9238 27.0663 19.3657V9.53834V4.63819C27.0657 2.08014 24.7308 0 21.8601 0ZM23.3532 2.76626L23.9488 2.76432V3.29259V6.83309L19.3979 6.84616L19.3821 2.77788L23.3532 2.76626ZM9.75163 9.53834C10.6145 8.47454 12.0143 7.77681 13.5967 7.77681C15.179 7.77681 16.5788 8.47454 17.4407 9.53834C18.0019 10.2327 18.3383 11.082 18.3383 12.002C18.3383 14.3315 16.2093 16.2267 13.5961 16.2267C10.9814 16.2267 8.85449 14.3315 8.85449 12.002C8.85504 11.082 9.1903 10.2327 9.75163 9.53834ZM24.4411 19.3653C24.4411 20.6344 23.2832 21.6652 21.8601 21.6652H5.33332C3.90963 21.6652 2.75166 20.6344 2.75166 19.3653V9.53834H6.77276C6.42553 10.2995 6.23045 11.1309 6.23045 12.002C6.23045 15.6204 9.53427 18.5664 13.5967 18.5664C17.6586 18.5664 20.9624 15.6204 20.9624 12.002C20.9624 11.1309 20.7662 10.2995 20.4189 9.53834H24.4411V19.3653Z"
                  fill="#434343"
                />
              </svg>
            </dc-link>
          </div>
        </div>
      </div>
    );
  }
}
