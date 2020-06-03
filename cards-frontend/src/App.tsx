import React, { useEffect, useState } from 'react';
import './App.css';
import socketio from 'socket.io-client'
import { parseCard, Card } from './card';
import Name from './components/Name';
import TurnOrder from './components/TurnOrder';
import CardDisplay from './components/CardDisplay/CardDisplay';

const io = socketio('http://localhost:8000')

const App: React.FC<{}> = () => {
  const [turnOrder, setTurnOrder] = useState<string[]>([]);
  const [lastDrawnCard, setLastDrawnCard] = useState<Card>();

  useEffect(() => {
    io.on('card drawn', (response: any) => {
      const card = parseCard(response)
      setLastDrawnCard(card)
    });

    io.on('turn order', setTurnOrder)
  }, [])

  return (
    <div>
      {lastDrawnCard && <CardDisplay card={lastDrawnCard} />}
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
