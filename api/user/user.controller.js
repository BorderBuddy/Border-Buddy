
import jwt from 'jsonwebtoken';
import { User } from '../../database/models/user';
import { config } from '../config';

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    return res.status(statusCode).json(err);
  }
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    return res.status(statusCode).send(err);
  };
}

export function index(req, res) {
  return User.findAll({
    attributes: [
      'id',
      'email'
    ]
  })
    .then(users => {
      res.status(200).json(users);
    })
    .catch(handleError(res));
}

export function create(req, res) {
  return User.create(req.body)
    .then(function(user) {
      var token = jwt.sign({ id: user.id }, config.secrets.session, {
        expiresIn: 60 * 60 * 5
      });
      res.json({ token });
    })
    .catch(validationError(res));
}

export function show(req, res, next) {
  var userId = req.params.id;
  return User.find({
    where: {
      id: userId
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).end();
      }
      res.json(user);
    })
    .catch(err => next(err));
}

export function destroy(req, res) {
	return User.destroy({ where: { id: req.params.id } })
	.then(function() {
      res.status(204).end();
    })
    .catch(handleError(res));
}

export function changePassword(req, res) {
  var userId = req.user.id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  return User.find({
    where: {
      id: userId
    }
  })
    .then(user => {
      if (user.authenticate(oldPass)) {
        user.password = newPass;
        return user.save()
          .then(() => {
            res.status(204).end();
          })
          .catch(validationError(res));
      } else {
        return res.status(403).end();
      }
    });
}

export function me(req, res, next) {
  var userId = req.user.id;
  User.find({
    where: {
      id: userId
    },
    attributes: [
      'id',
      'email',
    ]
  })
	.then(user => {
	  if (!user) {
	    return res.status(401).end();
	  }
	  res.json(user);
	})
	.catch(err => next(err));
}

export function authCallback(req, res) {
  res.redirect('/');
}
