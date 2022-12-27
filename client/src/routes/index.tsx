import { createBrowserRouter } from 'react-router-dom'
import { Post } from '../components'
import { FetchNews, Profile } from '../pages'
import Home from '../pages/Home'
import NotFound from '../pages/NotFound'
import Signin from '../pages/Signin'
import Signup from '../pages/Signup'

const Routes = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [{
      path: '/news',
      element: <FetchNews />,
    }],
    errorElement: <NotFound />,
  },
  {
    path: '/signup',
    element: <Signup />,
    errorElement: <NotFound />,
  },
  {
    path: '/signin',
    element: <Signin />,
    errorElement: <NotFound />,
  },
  {
    path: '/user',
    element: <Profile />,
    errorElement: <NotFound />,
  }, {
    path: 'post/:id',
    element: <Post />,
    errorElement: <NotFound />,
  },
])

export default Routes
