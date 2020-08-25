import Auth from './auth'
import Travelers from './travelers'
import User from './user'
import Messaging from './messaging'
import Flight from './flight'

const api = {
  ...User,
  ...Travelers,
  ...Auth,
  ...Messaging,
  ...Flight,
}

export default api
