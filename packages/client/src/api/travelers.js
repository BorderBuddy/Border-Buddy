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
        `/api/traveler/${id}`,
        travelerAttributes,
      )
      return res.data
    } catch ({ res }) {
      return res.data
    }
  },
  createTraveler: async (traveler) => {
    try {
      const res = await axios.post('/api/traveler', traveler)
      return res.data
    } catch (err) {
      return err
    }
  },
  deleteTraveler: async (id) => {
    try {
      const res = await axios.delete(`/api/traveler/${id}`)
      return res.data
    } catch (err) {
      return err
    }
  },
  getTravelers: async () => {
    console.log('getting travelers...')
    try {
      const res = await axios.get('/api/traveler')
      return res.data
    } catch (err) {
      console.error(err.response.data)
    }
  },
  getTravelersByLawyer: async (id) => {
    try {
      const res = await axios.get(`/api/traveler?lawyerId=${id}`)
      return res.data
    } catch ({ res }) {
      return res.data
    }
  },
}
export default api
