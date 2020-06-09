"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.me = exports.update = exports.changePassword = exports.destroy = exports.show = exports.create = exports.index = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../database/models/user");
const config2_1 = require("../config2");
function validationError(res, statusCode) {
    statusCode = statusCode || 422;
    return function (err) {
        return res.status(statusCode).json(err);
    };
}
function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function (err) {
        return res.status(statusCode).send(err);
    };
}
function index(req, res) {
    return user_1.User.findAll({
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
exports.index = index;
function create(req, res) {
    return user_1.User.create(req.body)
        .then(function (user) {
        const token = jsonwebtoken_1.default.sign({ id: user.id }, config2_1.config.secrets.session, {
            expiresIn: 60 * 60 * 5
        });
        res.json({ token });
    })
        .catch(validationError(res));
}
exports.create = create;
function show(req, res, next) {
    if (!req.params) {
        return;
    }
    ;
    var userId = req.params.id;
    return user_1.User.find({
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
exports.show = show;
function destroy(req, res) {
    return user_1.User.destroy({ where: { id: req.params.id } })
        .then(function () {
        res.status(204).end();
    })
        .catch(handleError(res));
}
exports.destroy = destroy;
function changePassword(req, res) {
    const userId = req.user.id;
    const oldPass = String(req.body.oldPassword);
    const newPass = String(req.body.newPassword);
    return user_1.User.findById(userId)
        .then(user => {
        if (user.authenticate(oldPass)) {
            user.update({ password: newPass })
                .then((user) => {
                res.status(204).end();
            })
                .catch(validationError(res));
        }
        else {
            return res.status(403).end();
        }
    });
}
exports.changePassword = changePassword;
function update(req, res, next) {
    const userId = req.body.id;
    const oldPass = String(req.body.oldPassword);
    const newPass = String(req.body.newPassword);
    const phone = req.body.phone;
    const email = req.body.email;
    return user_1.User.findById(userId)
        .then(user => {
        user.phone = phone || user.phone;
        user.email = email || user.email;
        return user.save();
    })
        .then(user => {
        if (oldPass && !user.authenticate(oldPass)) {
            res.sendStatus(401);
            return user;
        }
        if (newPass) {
            return user.update({
                password: newPass
            });
        }
        else {
            return user;
        }
    })
        .then(user => res.status(200).json(user))
        .catch(next);
}
exports.update = update;
function me(req, res, next) {
    const userId = req.headers.user.id;
    user_1.User.findById(userId, {
        attributes: {
            exclude: ['salt', 'password']
        }
    })
        .then(user => {
        if (!user) {
            return res.status(401).end();
        }
        res.json(user);
    })
        .catch(err => next(err));
}
exports.me = me;
//# sourceMappingURL=user.controller.js.map