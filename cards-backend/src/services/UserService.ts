import {Server} from 'socket.io'

export interface User {
  name: string
}

export default class UserService {
  private readonly users: {[id: string]: User} = {}
  private readonly turnOrder: string[] = []

  setName = (id: string) => (name: string) => {
    this.users[id].name = name
  }

  createUser = (id: string) => {
    this.users[id] = {
      name: "NAME_NOT_SET"
    }
    this.turnOrder.push(id)
  }

  deleteUser = (id: string) => {
    delete this.users[id]
    const index = this.turnOrder.indexOf(id)
    this.turnOrder.splice(index, 1)
  }

  getNamesInTurnOrder = (): string[] => this.turnOrder.map(id => this.users[id].name)
}

