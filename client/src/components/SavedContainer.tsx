import { FC, useEffect, useState } from 'react'
import ISaves from '../interfaces/ISaves'
import ApiService from '../services/ApiService'
import '../styles/saves.css'
import Saves from './Saves'

const SavedContainer:FC = () => {
  const [saves, setSaves] = useState<ISaves[]| null>(null)

  useEffect(() => {
    const allSaved = async ():Promise<void> => {
      try {
        const response = await ApiService.get('/api/v1/saves')
        if (response.status === 200) {
          setSaves(response.data)
        }
      } catch (error) {
        setSaves(null)
      }
    }
    allSaved()
  }, [])

  return (
    <div className="saves">
      {saves && saves.map((e:any) => <Saves data={e} key={e.id} />)}
    </div>
  )
}

export default SavedContainer
