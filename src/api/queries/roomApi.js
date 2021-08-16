import { axiosInstance } from '../axios'

class RoomApi {
  GetAll = async () => {
    const result = await axiosInstance.post('/graphql', {
      query: `query getGamesRooms {
                gamerooms {
                    id
                    name
                    playerCount
                    game {
                      name
                      description
                      picture
                    }
                }
          }`,
    })

    return result['data']['gamerooms']
  }

  CreateRoom = async (payload) => {
    const result = await axiosInstance.post('/graphql', {
      query: `mutation createGameRoom {
        createGameroom(
          createGameRoomInput: { name: "${payload.name}", gameId: ${payload.gameId}, playerCount: 1 }
        ) {
          id
          name
          playerCount
          game {
            name
            description
            picture
          }
        }
      }
      `,
    })

    return result['data']['createGameroom']
  }
}

const roomApi = new RoomApi()
export default roomApi
