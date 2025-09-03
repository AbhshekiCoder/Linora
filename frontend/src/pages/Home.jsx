import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../css/home.css';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import HeroBanner from './home/HeroBanner';
import ImageGallery from './home/ImageGallery';
import FooterBanner from './home/FooterBanner';
import { FaBox, FaBoxOpen, FaShoppingBag, FaShoppingCart, FaTruckPickup } from 'react-icons/fa';
import {RiCustomerService2Line} from 'react-icons/ri'
import Carousel from './home/Carousel';

export default function Home() {

  let data = [
    {
      name: "Free Tote with every shopping",
      icon: <FaShoppingBag/>
    },
    {
      name: "60 days free return",
      icon: <FaBox/>
    },
    {
      name: "Free Shipping",
      icon: <FaTruckPickup/>
    },
     {
      name: "Elevated Packaging",
      icon: <FaBoxOpen/>
    },
     {
      name: "White clove customer support",
      icon: <RiCustomerService2Line />
    },
    {
      name: "Curated shopping experience",
      icon: <FaShoppingCart/>
    }

    

    

    

    

  ]
  return (
    <> 
    
    <HeroBanner/>
    <FooterBanner/>
    <Carousel/>
    <ImageGallery/>
  
    
    
    
    </>

    
  )
}