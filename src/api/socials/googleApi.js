import { axiosInstance } from '../axios'

class GoogleApi {
  Login = async (token) => {
    const result = await axiosInstance.post(
      '/auth/google',
      {},
      {
        headers: {
          access_token: `${token}`,
        },
      }
    )

    return result
  }
}

const googleApi = new GoogleApi()
export default googleApi
