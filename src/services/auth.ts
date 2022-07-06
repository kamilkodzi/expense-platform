const isBrowser = typeof window !== `undefined`;
export interface IUser {
  _id: any;
  fetch;
  id: string;
  username: string;
}

const getUser = async () =>
  window.localStorage.gatsbyUser
    ? await JSON.parse(window.localStorage.gatsbyUser)
    : {};

export const setUser = (obj: any) =>
  (window.localStorage.gatsbyUser = JSON.stringify(obj));

export const isLoggedIn = async () => {
  if (!isBrowser) return false;
  const isLoggedIn = await getCurrentUser();
  if (
    isLoggedIn?.username &&
    !isLoggedIn?.id?.includes("{") &&
    isLoggedIn?.id
  ) {
    return true;
  } else {
    await setUser({});
    return false;
  }
};

export const getCurrentUser = () => isBrowser && getUser();

export const logout = async () => {
  if (!isBrowser) return;
  await setUser({});
};
