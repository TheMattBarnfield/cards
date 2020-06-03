import express from 'express'
import * as http from 'http'
import socketio from 'socket.io'
import { shuffledDeck } from './card'
import UserService from './services/UserService'
import UserController from './controllers/UserController'
import Controller from './controllers/Controller'

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const deck = shuffledDeck()

const userService = new UserService()

const controllers: Controller[] = [
  new UserController(io, userService)
]

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

  controllers.forEach(controller => controller.onNewConnection(socket))

  console.log('a user connected')
});

server.listen(8000, () => {
  console.log('listening on *:8000')
});