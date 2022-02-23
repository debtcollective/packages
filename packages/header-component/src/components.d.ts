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
          * URL to the community with the latest "/"
         */
        "community": string;
        /**
          * URL to the homepage with the latest "/"
         */
        "homepage": string;
        /**
          * Due to the complexity to make assets available for now we will allow host application to indicate where the logo asset can be found https://stenciljs.com/docs/custom-elements#making-assets-available
         */
        "logo": any;
        "logosmall": any;
        /**
          * URL to use after login processed typically full URL from host with the latest "/"
         */
        "returnurl": string;
        /**
          * URL to the wordpress menu with the latest "/"
         */
        "wordpress": string;
    }
    interface DcLink {
        "label": string;
        "namespace": string;
        "target": "_blank" | "_self";
        "to": string;
    }
    interface DcMenu {
        "community": string;
        "homepage": string;
        "host": string;
        "open": boolean;
        /**
          * An object with the user data. Follows Discourse structure as https://docs.discourse.org/#tag/Users/paths/~1users~1{username}.json/get
         */
        "user": {
    id: number;
    admin: boolean;
    avatar_template: string;
    username: string;
    unread_notifications: number;
    unread_high_priority_notifications: number;
  };
        "wordpress": string;
    }
    interface DcProfile {
        "community": string;
        "expanded": boolean;
        "homepage": string;
        "host": string;
        "shrank": boolean;
        /**
          * An object with the user data. Follows Discourse structure as https://docs.discourse.org/#tag/Users/paths/~1users~1{username}.json/get
         */
        "user": {
    id: number;
    admin: boolean;
    avatar_template: string;
    username: string;
    unread_notifications: number;
    unread_high_priority_notifications: number;
  };
    }
}
declare global {
    interface HTMLDcHeaderElement extends Components.DcHeader, HTMLStencilElement {
    }
    var HTMLDcHeaderElement: {
        prototype: HTMLDcHeaderElement;
        new (): HTMLDcHeaderElement;
    };
    interface HTMLDcLinkElement extends Components.DcLink, HTMLStencilElement {
    }
    var HTMLDcLinkElement: {
        prototype: HTMLDcLinkElement;
        new (): HTMLDcLinkElement;
    };
    interface HTMLDcMenuElement extends Components.DcMenu, HTMLStencilElement {
    }
    var HTMLDcMenuElement: {
        prototype: HTMLDcMenuElement;
        new (): HTMLDcMenuElement;
    };
    interface HTMLDcProfileElement extends Components.DcProfile, HTMLStencilElement {
    }
    var HTMLDcProfileElement: {
        prototype: HTMLDcProfileElement;
        new (): HTMLDcProfileElement;
    };
    interface HTMLElementTagNameMap {
        "dc-header": HTMLDcHeaderElement;
        "dc-link": HTMLDcLinkElement;
        "dc-menu": HTMLDcMenuElement;
        "dc-profile": HTMLDcProfileElement;
    }
}
declare namespace LocalJSX {
    interface DcHeader {
        /**
          * URL to the community with the latest "/"
         */
        "community"?: string;
        /**
          * URL to the homepage with the latest "/"
         */
        "homepage"?: string;
        /**
          * Due to the complexity to make assets available for now we will allow host application to indicate where the logo asset can be found https://stenciljs.com/docs/custom-elements#making-assets-available
         */
        "logo"?: any;
        "logosmall"?: any;
        /**
          * Emit event to exposed fetched user on host application
         */
        "onUserSynced"?: (event: CustomEvent<User>) => void;
        /**
          * URL to use after login processed typically full URL from host with the latest "/"
         */
        "returnurl"?: string;
        /**
          * URL to the wordpress menu with the latest "/"
         */
        "wordpress"?: string;
    }
    interface DcLink {
        "label"?: string;
        "namespace"?: string;
        "onLinkClicked"?: (event: CustomEvent<{
    event: object;
    to: string;
    label: string;
    namespace: string;
  }>) => void;
        "target"?: "_blank" | "_self";
        "to"?: string;
    }
    interface DcMenu {
        "community"?: string;
        "homepage"?: string;
        "host"?: string;
        "onToggleMenu"?: (event: CustomEvent<void>) => void;
        "open"?: boolean;
        /**
          * An object with the user data. Follows Discourse structure as https://docs.discourse.org/#tag/Users/paths/~1users~1{username}.json/get
         */
        "user"?: {
    id: number;
    admin: boolean;
    avatar_template: string;
    username: string;
    unread_notifications: number;
    unread_high_priority_notifications: number;
  };
        "wordpress"?: string;
    }
    interface DcProfile {
        "community"?: string;
        "expanded"?: boolean;
        "homepage"?: string;
        "host"?: string;
        "onToggleProfileMenu"?: (event: CustomEvent<void>) => void;
        "shrank"?: boolean;
        /**
          * An object with the user data. Follows Discourse structure as https://docs.discourse.org/#tag/Users/paths/~1users~1{username}.json/get
         */
        "user"?: {
    id: number;
    admin: boolean;
    avatar_template: string;
    username: string;
    unread_notifications: number;
    unread_high_priority_notifications: number;
  };
    }
    interface IntrinsicElements {
        "dc-header": DcHeader;
        "dc-link": DcLink;
        "dc-menu": DcMenu;
        "dc-profile": DcProfile;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "dc-header": LocalJSX.DcHeader & JSXBase.HTMLAttributes<HTMLDcHeaderElement>;
            "dc-link": LocalJSX.DcLink & JSXBase.HTMLAttributes<HTMLDcLinkElement>;
            "dc-menu": LocalJSX.DcMenu & JSXBase.HTMLAttributes<HTMLDcMenuElement>;
            "dc-profile": LocalJSX.DcProfile & JSXBase.HTMLAttributes<HTMLDcProfileElement>;
        }
    }
}
