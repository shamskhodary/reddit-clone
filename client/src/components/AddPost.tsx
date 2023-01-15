import { Avatar, Button } from 'antd'
import { FC, useState } from 'react'
import { useAuth } from '../context/authUser'
import '../styles/addPost.css'
import PostForm from './PostFrom'

const AddPost:FC<{setIsAdded: Function}> = ({ setIsAdded }) => {
  const { user } = useAuth()
  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      <div className="add">
        <div className="person">
          <Avatar src={user.profileImg} style={{ marginRight: '0.5rem', width: '35px' }} />
          <Button
            block
            style={{ width: '100%' }}
            onClick={() => setOpen(true)}
          >
            Create Post

          </Button>
        </div>
      </div>
      <PostForm open={open} setOpen={setOpen} setIsAdded={setIsAdded} />
    </>

  )
}

export default AddPost
