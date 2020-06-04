export default interface User {
  id: string,
  name: string
}

export const parseUser = (obj: any): obj is User => {
  return typeof obj === 'object'
    && typeof obj.id === 'string'
    && typeof obj.name === 'string'
}