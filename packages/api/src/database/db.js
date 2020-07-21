'use strict'

import Sequelize from 'sequelize'
import { config } from '../config'
const { env, database } = config
const dbConfig = database[env]

const baseConfig = {
  define: {
    // stop sequelize from pluralizing model names to get table names
    freezeTableName: true,
  },
  logging: (env === 'development') ? console.log : false,
}

let sequelize
if (dbConfig.use_env_variable) {
  sequelize = new Sequelize(dbConfig.use_env_variable, baseConfig)
} else {
  sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, Object.assign({}, baseConfig, dbConfig))
}

module.exports = sequelize
