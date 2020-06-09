'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const baseConfig = {
    define: {
        // stop sequelize from pluralizing model names to get table names
        freezeTableName: true
    },
    logging: ['development'].includes(env)
};
// if (config.use_env_variable) {
//   let sequelize = new Sequelize(process.env[config.use_env_variable], baseConfig)
// } else {
const sequelize = new sequelize_1.default(config.database, config.username, config.password, Object.assign({}, baseConfig, config));
// }
module.exports = sequelize;
//# sourceMappingURL=db.js.map