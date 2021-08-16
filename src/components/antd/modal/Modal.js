import React, { useState } from 'react'
import { Modal, Button, Input, Form } from 'antd'
import styled from 'styled-components'
// import moduleName from ''
const CButton = styled(Button)`
  color: green;
  border: 1px dashed green;
  margin-left: 1rem;
`

function ModalComponent({ title }) {
  const [form] = Form.useForm()
  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }
  return (
    <div>
      <CButton onClick={showModal}>{title}</CButton>
      <Modal title='Basic Modal' visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form layout='vertical' form={form}>
          <Form.Item label='Room name'>
            <Input placeholder='input placeholder' />
          </Form.Item>
          <Form.Item label='Field B'>
            <Input placeholder='input placeholder' />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default ModalComponent
