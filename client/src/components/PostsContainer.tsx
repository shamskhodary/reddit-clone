import { FC, useEffect, useState } from 'react'
import Post from './Post'
import '../styles/post.css'
import ApiService from '../services/ApiService'
import IPosts from '../interfaces/IPosts'

const PostsContainer:FC = () => {
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
  console.log(post)
  return (
    <div className="posts-container">
      {post && post.map((e) => <Post post={e} />)}
    </div>
  )
}

export default PostsContainer
