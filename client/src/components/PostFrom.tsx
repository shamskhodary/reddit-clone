import {
  Modal, Typography, Input, Button, Form, message,
} from 'antd'
import { useFormik } from 'formik'
import { FC } from 'react'
import ReactQuill from 'react-quill'
import { formats } from '../helpers/formats'
import ApiService from '../services/ApiService'
import addPostValidation from '../validation/addPostValidation'

const { Title } = Typography

const PostForm:FC<{open: boolean,
  setIsAdded: Function,
   setOpen: Function}> = ({ open, setOpen, setIsAdded }) => {
     const initialValues = {
       title: '',
       content: '',
       postImg: '',
     }

     const formik = useFormik({
       initialValues,
       validationSchema: addPostValidation,
       onSubmit: async (values, { resetForm }) => {
         try {
           const response = await ApiService.post('/api/v1/posts', values)
           if (response.data) {
             resetForm()
             setOpen(false)
             setIsAdded(true)
           }
         } catch (error:any) {
           message.error(error.response.data.message[0])
         }
       },
     })

     return (
       <div className="form">
         <Modal
           className="modal"
           centered
           open={open}
           onCancel={() => setOpen(false)}
           footer={null}
         >
           <Form onSubmitCapture={formik.handleSubmit}>
             <Title level={2}>Add post</Title>
             <div className="quill">
               <Form.Item
                 validateStatus={formik.touched.title && formik.errors.title ? 'error' : ''}
                 help={formik.touched.title && formik.errors.title}
               >
                 <Input
                   name="title"
                   placeholder="Title ..."
                   onChange={formik.handleChange}
                   value={formik.values.title}
                 />
               </Form.Item>
               <Form.Item
                 validateStatus={formik.touched.content && formik.errors.content ? 'error' : ''}
                 help={formik.touched.content && formik.errors.content}
               >
                 <ReactQuill
                   theme="snow"
                   formats={formats}
                // modules={modules}
                   onChange={(value) => formik.setFieldValue('content', value)}
                   value={formik.values.content}
                 />
               </Form.Item>
             </div>
             <Button type="primary" htmlType="submit">post</Button>
           </Form>

         </Modal>
       </div>

     )
   }

export default PostForm
