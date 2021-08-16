import { Button, Col, Row } from 'antd'
import Form from 'antd/lib/form/Form'
import userApi from 'api/queries/userApi'
import googleApi from 'api/socials/googleApi'
import React, { useRef, useState } from 'react'
import styled from 'styled-components'

const CForm = styled(Form)`
  margin-top: 1rem;
`

const FButton = styled(Button)`
  margin-left: 1rem;
  height: 40px;
`

function SignIn({ user }) {
  const nameRef = useRef()
  const [isLoading, setIsLoading] = useState(false)

  const responseGoogle = async (response) => {
    const { tokenId } = response
    const { access_token, refresh_token } = await googleApi.Login(tokenId)
    getUser(access_token)
    localStorage.setItem('access_token', access_token)
    localStorage.setItem('refresh_token', refresh_token)
  }

  const getUser = async (access_token) => {
    if (access_token) {
      const user = await userApi.GetProfile(access_token)
      if (user) {
        const { email, picture, name, facebookId, googleId, role, type } = user
        const payload = {
          email,
          picture,
          name,
          facebook: facebookId,
          google: googleId,
          role: role.name,
          type: type.name,
          login: true,
        }
        setUser(payload)
      }
    }
  }

  const onSubmit = () => {
    setTimeout(() => {
      setUser({
        username: nameRef.current['state']['value'],
        login: true,
        imageUrl: '',
        role: 'user',
        type: 'guest',
      })
      nameRef.current.value = ''
    }, 1000)
  }

  return (
    <Row hidden={user.login || pageLoading}>
      <Col span={22} offset={1}>
        <CForm layout='vertical' onFinish={onSubmit}>
          <Form.Item
            label='Username'
            name='username'
            required
            rules={[
              {
                required: true,
                message: 'Username is not correct',
                pattern: new RegExp(/^[a-zA-Z][a-zA-Z0-9.,$;]{6,15}$/g),
              },
            ]}
          >
            <Input placeholder='input placeholder' name='username' ref={nameRef} autoComplete='off' />
          </Form.Item>
          <Button type='dashed' htmlType='submit' loading={isLoading}>
            Join
          </Button>
        </CForm>
        <div style={{ marginTop: '1rem' }}>
          <Text>Đăng nhập với tài khoản xã hội</Text>
        </div>
        <Space style={{ marginTop: '1rem' }}>
          <GoogleLogin
            className='google__btn'
            clientId='1038070199091-2ru1vnihm48p1qkj2d4bhc0j7e8rbqo3.apps.googleusercontent.com'
            buttonText={`Google`}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
          <FButton type='dashed'>
            <FacebookOutlined /> Facebook
          </FButton>
        </Space>
      </Col>
    </Row>
  )
}

export default SignIn
