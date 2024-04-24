import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import styles from '../ForgotPassword/ForgotPassword.module.css'
import {Helmet} from "react-helmet";

export default function VerifyResetCode() {
    const [loading,setLoading]=useState(false);
    const [error,setError]= useState(null);
    const navigate = useNavigate("");

    let mail = localStorage.getItem("userMail")

    
      let formik = useFormik({
         initialValues:{ 
            "resetCode":"",
         },
         onSubmit:(values)=>resetCode(values)
      })
      async function resetCode(values){
        setLoading(true);
        setError(null);
        let {data} =await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',
        {"resetCode":values.resetCode,
        }).catch((err)=> {
        //   setError(err.response.data.errors.param +": "+ err.response.data.errors.msg);
          setLoading(false);
          console.log(err);
        //   console.log(res);
          setError(data.message);
        })
        console.log(data);
        if(data.status === "Success"){
     
        // console.log(data.message);
        navigate('/resetPassword');
        setLoading(false);
    
        }else{
            // setError(err.message);
            setLoading(false);
        }
      }

  return (
    <>
              <Helmet>
                <meta charSet="utf-8" />
                <title>Verify reset code</title>
            </Helmet>
    <div className={`containe my-5 py-5  m-auto rounded p-3 ${styles.width}`}>
    <h2 className='fw-bold mb-4'>Verify Your Reset Code</h2>

    <h5>Code Sent!</h5>
    <p>We sent a verification code <span className='text-main'>{mail}</span>  enter it below.</p>
    {error?<div className='alert alert-danger'>{error}</div>:""}

    <form onSubmit={formik.handleSubmit}>
    <div className="form-group">
    <input type="tel" className={`form-control rounded-pill mb-3 py-2 ${styles.blueInput} `}  placeholder='Code' id='resetCode'name='resetCode' value={formik.values.resetCode} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
    <label htmlFor="resetCode" className='fw-semibold'>Code</label>
    </div>
    {formik.errors.resetCode && formik.touched.resetCode?<div className='alert alert-danger'>{formik.errors.resetCode}</div>:"" }




      <button className='btn w-100 mb-3 rounded-pill bg-prim' type='submit'>{loading?<i className='fa fa-spinner fa-spin'></i>:"Verify"}</button>
    </form>
   
  </div>
  </>
  )
}
