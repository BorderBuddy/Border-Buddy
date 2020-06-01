import jwt from 'jsonwebtoken'
<<<<<<< HEAD
import { User } from '../../database/models/user'
=======
import { User } from '../database/models/user'
>>>>>>> fix paths
import { config } from '../config'

function validationError (res, statusCode) {
  statusCode = statusCode || 422
  return function (err) {
    return res.status(statusCode).json(err)
  }
}

function handleError (res, statusCode) {
  statusCode = statusCode || 500
  return function (err) {
    return res.status(statusCode).send(err)
  }
}

export function index (req, res) {
  return User.findAll({
    attributes: [
      'id',
      'email'
    ]
  })
    .then(users => {
      res.status(200).json(users)
    })
    .catch(handleError(res))
}

export function create (req, res) {
  return User.create(req.body)
    .then(function (user) {
      const token = jwt.sign({ id: user.id }, config.secrets.session, {
        expiresIn: 60 * 60 * 5
      })
      res.json({ token })
    })
    .catch(validationError(res))
}

export function show (req, res, next) {
  if (!req.params) {
    return
  };
  var userId = req.params.id
  return User.find({
    where: {
      id: userId
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).end()
      }
      res.json(user)
    })
    .catch(err => next(err))
}

export function destroy (req, res) {
  return User.destroy({ where: { id: req.params.id } })
    .then(function () {
      res.status(204).end()
    })
    .catch(handleError(res))
}

export function changePassword (req, res) {
  const userId = req.user.id
  const oldPass = String(req.body.oldPassword)
  const newPass = String(req.body.newPassword)

  return User.findById(userId)
    .then(user => {
      if (user.authenticate(oldPass)) {
        user.update({ password: newPass })
          .then((user) => {
            res.status(204).end()
          })
          .catch(validationError(res))
      } else {
        return res.status(403).end()
      }
    })
}

export function update (req, res, next) {
  const userId = req.body.id
  const oldPass = String(req.body.oldPassword)
  const newPass = String(req.body.newPassword)
  const phone = req.body.phone
  const email = req.body.email

  return User.findById(userId)
    .then(user => {
      user.phone = phone || user.phone
      user.email = email || user.email
      return user.save()
    })
    .then(user => {
      if (oldPass && !user.authenticate(oldPass)) {
        res.sendStatus(401)
        return user
      }
      if (newPass) {
        return user.update({
          password: newPass
        })
      } else {
        return user
      }
    })
    .then(user => res.status(200).json(user))
    .catch(next)
}

export function me (req, res, next) {
  const userId = req.headers.user.id
  User.findById(userId, {
    attributes: {
      exclude: ['salt', 'password']
    }
  })
    .then(user => {
      if (!user) {
        return res.status(401).end()
      }
      res.json(user)
    })
    .catch(err => next(err))
}
