import { FC } from 'react'
import { Navbar, PostsContainer } from '../components'

const Home:FC = () => (
  <div className="homepage">
    <Navbar />
    <PostsContainer />
  </div>
)

export default Home
