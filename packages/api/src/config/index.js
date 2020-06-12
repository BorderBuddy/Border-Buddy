import { checkEnv } from '../utils/check-env-config'
import sequelizeConf from './sequelize'

const envs = [
  'DB_PASSWORD',
  'NODE_ENV',
  'DATABASE_URL',
  'SESSION_SECRET',
  'PORT',
  'TWILIO_PHONE_NUM',
  'TWILIO_MESSAGING_SID',
  'TWILIO_ACCOUNT_SID',
  'TWILIO_AUTH_TOKEN',
  'FLIGHT_STATS_KEY',
  'FLIGHT_STATS_ID',
  'NAZ_NUM',
  'TAREK_NUM'
]

checkEnv(envs, (envNotSet, confirmedEnv) => {
  console.log(`env not set: ${envNotSet}`)
  // console.log(`confirmed envs: ${JSON.stringify(confirmedEnv)}`)
})

const {
  NODE_ENV,
  SESSION_SECRET,
  PORT,
  TWILIO_PHONE_NUM,
  TWILIO_MESSAGING_SID,
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  FLIGHT_STATS_KEY,
  FLIGHT_STATS_ID,
  NAZ_NUM,
  TAREK_NUM
} = process.env

export const config = {
  env: NODE_ENV || 'development',
  port: PORT || 3000,
  secrets: {
    session: SESSION_SECRET
  },
  twilio: {
    adminPhone: TWILIO_PHONE_NUM,
    messagingSid: TWILIO_MESSAGING_SID,
    accountSid: TWILIO_ACCOUNT_SID,
    authToken: TWILIO_AUTH_TOKEN
  },
  FLIGHT_STATS_KEY,
  FLIGHT_STATS_ID,
  NAZ_NUM,
  TAREK_NUM,
  // config used by sequelize at sequelize.js
  database: sequelizeConf
}
