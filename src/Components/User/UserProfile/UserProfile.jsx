import React from 'react'
import styles from './UserProfile.module.css'
import MyDetails from '../MyDetails/MyDetails';
import AccountSettings from '../AccountSettings/AccountSettings';
import {Helmet} from "react-helmet";



export default function UserProfile() {

  let menuItem=[
    {
      path:"userProfile/myDetails",
      name:"My details",
      className:`d-flex mb-4 rounded-end rounded-5 ps-2 border nav-link active p-2 ${styles.link}`,
      icon: <i className="fa-solid fa-circle-user me-2"></i>,
      "data-bs-target":"#v-pills-myDetails",
      "aria-controls":"v-pills-myDetails" 
    },
    {
      path:"userProfile/accountSettings",
      name:" Account settings",
      className:`d-flex mb-4 rounded-end rounded-5 ps-2 border nav-link  p-2 ${styles.link}`,
      icon: <i className="fa-solid fa-gear me-2"></i>,
      "data-bs-target":"#v-pills-accountSettings",
      "aria-controls":"v-pills-accountSettings" 
    },
  ]
  return (
    <>
                                  <Helmet>
                <meta charSet="utf-8" />
                <title>User profile</title>
            </Helmet>
    <div className="container ">
      
        <div className="row py-5">
            <h2 className='fw-bold mb-5'>My Account</h2>
            <div className="col-md-3 col-xxl-2">

              <div className="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
              {menuItem.map((item,index)=>
                (<button  key={index} className={item.className} 
                id="v-pills-home-tab" 
                data-bs-toggle="pill" 
                data-bs-target={item['data-bs-target']} 
                type="button" role="tab" 
                aria-controls={item['aria-controls']} 
                aria-selected="true"
                >
                  <div className="icon">{item.icon}</div>
                  <div className="link_text">{item.name}</div>
                </button>)
              )}
              </div>

            </div>
            <div className="col-md-9 col-xxl-10 rounded shadow-lg">
              <div className="tab-content" id="v-pills-tabContent">
                <div className="tab-pane fade show active" id="v-pills-myDetails" role="tabpanel" aria-labelledby="v-pills-myDetails-tab" tabIndex="0">
                  <MyDetails/>
                </div>

                <div className="tab-pane fade" id="v-pills-accountSettings" role="tabpanel" aria-labelledby="v-pills-accountSettings-tab" tabIndex="0">
                  <AccountSettings/>
                </div>
              </div>
            </div>
          </div>
        
    </div>
    </>
  )
}
