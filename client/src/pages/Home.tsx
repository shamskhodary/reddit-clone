import { FC } from 'react'
import { Navbar, PostsContainer } from '../components'
import { PostProvider } from '../context/postContext'

const Home:FC = () => (
  <div className="homepage">
    <PostProvider>
      {' '}
      <Navbar />
      <PostsContainer />
    </PostProvider>

  </div>
)

export default Home
