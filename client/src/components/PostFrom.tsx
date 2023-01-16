import {
  Modal, Typography, Input, Button, Form, message, Upload,
} from 'antd'
import { useFormik } from 'formik'
import { FC, useState } from 'react'
import ReactQuill from 'react-quill'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'
import ImgCrop from 'antd-img-crop'
import { PlusOutlined } from '@ant-design/icons'
import { formats } from '../helpers/formats'
import ApiService from '../services/ApiService'
import { addPostValidation } from '../validation'

const { Title } = Typography

const PostForm:FC<{open: boolean,
  setIsAdded: Function,
   setOpen: Function}> = ({ open, setOpen, setIsAdded }) => {
     const [fileList, setFileList] = useState<UploadFile[]>()
     const [previewOpen, setPreviewOpen] = useState(false)
     const [previewImage, setPreviewImage] = useState('')
     const [previewTitle, setPreviewTitle] = useState('')
     const initialValues = {
       title: '',
       content: '',
       postImg: '',
     }

     const getBase64 = (file: any):
      Promise<string> => new Promise((resolve, reject) => {
       const reader = new FileReader()
       reader.readAsDataURL(file)
       reader.onload = () => resolve(reader.result as string)
       reader.onerror = (error) => reject(error)
     })

     const formik = useFormik({
       initialValues,
       validationSchema: addPostValidation,
       onSubmit: async (values, { resetForm }) => {
         //  values.postImg = fileList[0]?.originFileObj as string
         if (fileList && fileList.length > 0) {
           const file = fileList[0].originFileObj
           getBase64(file).then((url) => values.postImg === url)
         }
         try {
           const response = await ApiService.post('/api/v1/posts', values, {
             headers: { 'Access-Control-Allow-Origin': '*' },
           })
           if (response.data) {
             setOpen(false)
             setIsAdded(true)
             resetForm()
           }
         } catch (error:any) {
           message.error(error.response.data.message[0])
         }
       },
     })

     const handleImage:UploadProps['onChange'] = ({ fileList: newFileList }) => {
       setFileList(newFileList)
     }

     const handlePreview = async (file: UploadFile):Promise<void> => {
       if (!file.url && !file.preview) {
         file.preview = await getBase64(file.originFileObj as RcFile)
       }

       setPreviewImage(file.url || (file.preview as string))
       setPreviewOpen(true)
       setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1))
     }
     const handleCancel = ():void => setPreviewOpen(false)

     const uploadButton = (
       <div>
         <PlusOutlined />
         <div style={{ marginTop: 8 }}>Upload</div>
       </div>
     )
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
                  //  modules={modules}
                   onChange={(val) => formik.setFieldValue('content', val)}
                   value={formik.values.content}
                 />
               </Form.Item>
               <Form.Item>
                 <ImgCrop rotate>
                   <Upload
                     action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                     listType="picture-card"
                     onPreview={handlePreview}
                     fileList={fileList}
                     onChange={handleImage}
                   >
                     {fileList ? '+ Upload' : uploadButton}
                   </Upload>
                 </ImgCrop>
               </Form.Item>
             </div>
             <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
               <img alt="example" style={{ width: '100%' }} src={previewImage} />
             </Modal>
             <Button type="primary" htmlType="submit">post</Button>
           </Form>

         </Modal>
       </div>

     )
   }

export default PostForm

// modules={{
//   toolbar: [['bold', 'italic', 'image']],
//   imageUploader: {
//     upload: (file:any) => new Promise((resolve, reject) => {
//       const formData = new FormData()
//       formData.append('image', file)

//       fetch(
//         'https://api.imgbb.com/1/upload?key=d36eb6591370ae7f9089d85875e56b22',
//         {
//           method: 'POST',
//           body: formData,
//         },
//       )
//         .then((response) => response.json())
//         .then((result) => {
//           console.log(result)
//           resolve(result.data.url)
//         })
//         .catch((error) => {
//           reject(error)
//           console.error('Error:', error)
//         })
//     }),
//   },
// }}
