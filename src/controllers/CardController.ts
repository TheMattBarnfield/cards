import {Socket} from 'socket.io'
import Controller from './Controller'
import CardService, { DeckEmptyError } from '../services/CardService';
import TurnService from '../services/TurnService';
import Messages from '../Messages';

export default class CardController extends Controller {
  constructor(
    private readonly messages: Messages, 
    private readonly cardService: CardService,
    private readonly turnService: TurnService
  ) {super()}

  readonly onNewConnection = (socket: Socket) => {
    socket.on('draw card', () => {
      if (!this.turnService.isPlayersTurn(socket.id)) {
        return;
      }
      try {
        const card = this.cardService.drawCard()
        console.log('Card drawn: ', card.toString())
        const turn = this.turnService.nextTurn()
        this.messages.cardDrawn(card)
        this.messages.currentTurn(turn)
      } catch(err) {
        if (err instanceof DeckEmptyError) {
          this.messages.serverMessage("The deck is empty!")
        } else {
          throw err
        }
      }
    })

    this.messages.currentTurn(this.turnService.getCurrentPlayerId())
  }

  readonly onDisconnect = (id: string) => this.turnService.removeUser(id)
}

