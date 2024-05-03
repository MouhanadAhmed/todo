import React, { Suspense, lazy } from 'react';
import './App.css';
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';


import { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import { Toaster } from 'react-hot-toast';
import Loading from './Components/Helpers/Loading/Loading.jsx';
const Login = lazy(() => import('./Components/Authentication/Login/Login'));
const Layout = lazy(() => import('./Components/Layout/Layout'));
const Register = lazy(() => import('./Components/Authentication/Register/Register'));
const NotFound = lazy(() => import('./Components/Helpers/NotFound/NotFound'));
const ForgotPassword = lazy(() => import('./Components/Authentication/ForgotPassword/ForgotPassword'));
const VerifyResetCode = lazy(() => import('./Components/Authentication/VerifyResetCode/VerifyResetCode'));
const ResetPassword = lazy(() => import('./Components/Authentication/ResetPassword/ResetPassword'));
const UserProfile = lazy(() => import('./Components/User/UserProfile/UserProfile'));
const MyDetails = lazy(() => import('./Components/User/MyDetails/MyDetails'));
const MyAddressBook = lazy(() => import('./Components/User/MyAddressBook/MyAddressBook'));
const AccountSettings = lazy(() => import('./Components/User/AccountSettings/AccountSettings'));
const Home = lazy(() => import('./Components/MainPage/Home/Home.jsx'));
const Dashboard = lazy(() => import('./Components/Dashboard/Dashboard.jsx'));

function App() {
  useEffect(()=>{
    if(localStorage.getItem("userToken") !== null){
      saveUserData();
    }
  },[])

  const [userData,setUserData]=useState(null);

  function saveUserData(){
    let encodedToken = localStorage.getItem('userToken');
    let decodedToken = jwtDecode(encodedToken);
    localStorage.setItem('userId',decodedToken.userId);
    localStorage.setItem('role',decodedToken.role);
    setUserData(decodedToken);
    // console.log(decodedToken);
  }

  const routes= createBrowserRouter([
    { path:"",
    element: <Layout setUserData={setUserData} userData={userData}/> ,
    children:[
      {index:true, element:<ProtectedRoute> <Home/></ProtectedRoute> },
      {path:"login", element:<Login saveUserData={saveUserData}/>},
      {path :"register", element:<Register/>, children:[
        {index:true, element:<Register/>},
        {path:"login", element:<Login saveUserData={saveUserData}/>},
      ]},
      {path:"forgotPassword", element: <ForgotPassword></ForgotPassword>, children:[
        {path:"verifyResetCode", element: <VerifyResetCode/> , children:[
          {path:"resetPassword", element: <ResetPassword/>},
        ]},
      ]},
      {path:"resetPassword", element: <ResetPassword/>},
      {path:"verifyResetCode", element: <VerifyResetCode/>},
      {path:"userProfile", element: <ProtectedRoute><UserProfile /></ProtectedRoute> ,children:[
        {path:"myDetails", element: <MyDetails/>},
        {path:"myAddressBook", element: <MyAddressBook/>},
        {path:"accountSettings", element: <AccountSettings/>},
      ]},
      {path:"home" , element:<ProtectedRoute> <Home/></ProtectedRoute> },
      {path:"dashboard" , element:<ProtectedRoute> <Dashboard/></ProtectedRoute> },
      {path:"*", element:<ProtectedRoute><NotFound/></ProtectedRoute>},
    ]}
  ])

  return (
    // <CartContextProvider>
    <>
        <Toaster/>
        <Suspense fallback={<Loading></Loading>}>
        <RouterProvider  router={routes}></RouterProvider>
        </Suspense>
    {/* </CartContextProvider> */}
    </>
  );
}


export default App;
