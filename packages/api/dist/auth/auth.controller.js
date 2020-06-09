"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.isAuthenticated = exports.login = void 0;
const passport_1 = __importDefault(require("passport"));
const auth_service_1 = require("./auth.service");
function login(req, res, next) {
    console.log('login called');
    passport_1.default.authenticate('local', function (err, user, info) {
        var error = err || info;
        if (error) {
            return res.status(401).send(error);
        }
        if (!user) {
            return res
                .status(404)
                .json({ message: 'Something went wrong, please try again.' });
        }
        var token = auth_service_1.signToken(user.id);
        res.json({ token, id: user.id, phone: user.phone, email: user.email });
    })(req, res, next);
}
exports.login = login;
function isAuthenticated(req, res, next) {
    const token = req.headers.authorization;
    auth_service_1.verifyToken(token)
        .then(user => {
        const tokenResponse = auth_service_1.signToken(user.id);
        res.json({
            tokenResponse,
            id: user.id,
            phone: user.phone,
            email: user.email
        });
    })
        .catch(err => {
        console.log(err);
        res
            .status(401)
            .send({ message: `You are not allowed to access this page: ${err}` })
            .end();
    });
}
exports.isAuthenticated = isAuthenticated;
function logout(req, res, next) {
    req.logout();
    res.redirect('/');
}
exports.logout = logout;
//# sourceMappingURL=auth.controller.js.map