import { Server } from 'socket.io';
import { Card } from './models/card';
import User from './models/user';

export default class Messages {
  constructor(private readonly io: Server){}

  readonly cardDrawn = (card: Card) => {
    this.io.emit('card drawn', card)
  }
  
  readonly turnOrder = (turnOrder: User[]) => {
    this.io.emit('turn order', turnOrder)
  }
  
  readonly currentTurn = (currentTurnId: string) => {
    this.io.emit('current turn', currentTurnId);
  }
}
