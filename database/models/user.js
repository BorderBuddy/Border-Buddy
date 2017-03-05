import crypto from 'crypto';
import Sequelize from 'sequelize';
const db = require('../db');

export const User = db.define('user', {
  _id: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: Sequelize.DataTypes.STRING,
    unique: {
      msg: 'The specified email address is already in use.'
    },
    validate: {
      isEmail: true
    },
    allowNull: false
  },
  password: {
    type: Sequelize.DataTypes.STRING,
    validate: {
      notEmpty: true
    },
    allowNull: false
  },
  salt: Sequelize.DataTypes.STRING
}, {
  getterMethods: {
    token: function() {
      return {
        _id: this._id
      };
    }
  },
  hooks: {
    beforeBulkCreate(users, fields, fn) {
      var totalUpdated = 0;
      users.forEach(user => {
        user.updatePassword(err => {
          if(err) {
            return fn(err);
          }
          totalUpdated += 1;
          if(totalUpdated === users.length) {
            return fn();
          }
        });
      });
    },
    beforeCreate(user, fields, fn) {
      user.updatePassword(fn);
    },
    beforeUpdate(user, fields, fn) {
      if(user.changed('password')) {
        return user.updatePassword(fn);
      }
      fn();
    }
  },
  instanceMethods: {
    authenticate(password, callback) {
      if(!callback) {
        return this.password === this.encryptPassword(password);
      }

      var _this = this;
      this.encryptPassword(password, function(err, pwdGen) {
        if(err) {
          callback(err);
        }

        if(_this.password === pwdGen) {
          callback(null, true);
        }
        else {
          callback(null, false);
        }
      });
    },
    makeSalt(byteSize, callback) {
      var defaultByteSize = 16;

      if(typeof arguments[0] === 'function') {
        callback = arguments[0];
        byteSize = defaultByteSize;
      } else if(typeof arguments[1] === 'function') {
        callback = arguments[1];
      } else {
        throw new Error('Missing Callback');
      }

      if(!byteSize) {
        byteSize = defaultByteSize;
      }

      return crypto.randomBytes(byteSize, function(err, salt) {
        if(err) {
          callback(err);
        }
        return callback(null, salt.toString('base64'));
      });
    },
    encryptPassword(password, callback) {
      if(!password || !this.salt) {
        return callback ? callback(null) : null;
      }

      var defaultIterations = 10000;
      var defaultKeyLength = 64;
      var salt = new Buffer(this.salt, 'base64');

      if(!callback) {
        return crypto.pbkdf2Sync(password, salt, defaultIterations, defaultKeyLength)
                     .toString('base64');
      }

      return crypto.pbkdf2(password, salt, defaultIterations, defaultKeyLength,
        function(err, key) {
          if(err) {
            callback(err);
          }
          return callback(null, key.toString('base64'));
        });
    },
    updatePassword(fn) {
      if(!this.password) return fn(null);

      if(!(this.password && this.password.length)) {
        fn(new Error('Invalid password'));
      }

      this.makeSalt((saltErr, salt) => {
        if(saltErr) {
          return fn(saltErr);
        }
        this.salt = salt;
        this.encryptPassword(this.password, (encryptErr, hashedPassword) => {
          if(encryptErr) {
            fn(encryptErr);
          }
          this.password = hashedPassword;
          fn(null);
        });
      });
    }
  }
});