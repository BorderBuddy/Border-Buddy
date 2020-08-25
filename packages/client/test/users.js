import './unit_helpers'
import { fetchAllUsers } from '../src/actions/users'
import axios from 'axios'

describe('Action: Users', () => {
  beforeEach(() => {})

  afterEach(() => {
    sinon.restore()
  })

  describe('fetch all users', () => {
    it('sends a get request to user api with accessToken', () => {
      const window = { localStorage: { accessToken: 'accessToken' } }

      sinon.stub(axios, 'get').callsFake((url, headers) => {
        expect(url).to.equal('/api/user')
        return new Promise((resolve, reject) => {
        })
      })

      fetchAllUsers(window)()
    })
  })
})
