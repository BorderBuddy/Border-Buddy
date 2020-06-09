"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passportConfig = __importStar(require("./passport"));
const auth_controller_1 = require("./auth.controller");
const user_1 = require("../database/models/user");
const db_1 = __importDefault(require("../database/db"));
const express_brute_1 = __importDefault(require("express-brute"));
const express_brute_sequelize_1 = __importDefault(require("express-brute-sequelize"));
const base = '/api/auth';
passportConfig.setup(user_1.User);
exports.default = (app) => {
    app.get(base + '/checkToken', auth_controller_1.isAuthenticated);
    app.post(base + '/logout', auth_controller_1.logout);
    if (process.env.NODE_ENV === 'production') {
        express_brute_sequelize_1.default(db_1.default, 'bruteStore', {}, (store) => {
            const bruteforce = new express_brute_1.default(store, {
                freeRetries: 3,
                minWait: 5 * 1000,
                attachResetToRequest: false,
                refreshTimeoutOnRequest: true
            });
            app.post(base + '/local', bruteforce.prevent, auth_controller_1.login);
        });
    }
    else {
        app.post(base + '/local', auth_controller_1.login);
    }
};
//# sourceMappingURL=auth.route.js.map