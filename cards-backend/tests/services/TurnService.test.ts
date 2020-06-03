import {assert} from 'chai'
import UserService from '../../src/services/UserService'
import { stub } from 'sinon'
import TurnService from '../../src/services/TurnService';

describe('UserService', () => {
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
})