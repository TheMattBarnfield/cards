import TurnService from './TurnService';
import User from '../models/user';

const DEFAULT_HOST_ID = "default"

export default class UserService {
  private readonly users: {[id: string]: User} = {}
  private hostId: string = DEFAULT_HOST_ID

  constructor(
    private readonly turnService: TurnService
  ) {}

  isHost = (id: string): boolean => id === this.hostId

  setName = (id: string, name: string): void => {
    this.users[id].name = name
  }

  getName = (id: string): string => this.users[id].name

  createUser = (id: string): void => {
    this.users[id] = {
      id: id,
      name: `Player #${Math.floor(Math.random()*1000)}`
    }
    if (this.hostId === DEFAULT_HOST_ID) {
      this.hostId = id
    }
    this.turnService.addUser(id)
  }

  deleteUser = (id: string): void => {
    delete this.users[id]
    this.turnService.removeUser(id)
    if (this.isHost(id)) {
      const turnOrder = this.turnService.getTurnOrder()
      if (!turnOrder.length) {
        this.hostId = DEFAULT_HOST_ID
      } else {
        this.hostId = turnOrder[0]
      }
    }
  }

  getUsersInTurnOrder = (): User[] => this.turnService.getTurnOrder()
    .map(id => this.users[id])
}

