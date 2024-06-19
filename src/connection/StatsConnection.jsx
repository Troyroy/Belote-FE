import axios from "axios";
import TokenManger from "../auth/TokenManager";

const apiClientLocal = axios.create({
  baseURL: "http://localhost:8080/stats",
  withCredentials: false, // Send cookies and HTTP auth information
  headers: {
    "Content-Type": "application/json",
  },
});

const StatsConnection = {
  getUserGamesByUserID: (userID) =>
    apiClientLocal
      .get(`/${userID}`, {
        headers: {
          Authorization: `Bearer ${TokenManger.getToken()}`,
        },
      })
      .then((response) => response.data),
  getUserGamesByUsername: (username) =>
    apiClientLocal
      .get(`/username/${username}}`, {
        headers: {
          Authorization: `Bearer ${TokenManger.getToken()}`,
        },
      })
      .then((response) => response.data),
  getLeaderBoard: () =>
    apiClientLocal
      .get(`/leaderBoard`, {
        headers: {
          Authorization: `Bearer ${TokenManger.getToken()}`,
        },
      })
      .then((response) => response.data),
};
export default StatsConnection;
