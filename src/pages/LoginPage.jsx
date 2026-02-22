import React from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import { useLoginMutation } from '../service/api'

const LoginPage = () => {
  const [login] = useLoginMutation();
  const formik = useFormik({
    initialValues:{
      name:'',
      email:'',
      password:'',
      confirmPassword:''
    },
    validationSchema:Yup.object({
      name:Yup.string().max(15,'name only 15 character long').required('name must bi required'),
      email:Yup.string().email().required('email must be required'),
      password:Yup.string().min(6,"min length of password is 6 digit").required('password must be required'),
      confirmPassword:Yup.string().oneOf([Yup.ref('password')],'password must be match').required('confirm password must be required')
    }),
    onSubmit:(values,actions)=>{
      console.log(values);
      login(values)
      actions.resetForm();

    }
  })
  return (
    <form onSubmit={formik.handleSubmit}>
      <h1>Login Page</h1>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.errors.name && formik.touched.name && <p style={{color:'red'}}>{formik.errors.name}</p>}
      <label htmlFor="email">Email</label>
      <input
        type="text"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.errors.email && formik.touched.email && (
        <p style={{ color: "red" }}>{formik.errors.email}</p>
      )}
      <label htmlFor="password">Password</label>
      <input
        type="text"
        name="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.errors.password && formik.touched.password && (
        <p style={{ color: "red" }}>{formik.errors.password}</p>
      )}
      <label htmlFor="confirmPassword">Confirm Password</label>
      <input
        type="text"
        name="confirmPassword"
        value={formik.values.confirmPassword}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.errors.confirmPassword && formik.touched.confirmPassword && (
        <p style={{ color: "red" }}>{formik.errors.confirmPassword}</p>
      )}
      <button type="submit">Submit</button>
    </form>
  );
}

export default LoginPage
