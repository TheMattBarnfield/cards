export default class TurnService {
  private currentTurn = 0
  private readonly turnOrder: string[] = []

  addUser = (id: string) => {
    this.turnOrder.push(id)
  }

  isPlayersTurn = (id: string): boolean => this.getCurrentPlayerId() === id

  getCurrentPlayerId = (): string => this.turnOrder[this.currentTurn]

  nextTurn = (): string => {
    this.currentTurn++;
    this.checkValidCurrentTurn();
    return this.getCurrentPlayerId();
  }

  removeUser = (id: string) => {
    const index = this.turnOrder.indexOf(id)
    if (this.currentTurn > index) {
      this.currentTurn--;
    }
    this.turnOrder.splice(index, 1)
    this.checkValidCurrentTurn();
  }

  private checkValidCurrentTurn = () => {
    if (this.currentTurn >= this.turnOrder.length) {
      this.currentTurn = 0;
    }
  }

  getTurnOrder = (): string[] => [...this.turnOrder]
}

