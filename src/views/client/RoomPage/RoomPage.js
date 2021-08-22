import { Button, Card, Col, Row, Space, Tooltip, Typography } from 'antd'
import Meta from 'antd/lib/card/Meta'
import { socketConnected } from 'services/socket'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import roomApi from 'api/queries/roomApi'
import RoomModal from 'components/antd/modal/RoomModal'
import { FBDiv } from 'components/styled/Div.styled'
import { BSpan, PSpan, RSpan } from 'components/styled/Color.styled'
import Navbar from 'components/layout/Navbar'
import { Link, useHistory } from 'react-router-dom'
import { errorModal, successModal } from 'components/antd/modal/ExtendModal'
import { useSelector } from 'react-redux'

const socket = socketConnected('http://localhost:3000/tictactoe')
const { Text } = Typography

const tempPicture =
  'https://yt3.ggpht.com/hN71s4RgKl13k2T3a7C_mL-ktwEC6k-F0-Ucb2i7BFSFdM222sBu64u4yZANtTTeTGGHFqWBysE=s900-c-k-c0x00ffffff-no-rj'
const URow = styled(Row)`
  font-weight: 500;
  padding-bottom: 1rem;
  /* margin-top: 4rem; */
`

const UCol = styled(Col)`
  margin-top: 1rem;
`

const CURow = styled(Col)`
  position: fixed;
  width: 100vw;
  height: 4rem;
  z-index: 1;
  top: 0;
  background-color: #f0f4f7;
`

const ICol = styled(Col)`
  margin-bottom: 1.5rem;
`

const FDiv = styled.div`
  display: flex;
  justify-content: space-between;
`

function RoomPage() {
  const user = useSelector((state) => state.user)
  const history = useHistory()
  const [online, setOnline] = useState(0)
  const [gamerooms, setGameRooms] = useState([])
  useEffect(() => {
    const getGameRooms = async () => {
      const gameRooms = await roomApi.GetAll()
      setGameRooms(gameRooms.reverse())
    }

    getGameRooms()
  }, [])

  useEffect(() => {
    const getClientOnline = async () => {
      socket.on('client_online', (count) => {
        setOnline(count)
      })
    }

    getClientOnline()
  }, [online])

  const createRoom = async (payload) => {
    try {
      const gameRoom = await roomApi.CreateRoom(payload)
      // const newGamerooms = [...gamerooms]
      // newGamerooms.unshift(gameRoom)
      // setGameRooms(newGamerooms)
      if (user.login) {
        socket.emit('room_action', {
          action: 'create_room',
          payload: {
            userId: user.profile.id,
            gameId: payload.gameId,
            roomId: gameRoom.id,
            name: user.profile.name,
          },
        })
      } else {
        socket.emit('room_action', {
          action: 'create_room',
          payload: {
            gameId: payload.gameId,
            roomId: gameRoom.id,
            name: user.profile.name,
          },
        })
      }

      const redirectPath = `/rooms/room?roomId=${gameRoom.id}&gameId=${gameRoom.game.id}`
      history.push(redirectPath)
    } catch (error) {
      errorModal('Error', 'The room can not create, please check it later')
    }
  }

  return (
    <div>
      <Navbar />
      <URow>
        <UCol span={22} offset={1}>
          <FDiv>
            <Space>
              <BSpan>Room list </BSpan>
              <RoomModal title='Create' createRoom={createRoom} />
              <Button type='dashed'>
                <Text type='danger'>Fmatch</Text>
              </Button>
            </Space>
            <Space size={2}>
              <PSpan>Online:</PSpan> <RSpan>{online}</RSpan>
            </Space>
          </FDiv>
        </UCol>
      </URow>
      <URow>
        <UCol span={22} offset={1}>
          <Row gutter={20}>
            {gamerooms.map((e) => {
              return (
                <ICol xs={24} sm={12} md={8} lg={6} xl={6} key={e.id}>
                  <Tooltip placement='bottomLeft' title={e['game']['description']}>
                    <Card
                      hoverable
                      style={{ width: '100%' }}
                      cover={<img alt='example' src={e['game']['picture'] || tempPicture} />}
                    >
                      <Meta title={e['game']['name']} description={`Số người đang chơi ${e['playerCount']}/2`} />
                      <FBDiv>
                        <Text type='success'>{e.name}</Text>
                        <Link to={'/rooms/room?roomId=' + e.id + '&gameId=' + e.game.id}>
                          <Button type='dashed' disabled={e['playerCount'] === 2 ? true : false}>
                            Join
                          </Button>
                        </Link>
                      </FBDiv>
                    </Card>
                  </Tooltip>
                </ICol>
              )
            })}
          </Row>
        </UCol>
        {/* <Row style={{ height: '5rem', width: '100vw' }}></Row> */}
      </URow>
    </div>
  )
}

export default RoomPage
