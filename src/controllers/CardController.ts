import {Server, Socket} from 'socket.io'
import UserService from '../services/UserService'
import Controller from './Controller'
import CardService from '../services/CardService';
import TurnService from '../services/TurnService';
import Messages from '../Messages';

export default class CardController extends Controller {
  constructor(
    private readonly messages: Messages, 
    private readonly cardService: CardService,
    private readonly turnService: TurnService
  ) {super()}

  onNewConnection(socket: Socket) {
    socket.on('draw card', () => {
      if (!this.turnService.isPlayersTurn(socket.id)) {
        return;
      }
      const card = this.cardService.drawCard()
      console.log('Card drawn: ', card.toString())
      const turn = this.turnService.nextTurn()
      this.messages.cardDrawn(card)
      this.messages.currentTurn(turn)
    })

    this.messages.currentTurn(this.turnService.getCurrentPlayerId())
  }
}

