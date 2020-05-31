import express from 'express'
import * as http from 'http'
import socketio from 'socket.io'
import { shuffledDeck } from './card';

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const deck = shuffledDeck()

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.on('draw card', () => {
    const card = deck.pop();
    if (!card) {
      throw new Error('Card drawn from empty deck')
    }
    console.log('Card drawn: ', card.toString())
    io.emit('card drawn', card)
  })
  console.log('a user connected');
});

server.listen(8000, () => {
  console.log('listening on *:8000');
});