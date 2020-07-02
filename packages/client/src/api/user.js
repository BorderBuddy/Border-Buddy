import axios from 'axios'

const api = {
	getUser: async (id) => {
			try{
					const res = await axios.get(`/api/user/${id}`)
					return res.data
			} catch ({res}){
					return res.data
			}
	},
	updateUser: async (id, userAttributes) => {
			try{
					const res = await axios.put(`/api/user/${id}/update`, userAttributes)
					return res.data
			} catch ({res}){
					return res.data
			}
	},
	createUser: async (userAttributes) => {
			try{
					const res = await axios.post(`/api/user/create`, userAttributes)
					return res.data
			} catch ({res}){
					return res.data
			}
	},
	getUsers: async () => {
			try{
					const res = await axios.get(`/api/users`)
					return res.data
			} catch ({res}){
					return res.data
			}
	},
}
export default api