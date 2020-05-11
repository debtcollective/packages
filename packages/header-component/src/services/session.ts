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

  return json;
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

export const syncCurrentUser = async (discourseEndpoint) => {
  let currentUser;

  try {
    const csrfToken = await getCSRFToken(discourseEndpoint);
    currentUser = await getCurrentUser(discourseEndpoint, { csrfToken });
  } catch (error) {
    console.error(error);
  }

  return currentUser;
};
