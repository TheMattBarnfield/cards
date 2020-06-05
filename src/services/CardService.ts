import { shuffledDeck, Card } from '../models/card'

export class DeckEmptyError extends Error {
  constructor() {
    super('Card drawn from empty deck')
    this.name = 'DeckEmptyError'
  }
}

export default class CardService {
  constructor(private deck: Card[]){}

  drawCard = (): Card => {
    const card = this.deck.pop()
    if (!card) {
      throw new DeckEmptyError()
    }
    return card
  }

  setDeck = (deck: Card[]) => {
    this.deck = deck
  }
}