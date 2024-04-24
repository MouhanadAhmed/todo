import React, { useState } from 'react'
import styles from  './Register.module.css'
import { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import axios from 'axios'
import {Helmet} from "react-helmet";
import sendRegisterData from './Register.service.js';


export default function Register() {
  const [loading,setLoading]=useState(false);
  const [error,setError]= useState();
  const navigate = useNavigate();
  const [showPassword,setShowPassword]=useState(false);
  const [eyeBtn,setEyeBtn] = useState("fa-eye")


  let validationSchema = Yup.object({
    name: Yup.string().required("Name is required , hint: min 3 charcters, maximum 15 charcters").min(3,"min 3 charcters").max(15,"maximum 15 charcters"),
    email:Yup.string().email("Invalid Email").required("Email is required"),
    password:Yup.string().matches(/^[A-Z][a-z0-9]{3,8}$/,"Invalid Password").required("Password is required, hint: must start with capital letter followed by 3 to 8 letters or numbers"),
  })


  let formik = useFormik({
     initialValues:{ 
      name: "", 
      email:"",
      password:"",
     },validationSchema,
     onSubmit:(values)=>registerUser(values)
  })

  async function registerUser(values){
    setLoading(true);
    let response =await sendRegisterData(values).catch((err)=> {
      setLoading(false);
      console.log(err);
      setError(err.response.data);
    })

    if(response?.data?.status === 201){
      navigate('/login')
    setLoading(false);

    }else{
      setError(response.response.data.message);
      setLoading(false);
    }
  }

  function toggleShowPassword(){
    if(showPassword === true){
      setShowPassword(false);
      setEyeBtn("fa-eye")
    }else {
      setShowPassword(true);
      setEyeBtn("fa-eye-slash")
    };
  }


  return (
    <>
          <Helmet>
                <meta charSet="utf-8" />
                <title>Register</title>
            </Helmet>
    <div className={`container my-5  m-auto rounded p-3 ${styles.width}`}>
      <h3 className='fw-bolder h2  mx-auto mb-4 text-primary'>Create an Account.</h3>

      {error?<div className='alert alert-danger'>{error}</div>:""}

      <form onSubmit={formik.handleSubmit}>

        <div className="form-group mb-3">
        <input type="text" className={`form-control py-2 ${styles.blueInput} rounded-pill`} placeholder='Your Name ' id='name'name='name' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        <label htmlFor="name" className='fw-semibold'>Your name</label>
        </div>
        {formik.errors.name && formik.touched.name?<div className='alert alert-danger '>{formik.errors.name}</div>:"" }

      <div className="form-group">
      <input type="email" className={`form-control mb-3 py-2 ${styles.blueInput} rounded-pill`} placeholder='Email Address' id='email'name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
      <label htmlFor="email" className='fw-semibold'>Email Address</label>
      </div>
      {formik.errors.email && formik.touched.email?<div className='alert alert-danger'>{formik.errors.email}</div>:"" }

      <div className="form-group position-relative">
      <input type={showPassword?"text":"password"} className={`form-control mb-3 py-2 ${styles.redInput} rounded-pill`} placeholder='Password' id='password'name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
      <label htmlFor="password" className='fw-semibold'>Password</label>
      <i className={`far ${eyeBtn} cursor-pointer position-absolute`} id="togglePassword" onClick={()=>toggleShowPassword()}></i>
      </div>
     {formik.errors.password && formik.touched.password?<div className='alert alert-danger'>{formik.errors.password}</div>:"" }


      {loading?<button className={`${styles.button} btn w-100 mb-3 rounded-pill`} type='submit'><i className='fa fa-spinner fa-spin'></i></button>:<button disabled={!formik.isValid && formik.dirty} className='btn w-100 mb-3 bg-prim rounded-pill' type='submit'>Create Account</button>}
      </form>
      <h4 className='fs-6 border-bottom pb-3 mb-3'>By creating an account, you agree to SOPA's Conditions of Use and Privacy Notice.</h4>
      <h4 className='fs-6 pb-3'>Already have an account? <Link to="/Login" className='text-primary text-decoration-underline ms-3' >Sign in</Link> </h4>
     
    </div>
    </>
  )
}
