import { PlayCircleOutlined, SmileOutlined } from '@ant-design/icons'
import { Button, Col, Input, Row, Space, Typography } from 'antd'
import Picker from 'emoji-picker-react'
import React, { createRef, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { SocketService } from '../../services/socket'
import './App.css'

const socket = SocketService('http://localhost:3000/tictactoe')
const { Text } = Typography

const ChatCol = styled(Col)`
  margin-top: 2rem;
  height: 25rem;
  overflow-y: scroll;
  transition: all 0.3s ease-in-out;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #98befa;
  }
`

const CCol = styled(Col)`
  margin-top: 1rem;
`

const PCol = styled(Col)`
  height: 10px;
  position: relative;
`

const ChatItem = styled.div`
  margin-top: 0.7rem;
`

const changeColor = () => {
  const colors = ['success', 'danger', 'warning']
  const random = Math.floor(Math.random() * 3)
  return colors[random]
}

function ChatBox({ user }) {
  const nameRef = useRef()
  const messageRef = createRef()
  const pickerRef = useRef()
  const chatRef = useRef()
  const [color, setColor] = useState(changeColor())
  const [isLoading, setIsLoading] = useState(false)

  const [content, setContent] = useState('')
  const [cursorPosition, setCusorPosition] = useState()
  const [isShowEmojiPicker, setIsShowEmojiPicker] = useState(false)
  const [messages, setMessages] = useState([
    // {
    //   username: "ablatrap",
    //   message: `<div><iframe width="110" height="50" src="https://www.myinstants.com//media/sounds/chat_wheel_2018_next_level.mp3" frameborder="0" scrolling="no" allow="autoplay"></iframe></div>`,
    // },
  ])

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsShowEmojiPicker(false)
        }
      }

      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [ref])
  }

  useOutsideAlerter(pickerRef)

  const onEmojiClick = (event, { emoji }) => {
    const start = content.substring(0, cursorPosition)
    const end = content.substring(cursorPosition)
    const text = start + emoji + end
    setContent(text)
    setCusorPosition(start.length + emoji.length)
  }

  const handleTextChange = (e) => {
    const ref = messageRef.current
    ref.focus()
    const position = ref.resizableTextArea.textArea.selectionStart // ref.input.selectionStart
    setCusorPosition(position)
    setContent(e.target.value)
  }

  const changeCursorPosition = () => {
    const ref = messageRef.current
    ref.focus()
    const position = ref.resizableTextArea.textArea.selectionStart // ref.input.selectionStart
    setCusorPosition(position)
  }

  const sendMessage = async () => {
    if (user.username !== '' || user.username !== null) {
      const payload = {
        username: user.username,
        message: content,
      }
      setIsLoading(true)
      socket.emit('message', payload)
      setContent('')
      setIsLoading(false)
    }
  }

  useEffect(() => {
    socket.on('message', (data) => {
      setMessages([...messages, data])
    })
  }, [messages])

  useEffect(() => {
    const ref = chatRef.current
    ref.focus()
    ref.scrollTop = 43.5 * messages.length
  }, [messages])

  return (
    <Row hidden={false}>
      <ChatCol span={20} offset={2} ref={chatRef}>
        <Text strong style={{ letterSpacing: '0.1rem', fontSize: '0.8rem' }}>
          CHATBAR
        </Text>
        {messages.map((e, i) => {
          return (
            <ChatItem key={i}>
              <Text strong type={user.username === e.username && color}>
                {e.username} {user.username}
              </Text>{' '}
              <div
                style={{ whiteSpace: 'pre-line' }}
                contentEditable='false'
                dangerouslySetInnerHTML={{ __html: e.message }}
              ></div>
            </ChatItem>
          )
        })}
      </ChatCol>
      <PCol span={20} offset={2} ref={pickerRef}>
        {isShowEmojiPicker ? <Picker onEmojiClick={onEmojiClick} /> : null}
      </PCol>
      <CCol span={20} offset={2}>
        <Space>
          <div className='chat__icon'>
            <SmileOutlined
              className='chat__icon__button'
              onClick={() => setIsShowEmojiPicker(!isShowEmojiPicker)}
              style={{
                fontSize: '150%',
              }}
            />
          </div>
          <div className='chat__wheel'>
            <PlayCircleOutlined style={{ fontSize: '150%', color: 'green' }} />
          </div>
        </Space>

        <Input.TextArea
          style={{
            marginTop: '0.5rem',
            marginBottom: '0.5rem',
            height: '2.3rem',
          }}
          value={content}
          ref={messageRef}
          onClick={changeCursorPosition}
          onChange={(e) => handleTextChange(e)}
        ></Input.TextArea>
        <Button onClick={sendMessage} type='primary' disabled={content !== '' ? false : true} loading={isLoading}>
          Send
        </Button>
      </CCol>
    </Row>
  )
}

export default ChatBox
