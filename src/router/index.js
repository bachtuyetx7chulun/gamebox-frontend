import React from 'react'
import { Route, Switch } from 'react-router-dom'
import RoomRouter from 'router/RoomRoute'
import DashBoard from 'views/admin/Dashboard'
import MainPage from 'views/client/MainPage'
import NotFound from 'views/common/NotFoundPage/NotFound'
import SignIn from '../views/client/AuthPage/SignIn'
import PrivateRoute from './PrivateRoute'

function RouterComponent() {
  return (
    <Switch>
      <Route path='/signin' exact>
        <SignIn />
      </Route>
      <Route path='/' exact>
        <MainPage />
      </Route>
      <Route path='/rooms'>
        <RoomRouter />
      </Route>
      <PrivateRoute path='/admin'>
        <DashBoard />
      </PrivateRoute>
      <Route component={NotFound} />
    </Switch>
  )
}

export default RouterComponent
