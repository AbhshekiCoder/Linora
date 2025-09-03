// Navbar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { 
  HiOutlineLocationMarker, 
  HiOutlineX,
  HiOutlineMenu,
  HiOutlineChevronDown,
  HiOutlineChevronUp
} from 'react-icons/hi';
import { LuHeart, LuPhoneCall, LuSearch, LuShoppingBag, LuUser } from 'react-icons/lu';
import { FaVoicemail, FaWhatsapp } from 'react-icons/fa';
import '../css/navbar.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../css/home.css';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const searchRef = useRef(null);
  const categoryRef = useRef(null);
  const contactRef = useRef(null);
  const navbarRef = useRef(null);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Search query:', searchQuery);
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  const categories = [
    {
      name: 'Cotton',
      subcategories: ['T-shirts', 'Shirts', 'Dresses', 'Jumpsuits', 'Skirts']
    },
    {
      name: 'Linen',
      subcategories: ['Tops', 'Shorts', 'Pants', 'Blouses', 'Sets']
    },
    {
      name: 'Silk',
      subcategories: ['Blouses', 'Scarves', 'Lingerie', 'Pajamas', 'Robes']
    },
    {
      name: 'Wool',
      subcategories: ['Sweaters', 'Cardigans', 'Coats', 'Socks', 'Thermals']
    }
  ];

  const menuItems = [
    'HOME',
    'CATEGORY',
    'EXPLORE',
    'ABOUT',
    'DISCOVER'
  ];

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isSearchOpen && searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }
      
      if (isCategoryOpen && categoryRef.current && !categoryRef.current.contains(e.target)) {
        setIsCategoryOpen(false);
      }
      
      if (isContactOpen && contactRef.current && !contactRef.current.contains(e.target)) {
        setIsContactOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSearchOpen, isCategoryOpen, isContactOpen]);

  // Scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns on mobile when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>  
      {/* Top black bar */}
      <div className="sticky-top bg-black text-white text-xs py-2 px-4 flex flex-col md:flex-row justify-between items-center w-full">
        <div className="mb-2 md:mb-0">
          <span>Free Standard Delivery Details</span>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <div className="flex items-center space-x-1">
            <HiOutlineLocationMarker className="text-gray-400" />
            <a href="#" className="hover:underline whitespace-nowrap">Find a store</a>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-gray-400">@</span>
            <span>in english</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-gray-400">©</span>
            <select className="bg-black text-white border-0 focus:ring-0 text-xs">
              <option>United States</option>
              <option>United Kingdom</option>
              <option>Canada</option>
              <option>France</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Swiper Section with absolute navbar */}
      <div className=" w-full">
        {/* Sticky Navbar - positioned over the swiper */}
        <nav 
          ref={navbarRef}
          className={`fixed top-9 max-md:top-9  left-0 right-0 z-50 transition-all duration-300 hover:bg-white   ${
            isScrolled ? 'bg-white shadow-md top-9' : 'bg-transparent'
          }`}
          onMouseOver={() =>{setIsScrolled(true)}}
          
        >
          <div className={`max-w-[1500px] top-0 mx-auto flex justify-between h-[70px] items-center px-4 ${
            isScrolled ? 'text-black' : 'text-white'
          }`}>
            {/* Left side - logo and menu button */}
            <div className='flex items-center w-fit md:w-fit'>
              <button 
                className="md:hidden mr-4"
                onClick={() => setIsMenuOpen(true)}
              >
                <HiOutlineMenu className="text-2xl" />
              </button>
              
              <div className='logo text-xl md:text-2xl font-semibold tracking-widest max-sm:text-lg'>
                LINORA
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex space-x-6 text-xs font-light w-full justify-center">
              <div className='flex w-1/2 space-x-6 text-xs font-light justify-between'>
                {menuItems.map((item, index) => (
                  <div 
                    key={index} 
                    className="relative group"
                    ref={item === 'CATEGORY' ? categoryRef : null}
                  >
                    <a 
                      href="#" 
                      className={`hover:opacity-70 flex items-center ${item === 'CATEGORY' ? 'font-medium' : ''}`}
                      onMouseOver={(e) => {
                        if (item === 'CATEGORY') {
                          e.preventDefault();
                          setIsCategoryOpen(!isCategoryOpen);
                        }
                      }}
                    >
                      {item}
                      {item ==='CATEGORY' && (
                        isCategoryOpen ? <HiOutlineChevronUp className="ml-1 text-xs" /> : <HiOutlineChevronDown className="ml-1 text-xs" />
                      )}
                    </a>
                    
                    {/* Category Dropdown */}
                    {item === 'CATEGORY' && isCategoryOpen && (
                      <div 
                        className="absolute top-full left-0 mt-2 w-[600px] bg-white shadow-lg z-50 border border-gray-200"
                        onMouseLeave={() => {setHoveredCategory(null), setIsCategoryOpen(false)}}
                      >
                        <div className="grid grid-cols-5">
                          <div className="col-span-2 border-r border-gray-100">
                            <h3 className="text-sm font-medium p-4 pb-2 border-b">FABRIC TYPES</h3>
                            <ul>
                              {categories.map((CATEGORY, idx) => (
                                <li 
                                  key={idx}
                                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                                    hoveredCategory === idx ? 'bg-gray-50' : ''
                                  }`}
                                  onMouseEnter={() => setHoveredCategory(idx)}
                                >
                                  <div className="flex justify-between items-center">
                                    <span className="font-medium">{CATEGORY.name}</span>
                                    <HiOutlineChevronDown className="transform -rotate-90 text-xs" />
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="col-span-3 p-4">
                            {hoveredCategory !== null ? (
                              <>
                                <h3 className="text-sm font-medium mb-3">
                                  {categories[hoveredCategory].name} Collection
                                </h3>
                                <div className="grid grid-cols-3 gap-4">
                                  {categories[hoveredCategory].subcategories.map((sub, subIdx) => (
                                    <a 
                                      key={subIdx}
                                      href="#"
                                      className="text-sm hover:underline text-gray-700 hover:text-black"
                                    >
                                      {sub}
                                    </a>
                                  ))}
                                </div>
                              </>
                            ) : (
                              <div className="flex items-center justify-center h-full">
                                <p className="text-gray-500 text-sm">Hover over a fabric type</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div className='flex justify-end w-full md:w-1/3 max-md:w-1/2'>
              <div className="flex items-center space-x-4 text-sm justify-end w-full pr-9 max-sm:pr-0">
                  <div className='w-full flex items-center space-x-4 text-sm justify-between max-md:justify-around'>   
                    <div className="relative" ref={contactRef}>
                      <LuPhoneCall  
                        className={`hover:opacity-70 transition-all duration-200 text-lg hover:cursor-pointer`}
                        onClick={() => setIsContactOpen(!isContactOpen)}
                      />
                      {/* Contact Overlay - Responsive */}
                      <div 
                        className={`contact-overlay bg-white w-56 h-fit p-3 absolute z-50 ${
                          isContactOpen ? 'block' : 'hidden'
                        }`}
                        style={{
                          left: window.innerWidth < 768 ? '-100px' : 'auto',
                          right: window.innerWidth < 768 ? 'auto' : '0',
                          top: '150%',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                        }}
                        onMouseLeave={() => window.innerWidth >= 768 && setIsContactOpen(false)}
                      >
                        <div className='flex w-full justify-between'>
                          <div className='hover:bg-black hover:text-white hover:cursor-pointer p-2 text-gray-700 flex flex-col items-center w-1/3'>
                            <LuPhoneCall className='mb-1'/>
                            <p className='text-xs'>Phone</p>
                          </div>
                          <div className='hover:bg-black hover:text-white hover:cursor-pointer p-2 text-gray-700 flex flex-col items-center w-1/3'>
                            <FaWhatsapp className='mb-1'/>
                            <p className='text-xs'>Whatsapp</p>
                          </div>
                          <div className='hover:bg-black hover:text-white hover:cursor-pointer p-2 text-gray-700 flex flex-col items-center w-1/3'>
                            <FaVoicemail className='mb-1'/>
                            <p className='text-xs'>Email</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <LuSearch 
                      className={`hover:opacity-70 transition-all duration-200 text-lg hover:cursor-pointer`}
                      onClick={() => setIsSearchOpen(!isSearchOpen)} 
                    />
                    
                    <LuUser className={`hover:opacity-70 transition-all duration-200 text-lg hover:cursor-pointer`} />
                    
                    <LuHeart className={`hover:opacity-70 transition-all duration-200 text-lg hover:cursor-pointer`} />
                    
                    <LuShoppingBag className={`hover:opacity-70 transition-all duration-200 text-lg hover:cursor-pointer`} />
                  </div>
               </div>
            </div>
          </div>
           {/* Search overlay */}
      <div 
        ref={searchRef}
        className={`top-6 absolute fixed search-overlay ${isSearchOpen ? 'open' : ''}`}
      >
        <div className="max-w-3xl w-full mx-auto p-4">
          <div className="flex justify-between items-center mb-8">
            <button 
              onClick={() => setIsSearchOpen(false)}
              className="text-gray-700 hover:text-black focus:outline-none"
            >
              <HiOutlineX className="h-6 w-6" />
            </button>
          </div>
          
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <button type="submit" className="absolute left-0">
              <LuSearch className="h-6 w-6 text-gray-400" />
            </button>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Linora"
              className="w-full border-b border-black py-4 text-xl focus:outline-none pl-9"
              autoFocus
            />
          </form>
          
          <div className="mt-8">
            <h3 className="text-gray-500 uppercase text-xs mb-4">Popular Searches</h3>
            <div className="flex flex-wrap gap-4">
              {['Polo Shirt', 'Sweaters', 'Dresses', 'Jackets', 'Denim', 'Shoes'].map((item, index) => (
                <a 
                  key={index}
                  href="#"
                  className="text-gray-700 hover:text-black text-sm whitespace-nowrap"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
        </nav>
        
        {/* Swiper Slides */}
        <Swiper
       
          navigation={{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom'
          }}
          modules={[Pagination, Navigation, Autoplay]}
          className="mySwiper h-[500px] min-h-[90vh]"
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          speed={800}
          loop={true}
          
        >
          <SwiperSlide 
            style={{
              backgroundImage: 'url(https://cdn.pixabay.com/photo/2021/11/07/21/17/african-man-6777915_1280.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className='w-fit absolute bottom-10 left-10 text-white bg-black bg-opacity-50 p-4 rounded'>Summer Collection</div>
          </SwiperSlide>
          
          <SwiperSlide 
            style={{
              backgroundImage: 'url(https://cdn.pixabay.com/photo/2020/05/21/11/13/design-5200290_1280.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className='w-fit absolute bottom-10 left-10 text-white bg-black bg-opacity-50 p-4 rounded'>New Arrivals</div>
          </SwiperSlide>
          
          <SwiperSlide 
            style={{
              backgroundImage: 'url(https://cdn.pixabay.com/photo/2021/07/10/15/45/online-shop-6401739_1280.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className='w-fit absolute bottom-10 left-10 text-white bg-black bg-opacity-50 p-4 rounded'>Exclusive Deals</div>
          </SwiperSlide>
        </Swiper>
        
        {/* Custom Navigation Buttons */}
        <div className="swiper-button-prev-custom absolute top-1/2 left-4 z-10 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition">
          <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </div>
        
        <div className="swiper-button-next-custom absolute top-1/2 right-4 z-10 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition">
          <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
      
      
      
     
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setIsMenuOpen(false)}>
          <div className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-white p-5" onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-4 right-4"
            >
              <HiOutlineX className="h-6 w-6" />
            </button>
            
            <div className="mt-12">
              <div className="logo text-xl font-semibold tracking-widest mb-8">LINORA</div>
              <nav className="flex flex-col space-y-4">
                {menuItems.map((item, index) => (
                  <div key={index}>
                    {item === 'CATEGORY' ? (
                      <div>
                        <button 
                          className="flex items-center justify-between w-full py-2 text-gray-700 hover:text-black"
                          onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                        >
                          <span>CATEGORY</span>
                          <HiOutlineChevronDown className={`transform ${isCategoryOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isCategoryOpen && (
                          <div className="pl-4">
                            {categories.map((CATEGORY, catIdx) => (
                              <div key={catIdx} className="py-2">
                                <div className="font-medium">{CATEGORY.name}</div>
                                <div className="pl-2 mt-1 grid grid-cols-2 gap-2">
                                  {CATEGORY.subcategories.map((sub, subIdx) => (
                                    <a 
                                      key={subIdx}
                                      href="#"
                                      className="text-sm text-gray-600 hover:text-black"
                                      onClick={() => setIsMenuOpen(false)}
                                    >
                                      {sub}
                                    </a>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <a 
                        href="#"
                        className="text-gray-700 hover:text-black py-2 block border-b border-gray-100"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item}
                      </a>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;