import TurnService from './TurnService';

export interface User {
  name: string
}

const DEFAULT_NAME = "NAME_NOT_SET"

export default class UserService {
  private readonly users: {[id: string]: User} = {}

  constructor(
    private readonly turnService: TurnService
  ) {}

  setName = (id: string, name: string) => {
    this.users[id].name = name
  }

  createUser = (id: string) => {
    this.users[id] = {
      name: DEFAULT_NAME
    }
    this.turnService.addUser(id)
  }

  deleteUser = (id: string) => {
    delete this.users[id]
    this.turnService.removeUser(id)
  }

  getNamesInTurnOrder = (): string[] => this.turnService.getTurnOrder()
    .map(id => this.users[id].name)
    .filter(name => name !== DEFAULT_NAME)
}

