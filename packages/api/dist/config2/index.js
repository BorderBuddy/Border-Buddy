"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const path_1 = __importDefault(require("path"));
const lodash_1 = __importDefault(require("lodash"));
const appConfig_1 = __importDefault(require("../appConfig"));
const isTesting = process.env.NODE_ENV === 'test';
const dbUsername = 'postgres';
const dbPassword = 'root';
const dbName = 'BorderBuddy' + (isTesting ? '_test' : '');
const databaseUrl = lodash_1.default.get(process.env, 'DATABASE_URL', `postgres://${dbUsername}:${dbPassword}@localhost:5432/${dbName}`);
exports.config = {
    env: process.env.NODE_ENV,
    root: path_1.default.normalize(`${__dirname}/../../..`),
    port: lodash_1.default.get(process.env, 'PORT', 3000),
    secrets: {
        session: lodash_1.default.get(process.env, 'SESSION_SECRET')
    },
    database: {
        url: databaseUrl
    },
    twilio: {
        adminPhone: appConfig_1.default.TWILIO_PHONE_NUM,
        messagingSid: appConfig_1.default.TWILIO_MESSAGING_SID,
        accountSid: appConfig_1.default.TWILIO_ACCOUNT_SID,
        authToken: appConfig_1.default.TWILIO_AUTH_TOKEN
    }
};
//# sourceMappingURL=index.js.map