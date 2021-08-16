import { axiosInstance } from '../axios'

class GameApi {
  GetAll = async () => {
    const result = await axiosInstance.post('/graphql', {
      query: `query getGames {
                games {
                id
                name
                description
                platform
                picture
                }
      }`,
    })

    return result['data']['games']
  }
}

const gameApi = new GameApi()
export default gameApi
