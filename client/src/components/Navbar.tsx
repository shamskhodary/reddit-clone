import { FC } from 'react'
import { Link } from 'react-router-dom'
import { Button, Input } from 'antd'
import logo from '../assets/logo.png'
import '../styles/navbar.css'
import { Signin, Signup } from '../pages'
import { useAuth } from '../context/authUser'

const { Search } = Input

const Navbar:FC = () => {
  const auth = useAuth()
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
          <Button
            type="primary"
            style={{
              backgroundColor: '#edeff1',
              borderRadius: '1.5rem',
              padding: '0.3rem 2rem',
              height: 'auto',
              fontWeight: 700,
              color: '#000',
            }}
          >
            Log out

          </Button>
        )}

      </div>
    </header>
  )
}

export default Navbar
