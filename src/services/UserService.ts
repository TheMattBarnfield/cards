import TurnService from './TurnService';
import User from '../models/user';
import { Card } from '../models/card';

const DEFAULT_HOST_ID = "default"

export default class UserService {
  private readonly users: {[id: string]: User} = {}

  constructor(
    private readonly turnService: TurnService
  ) {}

  readonly setName = (id: string, name: string): void => {
    this.users[id].name = name
  }

  readonly getName = (id: string): string => this.users[id].name

  readonly createUser = (id: string): void => {
    this.users[id] = {
      id: id,
      name: `Player #${Math.floor(Math.random()*1000)}`,
      lastCardDrawn: undefined
    }
    this.turnService.addUser(id)
  }

  readonly deleteUser = (id: string): void => {
    delete this.users[id]
    this.turnService.removeUser(id)
  }

  readonly setLastCardDrawn = (id: string, card: Card) => {
    this.users[id].lastCardDrawn = card
  }

  readonly clearLastCardDrawn = () => {
    Object.keys(this.users).forEach(id => this.users[id].lastCardDrawn = undefined)
  }

  readonly getUsersInTurnOrder = (): User[] => this.turnService.getTurnOrder()
    .map(id => this.users[id])
}

