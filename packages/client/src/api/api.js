import Auth from './auth'
import Travelers from './travelers'
import User from './user'

// TODO: review all routes to make cleaner consistent api routes moving forward
const api = {
	...User,
	...Travelers,
	...Auth
}

export default api