import React from 'react';
import uuid from 'uuid';

const Player = props => {
  const {playerCount,playerCards} = props;

  return (
    <div className="card-holder">
      <h4 className="text-center">Your Hand: {playerCount}</h4>
      <div className="text-center" style={{"fontSize":"70pt"}}>
        {playerCards.map(card =>(
          <span key={uuid()} className="card-wrapper"><span key={uuid()} className="card"
                style={{"color": ((card.suit == 'H') || (card.suit == 'D')) ? "red" : "black"}}>
          {card.display}</span></span>
        ))}
      </div>
    </div>
  )
}

export default Player;
