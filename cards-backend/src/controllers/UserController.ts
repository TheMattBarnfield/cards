import {Server, Socket} from 'socket.io'
import UserService from '../services/UserService'
import Controller from './Controller'

export interface User {
  name: string
}

export default class UserController extends Controller {
  constructor(
    private readonly io: Server, 
    private readonly userService: UserService
  ) {super()}

  onNewConnection(socket: Socket) {
    socket.on('set name', () => this.setName(socket.id))
    socket.on('disconnection', () => this.userService.deleteUser(socket.id))

    this.userService.createUser(socket.id)
  }

  private readonly setName = (id: string) => {
    this.userService.setName(id)
    this.io.emit('turn order', this.userService.getNamesInTurnOrder)
  }
}

