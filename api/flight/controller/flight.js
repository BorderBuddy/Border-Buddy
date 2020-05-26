import prodController from './flight.prod'
import devController from './flight.dev'

export default process.env.npm_config_dev ? devController : prodController
