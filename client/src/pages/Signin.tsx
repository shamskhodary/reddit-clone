import {
  Button, Modal, Input, Typography, Form,
} from 'antd'
import { FC, useState } from 'react'

import { Link } from 'react-router-dom'

const { Title } = Typography

const Signin:FC = () => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <div className="signin-page">
      <Button
        type="primary"
        onClick={() => setOpen(true)}
        style={{
          backgroundColor: '#F54708',
          borderRadius: '1.5rem',
          padding: '0.3rem 2rem',
          height: 'auto',
          fontWeight: 700,
        }}
      >
        Log In

      </Button>
      <Modal
        className="modal"
        centered
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <Title level={2}>Log In</Title>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
      // onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
        <div className="redirect">
          <Typography>
            New to Reddit?
            {' '}
            <Link to="/signup">Sign Up</Link>
          </Typography>
        </div>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Modal>
    </div>
  )
}

export default Signin
