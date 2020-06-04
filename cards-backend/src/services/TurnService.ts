export default class TurnService {
  private readonly turnOrder: string[] = []

  addUser = (id: string) => {
    this.turnOrder.push(id)
  }

  removeUser = (id: string) => {
    const index = this.turnOrder.indexOf(id)
    this.turnOrder.splice(index, 1)
  }

  getTurnOrder = (): string[] => [...this.turnOrder]
}

