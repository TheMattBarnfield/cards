import React from 'react'
import User from '../models/user'
import ListGroup from 'react-bootstrap/ListGroup'

interface Props {
  userId: string
  turnOrder: User[]
}

const TurnOrder: React.FC<Props> = ({userId, turnOrder}) => (
    <ListGroup>
      {turnOrder.map(user => 
        <ListGroup.Item key={user.id}>
          {user.name}{user.id === userId && " (you)"}
        </ListGroup.Item>
      )}
    </ListGroup>
)

export default TurnOrder;
