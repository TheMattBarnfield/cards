import {assert} from 'chai'
import UserService from '../../src/services/UserService'
import TurnService from '../../src/services/TurnService';

describe('TurnService', () => {
  it('can add players to the turn order', () => {
    const id1 = 'id1'
    const id2 = 'id2'

    const turnService = new TurnService()

    turnService.addUser(id1)
    turnService.addUser(id2)

    assert.deepEqual(turnService.getTurnOrder(), [id1, id2])
  })

  it('can remove players from the turn order', () => {
    const id1 = 'id1'
    const id2 = 'id2'
    const id3 = 'id3'

    const turnService = new TurnService()

    turnService.addUser(id1)
    turnService.addUser(id2)
    turnService.addUser(id3)
    turnService.removeUser(id3)
    turnService.removeUser(id1)

    assert.deepEqual(turnService.getTurnOrder(), [id2])
  })

  it('move to the next turn', () => {
    const id1 = 'id1'
    const id2 = 'id2'

    const turnService = new TurnService()

    turnService.addUser(id1)
    turnService.addUser(id2)
    
    const turn1 = turnService.getCurrentPlayerId()
    const turn2 = turnService.nextTurn()
    const turn3 = turnService.nextTurn()

    assert.deepEqual([turn1, turn2, turn3], [id1, id2, id1])
  })

  it('maintains turn order when the current turn player leaves', () => {
    const id1 = 'id1'
    const id2 = 'id2'

    const turnService = new TurnService()

    turnService.addUser(id1)
    turnService.addUser(id2)
    
    turnService.removeUser(id1)
    
    assert.equal(turnService.getCurrentPlayerId(), id2)
  })

  it('maintains turn order when the current turn player leaves as the last player', () => {
    const id1 = 'id1'
    const id2 = 'id2'

    const turnService = new TurnService()

    turnService.addUser(id1)
    turnService.addUser(id2)
    
    turnService.nextTurn()
    turnService.removeUser(id2)
    
    assert.equal(turnService.getCurrentPlayerId(), id1)
  })

  it('maintains turn order a player before the current turn leaves', () => {
    const id1 = 'id1'
    const id2 = 'id2'

    const turnService = new TurnService()

    turnService.addUser(id1)
    turnService.addUser(id2)
    
    turnService.nextTurn()
    turnService.removeUser(id1)
    
    assert.equal(turnService.getCurrentPlayerId(), id2)
  })

  it('maintains turn order a player after the current turn leaves', () => {
    const id1 = 'id1'
    const id2 = 'id2'

    const turnService = new TurnService()

    turnService.addUser(id1)
    turnService.addUser(id2)
    
    turnService.removeUser(id2)
    
    assert.equal(turnService.getCurrentPlayerId(), id1)
  })
})