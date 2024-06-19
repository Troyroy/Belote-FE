import React from "react";
import { useNavigate } from "react-router-dom";
import LobbyConnection from "../connection/LobbyConnection";

function CreateLobbyButton(props) {
  let navigate = useNavigate();
  const routeChange = () => {
    LobbyConnection.createLobby(
      localStorage.getItem("userID"),
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
