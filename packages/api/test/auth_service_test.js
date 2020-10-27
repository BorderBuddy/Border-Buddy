import { signToken, verifyToken, protectedEndpoint } from '../src/auth/auth.service'
import './unit_helpers'

describe('auth.service', () => {
  describe('.protectedEndpoint', () => {
    let endpoint
    beforeEach(() => {
      endpoint = sinon.spy()
    })

    describe('verifyToken is rejected', () => {
      let verifierPromise
      let invalidTokenVerifier

      beforeEach(() => {
        verifierPromise = Promise.reject()
        invalidTokenVerifier = () => verifierPromise
      })

      it('returns 401', (done) => {
        const fakeRequest = { headers: { authorization: 'invalid token' } }
        const fakeResponse = {
          status: (status) => {
            expect(status).to.equal(401)
            return fakeResponse
          },
          send: (body) => {
            expect(body).to.equal('Unauthorized')
            return fakeResponse
          },
          end: done
        }

        protectedEndpoint(endpoint, invalidTokenVerifier)(fakeRequest, fakeResponse)
      })

      it('does not call the protected endpoint', (done) => {
        const fakeRequest = { headers: { authorization: 'invalid token' } }
        const fakeResponse = {
          status: () => fakeResponse,
          send: () => fakeResponse,
          end: () => {
            expect(endpoint).not.to.have.been.called
            done()
          }
        }

        protectedEndpoint(endpoint, invalidTokenVerifier)(fakeRequest, fakeResponse)
      })
    })

    describe('verifyToken is accepted', () => {
      let verifierPromise
      let validTokenVerifier

      beforeEach(() => {
        verifierPromise = Promise.resolve()
        validTokenVerifier = () => verifierPromise
      })

      it('does call the protected endpoint', (done) => {
        const fakeRequest = { headers: { authorization: 'valid token' } }
        const endpoint = () => done()
        protectedEndpoint(endpoint, validTokenVerifier)(fakeRequest)
      })
    })
  })

  describe('.verifyToken', () => {
    describe('when passed an invalid token', () => {
      it('returns a rejected promise', () => {
        const token = '1234567890'

        return verifyToken(token)
          .then(() => Promise.reject('no error thrown'))
          .catch(err => Promise.resolve('expected error received'))
      })
    })

    describe('when passed a valid token', () => {
      let mockRepository
      beforeEach(() => {
        mockRepository = {
          users: {
            findByPk: sinon.stub()
          }
        }
      })

      describe('and the user cannot be found', () => {
        it('returns a rejected promise', () => {
          const token = signToken(1234567890)

          mockRepository.users.findByPk.withArgs(1234567890)
            .returns(Promise.resolve(null))

          return verifyToken(token, mockRepository)
            .then(() => Promise.reject('no error thrown'))
            .catch(err => Promise.resolve('expected error received'))
        })
      })

      describe('and the user can be found', () => {
        it('returns a resolved promise', () => {
          const token = signToken(2345678901)

          mockRepository.users.findByPk.withArgs(2345678901)
            .returns(Promise.resolve({ a: 'user' }))

          return verifyToken(token, mockRepository)
        })
      })
    })
  })
})
