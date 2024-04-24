import React from 'react'
import errorImg from '../../../Assets/Images/error-1.png'

export default function NotFound() {
  return (
    <>
    <div className="container vh-75">
      <div className="row py-5 mb-5 d-flex align-items-center justify-content-center">
    <img className='w-100 m-auto py-5' src={errorImg} alt="404 Not Found" />
    <h2 className='mx-auto h1 text-center fw-bold text-primary mb-3'>Page Not Found!</h2>
    <h4 className='mx-auto text-center text-muted h6'>Oops! The page you are looking for does not exist. It might have been moved or deleted.</h4>
      </div>
    </div>
    </>
  )
}
