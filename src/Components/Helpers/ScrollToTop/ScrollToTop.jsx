import React, { useEffect, useState } from "react";
import styles from './ScrollToTop.module.css'

export default function ScrollToTop() {
    const [backToTopBtn,setBackToTopBtn]= useState(false);

    function scrollUp (){
        window.scrollTo({
            top: 0,
            behavior:'smooth'
        })
    }

    useEffect(()=>{
        window.addEventListener('scroll', ()=>{
            if (window.scrollY> 100) {
                setBackToTopBtn(true)
            }else{
                setBackToTopBtn(false)
            }
        })
    },[])


    return (
        <div>
                {backToTopBtn && <button className={`${styles.scrollup} rounded-circle shadow-lg bg-prim `} onClick={scrollUp}><i className="fa-solid p-1  fa-angles-up  "></i></button>}
      </div>
    )

}