import passport from 'passport';
import { signToken, verifyToken } from './auth.service';

export function login (req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    var error = err || info;
    if(error) {
      return res.status(401).json(error);
    }
    if(!user) {
      return res.status(404).json({message: 'Something went wrong, please try again.'});
    }

    var token = signToken(user.id);
    res.json({ token });
  })(req, res, next);
}

export function isAuthenticated (req, res, next) {
  const token = req.headers.authorization;

  verifyToken(token)
    .then((user) => {
      let token = signToken(user.id);
      res.json({token});
    })
    .catch(err => {
      res.status(401).send('Unauthorized').end();
    });
}

export function logout(req, res, next) {
  req.logout();
  res.redirect('/')
}
