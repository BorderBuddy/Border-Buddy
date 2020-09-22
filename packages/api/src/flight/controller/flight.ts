import prodController from './flight.prod'
import devController from './flight.dev'

console.log(`FLIGHT_STATS_DEV: ${process.env.FLIGHT_STATS_DEV}`)
console.log(`flight.dev: ${process.env.npm_config_dev}`)
export default (process.env.npm_config_dev && process.env.FLIGHT_STATS_DEV) ? devController : prodController
