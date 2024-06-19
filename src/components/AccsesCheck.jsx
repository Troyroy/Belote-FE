import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../auth/AuthenticationContext";
import LoginPage from "../pages/LoginPage";

const AccsesCheck = ({ accsesLevelRequired, children }) => {
  const { userDetails } = useContext(AuthContext);
  console.log(children);
  let accsesLevel = -1;
  if (userDetails != null) {
    if (userDetails.role === "REGULAR") {
      accsesLevel = 1;
    } else if (userDetails.role === "ADMIN") {
      accsesLevel = 2;
    }
  }

  if (userDetails === undefined) {
    return <Navigate to="/login" replace />;
  } else if (accsesLevelRequired === -1 && accsesLevel >= 0) {
    return <Navigate to="/selectGame" replace />;
  } else if (accsesLevelRequired > accsesLevel) {
    return <Navigate to="/denied" replace />;
  }

  return children ? children : <Outlet />;
};

export default AccsesCheck;
