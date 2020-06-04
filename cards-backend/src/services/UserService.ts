import TurnService from './TurnService';
import User from '../models/user';

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
      id: id,
      name: DEFAULT_NAME
    }
    this.turnService.addUser(id)
  }

  deleteUser = (id: string) => {
    delete this.users[id]
    this.turnService.removeUser(id)
  }

  getUsersInTurnOrder = (): User[] => this.turnService.getTurnOrder()
    .map(id => this.users[id])
    .filter(user => user.name !== DEFAULT_NAME)
}

