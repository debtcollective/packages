import { 
  Component,
  h,
  State,
  Prop,
  Listen 
} from '@stencil/core';
import omit from 'lodash.omit';

@Component({
  shadow: true,
  styleUrl: 'my-component.css',
  tag: 'my-component',
})
export class MyComponent {
  /**
   * label for the dropdown nav item
   */
  @Prop() label: string;

  /**
   * Items to be displayed in the dropdown
   */
  @Prop() items: string;
  
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

  /**
   * Event to detect escape key press
   */
  @Listen('keydown', { target: 'document' })
  handleEscapeKey(event) {
    if (event.keyCode === 27) this.closeDropdown();
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
    //TODO: @Watch approach seems to not work correctly
    const _items = JSON.parse(this.items)
    
    return (
      <div class="dropdown-container nav-item">
        <button
          class="nav-link btn btn-transparent"
          onFocus={this.toggleDropdown.bind(this)}
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
            _items?.map(item => (
              <a class="dropdown-item" {...omit(item, ['text'])}>
                {item.text}
              </a>
            ))
          }
        </div>
      </div>
    );
  }
}
