/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface DcDropdown {
        /**
          * Items to be displayed in the dropdown
         */
        "items": string;
        /**
          * label for the dropdown nav item
         */
        "label": string;
    }
}
declare global {
    interface HTMLDcDropdownElement extends Components.DcDropdown, HTMLStencilElement {
    }
    var HTMLDcDropdownElement: {
        prototype: HTMLDcDropdownElement;
        new (): HTMLDcDropdownElement;
    };
    interface HTMLElementTagNameMap {
        "dc-dropdown": HTMLDcDropdownElement;
    }
}
declare namespace LocalJSX {
    interface DcDropdown {
        /**
          * Items to be displayed in the dropdown
         */
        "items"?: string;
        /**
          * label for the dropdown nav item
         */
        "label"?: string;
    }
    interface IntrinsicElements {
        "dc-dropdown": DcDropdown;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "dc-dropdown": LocalJSX.DcDropdown & JSXBase.HTMLAttributes<HTMLDcDropdownElement>;
        }
    }
}
