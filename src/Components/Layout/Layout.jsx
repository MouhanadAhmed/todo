import React from 'react'
import'./Layout.module.css'
import NavBar from '../NavBar/NavBar'
import { Outlet, useNavigate,ScrollRestoration  } from 'react-router-dom'
import ScrollToTop from '../Helpers/ScrollToTop/ScrollToTop'

export default function Layout({userData ,setUserData}) {
  let navigate = useNavigate();

  function logOut(){
    localStorage.removeItem('userToken');
    setUserData(null);
    navigate('/login');
  }
  return (
    <>
    <NavBar userData={userData} logOut={logOut}/>
    <ScrollToTop></ScrollToTop>
    <Outlet/>
    <ScrollRestoration
  getKey={(location, matches) => {
    // default behavior
    return location.key;
  }}
/>
    </>
  )
}
