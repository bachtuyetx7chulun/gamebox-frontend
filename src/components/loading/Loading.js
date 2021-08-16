import { LoadingOutlined } from '@ant-design/icons'
import React from 'react'
import { FCDiv } from '../styled/Div.styled'

function Loading({ isLoading }) {
  return (
    <FCDiv style={{ marginTop: '2rem' }} hidden={!isLoading}>
      <img src='https://cdn.dribbble.com/users/1186261/screenshots/3718681/_______.gif' />
    </FCDiv>
  )
}

export default Loading
