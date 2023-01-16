import * as yup from 'yup'

const addPostValidation = yup.object({
  title: yup.string().required('Title field is required'),
  content: yup.string().required('Content field is required'),
  postImg: yup.string(),
})

export default addPostValidation
