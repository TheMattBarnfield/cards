import {Socket} from 'socket.io'

export default abstract class Contoller {
  abstract onNewConnection(socket: Socket): void;

  onDisconnect = (id: string): void => {}
}

