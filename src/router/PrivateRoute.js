import React from 'react'
import { Redirect, Route } from 'react-router-dom'

function PrivateRoute({ component: Component, ...rest }) {
  const isLoggedIn = Boolean(localStorage.getItem('access_token'))
  if (!isLoggedIn) return <Redirect to='/signin' />

  return <Route {...rest} render={(routeProps) => <Component {...routeProps} />} />
}

export default PrivateRoute
