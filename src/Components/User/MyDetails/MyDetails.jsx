import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styles from './MyDetails.module.css'
import {Helmet} from "react-helmet";

export default function MyDetails() {
    
    const[userDetails,setUserDetails]=useState({
        createdAt: "",
        email :  "",
        name: "",
        _id: ""})
    
    async function getLoggedUserDetails(){
      let userId=  localStorage.getItem("userId");
        let {data} = await axios.get(`http://localhost:8080/api/v1/user/${userId}`).catch((err)=>{
            console.log("err",err);
        });
        // console.log("response",response);
        setUserDetails(data.User);
        // localStorage.setItem('userId',data.User._id)
    }


    useEffect(()=>{
        getLoggedUserDetails();
    })

  return (
    <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>User details</title>
            </Helmet>
    <div className="container">
        <div className="row py-5">
            <h2 className='ps-3 mb-5'>My Details</h2>
            <h5 className='mb-2'>Personal information</h5>
            <hr className='mb-5'/>

            <div className="form-group col-md-6">
                <input type="text" className={`form-control mb-3 py-2 ${styles.blueInput} rounded-pill`} disabled  id='MyDetailsName'name='name' value={userDetails?.name} />
                <label htmlFor="name" className='fw-semibold rounded'>Name</label>
            </div>

            <div className="form-group  col-md-6">
                <input type="email" className={`form-control mb-3 py-2 ${styles.blueInput} rounded-pill`} disabled  id='MyDetailsEmail'name='email' value={userDetails?.email} />
                <label htmlFor="email" className='fw-semibold rounded'>Email</label>
            </div>
        </div>
    </div>

    </>
  )
}
