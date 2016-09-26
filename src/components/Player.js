import React from 'react';
//const uuid = require('uuid');

const Player = props => {
  const {playerCount,playerCards} = props;

  return (
    <div>
      <h4>Your Hand: {playerCount}</h4>
      <div style={{"fontSize":"50pt"}}>
        {playerCards.map(card =>(
          card.display
        ))}
      </div>
    </div>
  )
}

export default Player;
