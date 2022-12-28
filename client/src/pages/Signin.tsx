import {
  Button, Modal, Input, Typography, Form, notification,
} from 'antd'
import { Formik } from 'formik'
import { FC, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authUser'
import signinSchema from '../validation/signinValidation'

const { Title } = Typography

const Signin:FC = () => {
  const [open, setOpen] = useState<boolean>(false)
  const navigate = useNavigate()
  const { signin } = useAuth()

  const initialValues = {
    email: '',
    password: '',
  }

  const handleSignin = async (val:object):Promise<void> => {
    const userInfo = await signin(val)
    if (userInfo.isLogged === true) {
      setOpen(false)
      navigate('/')
    } else if (userInfo.err) {
      notification.error({
        message: 'Error',
        description: userInfo.err,
      })
    }
  }

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
        <Formik
          initialValues={initialValues}
          validationSchema={signinSchema}
          onSubmit={handleSignin}
        >
          {({ values, setFieldValue, handleSubmit }) => (
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              onFinish={handleSubmit}
              autoComplete="off"
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input
                  value={values.email}
                  onChange={(e) => setFieldValue('email', e.target.value)}
                />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password
                  value={values.password}
                  onChange={(e) => setFieldValue('password', e.target.value)}
                />
              </Form.Item>

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
            </Form>
          )}
        </Formik>

      </Modal>
    </div>
  )
}

export default Signin
