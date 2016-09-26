import React from 'react';
//const uuid = require('uuid');

const Dealer = props => {
  const {dealerCount,dealerCards,stand,play} = props;
  let showCount = dealerCount;
  let showCards = dealerCards;

  if((!stand) && play){
    if(dealerCards[1].value == 1){
      showCount = dealerCount - 11;
    }else{
      showCount = dealerCount - dealerCards[1].value;
    }
    showCards = [dealerCards[0],{value:0,display:'🂠',suit:'H'}];
  }

  return (
    <div>
      <h4>Dealers Hand: {showCount}</h4>
      <div style={{"fontSize":"50pt"}}>
        {showCards.map((card,index) => (
          card.display
        ))}
      </div>
    </div>
  )
}

export default Dealer;
