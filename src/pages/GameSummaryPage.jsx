import React, { useLayoutEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import AuthContext from "../auth/AuthenticationContext";
function GameSummaryPage() {
  const { userDetails } = useContext(AuthContext);

  const gameInfo = JSON.parse(sessionStorage.getItem("lastGame"));

  console.log(gameInfo);
  let winner1 = null;
  let winner2 = null;
  const [win, setwin] = useState("lose");

  useLayoutEffect(() => {
    if (parseInt(gameInfo.winnerTeam) === 1) {
      winner1 = gameInfo.player1;
      winner2 = gameInfo.player3;
    } else {
      winner1 = gameInfo.player2;
      winner2 = gameInfo.player4;
    }
    if (winner1 == null) {
      winner1 = { id: 0, username: "Bot" };
    }
    if (winner2 == null) {
      winner2 = { id: 0, username: "Bot" };
    }

    if (
      parseInt(winner1.id) === parseInt(userDetails.id) ||
      winner2.id === userDetails.id
    ) {
      setwin("win");
    }
  }, []);

  return (
    <div>
      <h1>You {win}</h1>
      <div>
        <h2>Team 1 score: {gameInfo.team1Score}</h2>
        <h2>Team 2 score: {gameInfo.team2Score}</h2>
      </div>
    </div>
  );
}

export default GameSummaryPage;
