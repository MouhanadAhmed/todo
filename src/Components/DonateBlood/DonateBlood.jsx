import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import styles from './DonateBlood.module.css'

export default function DonateBlood() {
    const [loading,setLoading]=useState(false);
    const [error,setError]= useState(null);


    let headers={
        token:localStorage.getItem('userToken')
    }
    
    let mySchema = Yup.object({
        type:Yup.string().optional(),
        city:Yup.string().required("city is required"),
      })
    
      let formik = useFormik({
         initialValues:{ 
            type:"",
          city:"",
         },validationSchema:mySchema,
         onSubmit:(values)=>{
          donate(values);
        //   localStorage.setItem("userMail",values.email);
        }
      })
      async function donate(values){
        setLoading(true);
        setError(null);
        let response =await axios.post('http://localhost:8080/api/v1/blood',values,{headers:headers}).catch((err)=> {
          // setError(err.response.data.errors.param +": "+ err.response.data.errors.msg);
          setLoading(false);
          setError(err?.response?.data?.message);
          console.log(err)
        })
        console.log(response?.data);
        if(response?.data?.message === 'Success'){
        // localStorage.setItem("userToken",response?.data?.token)
        // saveUserData( );
        // console.log(data.message);
        //   navigate('/');
        setLoading(false);
    
        }
      }
  return (
    <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Donate Blood</title>
            </Helmet>
            <div className={`container  ${styles.width}`}>
                <div className="row py-5">
                <h2 className='ps-3 mb-5'>Donate Blood</h2>

                {error?<div className='alert alert-danger'>{error}</div>:""}

<form onSubmit={formik.handleSubmit} className='w-100'>
<div className="form-group">
<input type="text" className={`form-control mb-3 py-2 ${styles.blueInput} rounded-pill`}  placeholder='Blood type' id='type'name='type' value={formik.values.type} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
<label htmlFor="type" className='fw-semibold'>Blood type</label>
</div>
{formik.errors.type && formik.touched.type?<div className='alert alert-danger'>{formik.errors.type}</div>:"" }

<div className="form-group  position-relative">
<input type="text" className={`form-control mb-3 py-2 ${styles.redInput}  rounded-pill`} placeholder='City' id='city'name='city' value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
<label htmlFor="city" className='fw-semibold'>City</label>


</div>
{formik.errors.city && formik.touched.city?<div className='alert alert-danger'>{formik.errors.city}</div>:"" }


  <button className='btn w-100 mb-3  rounded-pill bg-prim' type='submit'>{loading?<i className='fa fa-spinner fa-spin'></i>:"Submit"}</button>
</form>
                </div>
            </div>
    </>
  )
}
