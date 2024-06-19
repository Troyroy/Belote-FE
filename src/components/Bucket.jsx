import React from "react";
import styles from "./Bucket.module.css";
import BackCard from "./BackCard";
import Card from "./Card";
import { useContext } from "react";
import AuthContext from "../auth/AuthenticationContext";

function Bucket(props) {
  let firstPlayer = props.firstPlayerBucket;
  console.log(firstPlayer);
  const { userDetails } = useContext(AuthContext);
  function getByValue(map, searchValue) {
    for (let i = 1; i < 5; i++) {
      if (map[i].id === searchValue) {
        return i;
      }
    }
  }

  let offset =
    firstPlayer - getByValue(props.players, parseInt(userDetails.id));

  let playerInGamePosition1 = getByValue(
    props.players,
    parseInt(userDetails.id)
  );

  function translatePosition(times) {
    console.log(parseInt(userDetails.id));
    let calc = getByValue(props.players, parseInt(userDetails.id)) + times;
    if (calc >= 5) {
      calc = calc - 4;
    }
    return calc;
  }

  function calculatePosition(playerInGamePosition) {
    let playerOrder = playerInGamePosition - offset;
    if (playerOrder <= 0) {
      playerOrder = playerOrder + 4;
    }
    return playerOrder - getByValue(props.players, parseInt(userDetails.id));
  }

  return (
    <div className={styles.container}>
      <div className={styles.card1}>
        {props.bucket[calculatePosition(translatePosition(2))] !== undefined ? (
          <div className="handItem">
            <Card
              card={props.bucket[calculatePosition(translatePosition(2))]}
            />
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <div className={styles.card2}>
        {props.bucket[calculatePosition(translatePosition(1))] !== undefined ? (
          <div className="handItem">
            <Card
              card={props.bucket[calculatePosition(translatePosition(1))]}
            />
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <div className={styles.card3}>
        {props.bucket[calculatePosition(translatePosition(0))] !== undefined ? (
          <div className="handItem">
            <Card
              card={props.bucket[calculatePosition(translatePosition(0))]}
            />
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <div className={styles.card4}>
        {props.bucket[calculatePosition(translatePosition(3))] !== undefined ? (
          <div className="handItem">
            <Card
              card={props.bucket[calculatePosition(translatePosition(3))]}
            />
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default Bucket;
