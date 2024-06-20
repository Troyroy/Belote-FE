import React, { useEffect } from "react";
import styles from "./Bucket.module.css";
import BackCard from "./BackCard";
import Card from "./Card";
import { useContext } from "react";
import AuthContext from "../auth/AuthenticationContext";

function Bucket(props) {
  const { userDetails } = useContext(AuthContext);
  let playerInGamePosition1 = getByValue(
    props.players,
    parseInt(userDetails.id)
  );
  let firstPlayer = props.firstPlayerBucket;
  useEffect(() => {
    firstPlayer = firstPlayer - playerInGamePosition1;
    if (firstPlayer < 1) {
      firstPlayer = firstPlayer + 4;
    }
  });

  function getByValue(map, searchValue) {
    for (let i = 1; i < 5; i++) {
      if (map[i].id === searchValue) {
        return i;
      }
    }
  }

  let offset =
    firstPlayer - getByValue(props.players, parseInt(userDetails.id));

  function translatePosition(times) {
    let calc = getByValue(props.players, parseInt(userDetails.id)) + times;

    if (calc > 4) {
      calc = calc - 4;
    }
    return calc;
  }

  function calculatePosition(playerInGamePosition) {
    let playerOrder = playerInGamePosition - offset;
    if (playerOrder < 1) {
      playerOrder = playerOrder + 4;
    }
    let s = playerOrder - getByValue(props.players, parseInt(userDetails.id));
    console.log(
      playerOrder - getByValue(props.players, parseInt(userDetails.id))
    );
    if (s < 0) {
      s = s + 4;
    }
    return s;
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
