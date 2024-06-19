import React from "react";
import styles from "./PlayerLobby.module.css";

function PlayerLobby(props) {
  return (
    <div className={styles.player}>
      <h1>Player {props.index + 1}</h1>
      <h2>{props.username}</h2>
    </div>
  );
}

export default PlayerLobby;
