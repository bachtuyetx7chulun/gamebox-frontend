import { Button, Form, Input, Modal, Select } from 'antd'
import delay from 'delay'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import gameApi from '../../../api/queries/gameApi'
import { errorModal } from './ExtendModal'

const { Option } = Select

const CButton = styled(Button)`
  color: green;
  border: 1px dashed green;
  margin-left: 0.5rem;
`

function RoomModal({ title, createRoom }) {
  const formRef = React.createRef()
  const [form] = Form.useForm()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [games, setGames] = useState([])
  const [isCreate, setIsCreate] = useState(false)
  const [roomName, setRoomName] = useState('')
  const [gameId, setGameId] = useState(0)
  const [disableCreate, setDisableCreate] = useState(true)

  const handleChange = (type, value) => {
    roomName.length > 0 && gameId > 0 ? setDisableCreate(false) : setDisableCreate(true)
    if (type === 'room') {
      value.length > 0 && gameId > 0 ? setDisableCreate(false) : setDisableCreate(true)
      setRoomName(value)
    }

    if (type === 'game') {
      const gameId = parseInt(value)
      roomName.length > 0 && gameId > 0 ? setDisableCreate(false) : setDisableCreate(true)
      setGameId(gameId)
    }
  }

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = async () => {
    try {
      setIsCreate(true)
      if (gameId === '') return
      await delay(2000)

      await createRoom({
        name: roomName,
        gameId,
      })
    } catch (error) {
      errorModal('Error', 'The room can not create, please check it later')
    } finally {
      setIsCreate(false)
      setIsModalVisible(false)
    }
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    formRef.current.setFieldsValue({
      game: '',
    })
    formRef.current.resetFields()
    setRoomName('')
    setGameId(0)
    setDisableCreate(true)
  }

  useEffect(() => {
    const getGames = async () => {
      const gameList = await gameApi.GetAll()
      setGames(gameList)
    }

    getGames()
  }, [])

  return (
    <div>
      <CButton onClick={showModal}>{title}</CButton>
      <Modal
        title='Create room'
        okText='Create'
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={isCreate}
        okButtonProps={{ disabled: disableCreate, htmlType: 'submit', loading: isCreate }}
      >
        <Form layout='vertical' ref={formRef} form={form} autoComplete='false'>
          <Form.Item
            label='Room name'
            name='roomname'
            rules={[
              {
                required: true,
                message: 'Room name is not correct',
              },
            ]}
          >
            <Input
              placeholder='Enter your room name ...'
              value={roomName}
              onChange={(e) => handleChange('room', e.target.value)}
            />
          </Form.Item>
          <Form.Item label='Choose game' name='game' rules={[{ required: true, message: 'Game is not empty' }]}>
            <Select
              name='gameSelect'
              style={{ width: '100%' }}
              placeholder="Search the game's name ..."
              onChange={(id) => handleChange('game', id)}
              allowClear
            >
              {games.map((e, i) => {
                return (
                  <Option key={i} value={e.id}>
                    {e.name || 'Unknown game'}
                  </Option>
                )
              })}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default RoomModal
