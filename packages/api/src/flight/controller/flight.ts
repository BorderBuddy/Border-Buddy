import prodController from './flight.prod'
import devController from './flight.dev'

console.log(`flight.dev: ${process.env.npm_config_dev}`)
export default process.env.npm_config_dev ? devController : prodController
