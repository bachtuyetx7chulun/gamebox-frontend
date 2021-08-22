import delay from 'delay'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import RouterComponent from 'router'
import { socketConnected } from 'services/socket'
import { user_signin } from 'store/action/user.action'
import { generationName } from 'utils/generation'
import userApi from './api/queries/userApi'
import './App.css'
import Loading from './components/loading/Loading'

function App() {
  const [pageLoading, setPageLoading] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    const initial = async () => {
      try {
        setPageLoading(true)
        const access_token = localStorage.getItem('access_token')
        await getUser(access_token)
      } catch (error) {
      } finally {
        await delay(500)
        setPageLoading(false)
      }
    }

    initial()
  }, [])

  const getUser = async (access_token) => {
    const socket = socketConnected('http://localhost:3000/tictactoe')
    if (access_token) {
      localStorage.removeItem('guest_account')
      const user = await userApi.GetProfile(access_token)
      if (user) {
        const { email, picture, name, facebookId, googleId, role, type, id } = user
        const payload = {
          profile: {
            id,
            email,
            picture,
            name,
            facebook: facebookId,
            google: googleId,
            role: role.name,
            type: type.name,
          },
          login: true,
          socket,
        }

        dispatch(user_signin(payload))
      }
    } else {
      const guest_account = localStorage.getItem('guest_account')
      if (guest_account) {
        const payload = {
          profile: {
            id: null,
            email: null,
            picture: null,
            name: guest_account,
            facebook: null,
            google: null,
            role: 'user',
            type: 'guest',
          },
          login: false,
          socket,
        }

        dispatch(user_signin(payload))
      } else {
        const guest_account = `guest_${generationName()}`
        localStorage.setItem('guest_account', guest_account)
        const payload = {
          profile: {
            email: null,
            picture: null,
            name: guest_account,
            facebook: null,
            google: null,
            role: 'user',
            type: 'guest',
          },
          login: false,
          socket,
        }

        dispatch(user_signin(payload))
      }

      console.log(socket)
    }
  }

  return (
    <div className='app'>
      <Loading isLoading={pageLoading} />
      {!pageLoading && <RouterComponent />}
    </div>
  )
}

export default App
