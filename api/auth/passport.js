import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'

export function setup (User) {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password' // this is the virtual field on the model
      },
      async (email, password, done) => {
        console.log(`passport called with ${email} and ${password}`)
        let user
        try {
          user = await User.findOne({ where: { email: email.toLowerCase() } })
          if (!user) {
            return done(null, false, { message: 'No user by that email' })
          }
        } catch (e) {
          return done(e)
        }

        const authenticated = await user.authenticate(user, password)
        if (!authenticated) {
          return done(null, false, { message: 'Not a matching password' })
        }

        return done(null, user)
      }
    )
  )
}
