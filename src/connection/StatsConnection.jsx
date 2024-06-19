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
