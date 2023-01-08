import {
  Modal, Typography, Input, Button,
} from 'antd'
import { FC } from 'react'
import ReactQuill from 'react-quill'
import { formats, modules } from '../helpers/formats'

const { Title } = Typography

const PostForm:FC<{open: boolean, setOpen: Function}> = ({ open, setOpen }) => (
  <div className="form">
    <Modal
      className="modal"
      centered
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
    >
      <Title level={2}>Add post</Title>
      <div className="quill">
        <Input placeholder="Title ..." />
        <ReactQuill
          theme="snow"
          formats={formats}
          modules={modules}
        />
      </div>
      <Button>post</Button>
    </Modal>
  </div>

)

export default PostForm
