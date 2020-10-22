import {
  Component,
  h,
  State,
  Prop,
} from "@stencil/core";
import omit from 'lodash.omit';

@Component({
  assetsDirs: ["assets"],
  tag: "dc-collapser",
  styleUrl: "dc-collapser.css"
})
export class Collapser {
  /**
   * label for the collapser nav item
   */
  @Prop() label: string;

  /**
   * Items to be displayed in the collapser
   */
  @Prop() items: string;
  
  @State() open: boolean;

  toggleCollapser() {
    this.open = !this.open;
  }

  render() {
    //TODO: @Watch approach seems to not work correctly
    const _items = JSON.parse(this.items)

    return (
      <div class="nav-item">
        <button
          class="nav-link btn btn-transparent"
          onClick={this.toggleCollapser.bind(this)}
        >
          {this.label || ''} 
          <span class="material-icons">
            {this.open ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
          </span>
        </button>
        <ul class={`collapser-items ${this.open ? "open " : "hidden"}`}>
          {
            _items?.map(item => (
              <li class="collapser-item">
                <a class="collapser-item-text" {...omit(item, ['text'])}>
                  {item.text}
                </a>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}
  