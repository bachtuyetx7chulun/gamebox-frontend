import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'content-type': 'application/json',
  },
})

axiosInstance.interceptors.request.use(async (config) => {
  // Check header and return
  return config
})

axiosInstance.interceptors.response.use(
  (res) => {
    if (res && res.data) return res.data
    return res
  },
  (err) => {
    throw err
  }
)

export { axiosInstance }
