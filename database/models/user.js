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
    type: Sequelize.STRING,
    get () {
      return () => this.getDataValue('salt')
    }
  },
  phone: {
    type: Sequelize.STRING
  }
})

User.beforeBulkCreate((users, fields, fn) => {
  var totalUpdated = 0
  users.forEach(user => {
    user.updatePassword(user, err => {
      if (err) {
        return fn(err)
      }
      totalUpdated += 1
      if (totalUpdated === users.length) {
        return fn()
      }
    })
  })
})

User.beforeCreate((user, fields, fn) => {
  user.updatePassword(user, fn)
  User.beforeUpdate((user, fields, fn) => {
    if (user.changed('password')) {
      return user.updatePassword(user, fn)
    }
    fn()
  })
})

User.prototype.authenticate = (password, callback) => {
  if (!callback) {
    return this.password === this.encryptPassword(password)
  }

  var _this = this
  this.encryptPassword(password, function (err, pwdGen) {
    if (err) {
      callback(err)
    }

    if (_this.password === pwdGen) {
      callback(null, true)
    } else {
      callback(null, false)
    }
  })
}
User.prototype.makeSalt = (callback) => {
  return crypto.randomBytes(16).toString('base64')
}

User.prototype.encryptPassword = (password, callback) => {
  if (!password || !this.salt) {
    return callback ? callback(null) : null
  }

  var defaultIterations = 10000
  var defaultKeyLength = 64
  var salt = new Buffer(this.salt, 'base64')
  const digest = 'SHA1'

  if (!callback) {
    return crypto.pbkdf2Sync(password, salt, defaultIterations, defaultKeyLength, digest).toString('base64')
  }

  return crypto.pbkdf2(password, salt, defaultIterations, defaultKeyLength, digest,
    function (err, key) {
      if (err) {
        callback(err)
      }
      return callback(null, key.toString('base64'))
    })
}

User.prototype.updatePassword = (user, fn) => {
  if (!user.password) return fn(null)

  if (!(user.password && user.password.length)) {
    fn(new Error('Invalid password'))
  }

  user.makeSalt((saltErr, salt) => {
    if (saltErr) {
      return fn(saltErr)
    }
    this.salt = salt

    user.encryptPassword(this.salt, user.password, (encryptErr, hashedPassword) => {
      if (encryptErr) {
        fn(encryptErr)
      }
      user.password = hashedPassword
      fn(null)
    })
  })
}
