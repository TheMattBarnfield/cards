import { Value, Suit } from "../../models/card"

export const getSuit = (suit: Suit): string => {
  if (suit === Suit.Diamonds) return 'diams'
  return suit
}

export const getSymbol = (suit: Suit): string => {
  switch(suit) {
    case Suit.Spades: return '♠'
    case Suit.Hearts: return '♥'
    case Suit.Diamonds: return '♦'
    case Suit.Clubs: return '♣'
  }
}

export const getRank = (value: Value): string => {
  switch(value) {
    case 1: return 'a'
    case 11: return 'j'
    case 12: return 'q'
    case 13: return 'k'
    default: return value.toString()
  }
}