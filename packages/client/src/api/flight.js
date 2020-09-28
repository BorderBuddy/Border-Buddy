import axios from 'axios'

const api = {
  // checkFlight: async (code, flightNum, year, month, day, token) => {
  //   try {
  //     const res = await axios.get(`/api/flight/verify?code=${code}&flightNum=${flightNum}&year=${year}&month=${month}&day=${day}`)
  //     // console.log(`response from checkFlight: ${JSON.stringify(res.data)}`)
  //     return res.data
  //   } catch ({ res }) {
  //     return res.data
  //   }
  // },
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
      // const res = await axios.get(`/api/flight/verify?code=${code}&flightNum=${flightNum}&year=${year}&month=${month}&day=${day}`)
      // console.log(`response from checkFlight: ${JSON.stringify(res.data)}`)
      return res.data
    } catch ({ res }) {
      return res.data
    }
  },
}
export default api
