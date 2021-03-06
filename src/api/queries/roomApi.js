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
                      id
                      name
                      description
                      picture
                    }
                }
          }`,
    })

    return result['data']['gamerooms']
  }

  GetRoomById = async (roomId) => {
    try {
      const result = await axiosInstance.post('/graphql', {
        query: `query getRoomGameById {
        gameroom (id: ${roomId}) {
          id
          name
          playerCount
          game {
            id
            name
            description
            picture
          }
        }
      }`,
      })

      return result['data']['gameroom']
    } catch (error) {
      return null
    }
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
            id
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
