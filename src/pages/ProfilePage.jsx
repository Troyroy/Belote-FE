import UserConnection from "../connection/UserConnection";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../auth/AuthenticationContext";
function ProfilePage(props) {
  const navigate = useNavigate();

  const { logout } = useContext(AuthContext);

  const { userDetails } = useContext(AuthContext);

  const logOut = () => {
    logout();
    navigate("/login");
  };
  return (
    <div>
      <h1>{userDetails.sub}</h1>

      <h1>ID:{userDetails.id}</h1>
      <button onClick={logOut}>Log Out</button>
    </div>
  );
}

export default ProfilePage;
