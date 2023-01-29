import { FC } from 'react'
import moment from 'moment'
import Post from './Post'
import '../styles/post.css'
import AddPost from './AddPost'
import { useAuth } from '../context/authUser'
import { usePost } from '../context/postContext'

const PostsContainer:FC = () => {
  const auth = useAuth()
  const { post, setIsAdded } = usePost()

  post.sort((a:any, b:any):any => {
    const date1 = moment(a.createdAt)
    const date2 = moment(b.createdAt)
    return +date2 - +date1
  })

  return (
    <>
      {auth.user && <AddPost setIsAdded={setIsAdded} />}
      <div className="posts-container">
        {post ? post.map((e:any) => <Post post={e} key={e.id} />) : <p>No posts found</p>}
        {post.length === 0 && <p>No posts found</p>}
      </div>
    </>
  )
}

export default PostsContainer
