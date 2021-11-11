import config from "../config.json";
import { getWordpressNav } from "../services/session";

// pull siteMenu from wordpress site
const interpolateURL = (
  url,
  { user = { username: "" }, community, homepage, returnUrl = "" }
): string => {
  return (
    url
      // replace all occurrences of {variable}/ so we can use urls starting with "/"
      .replace(/{community}\//g, community)
      .replace(/{homepage}\//g, homepage)
      // replace all occurrences of {variable}
      .replace(/{community}/g, community)
      .replace(/{username}/g, user.username)
      .replace(/{homepage}/g, homepage)
      .replace(/{return_url}/g, returnUrl)
  );
};

const interpolateItemsURL = (_items, { user, community, homepage }) => {
  const items = _items.map((item) => {
    return {
      ...item,
      url: interpolateURL(item.url, { user, community, homepage }),
    };
  });

  return items;
};

export const interpolateWordpressNav = async (wordpress) => {
  const wordpressNav = await getWordpressNav(wordpress);
  var wordpressNavConfig = [];

  wordpressNav.items.forEach(item => {
    let row = {}
    if (item.child_items) {
      row["type"] = "MENU_ITEM_EXPANDABLE";
      row["text"] = item.title;
      row["items"] = [];
      item.child_items.forEach(child => {
        var childItem = {
          "type": "LINK",
          "text": child.title,
          "url": child.url
        };
        row["items"].push(childItem);
      });
      wordpressNavConfig.push(row)
    }
    else {
      row["type"] = "MENU_ITEM_LINK";
      row["text"] = item.title;
      row["url"] = item.url;
      wordpressNavConfig.push(row)
    }
  });
  config["siteMenu"] = wordpressNavConfig;
};


/**
 * Method to digest the config.json and avoid a mapping within
 * the component of profile. This method will make the assumptions
 * to allow the component to just consume the adapted object
 */
export const getUserMenuConfig = ({ community, user, homepage }) => {
  const { userMenu } = config;
  const data = { user, community, homepage };

  return {
    profile: {
      type: userMenu[0].items,
      items: interpolateItemsURL(userMenu[0].items, data),
    },
    community: {
      type: userMenu[1].items,
      items: interpolateItemsURL(userMenu[1].items, data),
    },
    footer: {
      type: userMenu[2].items,
      items: interpolateItemsURL(userMenu[2].items, data),
    },
  };
};

/**
 * Method to digest the config.json and avoid a mapping within
 * the component of menu. This method will make the assumptions
 * to allow the component to just consume the adapted object
 */
export const getSiteMenuConfig = ({ community, user, homepage }) => {

  const { siteMenu } = config
    
  const data = { user, community, homepage };

  const expandables = siteMenu
    .filter(({ type }) => type === "MENU_ITEM_EXPANDABLE")
    .map(({ items, ...rest }) => ({
      items: interpolateItemsURL(items, data),
      ...rest,
    }));

  const rootLinks = [];
  const authenticatedLinks = [];
  const guestLinks = [];

  siteMenu
    .filter(({ type }) => type === "MENU_ITEM_LINK")
    .forEach((item) => {
      const itemData = { ...item, url: interpolateURL(item.url, data) };

      // Items without the property set will be always displayed
      if (!itemData.hasOwnProperty("authenticated")) {
        rootLinks.push(itemData);
        return true;
      }

      if (item.authenticated) {
        authenticatedLinks.push(itemData);
        return true;
      }

      guestLinks.push(itemData);
    });

  return {
    expandables,
    authenticatedLinks,
    guestLinks,
    rootLinks,
  };
};

export const getSocialLinks = () => {
  const { socialLinks } = config;
  return socialLinks;
};

export const getGuestActions = ({ community, homepage, returnUrl }) => {
  const { guestActions } = config;
  const data = { community, homepage, returnUrl };

  return {
    login: {
      ...guestActions[0],
      url: interpolateURL(guestActions[0].url, data),
    },
    join: {
      ...guestActions[1],
      url: interpolateURL(guestActions[1].url, data),
    },
  };
};
