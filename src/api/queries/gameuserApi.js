import { axiosInstance } from '../axios'

class GameUserApi {
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

  CreateGameUser = async (payload) => {
    const { userId } = payload
    const result = await axiosInstance.post('/graphql', {
      query: `mutation createGameUser {
        createGameuser(
          createGameuserInput: { name: "${payload.name}", gameId: ${payload.gameId}, gameRoomId: ${payload.roomId}, ${userId} }
        ) {
          id
          name
          gameRoom {
            id
            name
            playerCount
          }
          game {
            id
            name
            description
          }
          user {
            name
          }
        }
      }
      
      `,
    })

    return result['data']['createGameUser']
  }
}

const gameUserApi = new GameUserApi()
export default gameUserApi
