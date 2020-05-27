import crypto from 'crypto'
import Sequelize from 'sequelize'
const db = require('../db')

export const User = db.define('user', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: Sequelize.STRING,
    unique: {
      msg: 'The specified email address is already in use.'
    },
    validate: {
      isEmail: true
    },
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    validate: {
      len: {
        args: [8, 1024],
        msg: 'Must be at least 8 characters long'
      }
    },
    allowNull: false
  },
  salt: {
    type: Sequelize.STRING
  },
  phone: {
    type: Sequelize.STRING
  }
})

User.beforeBulkCreate(async (users, options) => {
  users.forEach(user => {
    user.updatePassword(user)
  })
})

User.beforeCreate(async (user, options) => {
  await user.updatePassword(user)
})

User.beforeUpdate(async (user, options) => {
  if (user.changed('password')) {
    await user.updatePassword(user)
  }
})

User.prototype.authenticate = async (user, passwordAttempt) => {
  const { password, salt } = user
  return password === await user.encryptPassword(salt, passwordAttempt)
}
<<<<<<< HEAD
User.prototype.makeSalt = (byteSize, callback) => {
  const defaultByteSize = 16

  if (typeof arguments[0] === 'function') {
    callback = arguments[0]
    byteSize = defaultByteSize
  } else if (typeof arguments[1] === 'function') {
    callback = arguments[1]
  } else {
    throw new Error('Missing Callback')
  }

  if (!byteSize) {
    byteSize = defaultByteSize
  }
  return crypto.randomBytes(byteSize).toString('base64')
}
User.prototype.encryptPassword = (u_salt, password, callback) => {
  if (!password || !u_salt) {
    return callback ? callback(null) : null
  }

  var defaultIterations = 10000
  var defaultKeyLength = 64
  var salt = new Buffer(u_salt, 'base64')
=======

User.prototype.makeSalt = async () => {
  return crypto.randomBytes(16).toString('base64')
}

User.prototype.encryptPassword = async (salt, password) => {
  const defaultIterations = 10000
  const defaultKeyLength = 64
  const saltBuf = Buffer.from(salt, 'base64')
>>>>>>> refactor user.js to async/await
  const digest = 'SHA1'

  return crypto.pbkdf2Sync(
    password,
    saltBuf,
    defaultIterations,
    defaultKeyLength,
    digest
  ).toString('base64')
}

User.prototype.updatePassword = async (user) => {
  if (!user.password) throw new Error('no password to update')

  if (!(user.password && user.password.length)) {
    throw new Error('Invalid password')
  }

  const salt = await user.makeSalt()
  const hashedPassword = await user.encryptPassword(salt, user.password)
  user.password = hashedPassword
  user.salt = salt
}
