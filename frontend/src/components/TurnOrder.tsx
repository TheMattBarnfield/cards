import React from 'react'
import User from '../models/user'
import ListGroup from 'react-bootstrap/ListGroup'

interface Props {
  currentTurnId?: string
  userId: string
  turnOrder: User[]
}

const TurnOrder: React.FC<Props> = ({userId, turnOrder, currentTurnId}) => (
    <ListGroup variant="flush">
      {turnOrder.map(({id, name}) => 
        <ListGroup.Item key={id} active={currentTurnId===id}>
          {name}{id === userId && " (you)"}
        </ListGroup.Item>
      )}
    </ListGroup>
)

export default TurnOrder;
