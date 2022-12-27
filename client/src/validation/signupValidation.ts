import * as yup from 'yup'

const signupSchema = yup.object({
  username: yup.string().min(3, 'Username must be at least 3 characters long')
    .required('Username is required'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup.string()
    .min(6, 'Password should be of minimum 6 characters length')
    .required('Password is required'),
  gender: yup.string().oneOf(['male', 'female', 'other']).required('Gender is required'),
  dateOfBirth: yup.date().required('Date of birth is required'),

})

export default signupSchema
