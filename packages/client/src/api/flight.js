import axios from 'axios'

const api = {
  checkFlight: async (code, flightNum, year, month, day, token) => {
    try {
      const res = await axios.post('/api/flight/verify',
        {
          code,
          flightNum,
          year,
          month,
          day,
          token,
        },
      )
      return res.data
    } catch ({ res }) {
      return res.data
    }
  },
}
export default api
