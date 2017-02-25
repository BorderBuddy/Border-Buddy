import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import compose from 'composable-middleware';
import { User } from'../../database/models/user';
import { config } from '../config';

var validateJwt = expressJwt({
  secret: config.secrets.session
});

export function isAuthenticated() {
  return compose()
    .use(function(req, res, next) {
      // in cases token passed through query params
      if (req.query && req.query.hasOwnProperty('access_token')) {
        req.headers.authorization = 'Bearer ' + req.query.access_token;
      }
     
      validateJwt(req, res, next);
    })
    .use(function(req, res, next) {
      User
        .find({
          where: {
            _id: req.user._id
          }
        })
        .then(user => {
          if (!user) {
            return res.status(401).end();
          }
          req.user = user;
          next();
        })
        .catch(err => next(err));
    });
}

export function signToken(id) {
  return jwt.sign({ _id: id }, config.secrets.session, {
    expiresIn: 60 * 60 * 5
  });
}

export function setTokenCookie(req, res) {
  if (!req.user) {
    return res.status(404).send('It looks like you aren\'t logged in, please try again.');
  }
  var token = signToken(req.user._id);
  res.cookie('token', token);
  res.redirect('/');
}
