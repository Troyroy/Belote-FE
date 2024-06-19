import React, { createContext, useState } from "react";
import TokenManager from "./TokenManager";

export const AuthContext = createContext();

export const AuthenticationContext = ({ children }) => {
  const details = TokenManager.getDetails() || null;

  const [userDetails, setDetails] = useState(details);

  const login = (token) => {
    try {
      const userDetails = TokenManager.setToken(token);
      console.log(userDetails.role);
      setDetails(userDetails);
    } catch (error) {
      console.error("Failed to set access token in login: ", error);
    }
  };

  const logout = () => {
    TokenManager.clearData();
    setDetails(null);
  };

  return (
    <AuthContext.Provider value={{ userDetails, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
