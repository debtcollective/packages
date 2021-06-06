import config from "../config.json";

const interpolateURL = (url, { user, community, homepage }) => {
  return (
    url
      .replace(/{community}/g, community)
      .replace(/{username}/g, user.username)
      .replace(/{homepage}/g, homepage)
      // avoid cases where homepage is replaced by '/' this '//page'
      .replace("//", "/")
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
  const { siteMenu } = config;
  const data = { user, community, homepage };

  const expandables = siteMenu
    .filter(({ type }) => type === "MENU_ITEM_EXPANDABLE")
    .map(({ items, ...rest }) => ({
      items: interpolateItemsURL(items, data),
      ...rest,
    }));

  const rootLinks = siteMenu
    .filter(({ type }) => type === "MENU_ITEM_LINK")
    .map((item) => {
      return { ...item, url: interpolateURL(item.url, data) };
    });

  return {
    expandables,
    rootLinks,
  };
};
