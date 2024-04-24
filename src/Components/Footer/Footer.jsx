import React from 'react'
import  './Footer.module.css'
import logo from '../../Assets/Images/Logowhite.svg'
import { Link } from 'react-router-dom'


export default function Footer() {
  return (
    <footer className=' bg-prim bottom text-white text-start pt-3'>

      <div className="container-fluid  ">
        <div className="row  pb-5">
          <div className="col-md-4">
          <img src={logo} alt="logo" className='mb-5 mt-4' />
          <p className='mb-4 h6'>Stay informed about Sopa with our latest<br/> 
            releases and founder news.</p>
          <button id='mailBtn' className='bg-prim text-white btn border border-1 border-white rounded-pill '>Enter email here for updates</button>
          </div>
          <div className="col-md-8 pt-3">
            <div className="row ">
              <div className="col-md-3 mb-3">
                <h4 className='fw-semi-bold mb-4'>Products</h4>
               <h6 className=' mb-3'>
               <Link className='text-white' href='#' to={'/categoryproducts/6439d5b90049ad0b52b90048'}>Men's Fashion</Link>
                </h6> 
                <h6  className=' mb-3'>
                <Link className='text-white' href='#' to={'/categoryproducts/6439d58a0049ad0b52b9003f'}>Women's Fashion</Link>
                </h6>
                <h6  className=' mb-3'>
                <Link className='text-white' href='#' to={'/products/6407f3a8b575d3b90bf957e2'}>Laptops & Accessories</Link>
                </h6>
                <h6  className=' mb-3'>
                <Link className='text-white' href='#' to={'/products/6407f3d8b575d3b90bf957ee'}>Printers & Accessories</Link>
                </h6>
                <h6  className=' mb-3'>
                <Link className='text-white' href='#' to={'/products/6407f3ccb575d3b90bf957eb'}>Camera & Accessories</Link>
                </h6>
                <h6  className=' mb-3'>
                <Link className='text-white h6' href='#' to={'/products/6407f39bb575d3b90bf957df'}>TVs, Satellites & Accessories</Link>
                </h6>
                <h6  className=' mb-3'>
                <Link className='text-white' href='#' to={'/products/6407f3c0b575d3b90bf957e8'}>Video Games</Link>
                </h6>

              </div>
              <div className="col-md-3 mb-3">
              <h4 className='fw-semi-bold mb-4'>Support</h4>
              <h6 className=' mb-3'>
               <Link className='text-white' href='#' to={'/'}>Help Center</Link>
                </h6> 
                <h6  className=' mb-3'>
                <Link className='text-white' href='#' to={'/'}>FAQs</Link>
                </h6>
                <h6  className=' mb-3'>
                <Link className='text-white' href='#' to={'/products/6407f3a8b575d3b90bf957e2'}>Order</Link>
                </h6>
                <h6  className=' mb-3'>
                <Link className='text-white' href='#' to={'/products/6407f3d8b575d3b90bf957ee'}>Order Status</Link>
                </h6>
                <h6  className=' mb-3'>
                <Link className='text-white' href='#' to={'/products/6407f3ccb575d3b90bf957eb'}>Returns & Exchanges</Link>
                </h6>
                <h6  className=' mb-3'>
                <Link className='text-white h6' href='#' to={'/products/6407f39bb575d3b90bf957df'}>Contact Us</Link>
                </h6>

              </div>

              <div className="col-md-3 mb-3">
              <h4 className='fw-semi-bold mb-4'>Everything Else</h4>
              <h6 className=' mb-3'>
               <Link className='text-white' href='#' to={'/'}>Community</Link>
                </h6> 
                <h6  className=' mb-3'>
                <Link className='text-white' href='#' to={'/'}>Why Sopa</Link>
                </h6>
                <h6  className=' mb-3'>
                <Link className='text-white' href='#' to={'/'}>About</Link>
                </h6>
                <h6  className=' mb-3'>
                <Link className='text-white' href='#' to={'/'}>Discount Program</Link>
                </h6>
                <h6  className=' mb-3'>
                <Link className='text-white' href='#' to={'/'}>Sopa Blog</Link>
                </h6>
                <h6  className=' mb-3'>
                <Link className='text-white h6' href='#' to={'/'}>Sopa Ambassadors</Link>
                </h6>

              </div>

            <div className="col-md-3 mt-5 py-5 mb-3">
              <h6><i className="fa-brands fa-twitter text-white me-2 mb-3">  </i>  Twitter</h6>
              <h6><i className="fa-brands fa-instagram text-white me-2 mb-3">  </i>  Instagram</h6>
              <h6><i className="fa-brands fa-facebook-f text-white me-2 mb-3">  </i>  Facebook</h6>

            </div>
            </div>
          </div>
        </div>
 </div>

    </footer>
  )
}
