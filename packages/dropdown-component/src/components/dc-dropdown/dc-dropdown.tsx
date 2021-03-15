import { Component, h, State, Prop, Listen } from '@stencil/core';
import omit from 'lodash.omit';

const ESCAPE_KEY_CODE = 27;
const ARROW_UP_KEY = 'ArrowUp';
const ARROW_DOWN_KEY = 'ArrowDown';

@Component({
  shadow: true,
  styleUrl: 'dc-dropdown.css',
  tag: 'dc-dropdown',
})
export class DcDropdown {
  /**
   * label for the dropdown nav item
   */
  @Prop() label: string;

  /**
   * Items to be displayed in the dropdown
   */
  @Prop() items: string;

  @State() open: boolean;

  @State() itemsRefs: HTMLElement[] = [];

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
    if (event.keyCode === ESCAPE_KEY_CODE) this.closeDropdown();
  }

  dropdownTrigger!: Node;

  dropdownItems!: Node;

  toggleDropdown() {
    this.open = !this.open;
  }

  openDropdown() {
    this.open = true;
  }

  closeDropdown() {
    this.open = false;
  }

  isKeyDown(key: string): boolean {
    return key === ARROW_DOWN_KEY;
  }

  isKeyUp(key: string): boolean {
    return key === ARROW_UP_KEY;
  }

  handleArrowDown(index: number) {
    const firstElement = this.itemsRefs[0];
    const nextElement = this.itemsRefs[index + 1];

    nextElement ? nextElement.focus() : firstElement.focus();
  }

  handleArrowUp(index: number) {
    const indexOfLastElement = this.itemsRefs.length - 1;
    const lastElement = this.itemsRefs[indexOfLastElement];
    const nextElement = this.itemsRefs[index - 1];

    nextElement ? nextElement.focus() : lastElement.focus();
  }

  handleItemKeyDown(event, index) {
    if (this.isKeyDown(event.key)) this.handleArrowDown(index);
    if (this.isKeyUp(event.key)) this.handleArrowUp(index);
  }

  handleLabelKeyDown(event) {
    const firstElement = this.itemsRefs[0];

    if (this.isKeyDown(event.key)) {
      this.openDropdown();
      firstElement.focus();
    }
  }

  render() {
    //TODO: @Watch approach seems to not work correctly
    const _items = JSON.parse(this.items);

    return (
      <div class="dropdown-container nav-item">
        <button
          class="nav-link btn btn-transparent"
          onClick={this.toggleDropdown.bind(this)}
          ref={el => (this.dropdownTrigger = el)}
          onKeyDown={this.handleLabelKeyDown.bind(this)}
        >
          {this.label || ''}
          <span class="material-icons">{this.open ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}</span>
        </button>
        <div class={`dropdown-items ${this.open ? 'open ' : 'hidden'}`} onMouseLeave={this.closeDropdown.bind(this)} ref={el => (this.dropdownItems = el)}>
          {_items?.map((item, index) => (
            <a class="dropdown-item" {...omit(item, ['text'])} onKeyDown={event => this.handleItemKeyDown(event, index)} ref={item => (this.itemsRefs[index] = item)}>
              {item.text}
            </a>
          ))}
        </div>
      </div>
    );
  }
}
