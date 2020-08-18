import Auth from './auth'
import Travelers from './travelers'
import User from './user'
import Messaging from './messaging'

const api = {
  ...User,
  ...Travelers,
  ...Auth,
  ...Messaging,
}

export default api
