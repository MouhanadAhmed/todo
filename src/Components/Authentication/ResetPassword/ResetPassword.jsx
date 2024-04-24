import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import styles from './ResetPassword.module.css'
import {Helmet} from "react-helmet";

export default function ResetPassword() {

    const [loading,setLoading]=useState(false);
    const [error,setError]= useState(null);
    const navigate = useNavigate("");
    const [showPassword,setShowPassword]=useState(false);
    const [eyeBtn,setEyeBtn] = useState("fa-eye");


    let mySchema = Yup.object({
      "email":Yup.string().email("Invalid Email").required("Email is required"),
      "newPassword":Yup.string().matches(/^[A-Z][a-z0-9]{3,8}$/,"Invalid Password").required("Password is required"),
    })
  
    let formik = useFormik({
       initialValues:{ 
        "email":"",
        "newPassword":"",
       },validationSchema:mySchema,
       onSubmit:(values)=>ResetPassword(values)
    })
  
    async function ResetPassword(values){
      setLoading(true);
      setError(null);
      let {token} =await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',{
        "email":values.email,
        "newPassword":values.newPassword,
      }).catch((err)=>{
        console.log(err);
      })
      console.log(token);
    //   if(data.message === 'success'){
    // //   localStorage.setItem("userToken",data.token)
      
    //   // console.log(data.message);
        navigate('/login');
    //   setLoading(false);
  
    //   }
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
                <title>Reset Password</title>
            </Helmet>
      <div className={`containe my-5   m-auto rounded p-3 ${styles.width}`}>
        <h3 className='fw-bold mb-3'>Reset Password</h3>
  
        {error?<div className='alert alert-danger'>{error}</div>:""}
  
        <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
        <input type="email" className={`form-control rounded-pill mb-3 py-2 ${styles.blueInput} `}  placeholder='Email Address' id='email'name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        <label htmlFor="email" className='fw-semibold'>Email</label>
        </div>
        {formik.errors.email && formik.touched.email?<div className='alert alert-danger'>{formik.errors.email}</div>:"" }
  
        <div className="form-group position-relative">
        <input type={showPassword?"text":"password"} className={`form-control rounded-pill mb-3 py-2 ${styles.redInput} `} placeholder='Password' id='newPassword'name='newPassword' value={formik.values.newPassword} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        <label htmlFor="newPassword" className='fw-semibold'>Password</label>
        <i className={`far ${eyeBtn} cursor-pointer position-absolute`} id="togglePassword" onClick={()=>toggleShowPassword()}></i>
        </div>
        {formik.errors.newPassword && formik.touched.newPassword?<div className='alert alert-danger'>{formik.errors.newPassword}</div>:"" }
  
  
          <button className='btn w-100 mb-3 rounded-pill bg-prim' type='submit'>{loading?<i className='fa fa-spinner fa-spin'></i>:"Submit"}</button>
        </form>
       
      </div>
      </> )
}
