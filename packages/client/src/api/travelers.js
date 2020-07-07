import axios from 'axios'

const api = {
  getTraveler: async (id) => {
    try {
      const res = await axios.get(`/api/traveler/${id}`)
      return res.data
    } catch ({ res }) {
      return res.data
    }
  },
  updateTraveler: async (id, travelerAttributes) => {
    try {
      const res = await axios.put(
        `/api/traveler/${id}/update`,
        travelerAttributes
      )
      return res.data
    } catch ({ res }) {
      return res.data
    }
  },
  createTraveler: async (traveler) => {
    try {
      // TODO: change the api to have a matching consistent endpoint pattern
      // const res = await axios.post(`/api/traveler/create`, traveler)
      const res = await axios.post('/api/traveler/', traveler)
      return res.data
    } catch (err) {
      return err
    }
  },
  getTravelers: async () => {
    try {
      const res = await axios.get('/api/travelers')
      return res.data
    } catch ({ res }) {
      return res.data
    }
  },
  getTravelersByLawyer: async (id) => {
    try {
      const res = await axios.get(`/api/travelers/lawyer/${id}`)
      return res.data
    } catch ({ res }) {
      return res.data
    }
  }
}

export default api
