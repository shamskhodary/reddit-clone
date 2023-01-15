import { FC, useEffect, useState } from 'react'
import Post from './Post'
import '../styles/post.css'
import ApiService from '../services/ApiService'
import IPosts from '../interfaces/IPosts'
import AddPost from './AddPost'
import { useAuth } from '../context/authUser'

const PostsContainer:FC = () => {
  const auth = useAuth()
  const [post, setPost] = useState<IPosts[]>([])
  const [isAdded, setIsAdded] = useState(false)

  useEffect(() => {
    const posts = async ():Promise<void> => {
      try {
        const response = await ApiService.get('/api/v1/posts')
        setPost(response.data)
      } catch (error) {
        setPost([])
      }
    }
    posts()
  }, [isAdded])

  return (
    <>

      {auth.user && <AddPost setIsAdded={setIsAdded} />}
      <div className="posts-container">
        {post && post.map((e) => <Post post={e} key={e.id} />)}
      </div>
    </>
  )
}

export default PostsContainer
