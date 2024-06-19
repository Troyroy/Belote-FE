import React from "react";
import Card from "./Card.jsx";
import BackCard from "./BackCard.jsx";

function Hand(props) {
  const playCard = (e) => {
    props.playCard(e);
  };
  if (props.hand != undefined && props.id === 0) {
    return (
      <ul className="cardHand" id="imperial-flower">
        {props.hand.map((item) => (
          <li key={item.id} className="handItem" id="hearth">
            <Card key={item.id} playCard={playCard} card={item} />
          </li>
        ))}
      </ul>
    );
  } else if (props.hand != undefined && props.id != 0) {
    return (
      <ul className="cardHand" id="imperial-flower">
        {props.hand.map((item) => (
          <li key={item.id} className="handItemNonRotate" id="hearth">
            <BackCard key={item.id} card={item} />
          </li>
        ))}
      </ul>
    );
  } else {
    return (
      <div>
        <h1>Error</h1>
      </div>
    );
  }
}

export default Hand;
