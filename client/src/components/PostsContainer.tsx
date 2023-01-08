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
  }, [])

  return (
    <>

      {auth.user && <AddPost />}
      <div className="posts-container">
        {post && post.map((e) => <Post post={e} key={e.id} />)}
      </div>
    </>
  )
}

export default PostsContainer
