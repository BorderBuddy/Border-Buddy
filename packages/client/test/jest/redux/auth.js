import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../../../src/actions/auth'
import * as types from '../../../src/constants'
import moxios from 'moxios'
import expect from 'expect'
import localStorageMock from '../__mocks__/localStorage'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

const window = {}

window.localStorage = localStorageMock

// TODO:Skipping this test for now
describe.skip('login action', () => {
  beforeEach(() => {
    moxios.install()
  })
  afterEach(() => {
    moxios.uninstall()
  })

  it('creates LOGIN_SUCCESS when logging in is completed', done => {
    const store = mockStore({ auth: { token: '', email: '' } })
    const expectedActions = [
      {
        type: types.LOGIN_REQUEST,
        payload: {
          fetching: true
        },
        error: false
      },
      {
        type: types.LOGIN_SUCCESS,
        payload: {
          fetching: false,
          user: { token: 'token', email: 'example@example.com' }
        },
        error: false
      }
    ]
    moxios.stubRequest('/api/auth/local', {
      status: 200,
      response: { token: 'token', email: 'example@example.com' }
    })
    return store
      .dispatch(actions.login('example@example.com', 'Example1234'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
        done()
      })
      .catch(err => console.error(err))
  })
})
