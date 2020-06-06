import { Server, Socket } from 'socket.io';
import { Card } from './models/card';
import User from './models/user';
import { ChatMessage } from './models/chatMessage';

export default class Messages {
  constructor(private readonly io: Server){}

  readonly cardDrawn = (card: Card) => {
    this.io.emit('card drawn', card)
  }
  
  readonly turnOrder = (turnOrder: User[]) => {
    this.io.emit('turn order', turnOrder)
  }
  
  readonly currentTurn = (currentTurnId: string) => {
    this.io.emit('current turn', currentTurnId)
  }

  readonly setId = (socket: Socket) => {
    socket.emit('set id', socket.id)
  }

  readonly serverMessage = (message: string) => {
    this.chatMessage({
      fromServer: true,
      sender: "server",
      message
    })
  }

  readonly chatMessage = (message: ChatMessage) => {
    this.io.emit('chat message', {
      id: Math.floor(Math.random() * 1000000),
      ...message
    })
  }
}
