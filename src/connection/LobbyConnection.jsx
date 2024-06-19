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

const LobbyConnection = {
  createLobby: (userID) =>
    apiClientHosted
      .post(
        `/lobby/${userID}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${TokenManger.getToken()}`,
          },
        }
      )
      .then((response) => response.data),
  joinLobby: (userID, lobbyID) =>
    apiClientHosted
      .post(
        `/lobby/${userID}/${lobbyID}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${TokenManger.getToken()}`,
          },
        }
      )
      .then((response) => response.data),
  getLobby: (lobbyID) =>
    apiClientHosted
      .get(`/lobby/${lobbyID}`, {
        headers: {
          Authorization: `Bearer ${TokenManger.getToken()}`,
        },
      })
      .then((response) => response.data),
};
export default LobbyConnection;
