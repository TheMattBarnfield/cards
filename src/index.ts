import express from 'express'
import * as http from 'http'
import * as path from 'path'
import socketio from 'socket.io'
import UserService from './services/UserService'
import UserController from './controllers/UserController'
import Controller from './controllers/Controller'
import CardController from './controllers/CardController';
import CardService from './services/CardService';
import TurnService from './services/TurnService';
import { shuffledDeck } from './models/card'
import Messages from './Messages';

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 8000

const turnService = new TurnService()
const userService = new UserService(turnService)
const cardService = new CardService()

const messages = new Messages(io);

const controllers: Controller[] = [
  new UserController(messages, userService),
  new CardController(messages, cardService, turnService, userService)
]

app.use(express.static(path.join(__dirname, '../../frontend/build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../../frontend/build', 'index.html'));
});

app.get('/status', function (req, res) {
  res.send("Server is running")
});

io.on('connection', (socket) => {
  controllers.forEach(controller => {
    controller.onNewConnection(socket)
    socket.on('disconnect', () => controller.onDisconnect(socket.id))
  })

  console.log('a user connected')
});

server.listen(port, () => {
  console.log(`listening on *:${port}`)
});