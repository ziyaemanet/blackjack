import AppDispatcher from '../AppDispatcher';

const CardActions = {
  newGame(){
    AppDispatcher.dispatch({
      type: 'NEW_GAME'
    })
  },

  hit(){
    AppDispatcher.dispatch({
      type: 'HIT'
    })
  },

  stand(isStand,isPlayer){
    AppDispatcher.dispatch({
      type: 'STAND',
      payload: {isStand,isPlayer}
    })
  }
}

export default CardActions;
