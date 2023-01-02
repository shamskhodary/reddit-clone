import {
  Button, Modal, Input, Typography, Form, message,
} from 'antd'
import { Formik } from 'formik'
import { FC, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authUser'
import { signinSchema } from '../validation'

const { Title } = Typography

const Signin:FC = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [messageApi, contextHolder] = message.useMessage()
  const navigate = useNavigate()
  const { signin } = useAuth()

  const initialValues = {
    email: '',
    password: '',
  }

  const click = (userInfo:any):void => {
    // need to be fixed
    if (userInfo.message === 'Signed in successfully') {
      messageApi.open({
        type: 'success',
        content: userInfo.message,
      })
    } else {
      messageApi.open({
        type: 'error',
        content: userInfo.message,
      })
    }
  }

  const handleSignin = async (val:{email:string, password:string}):Promise<void> => {
    const userInfo = await signin(val)
    if (userInfo.isLogged === true) {
      click(userInfo)
      setOpen(false)
      navigate('/')
    }
  }
  return (
    <>
      {contextHolder}
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
            {({
              values, setFieldValue, handleSubmit, touched, errors,
            }) => (
              <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={handleSubmit}
                autoComplete="off"
              >
                <Form.Item
                  label="Email"
                  name="email"
                  validateStatus={touched.email && errors.email ? 'error' : ''}
                  help={touched.email && errors.email}
                  rules={[{ required: true, message: 'Please input your email!' }]}
                >
                  <Input
                    value={values.email}
                    onChange={(e) => setFieldValue('email', e.target.value)}
                  />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  validateStatus={touched.password && errors.password ? 'error' : ''}
                  help={touched.password && errors.password}
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
                  <Button
                    type="primary"
                    htmlType="submit"
                  >
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            )}
          </Formik>

        </Modal>
      </div>

    </>

  )
}

export default Signin
