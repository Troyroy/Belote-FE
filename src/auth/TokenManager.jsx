import { jwtDecode } from "jwt-decode";

const TokenManager = {
  getToken: () => sessionStorage.getItem("token"),

  getDetails: () => {
    if (!sessionStorage.getItem("details")) {
      return undefined;
    }

    return JSON.parse(sessionStorage.getItem("details"));
  },

  setToken: (token) => {
    try {
      const details = jwtDecode(token);
      const JSONdetials = JSON.stringify(details);
      delete JSONdetials["exp"];
      delete JSONdetials["iat"];

      sessionStorage.setItem("token", token);
      sessionStorage.setItem("details", JSONdetials);

      return details;
    } catch (error) {
      console.error("Failed to decode JWT with token: ", token, error);
      throw error;
    }
  },

  clearData: () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("details");
    sessionStorage.removeItem("userID");
  },
};

export default TokenManager;
