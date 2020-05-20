/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface DcHeader {
        /**
          * The links you need to display within the header this string needs to be JSON (able to JSON.parse)
         */
        "links": string;
    }
}
declare global {
    interface HTMLDcHeaderElement extends Components.DcHeader, HTMLStencilElement {
    }
    var HTMLDcHeaderElement: {
        prototype: HTMLDcHeaderElement;
        new (): HTMLDcHeaderElement;
    };
    interface HTMLElementTagNameMap {
        "dc-header": HTMLDcHeaderElement;
    }
}
declare namespace LocalJSX {
    interface DcHeader {
        /**
          * The links you need to display within the header this string needs to be JSON (able to JSON.parse)
         */
        "links"?: string;
    }
    interface IntrinsicElements {
        "dc-header": DcHeader;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "dc-header": LocalJSX.DcHeader & JSXBase.HTMLAttributes<HTMLDcHeaderElement>;
        }
    }
}