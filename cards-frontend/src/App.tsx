import React, { useEffect, useState } from 'react';
import './App.css';
import socketio from 'socket.io-client'
import { parseCard } from './card';
import Name from './components/Name';
import TurnOrder from './components/TurnOrder';

const io = socketio('http://localhost:8000')

const App: React.FC<{}> = () => {
  const [turnOrder, setTurnOrder] = useState<string[]>([]);

  useEffect(() => {
    io.on('card drawn', (response: any) => {
      const card = parseCard(response)
      console.log('Card drawn:', card.toString())
    });

    io.on('turn order', setTurnOrder)
  }, [])

  return (
    <div>
      <button onClick={drawCard}>Draw a card</button>
      <Name io={io} />
      <TurnOrder turnOrder={turnOrder} />
    </div>
  );
}

const drawCard = () => {
  io.emit('draw card')
}

export default App;
