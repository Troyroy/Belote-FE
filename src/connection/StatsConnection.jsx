import axios from "axios";
import TokenManger from "../auth/TokenManager";

const apiClientHosted = axios.create({
  baseURL: "https://belote-backend-latest.onrender.com/stats",
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

const StatsConnection = {
  getUserGamesByUserID: (userID) =>
    apiClientHosted
      .get(`/${userID}`, {
        headers: {
          Authorization: `Bearer ${TokenManger.getToken()}`,
        },
      })
      .then((response) => response.data),
  getUserGamesByUsername: (username) =>
    apiClientHosted
      .get(`/username/${username}}`, {
        headers: {
          Authorization: `Bearer ${TokenManger.getToken()}`,
        },
      })
      .then((response) => response.data),
  getLeaderBoard: () =>
    apiClientHosted
      .get(`/leaderBoard`, {
        headers: {
          Authorization: `Bearer ${TokenManger.getToken()}`,
        },
      })
      .then((response) => response.data),
};
export default StatsConnection;
