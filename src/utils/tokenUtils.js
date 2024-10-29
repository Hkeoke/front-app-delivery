export const getToken = () => {
  const tokenData = localStorage.getItem("tokenData");
  if (!tokenData) return null;

  try {
    const item = JSON.parse(tokenData);
    const now = new Date();

    if (now.getTime() > item.expiry) {
      localStorage.removeItem("tokenData");
      return null;
    }

    return item.token;
  } catch (error) {
    localStorage.removeItem("tokenData");
    return null;
  }
};

export const getUserData = () => {
  const tokenData = localStorage.getItem("tokenData");
  if (!tokenData) return null;

  try {
    const item = JSON.parse(tokenData);
    return item.userData;
  } catch (error) {
    return null;
  }
};

export const removeToken = () => {
  localStorage.removeItem("tokenData");
};
export const isAuthenticated = () => {
  const token = getToken();
  return token !== null;
};
