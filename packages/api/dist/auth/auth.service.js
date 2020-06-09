"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectedEndpoint = exports.verifyToken = exports.signToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config2_1 = require("../config2");
const models_1 = require("../database/models");
function signToken(id) {
    return jsonwebtoken_1.default.sign({ id: id }, config2_1.config.secrets.session, {
        expiresIn: '2 hours'
    });
}
exports.signToken = signToken;
function verifyToken(token, repository = models_1.Repository) {
    const userRepository = repository.users;
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.verify(token, config2_1.config.secrets.session, (err, user) => {
            if (err) {
                reject(err.message);
                return;
            }
            userRepository.findById(user.id).then(foundUser => {
                if (!foundUser) {
                    reject(new Error('User not found'));
                }
                else {
                    resolve(foundUser);
                }
            });
        });
    });
}
exports.verifyToken = verifyToken;
function protectedEndpoint(endpoint, tokenVerifier = verifyToken) {
    return (req, res, next) => {
        tokenVerifier(req.headers.authorization)
            .then(() => endpoint(req, res, next))
            .catch(() => res
            .status(401)
            .send('Unauthorized')
            .end());
    };
}
exports.protectedEndpoint = protectedEndpoint;
//# sourceMappingURL=auth.service.js.map