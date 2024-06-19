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

const LobbyConnection = {
  createLobby: (userID) =>
    apiClientLocal
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
    apiClientLocal
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
    apiClientLocal
      .get(`/lobby/${lobbyID}`, {
        headers: {
          Authorization: `Bearer ${TokenManger.getToken()}`,
        },
      })
      .then((response) => response.data),
};
export default LobbyConnection;
