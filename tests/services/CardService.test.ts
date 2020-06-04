import CardService from '../../src/services/CardService';
import { Card, Suit } from '../../src/models/card';
import { assert } from 'chai';

describe('CardService', () => {

  const card1: Card = new Card(Suit.Spades, 11)
  const card2: Card = new Card(Suit.Diamonds, 2)

  describe('drawCard', () => {
    it('returns the top card of the deck', () => {
      const cardService = new CardService([card1, card2])
      const card = cardService.drawCard()
      assert.equal(card, card2)
    })

    it('throws an error when the deck is empty', () => {
      const cardService = new CardService([])
      assert.throws(cardService.drawCard)
    })

    it('removes the card when drawn', () => {
      const cardService = new CardService([card1, card2])
      assert.equal(cardService.drawCard(), card2)
      assert.equal(cardService.drawCard(), card1)
      assert.throws(cardService.drawCard)
    })
  })
})