import React from 'react'
import { Route } from 'react-router-dom'
import NotFound from 'views/common/NotFoundPage/NotFound'

function CRoomRoute({ component: Component, ...rest }) {
  const path = document.location.pathname
  return path !== '/rooms' ? <NotFound /> : <Route {...rest} render={(routeProps) => <Component {...routeProps} />} />
}

export default CRoomRoute
