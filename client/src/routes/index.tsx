import { createBrowserRouter } from 'react-router-dom'
import { SavedPosts } from '../components'
import {
  FetchNews, Profile, Home, PostDetails, Signin, Signup,
  NotFound,
} from '../pages'

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
    path: 'posts/:id',
    element: <PostDetails />,
    errorElement: <NotFound />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/saves',
    element: <SavedPosts />,
  },

])

export default Routes
