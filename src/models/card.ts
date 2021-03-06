export enum Suit {
  Spades = 'spades',
  Hearts = 'hearts',
  Clubs = 'clubs',
  Diamonds = 'diamonds'
}

export type Value = 1|2|3|4|5|6|7|8|9|10|11|12|13

export class Card {
  constructor(
    readonly suit: Suit,
    readonly value: Value
  ){}

  toString() {
    return `the ${this.getValueString()} of ${this.suit}`
  }

  private getValueString(): string {
    return {
      1: 'ace',
      2: 'two',
      3: 'three',
      4: 'four',
      5: 'five',
      6: 'six',
      7: 'seven',
      8: 'eight',
      9: 'nine',
      10: 'ten',
      11: 'jack',
      12: 'queen',
      13: 'king'
    }[this.value]
  }
}

export const shuffledDeck = (): Card[] => {
  const cards = deck()
  // https://stackoverflow.com/a/12646864
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards
}

const deck = (): Card[] => {
  const cards: Card[] = []
  for (let value = 1; value < 14; value++) {
    cards.push(new Card(Suit.Spades, value as Value))
    cards.push(new Card(Suit.Hearts, value as Value))
    cards.push(new Card(Suit.Clubs, value as Value))
    cards.push(new Card(Suit.Diamonds, value as Value))
  }
  return cards;
}
