import CreateLobbyButton from "../components/CreateLobbyButton";
import JoinLobbyButton from "../components/JoinLobbyButton";
import RedirectButton from "../components/RedirectButton";
import "./SelectGamePage.css";

const SelectGamePage = () => {
  return (
    <div>
      <h1>Select game mode</h1>
      <RedirectButton
        id={"VS AI"}
        path={"/game"}
        text={"VS AI"}
      ></RedirectButton>
      <CreateLobbyButton
        path={"/lobby"}
        text={"Create lobby"}
      ></CreateLobbyButton>
      <JoinLobbyButton path={"/lobby"} text={"Join lobby"}></JoinLobbyButton>
    </div>
  );
};

export default SelectGamePage;
