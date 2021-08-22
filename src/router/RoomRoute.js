import Loading from 'components/loading/Loading'
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import NotFound from 'views/common/NotFoundPage/NotFound'

const DetailRoomPage = React.lazy(() => import('../views/client/RoomPage/ChildPage/DetailRoomPage'))
const RoomPage = React.lazy(() => import('../views/client/RoomPage/RoomPage'))

function RoomRouter() {
  return (
    <React.Suspense fallback={<Loading isLoading='true' />}>
      <Switch>
        <Route path='/rooms' exact>
          <RoomPage />
        </Route>
        <Route path='/rooms/room' exact>
          <DetailRoomPage />
        </Route>
      </Switch>
      {/* <Route component={NotFound} /> */}
    </React.Suspense>
  )
}

export default RoomRouter
