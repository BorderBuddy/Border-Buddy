import axios from 'axios'
import {
    setLoginTokens,
    saveUser,
    loginCallback,
    logout,
  } from '../auth/AuthService'

const api = {
	login: async (username, password) => {
		try{
			const res = await axios.post("/api/auth/login", { username, password })
			setLoginTokens(res.data.token)
			saveUser(res.data.user)
			if(loginCallback){
				loginCallback(user)
			}
			return res.data
		} catch ({res}){
			return res.data
		}
	},
	logout: async () => {
		try{
			const res = await axios.post("/api/auth/logout")
			logout()
			return res.data
		} catch ({res}){
			return res.data
		}
	},
	verify: async (userAttributes) => {
		try{
			const res = await axios.post(`/api/auth/verify`, userAttributes)
			return res.data
		} catch ({res}){
			return res.data
		}
	},
	forgot:  async (userAttributes) => {
		try{
			const res = await axios.post(`/api/auth/forgot`, userAttributes)
			return res.data
		} catch ({res}){
			return res.data
		}
	},
}
export default api