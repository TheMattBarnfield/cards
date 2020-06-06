import React from 'react'
import User from '../models/user'
import ListGroup from 'react-bootstrap/ListGroup'
import InlineCard from './CardDisplay/InlineCard';

interface Props {
  currentTurnId?: string
  userId: string
  turnOrder: User[]
}

const TurnOrder: React.FC<Props> = ({userId, turnOrder, currentTurnId}) => (
    <ListGroup variant="flush">
      {turnOrder.map(({id, name, lastCardDrawn}) => 
        <ListGroup.Item key={id} active={currentTurnId===id} className="d-flex align-items-center">
          <InlineCard card={lastCardDrawn} /> {name}{id === userId && " (you)"}
        </ListGroup.Item>
      )}
    </ListGroup>
)

export default TurnOrder;
