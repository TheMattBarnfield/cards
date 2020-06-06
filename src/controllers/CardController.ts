import {Socket} from 'socket.io'
import Controller from './Controller'
import CardService from '../services/CardService';
import TurnService from '../services/TurnService';
import UserService from '../services/UserService';
import Messages from '../Messages';
import { Card, shuffledDeck } from '../models/card';

export default class CardController extends Controller {
  constructor(
    private readonly messages: Messages, 
    private readonly cardService: CardService,
    private readonly turnService: TurnService,
    private readonly userService: UserService
  ) {super()}

  readonly onNewConnection = (socket: Socket) => {
    socket.on('draw card', this.drawCard(socket.id))
    socket.on('reset game', this.resetGame(socket.id))

    this.messages.currentTurn(this.turnService.getCurrentPlayerId())
  }

  readonly onDisconnect = (id: string) => this.turnService.removeUser(id)

  private readonly resetGame = (id: string) => () => {
    if (!this.turnService.isHost(id)) {
      return;
    }
    this.cardService.setDeck(shuffledDeck())
    this.userService.clearLastCardDrawn()
    this.messages.serverMessage(`${this.userService.getName(id)} has started a new game!`)
  }

  private readonly drawCard = (id: string) => () => {
    if (!this.turnService.isPlayersTurn(id)) {
      return;
    }
    if (this.cardService.deckIsEmpty()) {
      this.messages.serverMessage("The deck is empty! Start a new game to draw more cards.")
      return;
    }
    const card = this.cardService.drawCard()
    const turn = this.turnService.nextTurn()
    
    this.userService.setLastCardDrawn(id, card)

    this.messages.cardDrawn(card)
    this.messages.serverMessage(this.getCardDrawnMessage(this.userService.getName(id), card, this.cardService.cardsRemaining()))
    this.messages.turnOrder(this.userService.getUsersInTurnOrder())
    this.messages.currentTurn(turn)
  }

  private readonly getCardDrawnMessage = (name: string, card: Card, cardsRemaining: number): string => {
    const remainingCards = cardsRemaining === 1
      ? "There is 1 card left in the deck."
      : `There are ${this.cardService.cardsRemaining()} cards left in the deck.`
    return `${name} drew ${card.toString()}. ${remainingCards}`
  }
}

