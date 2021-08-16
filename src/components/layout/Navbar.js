import { AppstoreOutlined, ExpandOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Col, Drawer, Row, Space } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import Text from 'antd/lib/typography/Text'

import React, { useState } from 'react'
import styled from 'styled-components'

const URow = styled(Row)`
  color: white;
  font-weight: 500;
  padding-bottom: 1rem;
  background-color: #7f53ac;
  background-image: linear-gradient(315deg, #7f53ac 0%, #647dee 74%);
`

const UCol = styled(Col)`
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
`

// const onLogout = () => {
//   localStorage.removeItem('access_token')
//   localStorage.removeItem('refresh_token')
//   setUser({
//     login: false,
//     username: '',
//     picture: '',
//     type: '',
//     email: '',
//     google: '',
//     facebook: '',
//     role: '',
//   })
// }


function Navbar({ user, onLogout }) {
  const [visible, setVisible] = useState(false)

  return (
    <URow hidden={!user.login}>
      <UCol span={22} offset={1} className='chat__user'>
        <Space>
          <Avatar shape='square' size='large' icon={<UserOutlined />} />
          <div className='chat__user__name'>{user && user.name}</div>
        </Space>
        <Space>
          <Text onClick={() => setVisible(true)} strong style={{ color: 'white' }}>
            {visible ? (
              <ExpandOutlined style={{ fontSize: '200%', cursor: 'pointer' }} />
            ) : (
              <AppstoreOutlined style={{ fontSize: '200%', cursor: 'pointer' }} />
            )}
          </Text>
        </Space>
      </UCol>
      <Drawer
        title='Setting'
        placement='top'
        width={300}
        closable={false}
        onClose={() => setVisible(false)}
        visible={visible}
        key={'left'}
      >
        <p>
          <Text type='success' strong>
            Username:{' '}
          </Text>{' '}
          {user.name}
        </p>
        <Button
          onClick={() => {
            onLogout()
            setVisible(false)
          }}
          type='dashed'
          danger
        >
          Signout
        </Button>
      </Drawer>
    </URow>
  )
}

export default Navbar
