import React, { useEffect } from 'react';
import './App.css';
import socketio from 'socket.io-client'
import { parseCard } from './card';

const io = socketio('http://localhost:8000')

const App: React.FC<{}> = () => {
  useEffect(() => {
    io.on('card drawn', (response: any) => {
      const card = parseCard(response.suit, response.value)
      console.log('Card drawn:', card.toString())
    });
  }, [])

  return (
    <button onClick={drawCard}>Draw a card</button>
  );
}

const drawCard = () => {
  io.emit('draw card')
}

export default App;
