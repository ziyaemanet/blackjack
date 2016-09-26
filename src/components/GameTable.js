import React, {Component} from 'react';
import uuid from 'uuid';

import CardStore from '../stores/CardStore';
import CardActions from '../actions/CardActions';
import Dealer from './Dealer';
import Player from './Player';

export default class GameTable extends Component{
  constructor(props){
    super(props);

    this.state = {
      playerCards:[{value:0,display:'🂠',suit:'S'}],
      dealerCards:[{value:0,display:'🂠',suit:'H'}],
      playerCount: 0,
      dealerCount: 0,
      stand: CardStore.getStand(),
      play: CardStore.getPlay(),
      message: CardStore.getMessage()
    };

    this._onChange = this._onChange.bind(this);
  }

  componentWillMount(){
    CardStore.startListening(this._onChange);
  }

  componentWillUnmount(){
    CardStore.stopListening(this._onChange);
  }

  _onChange(){
    this.setState({
      playerCards: CardStore.getPlayerCards(),
      dealerCards: CardStore.getDealerCards(),
      playerCount: CardStore.getPlayerCount(),
      dealerCount: CardStore.getDealerCount(),
      stand: CardStore.getStand(),
      play: CardStore.getPlay(),
      message: CardStore.getMessage()
    })

  }

  newGame(){
    CardActions.newGame();

    for(let i=0;i<2;i++){
      CardActions.hit();
    }

    CardActions.stand(false,false);

    for(let i=0;i<2;i++){
      CardActions.hit();
    }
  }

  checkStatus(){

  }

  hit(){
    CardActions.hit();
  }

  stand(){
    CardActions.stand(true,true);
  }

  render(){
    const {dealerCards,playerCards,dealerCount,playerCount,stand,play,message} = this.state;

    return(
      <div id="table">
        <div id="table-inner">
          <Dealer dealerCards={dealerCards} dealerCount={dealerCount} stand={stand} play={play}/>
          <Player playerCards={playerCards} playerCount={playerCount}/>

          <div>{message}</div>
          <button className="btn btn-default" disabled={play} onClick={this.newGame}>New Game</button>
          <button className="btn btn-info" disabled={!play || stand} onClick={this.hit}>Hit</button>
          <button className="btn btn-warning" disabled={!play} onClick={this.stand}>Stand</button>
        </div>
      </div>
    )
  }
}
