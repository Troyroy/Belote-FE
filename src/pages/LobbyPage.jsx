import LobbyConnection from "../connection/LobbyConnection";
import GameConnection from "../connection/GameConnection";
import { lobbyWebSocket } from "../connection/LobbyWebSocket";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PlayerLobby from "../components/PlayerLobby";
function LobbyPage() {
  const navigate = useNavigate();
  const { messagesReceived, sendMessage } = lobbyWebSocket(
    sessionStorage.getItem("lobbyID")
  );
  const [lobbyState, setLobby] = useState({
    id: 1,
    players: [],
  });

  useEffect(() => {
    console.log(messagesReceived);
    console.log(messagesReceived[messagesReceived.length - 1]);
    if (messagesReceived[messagesReceived.length - 1] === "connect") {
      //fix this ASAP
      sessionStorage.setItem("gameID", 1);
      navigate("/game");
    } else {
      LobbyConnection.getLobby(sessionStorage.getItem("lobbyID")).then(
        (result) => {
          setLobby(result);
        }
      );
    }
  }, [messagesReceived]);

  const startGame = () => {
    GameConnection.createGame(sessionStorage.getItem("lobbyID")).then(
      (result) => {
        console.log(localStorage.getItem("lobbyID"));
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
      <button onClick={startGame}>Start game</button>
    </div>
  );
}

export default LobbyPage;
