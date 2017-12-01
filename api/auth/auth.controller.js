import passport from 'passport';
import { signToken, verifyToken } from './auth.service';

export function login(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    var error = err || info;
    if (error) {
      return res.status(401).send(error);
    }
    if (!user) {
      return res
        .status(404)
        .json({ message: 'Something went wrong, please try again.' });
    }

    var token = signToken(user.id);
    res.json({ token, id: user.id, phone: user.phone, email: user.email });
  })(req, res, next);
}

export function isAuthenticated(req, res, next) {
  const token = req.headers.authorization;

  verifyToken(token)
    .then(user => {
      let tokenResponse = signToken(user.id);
      res.json({
        tokenResponse,
        id: user.id,
        phone: user.phone,
        email: user.email
      });
    })
    .catch(() => {
      res
        .status(401)
        .send('Unauthorized')
        .end();
    });
}

export function logout(req, res, next) {
  req.logout();
  res.redirect('/');
}
