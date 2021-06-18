export const trimSlash = (url: string) => {
  if (url === "/") {
    return window.location.origin;
  }

  if (url.charAt(url.length - 1) === "/") {
    return url.slice(0, -1);
  }

  return url;
};

export const addSlash = (url: string) => {
  if (url.charAt(url.length - 1) !== "/") {
    return `${url}/`;
  }

  return url;
};
