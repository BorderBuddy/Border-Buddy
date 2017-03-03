import jwt from 'jsonwebtoken';
import { config } from '../config';

export function signToken(id) {
  return jwt.sign({ _id: id }, config.secrets.session, {
    expiresIn: '2 hours'
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
