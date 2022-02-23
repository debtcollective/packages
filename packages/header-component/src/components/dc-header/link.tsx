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
  @Prop() label: string;
  @Prop() namespace: string;

  @Event() linkClicked: EventEmitter<{
    event: object;
    to: string;
    label: string;
    namespace: string;
  }>;

  @Listen("click", { capture: true })

  handleClick(e) {
    this.linkClicked.emit({ event: e, label: this.label, to: this.to, namespace: this.namespace });
  }

  componentWillRender() {
    if (this.label.toLowerCase() == 'shop') {
      this.target = '_blank'
    }
  }

  render() {
    return (
      <Host>

        <a href={this.to} target={this.target}>
          <slot />
        </a>
      </Host>
    );
  }
}
