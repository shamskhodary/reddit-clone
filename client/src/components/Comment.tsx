import { FC, useState } from 'react'
import { Form, Button, message } from 'antd'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import '../styles/details.css'
import { useFormik } from 'formik'
import { useParams } from 'react-router-dom'
import { commentSchema } from '../validation'
import ApiService from '../services/ApiService'
import AllComments from './AllComments'

const Comments:FC = () => {
  const [isCommented, setIsCommented] = useState(false)
  const { id } = useParams()

  const initialValues:{content: string} = {
    content: '',
  }

  const formik = useFormik({
    initialValues,
    validationSchema: commentSchema,
    onSubmit: async (values:{content: string}, { resetForm }):Promise<void> => {
      try {
        const response = await ApiService.post(`/api/v1/posts/${id}/comments`, values)
        if (response.status === 200) {
          setIsCommented(true)
          resetForm()
        }
      } catch (error:any) {
        if (error.response.status === 401) {
          message.error(error.response.data.message)
        }
      }
    },
  })

  return (
    <div className="comments">
      <Form
        style={{ width: '100%' }}
        onSubmitCapture={formik.handleSubmit}
      >
        <Form.Item
          validateStatus={formik.touched.content && formik.errors.content ? 'error' : ''}
          help={formik.touched.content && formik.errors.content}
        >
          <ReactQuill
            theme="snow"
            placeholder="Enter your comment here..."
            value={formik.values.content}
            onChange={(value) => formik.setFieldValue('content', value)}
          />
        </Form.Item>
        <Button type="primary" htmlType="submit">comment</Button>
      </Form>
      <AllComments isCommented={isCommented} />
    </div>
  )
}

export default Comments
