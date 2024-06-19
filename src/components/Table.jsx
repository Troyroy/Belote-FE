import Hand from "../components/Hand";
import React from "react";
import Bucket from "../components/Bucket";
import { useContext } from "react";
import AuthContext from "../auth/AuthenticationContext";

function Table(props) {
  const { userDetails } = useContext(AuthContext);
  let playerID = userDetails.id;
  console.log(playerID);
  const playCard = (e) => {
    e.preventDefault();
    console.log(getByValue(props.gameState.players, playerID));
    props.playCard(e, getByValue(props.gameState.players, playerID));
  };

  console.log(
    props.gameState.hands[
      getByValue(props.gameState.players, parseInt(playerID))
    ]
  );
  function getByValue(map, searchValue) {
    for (let i = 1; i < 5; i++) {
      if (map[i].id === searchValue) {
        return i;
      }
    }
  }

  function calculatePosition(playerInGamePosition, times) {
    let position = playerInGamePosition + times;
    if (position > 4) {
      position = position - 4;
    }
    return position;
  }

  if (props.gameState != undefined) {
    return (
      <div className="table">
        <div className="player player1">
          <div className="player-area">
            <Hand
              playCard={playCard}
              hand={
                props.gameState.hands[
                  calculatePosition(
                    getByValue(props.gameState.players, playerID),
                    2
                  )
                ]
              }
              id={2}
            ></Hand>
          </div>
        </div>
        <div className="player player2">
          <div className="player-area">
            <Hand
              playCard={playCard}
              hand={
                props.gameState.hands[
                  calculatePosition(
                    getByValue(props.gameState.players, playerID),
                    1
                  )
                ]
              }
              id={1}
            ></Hand>
          </div>
        </div>
        <div className="player player5">
          <div className="player-area">
            <div className="player-name">
              <Bucket
                bucket={props.gameState.bucket}
                firstPlayerBucket={props.gameState.firstPlayerBucket}
                players={props.gameState.players}
              ></Bucket>
            </div>
          </div>
        </div>
        <div className="player player3">
          <div className="player-area">
            <Hand
              playCard={playCard}
              hand={
                props.gameState.hands[
                  getByValue(props.gameState.players, playerID)
                ]
              }
              id={0}
            ></Hand>
          </div>
        </div>
        <div className="player player4">
          <div className="player-area">
            <Hand
              playCard={playCard}
              hand={
                props.gameState.hands[
                  calculatePosition(
                    getByValue(props.gameState.players, playerID),
                    3
                  )
                ]
              }
              id={3}
            ></Hand>
          </div>
        </div>
      </div>
    );
  } else {
    <div>
      <h1>Error</h1>
    </div>;
  }
}

export default Table;
