import TurnService from './TurnService';
import User from '../models/user';

const DEFAULT_HOST_ID = "default"

export default class UserService {
  private readonly users: {[id: string]: User} = {}

  constructor(
    private readonly turnService: TurnService
  ) {}

  setName = (id: string, name: string): void => {
    this.users[id].name = name
  }

  getName = (id: string): string => this.users[id].name

  createUser = (id: string): void => {
    this.users[id] = {
      id: id,
      name: `Player #${Math.floor(Math.random()*1000)}`
    }
    this.turnService.addUser(id)
  }

  deleteUser = (id: string): void => {
    delete this.users[id]
    this.turnService.removeUser(id)
  }

  getUsersInTurnOrder = (): User[] => this.turnService.getTurnOrder()
    .map(id => this.users[id])
}

