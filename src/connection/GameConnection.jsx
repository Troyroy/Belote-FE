import axios from "axios";
import TokenManger from "../auth/TokenManager";

const apiClientHosted = axios.create({
  baseURL: "http://145.93.60.182:8080",
  withCredentials: false, // Send cookies and HTTP auth information
  headers: {
    "Content-Type": "application/json",
  },
});

const apiClientLocal = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: false, // Send cookies and HTTP auth information
  headers: {
    "Content-Type": "application/json",
  },
});

const GameConnection = {
  getGame: (gameID) =>
    apiClientLocal
      .get(`/game/${gameID}`, {
        headers: {
          Authorization: `Bearer ${TokenManger.getToken()}`,
        },
      })
      .then((response) => response.data),
  createGame: (lobbyID) =>
    apiClientLocal
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
    apiClientLocal
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
