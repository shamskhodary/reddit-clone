import {
  Button, Modal, Input, Typography, Form, Select, DatePicker, DatePickerProps,
} from 'antd'
import { FC, useState } from 'react'
import { Link } from 'react-router-dom'

import '../styles/signup.css'

const { Title } = Typography
const { Option } = Select

const Signup:FC = () => {
  const [open, setOpen] = useState<boolean>(false)

  const handleChange:DatePickerProps['onChange'] = (date, dateString):void => {
    console.log(date, dateString)
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
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
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
          <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
            <Select
              placeholder="Select your gender"
              // onChange={this.onGenderChange}
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
            rules={[{ required: true, message: 'Please select your date of birth!' }]}
          >
            <DatePicker onChange={handleChange} />
          </Form.Item>
        </Form>
        <div className="redirect">
          <Typography>
            Already a redditor?
            {' '}
            <Link to="/signin">Log In</Link>
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

export default Signup
