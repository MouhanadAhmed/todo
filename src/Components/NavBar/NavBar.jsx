import React, { useContext  } from 'react'
import './NavBar.module.css'
import { Link, NavLink } from 'react-router-dom';
import logo from '../../Assets/Images/Logo.svg'


export default function NavBar({userData,logOut}) {
  // const [collapsed,setCollapsed]=useState(true);
  let role = localStorage.getItem('role');
  return (
  <nav className="navbar navbar-expand-lg bg-main" >
    <div className="container">
        <Link className="navbar-brand " to={"/"}>To do list</Link>
        <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded='false' aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse "  id="navbarSupportedContent">
            {userData !== null?      
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 " >
                <li  className="nav-item mx-auto "   >
                <NavLink className="nav-link nav-bar"  to={`/donateBlood`} >Donate blood
            </NavLink>
                </li>
                <li  className="nav-item mx-auto">
                <Link className="nav-link   nav-bar" to={`/donateBlood`}>Looking for blood
            </Link>
                </li>
              {role ==="admin"?  <li  className="nav-item mx-auto">
                <Link className="nav-link   nav-bar" to={`/bloodRequests`}>Blood Requests
            </Link>
                </li>:""}
              

              </ul>: null}
{/* 
            <form className="d-flex  w-25" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
            </form> */}
             
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {userData === null?
              <>        
                <li className="nav-item mx-auto">
                  <Link className="nav-link active  nav-bar"  to={"login"}>Login</Link>
                </li>
                <li className="nav-item mx-auto">
                  <Link className="nav-link  nav-bar" to={"register"}>Register</Link>
                </li></>:     <>

             

                <li className='nav-item mx-auto'>
                  <Link className='nav-link cursor-pointer nav-bar' to={'userProfile'}>
                  <i className="fa-solid fa-user fa-xl text-black"></i>
                  </Link>
                </li>
          
                <li className="nav-item mx-auto">
                  <span className="nav-link  cursor-pointer" onClick={logOut} >Logout</span>
                </li>
                </>   }
            </ul>
        </div>
    </div>
  </nav>
)
}
