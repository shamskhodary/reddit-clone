import * as yup from 'yup'

const commentSchema = yup.object({
  content: yup.string().min(3).max(200).required('This field cannot be empty'),
})

export default commentSchema
