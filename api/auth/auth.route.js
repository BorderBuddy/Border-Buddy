import * as passportConfig from './passport'
import { login, isAuthenticated, logout } from './auth.controller'
import { User } from '../../database/models/user'
import sequelize from '../../database/db'
import ExpressBrute from 'express-brute'
import SequelizeStore from 'express-brute-sequelize'

const base = '/api/auth'

passportConfig.setup(User)

export default (app) => {
  app.get(base + '/checkToken', isAuthenticated)
  app.post(base + '/logout', logout)

  if (process.env.NODE_ENV == 'production') {
    new SequelizeStore(sequelize, 'bruteStore', {}, (store) => {
      const bruteforce = new ExpressBrute(store,
        {
          freeRetries: 3,
          minWait: 5 * 1000,
          attachResetToRequest: false,
          refreshTimeoutOnRequest: true
        })

      app.post(base + '/local',
        bruteforce.prevent,
        login)
    })
  } else {
    app.post(base + '/local', login)
  }
}
