import { User } from '../../database/models/user'
import { expect } from 'chai'

describe('Model: User', () => {
  describe('validations', () => {
    describe('password length must be at least 8 characters', () => {
      it('throws an error when less than 8', () => {
        const user = User.build({ password: 'short' })

        return user.validate().then((result) => {
          const passwordErrors = getErrorsForField(result, 'password')
          expect(passwordErrors).to.contain('Must be at least 8 characters long')
        })
      })

      it('does not throw an error when equal to 8', () => {
        const user = User.build({ password: 'exactly8' })

        return user.validate().then((result) => {
          const passwordErrors = getErrorsForField(result, 'password')
          expect(passwordErrors.length).to.equal(0)
        })
      })

      it('does not throw an error when more than 8', () => {
        const user = User.build({ password: 'long-enough' })

        return user.validate().then((result) => {
          const passwordErrors = getErrorsForField(result, 'password')
          expect(passwordErrors.length).to.equal(0)
        })
      })
    })
  })
})

function getErrorsForField (validationResult, field) {
  return validationResult.errors
    .filter((error) => error.path == field)
    .map((fieldError) => fieldError.message)
}
