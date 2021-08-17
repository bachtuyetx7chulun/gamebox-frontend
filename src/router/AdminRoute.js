import Navbar from 'components/layout/Navbar'
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import DetailRoomPage from '../views/client/RoomPage/ChildPage/DetailRoomPage'
import RoomPage from '../views/client/RoomPage/RoomPage'

function AdminRoute() {
  return (
    <Switch>
      <Navbar />
      <Route path='/room' exact>
        <RoomPage />
      </Route>
      <Route path='/room/:roomId' exact>
        <DetailRoomPage />
      </Route>
    </Switch>
  )
}

export default AdminRoute
