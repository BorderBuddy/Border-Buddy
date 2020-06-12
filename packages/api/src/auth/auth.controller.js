import passport from 'passport'
import { signToken, verifyToken } from './auth.service'

export function login (req, res, next) {
  console.log('login called')
  passport.authenticate('local', function (err, user, info) {
    var error = err || info
    if (error) {
      return res.status(401).send(error)
    }
    if (!user) {
      return res
        .status(404)
        .json({ message: 'Something went wrong, please try again.' })
    }

    var token = signToken(user.id)
    res.json({ token, id: user.id, phone: user.phone, email: user.email })
  })(req, res, next)
}

export function isAuthenticated (req, res, next) {
  const token = req.headers.authorization
  console.log(token)
  verifyToken(token)
    .then(user => {
      const tokenResponse = signToken(user.id)
      res.json({
        tokenResponse,
        id: user.id,
        phone: user.phone,
        email: user.email
      })
    })
    .catch(err => {
      console.log(err)
      res
        .status(401)
        .send({ message: `You are not allowed to access this page: ${err}` })
        .end()
    })
}

export function logout (req, res, next) {
  req.logout()
  res.redirect('/')
}
