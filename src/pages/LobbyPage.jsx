import LobbyConnection from "../connection/LobbyConnection";
import GameConnection from "../connection/GameConnection";
import { lobbyWebSocket } from "../connection/LobbyWebSocket";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../auth/AuthenticationContext";
import PlayerLobby from "../components/PlayerLobby";
function LobbyPage() {
  const navigate = useNavigate();
  const { userDetails } = useContext(AuthContext);
  const { messagesReceived, sendMessage } = lobbyWebSocket(
    sessionStorage.getItem("lobbyID")
  );
  const [start, setStart] = useState(<div></div>);

  const [lobbyState, setLobby] = useState({
    id: 1,
    players: [],
  });

  useEffect(() => {
    if (messagesReceived[messagesReceived.length - 1] === "connect") {
      sessionStorage.setItem("gameID", sessionStorage.getItem("lobbyID"));
      navigate("/game");
    } else {
      LobbyConnection.getLobby(sessionStorage.getItem("lobbyID")).then(
        (result) => {
          setLobby(result);
        }
      );
    }
  }, [messagesReceived]);

  useEffect(() => {
    if (lobbyState.players.length !== 0) {
      if (lobbyState.players[0].id === userDetails.id) {
        setStart(<button onClick={startGame}>Start game</button>);
      }
    }
  });
  const startGame = () => {
    GameConnection.createGame(sessionStorage.getItem("lobbyID")).then(
      (result) => {
        //console.log(localStorage.getItem("lobbyID"));
        sessionStorage.setItem("gameID", result.id);
        navigate("/game");
      }
    );
  };

  return (
    <div>
      <h1>Lobby ID: {lobbyState.id}</h1>
      <ul>
        {lobbyState.players.map((item) => (
          <li key={item.id}>
            <PlayerLobby
              key={item.id}
              username={item.username}
              index={lobbyState.players.indexOf(item)}
            />
          </li>
        ))}
      </ul>
      <div>{start}</div>
    </div>
  );
}

export default LobbyPage;
