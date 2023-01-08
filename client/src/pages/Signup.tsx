import {
  Button, Modal, Input, Typography, Form, Select, DatePicker, notification,
} from 'antd'
import { FC, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Formik } from 'formik'
import dayjs from 'dayjs'
import { signupSchema } from '../validation'
import { useAuth } from '../context/authUser'
import { IFormValues } from '../interfaces'

const { Title } = Typography
const { Option } = Select

const Signup:FC = () => {
  const [open, setOpen] = useState<boolean>(false)
  const navigate = useNavigate()
  const { signup } = useAuth()

  const initialValues:IFormValues = {
    username: '',
    email: '',
    password: '',
    gender: '',
    dateOfBirth: '',
  }

  const handleSubmitting = async (val:IFormValues):Promise<void> => {
    const userInfo = await signup(val)
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
    <div className="signup-page">
      <Button
        type="primary"
        onClick={() => setOpen(true)}
        style={{
          backgroundColor: '#edeff1',
          borderRadius: '1.5rem',
          padding: '0.3rem 2rem',
          height: 'auto',
          fontWeight: 700,
          color: '#000',
        }}
      >
        Sign Up

      </Button>
      <Modal
        className="modal"
        centered
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <Title level={2}>Sign Up</Title>
        <Formik
          initialValues={initialValues}
          validationSchema={signupSchema}
          onSubmit={handleSubmitting}
        >
          {({
            values, handleSubmit, setFieldValue, touched, errors,
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
                label="Username"
                name="username"
                validateStatus={touched.username && errors.username ? 'error' : ''}
                help={touched.username && errors.username}
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input
                  value={values.username}
                  onChange={(e) => setFieldValue('username', e.target.value)}
                />
              </Form.Item>

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
              <Form.Item
                name="gender"
                label="Gender"
                rules={[{ required: true, message: 'Please select your gender!' }]}
                validateStatus={touched.gender && errors.gender ? 'error' : ''}
                help={touched.gender && errors.gender}
              >
                <Select
                  placeholder="Select your gender"
                  value={values.gender}
                  onChange={(gender:string) => setFieldValue('gender', gender)}
                  allowClear
                >
                  <Option value="male">male</Option>
                  <Option value="female">female</Option>
                  <Option value="other">other</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Date of birth"
                name="date of birth"
                validateStatus={touched.dateOfBirth && errors.dateOfBirth ? 'error' : ''}
                help={touched.dateOfBirth && errors.dateOfBirth}
                rules={[{ required: true, message: 'Please select your date of birth!' }]}
              >
                <DatePicker
                  value={dayjs(values.dateOfBirth)}
                  onChange={(date, dateString) => setFieldValue('dateOfBirth', dateString)}
                />
              </Form.Item>

              <div className="redirect">
                <Typography>
                  Already a redditor?
                  {' '}
                  <Link to="/signin">Log In</Link>
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
  )
}

export default Signup
