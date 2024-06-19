import React from "react";
import styles from "./Card.module.css";
import {
  BsSuitHeartFill,
  BsSuitClubFill,
  BsSuitSpadeFill,
  BsSuitDiamondFill,
  BsDiamondFill,
} from "react-icons/bs";

function Card(props) {
  const playCard = (e) => {
    e.preventDefault();
    props.playCard(e);
    //should send game id and player id
  };
  let icon = <div />;
  let col = "Black";
  let rank = <div />;
  function determinIcon() {
    if (props.card.suit === "Hearts") {
      icon = <BsSuitHeartFill fill={"Red"} size={"12"} />;
      col = "red";
    } else if (props.card.suit === "Spades") {
      icon = <BsSuitSpadeFill fill={"Black"} size={"12"} />;
    } else if (props.card.suit === "Clubs") {
      icon = <BsSuitClubFill fill={"Black"} size={"12"} />;
    } else if (props.card.suit === "Diamonds") {
      icon = <BsDiamondFill fill={"Red"} size={"12"} />;
      col = "red";
    }
  }

  function determineRank() {
    if (props.card.rank === "Nine") {
      rank = <h1 className={styles.black}>9</h1>;
    } else if (props.card.rank === "Ten") {
      rank = (
        <h1 className={styles.black} color={col}>
          10
        </h1>
      );
    } else if (props.card.rank === "Eight") {
      rank = (
        <h1 className={styles.black} color={col}>
          8
        </h1>
      );
    } else if (props.card.rank === "Seven") {
      rank = (
        <h1 className={styles.black} color={col}>
          7
        </h1>
      );
    } else if (props.card.rank === "King") {
      rank = (
        <h1 className={styles.black} color={col}>
          K
        </h1>
      );
    } else if (props.card.rank === "Queen") {
      rank = (
        <h1 className={styles.black} color={col}>
          Q
        </h1>
      );
    } else if (props.card.rank === "Jack") {
      rank = (
        <h1 className={styles.black} color={col}>
          J
        </h1>
      );
    } else if (props.card.rank === "Ace") {
      rank = (
        <h1 className={styles.black} color={col}>
          A
        </h1>
      );
    }
  }

  determinIcon();
  determineRank();
  if (props.card != null) {
    return (
      <form
        id={props.card.id}
        className={styles.cardHand}
        onSubmit={playCard}
        onClick={playCard}
      >
        {rank}
        {icon}
      </form>
    );
  }
}

export default Card;
