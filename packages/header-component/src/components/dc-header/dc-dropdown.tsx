import {
  Component,
  h,
  State,
  Prop,
  Listen
} from "@stencil/core";

@Component({
  assetsDirs: ["assets"],
  tag: "dc-dropdown",
  styleUrl: "dc-dropdown.css"
})
export class Dropdown {
  /**
   * label for the dropdown nav item
   */
  @Prop() label: string;

  /**
   * Items to be displayed in the dropdown
   */
  @Prop() items: Array<{ text: string; href: string, description: string }>;
  
  @State() open: boolean;

  /**
   * Event to detect outside clicks from the dropdown
   */
  @Listen('click', { target: 'document' })
  handleClickOutside(event) {
    const target = event.composedPath()[0];

    if (this?.dropdownTrigger?.contains(target) || this?.dropdownItems?.contains(target)) {
      return;
    }

    this.closeDropdown();
  }

  dropdownTrigger!: Node;

  dropdownItems!: Node;

  toggleDropdown() {
    this.open = !this.open;
  }

  closeDropdown() {
    this.open = false;
  }

  render() {
    return (
      <div class={`dropdown-container nav-item`}>
        <button
          class="nav-link btn btn-transparent"
          onClick={this.toggleDropdown.bind(this)}
          ref={(el) => this.dropdownTrigger = el}
        >
          {this.label || ''} 
          <span class="material-icons">
            {this.open ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
          </span>
        </button>
        <div
          class={`dropdown-items ${this.open ? "open " : "hidden"}`}
          onMouseLeave={this.closeDropdown.bind(this)}
          ref={(el) => this.dropdownItems = el}
        >
          {
            this.items.map(item => (
              <a href={item.href} class="dropdown-item">
                {item.text}
                <p class="dropdown-item-description">{item.description}</p>
              </a>
            ))
          }
        </div>
      </div>
    );
  }
}
