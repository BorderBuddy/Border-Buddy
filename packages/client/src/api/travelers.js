import axios from 'axios'

const api = {
	getTraveler: async (id) => {
		try{
				const res = await axios.get(`/api/traveler/${id}`)
				return res.data
		} catch ({res}){
				return res.data
		}
	},
	updateTraveler: async (id, travelerAttributes) => {
			try{
					const res = await axios.put(`/api/traveler/${id}/update`, travelerAttributes)
					return res.data
			} catch ({res}){
					return res.data
			}
	},
	createTraveler: async (travelerAttributes) => {
			try{
					const res = await axios.post(`/api/traveler/create`, travelerAttributes)
					return res.data
			} catch ({res}){
					return res.data
			}
	},
	getTravelers: async () => {
			try{
					const res = await axios.get(`/api/travelers`)
					return res.data
			} catch ({res}){
					return res.data
			}
	},
	getTravelersByLawyer: async (id) => {
		try{
				const res = await axios.get(`/api/travelers/lawyer/${id}`)
				return res.data
		} catch ({res}){
				return res.data
		}
},
}

export default api