import axios from "axios";

// this can be further optimised, e.g.
// no hardcode baseURL
// axios with a custom config axios.create(..)

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

const UserConnection = {
  loginUser1: () =>
    apiClientHosted.get("/users").then((response) => response.data.todos),
  loginUser: (loginRequest) =>
    apiClientHosted
      .post("/users/login", loginRequest)
      .then((response) => response.data),
  registerUser: (createUserRequest) =>
    apiClientHosted
      .post("/users", createUserRequest)
      .then((response) => response.data),
};
export default UserConnection;
