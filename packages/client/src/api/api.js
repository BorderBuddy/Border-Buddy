import Auth from './auth'
import Travelers from './travelers'
import User from './user'

const api = {
	...User,
	...Travelers,
	...Auth
}

export default api