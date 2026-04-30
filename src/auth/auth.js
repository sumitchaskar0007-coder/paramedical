export const auth = {
  isAuthenticated: () => {
    return localStorage.getItem("isLoggedIn") === "true";
  },

  login: (callback) => {
    localStorage.setItem("isLoggedIn", "true");
    callback();
  },

  logout: (callback) => {
    localStorage.removeItem("isLoggedIn");
    callback();
  }
};
