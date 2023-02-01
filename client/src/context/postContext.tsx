import React, {
  createContext, useState, useEffect, ReactElement, useMemo, useContext,
} from 'react'
import { IPosts } from '../interfaces'
import ApiService from '../services/ApiService'

export const postContext = createContext({})

export const PostProvider = ({ children }: {children: React.ReactNode}):ReactElement => {
  const [post, setPost] = useState<IPosts[]>([])
  const [isAdded, setIsAdded] = useState(false)
  const [mySaved, setMySaved] = useState(null)

  useEffect(() => {
    const posts = async ():Promise<void> => {
      try {
        const response = await ApiService.get('/api/v1/posts')
        setPost(response.data)
        const data = response.data.map((e:any) => e.saves[0])
        setMySaved(data)
      } catch (error) {
        setPost([])
      }
    }
    posts()
  }, [isAdded])

  const values = useMemo(() => ({
    post,
    setIsAdded,
    setPost,
    mySaved,
  }), [post, mySaved])

  return (
    <postContext.Provider value={values}>
      {children}
    </postContext.Provider>
  )
}

export const usePost = ():any => useContext(postContext)
