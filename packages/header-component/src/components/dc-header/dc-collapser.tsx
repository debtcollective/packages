import {
  Component,
  h,
  State,
  Prop,
} from "@stencil/core";

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
  @Prop() items: Array<{ text: string; href: string, description: string }>;
  
  @State() open: boolean;

  toggleCollapser() {
    this.open = !this.open;
  }

  render() {
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
            this.items.map(item => (
              <li class="collapser-item" onClick={() => {
                window.open(item.href, "_self");
              }}>
                <a href={item.href} class="collapser-item-text">{item.text}</a>
                <p class="collapser-item-description">{item.description}</p>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}
  