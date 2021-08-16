import { useEffect, useState } from 'react'
import RouterComponent from 'router/RouteComponent'
import userApi from './api/queries/userApi'
import Loading from './components/loading/Loading'
import './App.css'

function App() {
  const [pageLoading, setPageLoading] = useState(false)
  useEffect(() => {
    setPageLoading(true)
    setTimeout(() => {
      const access_token = localStorage.getItem('access_token')
      getUser(access_token)
      setPageLoading(false)
    }, 1000)
  }, [])

  const getUser = async (access_token) => {
    if (access_token) {
      const user = await userApi.GetProfile(access_token)
      if (user) {
        const { email, picture, name, facebookId, googleId, role, type } = user
        const payload = {
          email,
          picture,
          name,
          facebook: facebookId,
          google: googleId,
          role: role.name,
          type: type.name,
          login: true,
        }
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
