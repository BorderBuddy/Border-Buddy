import axios from 'axios'

const api = {
  sendText: async (traveler) => {
    try {
      const res = await axios.get(`/api/twilio/send`,
        {
          to: `+${traveler.countryCode}${traveler.phone}`,
          message: `Hi ${traveler.name}, we have not heard from you yet. Please respond with 'ok' if you are through customs and immigration.`,
        })
      return res.data
    } catch ({ res }) {
      return res.data
    }
  },
}
export default api
