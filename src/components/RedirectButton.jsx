import React from "react";
import { useNavigate } from "react-router-dom";
import GameConnection from "../connection/GameConnection";
import LobbyConnection from "../connection/LobbyConnection";
import { useContext } from "react";
import AuthContext from "../auth/AuthenticationContext";

function RedirectButton(props) {
  const { userDetails } = useContext(AuthContext);

  let navigate = useNavigate();

  const routeChange = () => {
    LobbyConnection.createLobby(
      userDetails.id
      //sessionStorage.getItem("token")
    ).then((resultLobby) => {
      console.log(resultLobby);
      GameConnection.createGame(
        parseInt(resultLobby)
        // sessionStorage.getItem("token")
      ).then((result) => {
        sessionStorage.setItem("gameID", result.id);
        navigate("/game");
      });
    });
  };

  return (
    <button id="VSAI" color="primary" className="px-4" onClick={routeChange}>
      {props.text}
    </button>
  );
}

export default RedirectButton;
