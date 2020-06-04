import {Server, Socket} from 'socket.io'
import UserService from '../services/UserService'
import Controller from './Controller'
import Messages from '../Messages'

export default class UserController extends Controller {
  constructor(
    private readonly messages: Messages, 
    private readonly userService: UserService
  ) {super()}

  onNewConnection(socket: Socket) {
    socket.on('set name', this.setName(socket.id))
    socket.on('disconnect', this.onDisconnect(socket.id))

    this.userService.createUser(socket.id)

    socket.emit('set id', socket.id)
    this.sendTurnOrder()
  }

  private readonly onDisconnect = (id: string) => () => {
    this.userService.deleteUser(id)
    this.sendTurnOrder()
  }

  private readonly setName = (id: string) => (name: string) => {
    this.userService.setName(id, name)
    this.sendTurnOrder()
  }

  private readonly sendTurnOrder = () => this.messages.turnOrder(this.userService.getUsersInTurnOrder())
}

