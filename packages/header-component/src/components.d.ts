/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface DcCollapser {
        /**
          * Items to be displayed in the collapser
         */
        "items": Array<{ text: string; href: string, target?: string }>;
        /**
          * label for the collapser nav item
         */
        "label": string;
    }
    interface DcDropdown {
        /**
          * Items to be displayed in the dropdown
         */
        "items": Array<{ text: string; href: string, target?: string }>;
        /**
          * label for the dropdown nav item
         */
        "label": string;
    }
    interface DcHeader {
        /**
          * URL to the community without the latest "/"
         */
        "community": string;
        /**
          * Link to follow in order to prompt user to donate
         */
        "donateurl": string;
        /**
          * URL to the component host without the latest "/"
         */
        "host": string;
        /**
          * The links you need to display within the header this string needs to be JSON (able to JSON.parse)
         */
        "links": string;
        /**
          * Logo src to use a custom image for the header
         */
        "logo": string;
        /**
          * Logo small src to use a custom image for the header in mobile
         */
        "logosmall": string;
        /**
          * URL to the member hub page
         */
        "memberhuburl"?: string;
    }
    interface DcMenu {
        /**
          * Logo src to use a custom image for the header
         */
        "logo": string;
        /**
          * Wether or not the mobile menu is displayed
         */
        "open": boolean;
    }
    interface DcUserDropdown {
        /**
          * URL to the community
         */
        "community": string;
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
    interface DcUserItems {
        /**
          * URL to the community
         */
        "community": string;
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
    interface HTMLDcCollapserElement extends Components.DcCollapser, HTMLStencilElement {
    }
    var HTMLDcCollapserElement: {
        prototype: HTMLDcCollapserElement;
        new (): HTMLDcCollapserElement;
    };
    interface HTMLDcDropdownElement extends Components.DcDropdown, HTMLStencilElement {
    }
    var HTMLDcDropdownElement: {
        prototype: HTMLDcDropdownElement;
        new (): HTMLDcDropdownElement;
    };
    interface HTMLDcHeaderElement extends Components.DcHeader, HTMLStencilElement {
    }
    var HTMLDcHeaderElement: {
        prototype: HTMLDcHeaderElement;
        new (): HTMLDcHeaderElement;
    };
    interface HTMLDcMenuElement extends Components.DcMenu, HTMLStencilElement {
    }
    var HTMLDcMenuElement: {
        prototype: HTMLDcMenuElement;
        new (): HTMLDcMenuElement;
    };
    interface HTMLDcUserDropdownElement extends Components.DcUserDropdown, HTMLStencilElement {
    }
    var HTMLDcUserDropdownElement: {
        prototype: HTMLDcUserDropdownElement;
        new (): HTMLDcUserDropdownElement;
    };
    interface HTMLDcUserItemsElement extends Components.DcUserItems, HTMLStencilElement {
    }
    var HTMLDcUserItemsElement: {
        prototype: HTMLDcUserItemsElement;
        new (): HTMLDcUserItemsElement;
    };
    interface HTMLElementTagNameMap {
        "dc-collapser": HTMLDcCollapserElement;
        "dc-dropdown": HTMLDcDropdownElement;
        "dc-header": HTMLDcHeaderElement;
        "dc-menu": HTMLDcMenuElement;
        "dc-user-dropdown": HTMLDcUserDropdownElement;
        "dc-user-items": HTMLDcUserItemsElement;
    }
}
declare namespace LocalJSX {
    interface DcCollapser {
        /**
          * Items to be displayed in the collapser
         */
        "items"?: Array<{ text: string; href: string, target?: string }>;
        /**
          * label for the collapser nav item
         */
        "label"?: string;
    }
    interface DcDropdown {
        /**
          * Items to be displayed in the dropdown
         */
        "items"?: Array<{ text: string; href: string, target?: string }>;
        /**
          * label for the dropdown nav item
         */
        "label"?: string;
    }
    interface DcHeader {
        /**
          * URL to the community without the latest "/"
         */
        "community"?: string;
        /**
          * Link to follow in order to prompt user to donate
         */
        "donateurl"?: string;
        /**
          * URL to the component host without the latest "/"
         */
        "host"?: string;
        /**
          * The links you need to display within the header this string needs to be JSON (able to JSON.parse)
         */
        "links"?: string;
        /**
          * Logo src to use a custom image for the header
         */
        "logo"?: string;
        /**
          * Logo small src to use a custom image for the header in mobile
         */
        "logosmall"?: string;
        /**
          * URL to the member hub page
         */
        "memberhuburl"?: string;
        /**
          * Emit event to exposed fetched user on host application TODO: Cannot find name User on EventEmitter<User>
         */
        "onUserSynced"?: (event: CustomEvent<any>) => void;
    }
    interface DcMenu {
        /**
          * Logo src to use a custom image for the header
         */
        "logo"?: string;
        "onToggleMenu"?: (event: CustomEvent<void>) => void;
        /**
          * Wether or not the mobile menu is displayed
         */
        "open"?: boolean;
    }
    interface DcUserDropdown {
        /**
          * URL to the community
         */
        "community"?: string;
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
    interface DcUserItems {
        /**
          * URL to the community
         */
        "community"?: string;
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
        "dc-collapser": DcCollapser;
        "dc-dropdown": DcDropdown;
        "dc-header": DcHeader;
        "dc-menu": DcMenu;
        "dc-user-dropdown": DcUserDropdown;
        "dc-user-items": DcUserItems;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "dc-collapser": LocalJSX.DcCollapser & JSXBase.HTMLAttributes<HTMLDcCollapserElement>;
            "dc-dropdown": LocalJSX.DcDropdown & JSXBase.HTMLAttributes<HTMLDcDropdownElement>;
            "dc-header": LocalJSX.DcHeader & JSXBase.HTMLAttributes<HTMLDcHeaderElement>;
            "dc-menu": LocalJSX.DcMenu & JSXBase.HTMLAttributes<HTMLDcMenuElement>;
            "dc-user-dropdown": LocalJSX.DcUserDropdown & JSXBase.HTMLAttributes<HTMLDcUserDropdownElement>;
            "dc-user-items": LocalJSX.DcUserItems & JSXBase.HTMLAttributes<HTMLDcUserItemsElement>;
        }
    }
}
