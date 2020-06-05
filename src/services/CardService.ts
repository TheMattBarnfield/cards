import { shuffledDeck, Card } from '../models/card'

export default class CardService {
  constructor(private deck: Card[] = []){}

  drawCard = (): Card => {
    const card = this.deck.pop()
    if (!card) {
      throw new Error("Card drawn from empty deck")
    }
    return card
  }

  cardsRemaining = (): number => this.deck.length

  deckIsEmpty = (): boolean => !this.deck.length

  setDeck = (deck: Card[]) => {
    this.deck = deck
  }
}