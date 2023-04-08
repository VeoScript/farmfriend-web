import axios from 'axios'

const api = axios.create({
  baseURL: `${ process.env.API_URL_PRODUCTION }`,
  withCredentials: true,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  },
})

export default api