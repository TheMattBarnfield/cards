import {Server, Socket} from 'socket.io'
import UserService from '../services/UserService'
import Controller from './Controller'
import Messages from '../Messages'

export default class UserController extends Controller {
  constructor(
    private readonly messages: Messages, 
    private readonly userService: UserService
  ) {super()}

  readonly onNewConnection = (socket: Socket) => {
    socket.on('set name', this.setName(socket.id))
    socket.on('send message', this.sendMessage(socket.id))

    this.userService.createUser(socket.id)

    this.messages.setId(socket)
    this.sendTurnOrder()
  }

  readonly onDisconnect = (id: string) => () => {
    this.userService.deleteUser(id)
    this.sendTurnOrder()
  }

  private readonly sendMessage = (id: string) => (message: string) => this.messages.chatMessage({
    fromServer: false,
    sender: this.userService.getName(id),
    message
  })

  private readonly setName = (id: string) => (name: string) => {
    this.userService.setName(id, name)
    this.sendTurnOrder()
  }

  private readonly sendTurnOrder = () => this.messages.turnOrder(this.userService.getUsersInTurnOrder())
}

