import React from 'react';
import uuid from 'uuid';

const Dealer = props => {
  const {dealerCount,dealerCards,stand,play} = props;
  let showCount = dealerCount;
  let showCards = dealerCards;

  if((!stand) && play){
    if((dealerCards[1].value == 1) && (dealerCards[0].value == 1)){
      showCount = 11;
    }else if(dealerCards[1].value == 1){
      showCount = dealerCount - 11;
    }else{
      showCount = dealerCount - dealerCards[1].value;
    }
    showCards = [dealerCards[0],{value:0,display:'🂠',suit:dealerCards[1].suit}];
  }

  let test = 'red';
  return (
    <div className="card-holder">
      <h4 className="text-center">Dealers Hand: {showCount}</h4>
      <div className="text-center" style={{"fontSize":"70pt"}}>
        {showCards.map((card,index) => (
          <span key={uuid()} className="card-wrapper"><span key={uuid()} className="card"
                style={{"color": ((card.suit == 'H') || (card.suit == 'D')) ? "red" : "black"}}>
          {card.display}</span></span>
        ))}
      </div>
    </div>
  )
}

export default Dealer;
