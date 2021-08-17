import React, { createRef, useEffect, useRef, useState } from 'react'
import { FacebookOutlined } from '@ant-design/icons'
import { Button, Col, Input, Row, Space, Form } from 'antd'
import Text from 'antd/lib/typography/Text'
import userApi from 'api/queries/userApi'
import googleApi from 'api/socials/googleApi'
import GoogleLogin from 'react-google-login'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { user_signin } from 'store/action/user.action'
import { useHistory } from 'react-router-dom'

const CForm = styled(Form)`
  margin-top: 1rem;
`

const FButton = styled(Button)`
  margin-left: 1rem;
  height: 40px;
`

function SignIn() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const formRef = createRef()
  const history = useHistory()
  const isLogin = useSelector((state) => state.user.login)
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const checkLogin = () => {
      if (isLogin) {
        history.push('/')
      }
    }

    checkLogin()
  }, [isLogin])

  const responseGoogle = async (response) => {
    try {
      const { tokenId } = response
      const { access_token, refresh_token } = await googleApi.Login(tokenId)
      localStorage.setItem('access_token', access_token)
      localStorage.setItem('refresh_token', refresh_token)
      getUser(access_token)
      history.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  const getUser = async (access_token) => {
    if (access_token) {
      const user = await userApi.GetProfile(access_token)
      if (user) {
        const { email, picture, name, facebookId, googleId, role, type } = user
        const payload = {
          profile: {
            email,
            picture,
            name,
            facebook: facebookId,
            google: googleId,
            role: role.name,
            type: type.name,
            login: true,
          },
          login: true,
        }

        console.log(payload)
        dispatch(user_signin(payload))
      }
    }
  }

  const onSubmit = async () => {
    try {
      const eRef = emailRef.current
      const pRef = passwordRef.current
      eRef.focus()
      pRef.focus()
      const password = pRef.state.value
      const email = eRef.state.value
      const { access_token, refresh_token } = await userApi.LocalSignIn(email, password)
      localStorage.setItem('access_token', access_token)
      localStorage.setItem('refresh_token', refresh_token)
      getUser(access_token)
      history.push('/')
      formRef.current.resetFields()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Row>
      <Col span={22} offset={1}>
        <CForm layout='vertical' ref={formRef} onFinish={onSubmit}>
          <Form.Item
            label='Email'
            name='email'
            required
            rules={[
              {
                required: true,
                message: 'Email is required',
              },
            ]}
          >
            <Input placeholder='input placeholder' name='username' ref={emailRef} autoComplete='off' />
          </Form.Item>
          <Form.Item
            label='Password'
            name='password'
            required
            rules={[
              {
                required: true,
                message: 'Password is required',
              },
            ]}
          >
            <Input type='password' placeholder='input placeholder' ref={passwordRef} autoComplete='off' />
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
