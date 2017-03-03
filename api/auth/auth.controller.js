import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import jwt from 'jsonwebtoken';
import { signToken } from './auth.service';
import { config } from '../config';
import { User } from'../../database/models/user';


export function login (req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    var error = err || info;
    if(error) {
      return res.status(401).json(error);
    }
    if(!user) {
      return res.status(404).json({message: 'Something went wrong, please try again.'});
    }

    var token = signToken(user._id);
    res.json({ token });
  })(req, res, next);
}

export function isAuthenticated (req, res, next) {
  if (req.query && req.query.hasOwnProperty('access_token')) {
    req.headers.authorization = 'Bearer ' + req.query.access_token;
  }
  if(req.headers.authorization === 'undefined') {
    res.sendStatus(401)
  }
  else {
    jwt.verify(req.headers.authorization, config.secrets.session, (err, user) => {
      if(err) {
        next(err)
      }
      else {
        User.find({
          _id: user._id
        })
        .then(user => {
          if(!user) {
            res.status(401).end();
          }
          req.user = user;
          let token = signToken(user._id)
          res.json({ token })
        })
        .catch(err => next(err));
      }
    })
  }
}

export function logout(req, res, next) {
  console.log("HI HI HI")
  req.logout();
  res.redirect('/')
}