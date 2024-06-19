import Hand from "../components/Hand";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Bucket from "../components/Bucket";
import "./GamePage.css";
import GameConnection from "../connection/GameConnection";
import { useStompClient } from "../connection/GameWebSocket";
import Table from "../components/Table";
import { useNavigate } from "react-router-dom";

function GamePage() {
  const navigate = useNavigate();
  if (sessionStorage.getItem("gameID") === null) {
    navigate("/selectGame");
  }
  const { messagesReceived, sendMessage } = useStompClient(
    sessionStorage.getItem("gameID")
  );
  const [gameState, setGame] = useState({
    id: 1,
    testVal: 0,
    deck: [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
    cardToAnswer: {
      id: 12,
      points: 10,
      suit: "Clubs",
      rank: "Ten",
    },
    currentBucket: 1,
    firstPlayerRound: 1,
    firstPlayerBucket: 1,
    bucket: [],
    scores: null,
    thisRoundCards: {
      0: [],
      1: [],
    },
    order: [3, 4, 1, 2],
    players: {
      1: -1,
      2: -2,
      3: 1,
      4: 0,
    },
    hands: {
      1: [],
      2: [],
      3: [],
      4: [],
    },
  });

  useEffect(() => {
    if (messagesReceived.length <= 0) {
      GameConnection.getGame(parseInt(sessionStorage.getItem("gameID"))).then(
        (result) => {
          setGame(result);
        }
      );
    } else if (
      messagesReceived[messagesReceived.length - 1].hasOwnProperty("winnerTeam")
    ) {
      sessionStorage.removeItem("gameID");
      sessionStorage.setItem(
        "lastGame",
        JSON.stringify(messagesReceived[messagesReceived.length - 1])
      );
      navigate("/gameInfo");
    } else {
      setGame(messagesReceived[messagesReceived.length - 1]);
    }
  }, [messagesReceived]);

  const cards = [1, 2, 3, 4, 5, 6, 7, 8];

  const pot = [];

  const [hand, setHand] = useState(cards);

  const [bucket, setBucket] = useState(pot);

  const playCard = (e) => {
    for (var i = 0; i < hand.length; i++) {
      if (hand[i] == e.target.id) {
        bucket.push(hand[i]);
        hand.splice(i, 1);
        break;
      }
    }
    GameConnection.playCard(
      e.target.id,
      parseInt(sessionStorage.getItem("gameID")),
      e.inGameID
    );

    setHand([...hand]);
    setBucket([...bucket]);
  };
  return (
    <Table
      gameState={gameState}
      user={sessionStorage.getItem("details").id}
      playCard={playCard}
      hand={hand}
      bucket={bucket}
    ></Table>
  );
}

export default GamePage;
