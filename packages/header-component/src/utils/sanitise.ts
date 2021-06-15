export const sanitiseSSOUrl = (ssoUrl: string) => {
  if (ssoUrl === "/") {
    return window.location.origin;
  }

  if (ssoUrl.charAt(ssoUrl.length - 1) === "/") {
    return ssoUrl.slice(0, -1);
  }

  return ssoUrl;
};
