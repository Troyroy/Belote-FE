import axios from "axios";
import TokenManger from "../auth/TokenManager";

const apiClientHosted = axios.create({
  baseURL: "https://belote-backend-latest.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

const apiClientLocal = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

const GameConnection = {
  getGame: (gameID) =>
    apiClientHosted
      .get(`/game/${gameID}`, {
        headers: {
          Authorization: `Bearer ${TokenManger.getToken()}`,
        },
      })
      .then((response) => response.data),
  createGame: (lobbyID) =>
    apiClientHosted
      .post(
        `/game/${lobbyID}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${TokenManger.getToken()}`,
          },
        }
      )
      .then((response) => response.data),
  playCard: (cardID, gameID, playerID) => {
    apiClientHosted
      .post(
        `/game/${gameID}/${cardID}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${TokenManger.getToken()}`,
          },
        }
      )
      .then((response) => response.data);
  },
};
export default GameConnection;
