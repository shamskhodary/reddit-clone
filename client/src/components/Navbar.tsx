import { FC } from 'react'
import { Input } from 'antd'
import logo from '../assets/logo.png'
import '../styles/navbar.css'
import { Signin, Signup } from '../pages'

const { Search } = Input

const Navbar:FC = () => (
  <header>
    <div className="logo">
      <img src={logo} alt="logo" />
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
