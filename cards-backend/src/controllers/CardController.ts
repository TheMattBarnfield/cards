import {Server, Socket} from 'socket.io'
import UserService from '../services/UserService'
import Controller from './Controller'
import CardService from '../services/CardService';

export default class CardController extends Controller {
  constructor(
    private readonly io: Server, 
    private readonly cardService: CardService
  ) {super()}

  onNewConnection(socket: Socket) {

    socket.on('draw card', () => {
      const card = this.cardService.drawCard()
      console.log('Card drawn: ', card.toString())
      this.io.emit('card drawn', card)
    })
  }
}

