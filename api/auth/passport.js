import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

export function setup(User) {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password' // this is the virtual field on the model
      },
      function(email, password, done) {
        return User.find({
          where: {
            email: email.toLowerCase()
          }
        })
          .then(user => {
            const failureMessage = 'Username or password are incorrect';
            if (!user) {
              return done(null, false, {
                message: failureMessage
              });
            }

            // Authenticate function to check password
            user.authenticate(password, function(authError, authenticated) {
              if (authError) {
                return done(authError);
              }
              if (!authenticated) {
                return done(null, false, { message: failureMessage });
              } else {
                return done(null, user);
              }
            });
          })
          .catch(err => done(err));
      }
    )
  );
}
