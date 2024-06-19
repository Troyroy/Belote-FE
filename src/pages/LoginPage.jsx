import UserConnection from "../connection/UserConnection";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../auth/AuthenticationContext";
import "./LoginPage.css";

function LoginPage() {
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();
  const loginSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.email.value);
    const LoginRequest = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    UserConnection.loginUser(LoginRequest)
      .then((result) => {
        login(result.token);
        navigate("/selectGame");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <form onSubmit={loginSubmit}>
        <h3>Login</h3>
        <input id="email" type="text" name="email" placeholder="Email" />
        <input
          id="password"
          type="password"
          className="password"
          placeholder="Password"
        />
        <button type="submit" text="Login">
          Log in
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
