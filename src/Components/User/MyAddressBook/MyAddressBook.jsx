import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import styles from './MyAddressBook.module.css'
import toast from 'react-hot-toast';
import { useFormik } from 'formik';
import {Helmet} from "react-helmet";

export default function MyAddressBook() {
  
  const [userAddress,setUserAddress]=useState();
  const [error,setError]= useState(null);
  const [loading,setLoading]=useState(false);

  let headers={
    token:localStorage.getItem('userToken')
}

let formik = useFormik({

  initialValues:{ 
    "name": "",
    "details": "",
    "phone": "",
    "city": ""
  },
  onSubmit:(values)=>{
    addUserAddress(values);
    setLoading(true);
 }
})


  async function getLoggedUserAddress(){
    // let {data} = await axios.get(`${baseUrl}/api/v1/addresses`,
    //  {
    //   headers
    //  }).catch((err)=>{
    //     console.log('getLoggedUserAddress Error',err.code);
    //     if (err.code === "ERR_NETWORK") {
    //         handleBaseUrl(baseUrl);
    //     }
    // });
    // console.log("data",data);
    // console.log("data length",data.data.length  );

    // setUserAddress(data.data);
    // console.log(userAddress[0].name);
    // if (data.data.length< 1) {
    //   console.log("user has no address");
    //   setUserAddress("user has no registered addresses");
    // }
    
 }
 async function removeAddress(id){
  // let resp = await axios.delete(`https://ecommerce.routemisr.com/api/v1/addresses/${id}`,
  // {
  //   headers
  // }).catch((err)=> console.log(err));
  // console.log("message",resp.data.message);
  // // getLoggedUserAddress();
  // toast.success(resp.data.message,{
  //   duration:3000,
  //   position:'top-right',
  //   style:
  //   {background:'black',
  //   color:'white'}
  // });
 }

 async function addUserAddress(values){
//   let {message} = await axios.post(`${baseUrl}/api/v1/addresses`,
//   {
//     "name": values.name,
//     "details": values.details,
//     "phone": values.phone,
//     "city": values.city
//      },
//   {
//     headers:headers
//   },
// ).catch((err)=>{
//         console.log('addUserAddress Error',err);
//         if (err.code === "ERR_NETWORK") {
//             handleBaseUrl(baseUrl);
//         }

//         if(err?.response?.status === 400){
//           setError(err?.response?.data?.errors?.msg);
//           toast.error(err.response.data.errors.msg,{
//             duration:3000,
//             position:'top-right',
//             style:
//             {background:'black',
//             color:'white'}
//           });
//         }else if (err?.response?.status === 401)
//          {setError(err?.response?.data.message);
//           toast.error(err?.response?.data.message,{
//             duration:3000,
//             position:'top-right',
//             style:
//             {background:'black',
//             color:'white'}
//           });
//         }
//     });
//     console.log("message",message);
//     toast.success(message,{
//       duration:3000,
//       position:'top-right',
//       style:
//       {background:'black',
//       color:'white'}
//     });
//     // console.log("data length",data.data.length  );
//     getLoggedUserAddress();
//     setLoading(false);

 }

 useEffect(()=>{
  // getLoggedUserAddress();
 },[])

  return (
    <>
                                          <Helmet>
                <meta charSet="utf-8" />
                <title>Address book</title>
            </Helmet>
    <div className="container">
      <div className="row py-5">
      <h3 className='mb-5'>My Address Book</h3>
      
      {userAddress?.length>=1?userAddress.map((item,index)=> <div key={index} className='row mx-auto mb-5'>
        <div className="d-flex justify-content-between  mb-3">
        <p   className='h5 pt-3'>Address {index+1}</p>
        <button className='rounded-pill bg-danger text-white  w-auto' onClick={()=>removeAddress(item._id)}>Remove address</button>
        </div>
        
        <div className="form-group col-md-6">
                <input type="text" className={`form-control mb-3 py-2 ${styles.blueInput} rounded-pill`} disabled placeholder='Address Name' id='addressName'name='addressName' value={item.name} />
                <label htmlFor="addressName" className='fw-semibold rounded'>Address Name</label>
            </div>

            <div className="form-group  col-md-6">
                <input type="text" className={`form-control mb-3 py-2 ${styles.blueInput}  rounded-pill`} disabled placeholder='details' id='details'name='details' value={item.details} />
                <label htmlFor="details" className='fw-semibold rounded'>Details</label>
            </div>

            <div className="form-group  col-md-6">
                <input type="text" className={`form-control mb-3 py-2 ${styles.blueInput}  rounded-pill`} disabled placeholder='city' id='city'name='city' value={item.city} />
                <label htmlFor="city" className='fw-semibold rounded'>City</label>
            </div>

            <div className="form-group  col-md-6">
                <input type="tel" className={`form-control mb-3 py-2 ${styles.blueInput}  rounded-pill`} disabled placeholder='phone' id='phone'name='phone' value={item.phone} />
                <label htmlFor="phone" className='fw-semibold rounded'>Phone</label>
            </div>
      </div>) : <p   className='h5 mb-3'>user has no registered addresses</p> }


      
      <form onSubmit={formik.handleSubmit}>
      <div  className='row mx-auto'>
      {error?<div className='alert alert-danger'>{error}</div>:""}
      <div className="form-group  col-md-6">
        <input type="text" className={`form-control mb-3 py-2 ${styles.darkBlueInput}  rounded-pill`} placeholder='Address Name' name='name' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        <label htmlFor="name" className='fw-semibold'>Address Name</label>
        {formik.errors.name && formik.touched.name?<div className='alert alert-danger'>{formik.errors.name}</div>:"" }
        </div>

            <div className="form-group  col-md-6">
                <input type="text" className={`form-control mb-3 py-2 ${styles.darkBlueInput}  rounded-pill`}  placeholder='details' id='details'name='details' value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                <label htmlFor="details" className='fw-semibold rounded'>Details</label>
            </div>
            {formik.errors.details && formik.touched.details?<div className='alert alert-danger'>{formik.errors.details}</div>:"" }

            <div className="form-group  col-md-6">
                <input type="text" className={`form-control mb-3 py-2 ${styles.darkBlueInput}  rounded-pill`}  placeholder='city' id='city'name='city' value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                <label htmlFor="city" className='fw-semibold rounded'>City</label>
            </div>

            <div className="form-group  col-md-6">
                <input type="tel" className={`form-control mb-3 py-2 ${styles.darkBlueInput}  rounded-pill`}  placeholder='phone' name='phone' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                <label htmlFor="phone" className='fw-semibold rounded '>Phone</label>
            </div>
            <div className="d-flex justify-content-center">
            <button className='rounded-pill bg-prim p-2  w-auto' type='submit'>{loading?<i className='fa fa-spinner fa-spin'></i>:"Add address"}</button>

            </div>
            </div>
            </form>
     


      
      </div>
    </div>
    </>
    
  )
}
