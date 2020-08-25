import './unit_helpers'
import { signup } from '../src/actions/auth'
import axios from 'axios'

describe('User', () => {
  beforeEach(() => {})

  afterEach(() => {
    sinon.restore()
  })

  describe('Creating new admin user', () => {
    it('sends a post request to create user api with accessToken', () => {
      const window = { localStorage: { accessToken: 'accessToken' } }

      sinon.stub(axios, 'post').callsFake((url, user, headers) => {
        expect(url).to.equal('/api/user')
        expect(user.name).to.equal('Jane Austen')
        return new Promise((resolve, reject) => {
        })
      })

      signup({ name: 'Jane Austen' }, window)()
    })
  })
})
