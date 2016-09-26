import {EventEmitter} from 'events';
let _ = require('lodash');

import AppDispatcher from '../AppDispatcher';

let _originalDeck =
  [{value:1,display:'🂡',suit:'S'},{value:2,display:'🂢',suit:'S'},{value:3,display:'🂣',suit:'S'},{value:4,display:'🂤',suit:'S'},
  {value:5,display:'🂥',suit:'S'},{value:6,display:'🂦',suit:'S'},{value:7,display:'🂧',suit:'S'},{value:8,display:'🂨',suit:'S'},
  {value:9,display:'🂩',suit:'S'},{value:10,display:'🂪',suit:'S'},{value:10,display:'🂫',suit:'S'},{value:10,display:'🂭',suit:'S'},
  {value:10,display:'🂮',suit:'S'},

  {value:1,display:'🂱',suit:'H'},{value:2,display:'🂲',suit:'H'},{value:3,display:'🂳',suit:'H'},{value:4,display:'🂴',suit:'H'},
  {value:5,display:'🂵',suit:'H'},{value:6,display:'🂶',suit:'H'},{value:7,display:'🂷',suit:'H'},{value:8,display:'🂸',suit:'H'},
  {value:9,display:'🂹',suit:'H'},{value:10,display:'🂺',suit:'H'},{value:10,display:'🂻',suit:'H'},{value:10,display:'🂽',suit:'H'},
  {value:10,display:'🂾',suit:'H'},

  {value:1,display:'🃁',suit:'D'},{value:2,display:'🃂',suit:'D'},{value:3,display:'🃃',suit:'D'},{value:4,display:'🃄',suit:'D'},
  {value:5,display:'🃅',suit:'D'},{value:6,display:'🃆',suit:'D'},{value:7,display:'🃇',suit:'D'},{value:8,display:'🃈',suit:'D'},
  {value:9,display:'🃉',suit:'D'},{value:10,display:'🃊',suit:'D'},{value:10,display:'🃋',suit:'D'},{value:10,display:'🃍',suit:'D'},
  {value:10,display:'🃎',suit:'D'},

  {value:1,display:'🃑',suit:'C'},{value:2,display:'🃒',suit:'C'},{value:3,display:'🃓',suit:'C'},{value:4,display:'🃔',suit:'C'},
  {value:5,display:'🃕',suit:'C'},{value:6,display:'🃖',suit:'C'},{value:7,display:'🃗',suit:'C'},{value:8,display:'🃘',suit:'C'},
  {value:9,display:'🃙',suit:'C'},{value:10,display:'🃚',suit:'C'},{value:10,display:'🃛',suit:'C'},{value:10,display:'🃝',suit:'C'},
  {value:10,display:'🃞',suit:'C'}];

let _playDeck = [];
let _stand = false;
let _play = false;
let _message = 'CLICK NEW GAME TO START';

let _dealerCards = [];
let _playerCards = [];

let _playerCount = 0;
let _dealerCount = 0;

class CardStore extends EventEmitter{
  constructor(){
    super();

    AppDispatcher.register(action => {
      switch(action.type){
        case 'NEW_GAME':
          _playDeck = _.shuffle([..._originalDeck]);
          _stand = true;
          _play = true;
          _message = 'HIT OR STAND';

          _dealerCards = [];
          _playerCards = [];

          _playerCount = 0;
          _dealerCount = 0;

          this.emit('CHANGE');
          break;

        case 'HIT':
          this.hit();
          this.emit('CHANGE');
          break;

        case 'STAND':
          if(action.payload.isPlayer){
            _stand = true;
            _play = false;

            while(_dealerCount < 17){
              this.hit();
            }

            if(_dealerCount == _playerCount){
              _message = 'PUSH';
            }else if(_dealerCount > _playerCount && _dealerCount <= 21){
              _message = 'DEALER WIN';
            }else if(_dealerCount < _playerCount){
              _message = 'PLAYER WIN';
            }
          }else{
            _stand = action.payload.isStand;
          }
          this.emit('CHANGE');
          break;

        default:
          console.log('INVALID_ACTION_TYPE');
          break;
      }
    });
  }

  hit(){
    let ace = 0;
    let cardCount = 0;
    let cards;

    if(!_stand){
      _playerCards.push(_playDeck.shift());
      cards = _playerCards;
    }else{
      _dealerCards.push(_playDeck.shift());
      cards = _dealerCards;
    }

    cards.forEach(card => {
      if(card.value == 1){
        cardCount += 11;
        ace++;
      }else{
        cardCount += card.value;
      }
    });

    while((cardCount > 21) && (ace > 0)){
      ace--;
      cardCount -= 10;
    }

    if(!_stand){
      _playerCount = cardCount;
    }else{
      _dealerCount = cardCount;
    }

    if(cardCount > 21){
      if(!_stand){
        _message = 'PLAYER BUST';
        _play = false;
      }else{
        _message = 'DEALER BUST';
        _play = false;
      }
    }
  }

  startListening(callback){
    this.on('CHANGE',callback);
  }

  stopListening(callback){
    this.removeListener('CHANGE',callback);
  }

  getDealerCards(){
    return _dealerCards;
  }

  getPlayerCards(){
    return _playerCards;
  }

  getDealerCount(){
    return _dealerCount;
  }

  getPlayerCount(){
    return _playerCount;
  }

  getMessage(){
    return _message;
  }

  getPlay(){
    return _play;
  }

  getStand(){
    return _stand;
  }
}

export default new CardStore();
