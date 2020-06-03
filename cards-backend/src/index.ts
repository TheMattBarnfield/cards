import express from 'express'
import * as http from 'http'
import socketio from 'socket.io'
import UserService from './services/UserService'
import UserController from './controllers/UserController'
import Controller from './controllers/Controller'
import CardController from './controllers/CardController';
import CardService from './services/CardService';
import TurnService from './services/TurnService';
import { shuffledDeck } from './card'

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const turnService = new TurnService()
const userService = new UserService(turnService)
const cardService = new CardService(shuffledDeck())

const controllers: Controller[] = [
  new UserController(io, userService),
  new CardController(io, cardService)
]

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  controllers.forEach(controller => controller.onNewConnection(socket))

  console.log('a user connected')
});

server.listen(8000, () => {
  console.log('listening on *:8000')
});