import React from "react";
import { useNavigate } from "react-router-dom";
import LobbyConnection from "../connection/LobbyConnection";

function JoinLobbyButton(props) {
  let navigate = useNavigate();

  let lobbyID = null;

  const setID = (e) => {
    lobbyID = e.target.value;
  };

  const routeChange = () => {
    LobbyConnection.joinLobby(localStorage.getItem("userID"), lobbyID).then(
      (result) => {
        sessionStorage.setItem("lobbyID", lobbyID);
        navigate("/lobby");
      }
    );
  };

  return (
    <div>
      <button color="primary" className="px-4" onClick={routeChange}>
        {props.text}
      </button>
      <input type="text" placeholder="Input lobby id" onChange={setID} />
    </div>
  );
}

export default JoinLobbyButton;
