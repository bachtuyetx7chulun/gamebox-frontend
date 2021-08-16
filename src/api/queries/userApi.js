import { axiosInstance } from '../axios'

class UserApi {
  GetAll = async () => {
    const result = await axiosInstance.post('/graphql', {
      query: `query getAllUser {
                users {
                    id
                    name
                    createAt
                    updateAt
                }
          }`,
    })

    return result['data']['users']
  }

  GetOneByName = async (name) => {
    const result = await axiosInstance.post('/graphql', {
      query: `query getUserByName {
                  user(name: "${name}") {
                      id
                      name
                      createAt
                      updateAt
                  }
            }`,
    })

    return result['data']['users']
  }

  GetProfile = async (access_token) => {
    const result = await axiosInstance.post(
      '/graphql',
      {
        query: `query userProfile  {
          profile {
            id
            name
            email
            picture
            googleId
            facebookId
            type {
              name
            }
            role {
              name
            }
          }
        }
        `,
      },
      {
        headers: {
          access_token: `Bearer ${access_token}`,
        },
      }
    )

    return result['data']['profile']
  }
}

const userApi = new UserApi()
export default userApi
