"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const crypto_1 = __importDefault(require("crypto"));
const sequelize_1 = __importDefault(require("sequelize"));
const db = require('../db');
exports.User = db.define('user', {
    id: {
        type: sequelize_1.default.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: sequelize_1.default.STRING,
        unique: {
            msg: 'The specified email address is already in use.'
        },
        validate: {
            isEmail: true
        },
        allowNull: false
    },
    password: {
        type: sequelize_1.default.STRING,
        validate: {
            len: {
                args: [8, 1024],
                msg: 'Must be at least 8 characters long'
            }
        },
        allowNull: false
    },
    salt: {
        type: sequelize_1.default.STRING
    },
    phone: {
        type: sequelize_1.default.STRING
    }
});
exports.User.beforeBulkCreate(async (users, options) => {
    users.forEach(user => {
        user.updatePassword(user);
    });
});
exports.User.beforeCreate(async (user, options) => {
    await user.updatePassword(user);
});
exports.User.beforeUpdate(async (user, options) => {
    if (user.changed('password')) {
        await user.updatePassword(user);
    }
});
exports.User.prototype.authenticate = async (user, passwordAttempt) => {
    const { password, salt } = user;
    return password === await user.encryptPassword(salt, passwordAttempt);
};
exports.User.prototype.makeSalt = async () => {
    return crypto_1.default.randomBytes(16).toString('base64');
};
exports.User.prototype.encryptPassword = async (salt, password) => {
    const defaultIterations = 10000;
    const defaultKeyLength = 64;
    const saltBuf = Buffer.from(salt, 'base64');
    const digest = 'SHA1';
    return crypto_1.default.pbkdf2Sync(password, saltBuf, defaultIterations, defaultKeyLength, digest).toString('base64');
};
exports.User.prototype.updatePassword = async (user) => {
    if (!user.password)
        throw new Error('no password to update');
    if (!(user.password && user.password.length)) {
        throw new Error('Invalid password');
    }
    const salt = await user.makeSalt();
    const hashedPassword = await user.encryptPassword(salt, user.password);
    user.password = hashedPassword;
    user.salt = salt;
};
//# sourceMappingURL=user.js.map