import { parseCard, Card } from "./card"

export default interface User {
  id: string,
  name: string,
  lastCardDrawn: Card | undefined
}

export const parseUser = (obj: any): User => {
  const {id, name} = obj
  if (typeof obj === 'object'
    && typeof id === 'string'
    && typeof name === 'string') {
      const lastCardDrawn = obj.lastCardDrawn && parseCard(obj.lastCardDrawn)
      return {
        id,
        name,
        lastCardDrawn
      }
  }
  throw new Error('Invalid user received:, obj')
}