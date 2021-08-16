import { Button, Form, Input } from 'antd'
import React from 'react'

function FormComoponent() {
  const [form] = Form.useForm()

  return (
    <Form layout='vertical' form={form}>
      <Form.Item label='Field A'>
        <Input placeholder='input placeholder' />
      </Form.Item>
      <Form.Item label='Field B'>
        <Input placeholder='input placeholder' />
      </Form.Item>
      <Form.Item>
        <Button type='primary'>Submit</Button>
      </Form.Item>
    </Form>
  )
}

export default FormComoponent
