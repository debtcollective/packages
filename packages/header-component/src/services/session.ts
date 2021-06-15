import { sanitiseSSOUrl } from "../utils/sanitise";

// https://stackoverflow.com/a/33829607/1422380
const getCSRFToken = async (discourseEndpoint) => {
  const url = `${discourseEndpoint}/session/csrf.json`;
  const response = await fetch(url, {
    credentials: "include",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw "Error trying CSRF token";
  }

  const json = await response.json();

  return json.csrf;
};

const getCurrentUser = async (discourseEndpoint, { csrfToken }) => {
  const url = `${discourseEndpoint}/session/current.json`;
  const response = await fetch(url, {
    credentials: "include",
    headers: {
      Accept: "application/json",
      "X-CSRF-Token": csrfToken,
    },
  });

  // Could be the case for no active session
  if (!response.ok) {
    return;
  }

  const json = await response.json();
  const { current_user: currentUser } = json;

  return currentUser;
};

export const syncCurrentUser = async (community) => {
  let currentUser;
  let discourseEndpoint = sanitiseSSOUrl(community);

  try {
    const csrfToken = await getCSRFToken(discourseEndpoint);
    currentUser = await getCurrentUser(discourseEndpoint, { csrfToken });
  } catch (error) {
    console.warn("Unable to get user session", error);
  }

  return currentUser;
};

export const logout = async (community, username) => {
  let discourseEndpoint = sanitiseSSOUrl(community);
  const url = `${discourseEndpoint}/session/${username}`;
  const csrfToken = await getCSRFToken(discourseEndpoint);

  try {
    await fetch(url, {
      method: "DELETE",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "X-CSRF-Token": csrfToken,
      },
    });
  } catch (error) {
    console.error("Unable to logout successfully", error);
  }
};
