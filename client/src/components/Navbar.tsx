import { FC } from 'react'
import { Link } from 'react-router-dom'
import {
  Avatar, Typography,
  Button, Dropdown, Input, MenuProps, Space,
} from 'antd'
import { DownOutlined } from '@ant-design/icons'
import logo from '../assets/logo.png'
import '../styles/navbar.css'
import { Signin, Signup } from '../pages'
import { useAuth } from '../context/authUser'

const { Search } = Input
const { Title } = Typography

const Navbar:FC = () => {
  const auth = useAuth()
  const items: MenuProps['items'] = [
    {
      label: (
        <Button
          type="primary"
          style={{
            backgroundColor: 'transparent',
            border: 0,
            boxShadow: 'none',
            width: '100%',
            fontWeight: 700,
            color: '#000',
          }}
        >
          Profile
        </Button>
      ),
      key: 0,
    },
    {
      label: (
        <Button
          type="primary"
          style={{
            backgroundColor: 'transparent',
            border: 0,
            boxShadow: 'none',
            width: '100%',
            fontWeight: 700,
            color: '#000',
          }}
        >
          Saves
        </Button>
      ),
      key: 1,
    },
    {
      label: (
        <Button
          type="primary"
          style={{
            backgroundColor: 'transparent',
            border: 0,
            boxShadow: 'none',
            width: '100%',
            fontWeight: 700,
            color: '#000',
          }}
        >
          Log out
        </Button>
      ),
      key: 2,
    },
  ]

  return (
    <header>
      <div className="logo">
        <Link to="/"><img src={logo} alt="logo" /></Link>
      </div>
      <div className="search">
        <Search
          placeholder="Search Reddit"
      //  onSearch={onSearch}
          style={{ width: 500 }}
        />
      </div>
      <div className="registration">
        {!auth.user ? (
          <>
            <Signup />
            <Signin />

          </>

        ) : (
          <Dropdown menu={{ items }} trigger={['click']}>
            <button
              type="button"
              onClick={(e) => e.preventDefault()}
              style={{
                border: 0,
                backgroundColor: 'transparent',
                cursor: 'pointer',
              }}
            >
              <Space style={{
                alignItems: 'baseline',
              }}
              >
                <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>U</Avatar>
                <Title level={5}>username</Title>
                <DownOutlined />
              </Space>
            </button>
          </Dropdown>

        )}

      </div>
    </header>
  )
}

export default Navbar
