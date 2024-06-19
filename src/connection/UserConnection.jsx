import axios from "axios";

// this can be further optimised, e.g.
// no hardcode baseURL
// axios with a custom config axios.create(..)

const apiClientHosted = axios.create({
  baseURL: "http://145.93.60.182:8080",
  withCredentials: false, // Send cookies and HTTP auth information
  headers: {
    "Content-Type": "application/json",
  },
});

const apiClientLocal = axios.create({
  baseURL: "https://belote-backend-latest.onrender.com",
  withCredentials: false, // Send cookies and HTTP auth information
  headers: {
    "Content-Type": "application/json",
  },
});

const UserConnection = {
  loginUser1: () =>
    apiClientLocal.get("/users").then((response) => response.data.todos),
  loginUser: (loginRequest) =>
    apiClientLocal
      .post("/users/login", loginRequest)
      .then((response) => response.data),
  registerUser: (createUserRequest) =>
    apiClientLocal
      .post("/users", createUserRequest)
      .then((response) => response.data),
};
export default UserConnection;
