import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import RouterComponent from 'router'
import { user_signin } from 'store/action/user.action'
import userApi from './api/queries/userApi'
import './App.css'
import Loading from './components/loading/Loading'

function App() {
  const [pageLoading, setPageLoading] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    try {
      setPageLoading(true)
      const access_token = localStorage.getItem('access_token')
      getUser(access_token)
    } catch (error) {
    } finally {
      setPageLoading(false)
    }
  }, [])

  const getUser = async (access_token) => {
    if (access_token) {
      const user = await userApi.GetProfile(access_token)
      if (user) {
        const { email, picture, name, facebookId, googleId, role, type } = user
        const payload = {
          profile: {
            email,
            picture,
            name,
            facebook: facebookId,
            google: googleId,
            role: role.name,
            type: type.name,
            login: true,
          },
          login: true,
        }

        dispatch(user_signin(payload))
      }
    }
  }

  return (
    <div className='app'>
      <Loading isLoading={pageLoading} />
      <RouterComponent />
    </div>
  )
}

export default App
