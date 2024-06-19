import React from "react";
import { useNavigate } from "react-router-dom";
import LobbyConnection from "../connection/LobbyConnection";
import { useContext } from "react";
import AuthContext from "../auth/AuthenticationContext";

function CreateLobbyButton(props) {
  const { userDetails } = useContext(AuthContext);
  let navigate = useNavigate();
  const routeChange = () => {
    LobbyConnection.createLobby(
      userDetails.id,
      sessionStorage.getItem("token")
    ).then((result) => {
      sessionStorage.setItem("lobbyID", result);
      navigate("/lobby");
    });
  };

  return (
    <button
      id="lobbyButton"
      color="primary"
      className="px-4"
      onClick={routeChange}
    >
      {props.text}
    </button>
  );
}

export default CreateLobbyButton;
