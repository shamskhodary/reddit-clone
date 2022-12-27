import { FC } from 'react'
import { RouterProvider } from 'react-router-dom'
import './App.css'
import Routes from './routes'
import ApiService from './services/ApiService'

const App:FC = () => {
  ApiService.init()
  ApiService.setHeader()

  return (
    <RouterProvider router={Routes} />
  )
}

export default App
