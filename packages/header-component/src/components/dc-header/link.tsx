import {
  Component,
  h,
  Event,
  EventEmitter,
  Prop,
  Listen,
  Host,
} from "@stencil/core";

@Component({
  assetsDirs: ["assets"],
  tag: "dc-link",
  styleUrl: "link.scss",
})

export class Link {

  @Prop() to: string;
  @Prop() target: "_blank" | "_self" = "_self";
  @Prop() namespace: string;

  @Event() linkClicked: EventEmitter<{
    event: object;
    to: string;
    namespace: string;
  }>;

  @Listen("click", { capture: true })

  handleClick(e) {
    this.linkClicked.emit({ event: e, to: this.to, namespace: this.namespace });
  }

  render() {
    // Open external links in new tab
    if (!this.to.includes('debtcollective.org')) {
      this.target = '_blank'
    }
    return (
      <Host>
        <a href={this.to} target={this.target}>
          <slot />
        </a>
      </Host>
    );
  }
}
