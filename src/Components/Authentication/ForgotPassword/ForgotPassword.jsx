import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { useFormik } from 'formik';
import styles from './ForgotPassword.module.css'
import {Helmet} from "react-helmet";

export default function ForgotPassword() {

    const [loading,setLoading]=useState(false);
    const [error,setError]= useState(null);
    const navigate = useNavigate("");
  
    let mySchema = Yup.object({
      email:Yup.string().email("Invalid Email").required("Email is required"),
    })
  
    let formik = useFormik({
       initialValues:{ 
        email:"",
       },validationSchema:mySchema,
       onSubmit:(values)=>reset(values)
    })
    async function reset(values){
      setLoading(true);
      setError(null);
      let response =await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',values).catch((err)=> {
        // setError(err.response.data.errors.param +": "+ err.response.data.errors.msg);
        setLoading(false);
        setError(err.response.data.message);
      })
      console.log(response);
      let mail =formik.values.email;
      console.log(mail, typeof response.config.data);
      if(response.data.statusMsg === 'success'){
        localStorage.setItem("userMail",mail)
      console.log(response.data.statusMsg);
        navigate('/verifyResetCode');
      setLoading(false);
  
      }
    }
  return (
    <>
          <Helmet>
                <meta charSet="utf-8" />
                <title>Forgot Password</title>
            </Helmet>
    <div className={`containe my-5 py-5  m-auto rounded p-3 ${styles.width}`}>
    <h3 className='fw-bold mb-3'>Reset your Password</h3>

    {error?<div className='alert alert-danger'>{error}</div>:""}

    <form onSubmit={formik.handleSubmit}>
    <div className="form-group">
    <input type="email" className={`form-control mb-3 py-2 ${styles.blueInput} rounded-pill`}  placeholder='Email Address' id='email'name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
    <label htmlFor="email" className='fw-semibold'>Email</label>
    </div>
    {formik.errors.email && formik.touched.email?<div className='alert alert-danger'>{formik.errors.email}</div>:"" }




      <button className='btn w-100 mb-3 rounded-pill bg-prim' type='submit'>{loading?<i className='fa fa-spinner fa-spin'></i>:"Send code to your email"}</button>
    </form>
   
  </div>
  </>
  )
}
