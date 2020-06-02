import { User } from '../../database/models/user'
import { expect } from 'chai'

describe('Model: User', () => {
  describe('validations', () => {
    describe('password length must be at least 8 characters', () => {
      it('throws an error when less than 8', () => {
        const user = User.build({ password: 'short', email: 'test@gmail.com' })
        return user.validate()
          .then((result) => {})
          .catch((err) => {
            const passwordErrors = getErrorsForField(err, 'password')
            expect(passwordErrors).to.contain('Must be at least 8 characters long')
          })
      })
      it('does not throw an error when equal to 8', () => {
        const user = User.build({ password: 'exactly8', email: 'test@gmail.com' })
        return user.validate()
          .then((result) => {
            expect(result)
          })
          .catch()
      })

      it('does not throw an error when more than 8', () => {
        const user = User.build({ password: 'long-enough', email: 'test@gmail.com' })
        return user.validate()
          .then((result) => {
            expect(result)
          })
          .catch()
      })
    })
  })
})

function getErrorsForField (validationResult, field) {
  return validationResult.errors
    .filter((error) => error.path === field)
    .map((fieldError) => fieldError.message)
}
