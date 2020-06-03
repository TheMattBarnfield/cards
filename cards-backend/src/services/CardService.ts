import { shuffledDeck, Card } from '../card'

export default class CardService {
  constructor(private readonly deck: Card[]){}

  drawCard = (): Card => {
    const card = this.deck.pop()
    if (!card) {
      throw new Error('Card drawn from empty deck')
    }
    return card
  }
}