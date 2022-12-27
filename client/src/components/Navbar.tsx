import { FC } from 'react'
import { Link } from 'react-router-dom'
import { Input } from 'antd'
import logo from '../assets/logo.png'
import '../styles/navbar.css'
import { Signin, Signup } from '../pages'

const { Search } = Input

const Navbar:FC = () => (
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
      <Signup />
      <Signin />
    </div>
  </header>
)

export default Navbar
