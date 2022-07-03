const isBrowser = typeof window !== `undefined`;
export interface IUser {
  username: string;
}

const getUser = async () =>
  window.localStorage.gatsbyUser
    ? await JSON.parse(window.localStorage.gatsbyUser)
    : {};

export const setUser = (user) =>
  (window.localStorage.gatsbyUser = JSON.stringify(user));

export const isLoggedIn = async () => {
  if (!isBrowser) return false;
  const isLoggedIn = await fetch("/api/user/loggedincheck", {
    method: "GET",
    mode: "cors",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (isLoggedIn.ok) {
    const data = await isLoggedIn.json();
    setUser({ username: data.username });
    return true;
  } else {
    setUser({});
    return false;
  }
};

export const getCurrentUser = () => isBrowser && getUser();

export const logout = async () => {
  if (!isBrowser) return;
  await setUser({});
};
