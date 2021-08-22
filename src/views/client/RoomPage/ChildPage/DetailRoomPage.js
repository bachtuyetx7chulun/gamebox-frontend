import roomApi from 'api/queries/roomApi'
import Navbar from 'components/layout/Navbar'
import queryString from 'query-string'
import React, { useEffect, useState } from 'react'
// import { socketConnected } from 'services/socket'
import NotFound from 'views/common/NotFoundPage/NotFound'
// const socket = socketConnected('http://localhost:3000/tictactoe')

function DetailRoomPage() {
  const [roomId, setRoomId] = useState()
  const [gameId, setGameId] = useState()
  const [isPageFound, setIsPageFound] = useState(false)

  useEffect(() => {
    const validateRoom = async () => {
      try {
        //   const roomId = document.location.pathname.match(/^\/room\/(\d+)/)[1]
        const query = queryString.parse(document.location.search)
        const { gameId, roomId } = query
        const room = await roomApi.GetRoomById(parseInt(roomId))
        if (room.game.id === parseInt(gameId)) setIsPageFound(true)
        setRoomId(roomId)
        setGameId(gameId)
      } catch (error) {
        setIsPageFound(false)
      }
    }

    validateRoom()
  }, [roomId, gameId])

  console.log({ gameId, roomId })

  return (
    <div className='detail_roompage'>
      <div className='detail_roompage_content' hidden={!isPageFound}>
        <Navbar />
      </div>
      <div className='page_not_found' hidden={isPageFound}>
        <NotFound />
      </div>
    </div>
  )
}

export default DetailRoomPage
