import React from 'react'

interface Props {
  turnOrder: string[]
}

const TurnOrder: React.FC<Props> = ({turnOrder}) => (
  <div>
    <ul>
      {turnOrder.map(username => <li key={username}>{username}</li>)}
    </ul>
  </div>
)

export default TurnOrder;
