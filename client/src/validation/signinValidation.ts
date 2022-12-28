import * as yup from 'yup'

const signinSchema = yup.object({
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup.string().required('Password is required'),
})

export default signinSchema
