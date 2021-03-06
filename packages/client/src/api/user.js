import axios from 'axios'

const api = {
  getUser: async (id) => {
    try {
      const res = await axios.get(`/api/user/${id}`)
      return res.data
    } catch ({ res }) {
      return res.data
    }
  },
  updateUser: async (id, userAttributes) => {
    try {
      const res = await axios.put(`/api/user/${id}`, userAttributes)
      return res.data
    } catch ({ res }) {
      return res.data
    }
  },
  createUser: async (userAttributes) => {
    try {
      const res = await axios.post('/api/user', userAttributes)
      return res.data
    } catch ({ res }) {
      return res.data
    }
  },
  getUsers: async () => {
    try {
      const res = await axios.get('/api/user')
      return res.data
    } catch ({ res }) {
      return res.data
    }
  },
}
export default api
