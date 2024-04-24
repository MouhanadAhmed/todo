import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import styles from './Login.module.css'
import {Helmet} from "react-helmet";

export default function Login({saveUserData}) {

  const [loading,setLoading]=useState(false);
  const [error,setError]= useState(null);
  const navigate = useNavigate("");
  const [showPassword,setShowPassword]=useState(false);
  const [eyeBtn,setEyeBtn] = useState("fa-eye")


  let mySchema = Yup.object({
    email:Yup.string().email("Invalid Email").required("Email is required"),
    password:Yup.string().required("Password is required"),
  })

  let formik = useFormik({
     initialValues:{ 
      email:"",
      password:"",
     },validationSchema:mySchema,
     onSubmit:(values)=>{
      login(values);
      localStorage.setItem("userMail",values.email);
    }
  })

  async function login(values){
    setLoading(true);
    setError(null);
    let response =await axios.post('http://localhost:8080/api/v1/auth/SignIn',values).catch((err)=> {
      // setError(err.response.data.errors.param +": "+ err.response.data.errors.msg);
      setLoading(false);
      setError(err?.response?.data?.message);
      console.log(err)
    })
    console.log(response?.data);
    if(response?.data?.message === 'Success'){
    localStorage.setItem("userToken",response?.data?.token)
    saveUserData( );
    // console.log(data.message);
      navigate('/');
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

  return (<>
      <Helmet>
                <meta charSet="utf-8" />
                <title>Login</title>
            </Helmet>
    <div className={`containe my-5   m-auto rounded p-3 ${styles.width}`}>
      <h3 className='fw-bold mb-3'>Sign in</h3>

      {error?<div className='alert alert-danger'>{error}</div>:""}

      <form onSubmit={formik.handleSubmit} className='w-100'>
      <div className="form-group">
      <input type="email" className={`form-control mb-3 py-2 ${styles.blueInput} rounded-pill`}  placeholder='Email Address' id='email'name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
      <label htmlFor="email" className='fw-semibold'>Email</label>
      </div>
      {formik.errors.email && formik.touched.email?<div className='alert alert-danger'>{formik.errors.email}</div>:"" }

      <div className="form-group  position-relative">
      <input type={showPassword?"text":"password"} className={`form-control mb-3 py-2 ${styles.redInput}  rounded-pill`} placeholder='Password' id='password'name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
      <label htmlFor="password" className='fw-semibold'>Password</label>
      
      <i className={`far ${eyeBtn} cursor-pointer position-absolute`} id="togglePassword" onClick={()=>toggleShowPassword()}></i>
      
      </div>
      {formik.errors.password && formik.touched.password?<div className='alert alert-danger'>{formik.errors.password}</div>:"" }


        <button className='btn w-100 mb-3  rounded-pill bg-prim' type='submit'>{loading?<i className='fa fa-spinner fa-spin'></i>:"Sign in"}</button>
      </form>
      <h4 className='fs-6 pb-3'><Link to="/forgotPassword" className='text-primary  ms-2' >Forgot your password?</Link> </h4>
      <hr />
      {/* <h4 className='fs-6 border-bottom pb-3 mb-3'>By creating an account, you agree to Amazon's Conditions of Use and Privacy Notice.</h4> */}
      <h4 className='fs-6 pb-3'>New to SOPA?<Link to="/register" className='text-primary text-decoration-underline ms-2' >Create an Account</Link> </h4>
     
    </div>
    </> )
}
