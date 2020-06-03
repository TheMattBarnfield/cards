import {assert} from 'chai'
import UserService from '../../src/services/UserService'
import { stub } from 'sinon'
import TurnService from '../../src/services/TurnService';

describe('UserService', () => {
  it('can set and retrieve the names of players', () => {
    const id1 = 'id1'
    const id2 = 'id2'
    const name1 = 'name1'
    const name2 = 'name2'

    const turnService = new TurnService()
    stub(turnService, 'addUser')
    stub(turnService, 'getTurnOrder').returns([id1, id2])

    const userService = new UserService(turnService)

    userService.createUser(id1)
    userService.createUser(id2)
    userService.setName(id1, name1)
    userService.setName(id2, name2)

    assert.deepEqual(userService.getNamesInTurnOrder(), [name1, name2])
  })
})