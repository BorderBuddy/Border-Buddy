'use strict';

import Sequelize from 'sequelize';
const env    = process.env.NODE_ENV || 'development';
const config = require('./../config/config')[env];

const baseConfig = {
  define: {
    // stop sequelize from pluralizing model names to get table names
    freezeTableName: true
  },
  logging: ['development'].includes(env)
};

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable], baseConfig);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, Object.assign({}, baseConfig, config));
}

module.exports = sequelize;
