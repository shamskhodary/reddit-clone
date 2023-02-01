import { FC, useEffect, useState } from 'react'
import ISaves from '../interfaces/ISaves'
import ApiService from '../services/ApiService'
import '../styles/saves.css'
import Saves from './Saves'

const SavedContainer:FC = () => {
  const [saves, setSaves] = useState<ISaves[]>([])

  useEffect(() => {
    const allSaved = async ():Promise<void> => {
      try {
        const response = await ApiService.get('/api/v1/saves')
        if (response.status === 200) {
          setSaves(response.data)
        }
      } catch (error) {
        setSaves([])
      }
    }
    allSaved()
  }, [])

  return (
    <div className="saves">
      {saves ? saves.map((e:any, i) => (
        <Saves
          data={e}
          // eslint-disable-next-line react/no-array-index-key
          key={i}
        />
      )) : 'No posts saved'}
    </div>
  )
}

export default SavedContainer
