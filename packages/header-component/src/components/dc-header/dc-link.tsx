import { Component, h, Event, EventEmitter, Prop, Listen } from "@stencil/core";

@Component({
  assetsDirs: ["assets"],
  tag: "dc-link",
  styleUrl: "link.scss",
})
export class Link {
  @Prop() to: string;
  @Prop() class: string;

  @Event() linkClicked: EventEmitter<{ event: object; to: string }>;

  @Listen("click", { capture: true })
  handleClick(e) {
    this.linkClicked.emit({ event: e, to: this.to });
  }

  render() {
    return (
      <a href={this.to} class={this.class}>
        <slot />
      </a>
    );
  }
}
