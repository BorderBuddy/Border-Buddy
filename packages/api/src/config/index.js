import { checkEnv } from '../utils/check-env-config'

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
  DB_PASSWORD,
  NODE_ENV,
  DATABASE_URL,
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
  secrets: SESSION_SECRET,
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
  // config used by sequelize
  database: {
    development: {
      username: 'postgres',
      password: DB_PASSWORD,
      database: 'BorderBuddy',
      dialect: 'postgres'
    },
    test: {
      username: 'postgres',
      password: DB_PASSWORD,
      database: 'BorderBuddy_test',
      dialect: 'postgres'
    },
    production: {
      use_env_variable: DATABASE_URL
    }
  }
}
