import React from 'react'
import { Card } from '../../models/card'
import './CardDisplay.css'
import { getRank, getSuit, getSymbol } from './cardDisplayHelpers';

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

export default CardDisplay;
