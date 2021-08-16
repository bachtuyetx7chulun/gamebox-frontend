import React from 'react'
import { Route, Switch } from 'react-router-dom'
import SignIn from 'views/common/AuthPage/SignIn'
import NotFound from 'views/common/NotFoundPage/NotFound'
import PrivateRoute from './PrivateRoute'

function RouterComponent() {
  return (
    <Switch>
      <PrivateRoute path='/'>
        <NotFound />
      </PrivateRoute>
      <Route path='/auth/signin' exact>
        <SignIn />
      </Route>
    </Switch>
  )
}

export default RouterComponent
