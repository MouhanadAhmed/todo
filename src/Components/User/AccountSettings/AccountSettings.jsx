import React, { useEffect, useState } from 'react'
import styles from './AccountSettings.module.css'
import axios from 'axios'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import toast from 'react-hot-toast';
import {Helmet} from "react-helmet";


export default function AccountSettings() {

  const[userDetails,setUserDetails]=useState({
    createdAt: "",
    email :  "",
    name: "",
    _id: ""})
  const [showPassword,setShowPassword]=useState(false);
  const [eyeBtn,setEyeBtn] = useState("fa-eye");
  const [loading,setLoading]=useState(false);
  const [error,setError]= useState(null);
  const [phoneInput,showPhoneInput]=useState("d-none");
  const [updateBtnText,setUpdateBtnText] = useState("Update personal information");
  const [isDisabled,setIsDisabled] = useState('disabled');

  let headers={
    token:localStorage.getItem('userToken')
}

  let validationSchema = Yup.object({
    name: Yup.string().required("Name is required").min(3,"min 3 charcters").max(15,"maximum 15 charcters"),
    email:Yup.string().email("Invalid Email").required("Email is required"),
    phone:Yup.string().required("Phone is required").matches(/^01[0125][0-9]{8}$/,"Invalid Phone"),
  })

  let validationSchema2 = Yup.object({
    currentPassword:Yup.string().matches(/^[A-Z][a-z0-9]{3,8}$/,"Invalid Password").required("current Password is required"),
    password:Yup.string().matches(/^[A-Z][a-z0-9]{3,8}$/,"Invalid Password").required("Password is required"),
    rePassword:Yup.string().required("Password is required").oneOf([Yup.ref('password')],"RePassword must match password"),
  })

  let formik = useFormik({
    initialValues:{ 
     name: "", 
     email:"",
     city:""
    },validationSchema,
    onSubmit:(values)=>updateLoggedUserData(values)
 });

 let formik2 = useFormik({
  initialValues:{ 
    "currentPassword":"",
    "password":"",
    "rePassword":""
  },validationSchema2,
  onSubmit:(values)=>updateLoggedUserPassword(values)
});

 async function updateLoggedUserData(values){
  setLoading(true);
  // setError(null);
  let response =await axios.put('http://localhost:8080/api/v1/auth/updateMe',{
    "name": values.name,
    "email": values.email,
    "city": values.city
  },{
    headers
  }).catch((err)=> {
    // setError(err.response.data.errors.param +": "+ err.response.data.errors.msg);
    setLoading(false);
    console.log(err);
    toast.error(err.response.data.errors.msg,{
      duration:3000,
      position:'top-right',
      style:
      {background:'black',
      color:'white'}
    });
    setError(err.response.data.message);
  })
  console.log(response);
  if(response?.message === 'success'){
  
  toast.success(response.message,{
    duration:3000,
    position:'top-right',
    style:
    {background:'black',
    color:'white'}
  });
  setLoading(false);

  }
}

async function updateLoggedUserPassword(values){
  setLoading(true);
  // setError(null);
  let response =await axios.put('https://route-ecommerce.onrender.com/api/v1/users/changeMyPassword',{
    "currentPassword": values.currentPassword,
    "password": values.password,
    "rePassword": values.rePassword
  },{
    headers
  }).catch((err)=> {
    // setError(err.response.data.errors.param +": "+ err.response.data.errors.msg);
    setLoading(false);
    console.log(err);
    err?.response?.status == 400 && setError(err?.response?.data?.errors?.msg);

    if(err?.response?.status === 400){
      setError(err?.response?.data?.errors?.msg);
      toast.error(err.response.data.errors.msg,{
        duration:3000,
        position:'top-right',
        style:
        {background:'black',
        color:'white'}
      });
    }else if (err?.response?.status === 401)
     {setError(err?.response?.data.message);
      toast.error(err?.response?.data.message,{
        duration:3000,
        position:'top-right',
        style:
        {background:'black',
        color:'white'}
      });
    }



  })
  console.log('updateLoggedUserPassword response',response);
  if(response.data.message === 'success'){
  console.log('response.data.message',response.data.message);
  toast.success(response.data.message,{
    duration:3000,
    position:'top-right',
    style:
    {background:'black',
    color:'white'}
  });
  setLoading(false);
  }}
  

  async function getLoggedUserDetails(){
    let userId=  localStorage.getItem("userId");
      let {data} = await axios.get(`http://localhost:8080/api/v1/user/${userId}`).catch((err)=>{
          console.log("err",err);
      });
      console.log("User",data.User);
      setUserDetails(data.User);
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

  function toggleUpdateBtn(){
    if(phoneInput === "d-none")
   { showPhoneInput("d-inline");
    setUpdateBtnText("Submit");
    setIsDisabled('');
  }else{
    showPhoneInput("d-none");
    setUpdateBtnText("Update personal information");
    setIsDisabled('disabled');

  }
  }

  useEffect(()=>{
      getLoggedUserDetails();
  },[])
  return (
    <>
                                      <Helmet>
                <meta charSet="utf-8" />
                <title>Account settings</title>
            </Helmet>
    <div className="container">
        <div className="row py-5">
            <h2 className='ps-3 mb-5'>Account settings</h2>


            <div className="accordion accordion-flush" id="accordionFlushExample">
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button collapsed h5" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
       Update personal information
      </button>
    </h2>
    <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
      <div className="accordion-body">
        
      <form onSubmit={formik.handleSubmit}>
            <div className="row mb-5">
            <div className="form-group  col-md-6">
        <input type="text" className={`form-control mb-3 py-2 ${styles.blueInput} rounded-pill`} placeholder={userDetails.name}  id='name'name='name' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        <label htmlFor="name" className='fw-semibold'>Your name</label>
        {formik.errors.name && formik.touched.name?<div className='alert alert-danger'>{formik.errors.name}</div>:"" }
        </div>
        
            

        <div className="form-group  col-md-6">
      <input type="email" className={`form-control mb-3 py-2 ${styles.blueInput} rounded-pill`} placeholder={userDetails.email} id='email'name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
      <label htmlFor="email" className='fw-semibold'>Email Address</label>
      {formik.errors.email && formik.touched.email?<div className='alert alert-danger'>{formik.errors.email}</div>:"" }
      </div>

            


      <div className="form-group col-md-6">
      <input type="text" className={`form-control mb-3 py-2 ${styles.blueInput} rounded-pill`} placeholder={userDetails.city} id='city'name='city' value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
      <label htmlFor="city" className='fw-semibold'>City</label>
      {formik.errors.city && formik.touched.city?<div className='alert alert-danger'>{formik.errors.city}</div>:"" }
      </div>

            <div className="col-md-6 d-flex justify-content-center">
            {loading?<button className={`${styles.button} rounded-pill  mb-3`} type='submit'><i className='fa fa-spinner fa-spin'></i></button>:<button disabled={!formik.isValid && formik.dirty} className='rounded-pill mb-3 bg-prim' type='submit' >{updateBtnText}</button>}

            </div>
            </div>
            </form>

      </div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
        Update password
      </button>
    </h2>
    <div id="flush-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
      <div className="accordion-body">
        
      <form onSubmit={formik2.handleSubmit}>


      <div className="form-group position-relative">
<input type={showPassword?"text":"password"} className={`form-control mb-3 py-2 ${styles.redInput} rounded-pill`} placeholder=' Current Password' id='currentPassword'name='currentPassword' value={formik2.values.currentPassword} onChange={formik2.handleChange} onBlur={formik2.handleBlur}/>
<label htmlFor="currentPassword" className='fw-semibold'>    Current Password</label>
<i className={`far ${eyeBtn} cursor-pointer position-absolute`} id="togglePassword" onClick={()=>toggleShowPassword()}></i>
</div>
{formik2.errors.currentPassword && formik2.touched.currentPassword?<div className='alert alert-danger'>{formik2.errors.currentPassword}</div>:"" }


<div className="form-group position-relative">
<input type={showPassword?"text":"password"} className={`form-control mb-3 py-2 ${styles.redInput}  rounded-pill rounded-pill`} placeholder='Password' id='password'name='password' value={formik2.values.password} onChange={formik2.handleChange} onBlur={formik2.handleBlur}/>
<label htmlFor="password" className='fw-semibold'>Password</label>
</div>
{formik2.errors.password && formik2.touched.password?<div className='alert alert-danger'>{formik2.errors.password}</div>:"" }

<div className="form-group">
<input type={showPassword?"text":"password"} className={`form-control mb-3 py-2 ${styles.redInput}  rounded-pill`} placeholder='rePassword' id='rePassword'name='rePassword' value={formik2.values.rePassword} onChange={formik2.handleChange} onBlur={formik2.handleBlur}/>
<label htmlFor="rePassword" className='fw-semibold '>Re-enter password</label>
</div>
{formik2.errors.rePassword && formik2.touched.rePassword?<div className='alert alert-danger'>{formik2.errors.rePassword}</div>:"" }


<div className="d-flex justify-content-center">
{loading?<button className={`${styles.button} btn w-100 mb-3`} type='submit'><i className='fa fa-spinner fa-spin'></i></button>:<button disabled={!formik2.isValid && formik2.dirty} className='btn  mx-auto mb-3 bg-prim rounded-pill' type='submit'>Update Password</button>}

</div>
</form>


      </div>
    </div>
  </div>

</div>


{/* 
            <h5 className='mb-2'>Personal information</h5>
            <hr className='mb-5'/> */}





        </div>
    </div>

    </>
  )
}
