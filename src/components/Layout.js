import React, {Component} from 'react';

import GameTable from './GameTable';

export default class Layout extends Component{
  render(){
    return(
      <div id="floor">
        <div className="container">
          <h1 id="title" className="text-center">Blackjack</h1>
          <GameTable/>
        </div>
      </div>
    )
  }
}
