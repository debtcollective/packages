const redirectParam = (host) => `return_url=${host}`;

/**
 * Fixed link for login to allow user navigate to the community and be redirected
 * back to the host app after complete flow
 */
export const getLoginURL = ({ host, community }) =>
  `${community}/session/sso_cookies?${redirectParam(host)}`;

/**
 * Fixed link for signup to allow user navigate to the community and be redirected
 * back to the host app after complete flow
 */
export const getSignupURL = ({ host, community }) =>
  `${community}/session/sso_cookies/signup?${redirectParam(host)}`;

/**
 * preffix a given string with the base community URL.
 *
 * @param str typically a url that needs to be preffixed with community base url
 */
export const preffixCommunityURL = (community, str) => `${community}/${str}`;

/**
 * Takes an object with avatar_template (typically user) and return a full
 * URL that can be used to load the avatar image
 *
 * @param User object with avatar_template
 * @param size number to define the pixel of avatar picture
 */
export const getAvatarURL = ({ avatar_template }, community, size = 64) => {
  return preffixCommunityURL(
    community,
    avatar_template.replace(`{size}`, size)
  );
};
