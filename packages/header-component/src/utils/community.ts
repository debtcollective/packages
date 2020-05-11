const redirectParam = `return_url=${process.env.HOST_URL}`;

/**
 * Fixed link for login to allow user navigate to the community and be redirected
 * back to the host app after complete flow
 */
export const loginURL = `${process.env.COMMUNITY_URL}/session/sso_cookies?${redirectParam}`;

/**
 * Fixed link for signup to allow user navigate to the community and be redirected
 * back to the host app after complete flow
 */
export const signupURL = `${process.env.COMMUNITY_URL}/session/sso_cookies/signup?${redirectParam}`;

/**
 * preffix a given string with the base community URL.
 * 
 * @param str typically a url that needs to be preffixed with community base url
 */
export const preffixCommunityURL = (str) => `${process.env.COMMUNITY_URL}/${str}`;

/**
 * Takes an object with avatar_template (typically user) and return a full
 * URL that can be used to load the avatar image
 * 
 * @param User object with avatar_template
 * @param size number to define the pixel of avatar picture
 */
export const getAvatarURL = ({ avatar_template }, size = 64) => {
  return preffixCommunityURL(avatar_template.replace(`{size}`, size));
};