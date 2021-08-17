import { AppstoreOutlined, ExpandOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Col, Drawer, Row, Space, Switch } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import Text from 'antd/lib/typography/Text'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { user_signout } from 'store/action/user.action'
import styled from 'styled-components'

const URow = styled(Row)`
  position: fixed;
  width: 100vw;
  bottom: 0;

  color: white;
  font-weight: 500;
  padding-bottom: 1rem;
  /* background-color: #ffab48;
  background-image: linear-gradient(315deg, #db8f55 0%, #ffab48 74%); */
  background-color: #7f53ac;
  background-image: linear-gradient(315deg, #7f53ac 0%, #647dee 74%);
  /* background-color: #0093e9;
  background-image: linear-gradient(160deg, #0093e9 0%, #80d0c7 100%); */
`

const UCol = styled(Col)`
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
`

function Navbar() {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const history = useHistory()
  const [visible, setVisible] = useState(false)
  const onLogout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    dispatch(user_signout())
    history.push('/')
  }

  console.log(user)

  return (
    <URow>
      <UCol span={22} offset={1} className='chat__user'>
        <Space>
          <Avatar hidden={!user.login} shape='square' size='large' icon={<UserOutlined />} />
          <div className='chat__user__name'>{user && user['profile']['name']}</div>
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
        placement='left'
        width={300}
        closable={false}
        onClose={() => setVisible(false)}
        visible={visible}
        key={'left'}
      >
        <p></p>
        <p>
          <Link to='/'>Home</Link>
        </p>
        <p>
          <Switch
            checkedChildren='Dark mode'
            unCheckedChildren='Light mode'
            onChange={(checked) => console.log(checked)}
          />
        </p>
        <Button
          hidden={!user.login}
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
