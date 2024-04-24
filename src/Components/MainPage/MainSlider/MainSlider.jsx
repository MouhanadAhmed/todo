import React from 'react'
import Slider from "react-slick";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
export default function MainSlider() {



  var settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };
  
  return (
    <div className="container px-0 mx-auto py-1  ">
    <Slider {...settings} className='w-100'>
    {/* <div>
        <LazyLoadImage width={"100%"} height={"100%"} src={require('../../../Assets/Images/fashionable-model.jpg')} className='w-100 rounded-2' alt="slider-1"  effect="blur"/>
      </div> */}
      <div>
      <LazyLoadImage width={"100%"} height={"100%"} src={require('../../../Assets/Images/high-fashion.jpg')} className='w-100 rounded-2' alt="slider-2"  effect="blur"/>
      </div>
      <div>
      <LazyLoadImage width={"100%"} height={"100%"} src={require('../../../Assets/Images/woman-model.jpg')} className='w-100 rounded-2' alt="slider-3"  effect="blur"/>

      </div>
      <div>
      <LazyLoadImage width={"100%"} height={"100%"} src={require('../../../Assets/Images/beautiful-men.jpg')} className='w-100 rounded-2' alt="grocery-banner"  effect="blur"/>

      </div>
      <div>
      <LazyLoadImage width={"100%"} height={"100%"} src={require('../../../Assets/Images/portrait-handsome.jpg')} className='w-100 rounded-2' alt="grocery-banner-2"  effect="blur"/>
      </div>
      <div>
      <LazyLoadImage width={"100%"} height={"100%"} src={require('../../../Assets/Images/portrait-handsome-sm.jpg')} className='w-100 rounded-2' alt="slider-2"  effect="blur"/>

      </div>
      <div>
      <LazyLoadImage width={"100%"} height={"100%"} src={require('../../../Assets/Images/wonderful-womanl.jpg')} className='w-100 rounded-2' alt="slider-2"  effect="blur"/>

      </div>
      <div>
      <LazyLoadImage width={"100%"} height={"100%"} src={require('../../../Assets/Images/stylish-attractive.jpg')} className='w-100 rounded-2' alt="slider-2"  effect="blur"/>

      </div>
      <div>
      <LazyLoadImage width={"100%"} height={"100%"} src={require('../../../Assets/Images/elegant-woman.jpg')} className='w-100 rounded-2' alt="slider-2"  effect="blur"/>

      </div>
      <div>
      <LazyLoadImage width={"100%"} height={"100%"} src={require('../../../Assets/Images/fashionable-model.jpg')} className='w-100 rounded-2' alt="slider-2"  effect="blur"/>

      </div>
      <div>
      <LazyLoadImage width={"100%"} height={"100%"} src={require('../../../Assets/Images/high-fashion.jpg')} className='w-100 rounded-2' alt="slider-2"  effect="blur"/>

      </div>
      <div>
      <LazyLoadImage width={"100%"} height={"100%"} src={require('../../../Assets/Images/pretty-red.jpg')} className='w-100 rounded-2' alt="slider-2"  effect="blur"/>

      </div>
    </Slider>
    </div>
  )
}
