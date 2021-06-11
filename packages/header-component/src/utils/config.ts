import config from "../config.json";

const interpolateURL = (
  url,
  { user = { username: "" }, community, homepage, host }
): string => {
  return url
    .replace(/{host}/g, host)
    .replace(/{community}/g, community)
    .replace(/{username}/g, user.username)
    .replace(/{homepage}/g, homepage);
};

const interpolateItemsURL = (_items, { user, community, homepage, host }) => {
  const items = _items.map((item) => {
    return {
      ...item,
      url: interpolateURL(item.url, { user, community, homepage, host }),
    };
  });

  return items;
};

/**
 * Method to digest the config.json and avoid a mapping within
 * the component of profile. This method will make the assumptions
 * to allow the component to just consume the adapted object
 */
export const getUserMenuConfig = ({ community, user, homepage, host }) => {
  const { userMenu } = config;
  const data = { user, community, homepage, host };

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
export const getSiteMenuConfig = ({ community, user, homepage, host }) => {
  const { siteMenu } = config;
  const data = { user, community, homepage, host };

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

export const getSocialLinks = () => {
  const { socialLinks } = config;
  return socialLinks;
};

export const getGuestActions = ({ community, homepage, host }) => {
  const { guestActions } = config;
  const data = { community, homepage, host };

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
