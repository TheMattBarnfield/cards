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

export const parseCard = (card: any): Card => {
  const value = card.value
  const suit = card.suit
  if (typeof value === 'number' 
    && Number.isInteger(value) 
    && value > 0
    && value < 14
    && typeof suit === 'string'
    && ['spades', 'hearts', 'clubs', 'diamonds'].includes(suit )
  ) {
    return new Card(suit as Suit, value as Value);
  }
  throw new Error(`Attempted to parse invalid card: the ${value} of ${suit}`)
}