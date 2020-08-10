import jwt from 'jsonwebtoken'
import { User } from '../database/models/user'
import { config } from '../config'
import { parseJwt } from '../utils/parseJwt'

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
      'email',
    ],
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
        expiresIn: 60 * 60 * 5,
      })
      res.json({ token })
    })
    .catch(validationError(res))
}

export function show (req, res, next) {
  if (!req.params) {
    return
  }
  var userId = req.params.id
  return User.findOne({
    where: {
      id: userId,
    },
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

export const changePassword = (req, res, next) => {
  const userId = req.params.id
  const oldPass = req.body.oldPassword
  const newPass = req.body.newPassword

  return User.findByPk(userId)
    .then(async user => {
      const oldPassMatches = await user.authenticate(user, oldPass)
      if (oldPassMatches) {
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

export const update = (req, res, next) => {
  const userId = req.params.id
  const oldPass = req.body.oldPassword
  const newPass = req.body.newPassword
  const phone = req.body.phone
  const email = req.body.email

  return User.findByPk(userId)
    .then(async user => {
      const oldPassMatches = await user.authenticate(user, oldPass)
      if (oldPassMatches) {
        user.update({
          phone: phone || user.phone,
          email: email || user.email,
        })
          .then((user) => {
            if (newPass) {
              user.update({
                password: newPass,
              })
                .then((user) => {
                  res.status(200).json(user)
                })
            } else {
              res.status(200).json(user)
            }
          })
          .catch(validationError(res))
      } else {
        return res.status(403).end()
      }
    })
}

export const me = (req, res, next) => {
  const jwtPayload = parseJwt(req.headers.authorization)
  User.findByPk((jwtPayload.id), {
    attributes: {
      exclude: ['salt', 'password'],
    },
  })
    .then(user => {
      if (!user) {
        return res.status(401)
      }
      res.json(user)
    })
    .catch(err => {
      next(err)
    })
}
