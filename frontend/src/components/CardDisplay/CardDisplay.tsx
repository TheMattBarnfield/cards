import React from 'react'
import { Card, Suit, Value } from '../../models/card'
import './CardDisplay.css'

interface Props {
  card?: Card
}

const CardDisplay: React.FC<Props> = ({card}) => {
  return (
    <div className="playingCards faceImages text-center mb-5">
      {card ?
      <div className={`m-0 card rank-${getRank(card.value)} ${getSuit(card.suit)}`}>
        <span className="rank">{getRank(card.value).toUpperCase()}</span>
        <span className="suit">{getSymbol(card.suit)}</span>
      </div>
      :
      <div className="card back m-0"></div>
      }
    </div>
  );
}

const getSuit = (suit: Suit): string => {
  if (suit === Suit.Diamonds) return 'diams'
  return suit
}

const getSymbol = (suit: Suit): string => {
  switch(suit) {
    case Suit.Spades: return '♠'
    case Suit.Hearts: return '♥'
    case Suit.Diamonds: return '♦'
    case Suit.Clubs: return '♣'
  }
}

const getRank = (value: Value): string => {
  switch(value) {
    case 1: return 'a'
    case 11: return 'j'
    case 12: return 'q'
    case 13: return 'k'
    default: return value.toString()
  }
}

export default CardDisplay;
