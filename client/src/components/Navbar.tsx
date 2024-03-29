import { FC, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Avatar, Typography,
  Button, Dropdown, Input, MenuProps, Space,
} from 'antd'
import { DownOutlined } from '@ant-design/icons'
import logo from '../assets/logo.png'
import '../styles/navbar.css'
import { Signin, Signup } from '../pages'
import { useAuth } from '../context/authUser'
import ApiService from '../services/ApiService'
import { usePost } from '../context/postContext'

const { Search } = Input
const { Title } = Typography

const Navbar:FC = () => {
  const auth = useAuth()
  const [search, setSearch] = useState<string>('')
  const { setPost } = usePost()
  const navigate = useNavigate()

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
          onClick={() => navigate('/profile')}
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
          onClick={() => navigate('/saves')}
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
          onClick={() => auth.signout()}
        >
          Log out
        </Button>
      ),
      key: 2,
    },
  ]
  const [nav, setNav] = useState({})

  const scrollNavbar = ():void => {
    const windowHeight = window.scrollY
    return windowHeight > 0 ? setNav({
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10,
    })
      : setNav({})
  }

  useEffect(() => {
    window.addEventListener('scroll', scrollNavbar)

    return () => {
      window.removeEventListener('scroll', scrollNavbar)
    }
  }, [])

  const handleSearch = async ():Promise<void> => {
    if (search !== '') {
      const searched = await ApiService.get('/api/v1/search', {
        params: {
          q: search,
        },
      })
      setPost(searched.data)
    }
  }
  return (
    <header style={nav}>
      <div className="logo">
        <Link to="/"><img src={logo} alt="logo" /></Link>
      </div>
      <div className="search">
        <Search
          placeholder="Search Reddit"
          onSearch={handleSearch}
          onChange={(e) => setSearch(e.target.value)}
          value={search}
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
                <Avatar
                  style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
                  src={auth.user?.profileImg}
                />
                <Title level={5}>{auth.user?.username}</Title>
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
