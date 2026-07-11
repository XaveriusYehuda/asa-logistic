import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import MobileViewNavBar from "../component/mobileViewNavBar";
import HamburgerButton from "../component/hamburger";
import navbarData from "../data/navbarData";
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, useSearchParams, useLocation } from "react-router-dom";
import { animateScroll as scroll } from 'react-scroll';

const MobileViewNavBarController = ({ subnavFunction, isMainPageIndexActive, scrollToSection, activeSubNav, isLogin, activeDashboard, setActiveDashboard, urlLocation, handleLogout, isScrolled }) => {
  
  const [activeNavbar, setActiveNavbar] = useState(null);

  const [isHamburgerActive, setIsHamburgerActive] = useState(false);

  const [searchParams] = useSearchParams();

  const currentId = searchParams.get("tab") || navbarData[0].idHTML;

  const navBarTogle = () => {
    setIsHamburgerActive(!isHamburgerActive);
    if (isHamburgerActive) {
      closeDropdown();
    }
  };

  const { user, logout } = useAuth();
  
  const location = useLocation();
  
  const timerRef = useRef(null);
  const navRef = useRef(null); // Ref untuk mendeteksi klik di luar menu

  const closeDropdown = () => {
    setActiveNavbar(null);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  const mobileNavBarTogle = (navbarId) => {
    setActiveNavbar(current => 
      current === navbarId ? null : navbarId
    );

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setActiveNavbar(null);
    }, 8000);
  };

  useEffect(() => {
    closeDropdown();
    scroll.scrollToTop
    ({
      duration: 1500, // 1.5 detik (makin besar angkanya, makin lambat)
      smooth: 'easeInOutQuint' // Jenis transisi (linear, easeIn, easeOut, dll)
    });
  }, [location.pathname]);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        navRef.current &&
        !navRef.current.contains(event.target)
      ) {
        closeDropdown();
        setIsHamburgerActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Menutup dropdown jika pengguna menekan tombol Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeDropdown();
        setIsHamburgerActive(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div ref={navRef}>
      <HamburgerButton isHamburgerActive={isHamburgerActive} handleToggle={navBarTogle} />
      <div
        className={`${isHamburgerActive ? 'opacity-100' : 'opacity-0 pointer-events-none'} absolute top-full left-0 w-full h-auto py-6 overflow-hidden ${isScrolled ? 'bg-white/90' : 'bg-black/70'} backdrop-blur-sm transition duration-300 ease-in-out`}
      >
        <div className="flex flex-col items-center justify-center gap-4 font-normal font-inter px-2 z-30 md:hidden">
          {navbarData.map((navbar, index) => (
            <button 
              key={navbar.idHTML} 
              onClick={() => mobileNavBarTogle(navbar.idHTML)} 
              className={`hover:text-red-calm ${isMainPageIndexActive === index ? 'text-red-calm font-bold' : isScrolled ? 'text-black' :'text-white'} transition duration-300 ease-in-out text-xs`}
            >
              {navbar.title}
              {/* Animasi rotasi SVG disesuaikan dengan activeNavbar === navbar.idHTML agar sinkron dengan desktop */}
              <motion.svg 
                animate={{ rotate: activeNavbar === navbar.idHTML ? 180 : 0 }} 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg" 
                stroke="currentColor" 
                width="18px" 
                height="18px" 
                className="inline fill-current mx-2"
              >
                <path d="M4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289Z" fill="currentColor"></path>
              </motion.svg>
              
              {/* Parameter dikirim menggunakan pengecekan string idHTML */}
              <MobileViewNavBar 
                isHamburgerActive={isHamburgerActive} 
                isMobileNavBarActive={activeNavbar === navbar.idHTML} 
                navbarMenu={navbar.subnav} 
                subnavFunction={subnavFunction} 
                isMainPageIndexActive={isMainPageIndexActive} 
                isScrolled={isScrolled} 
                scrollToSection={scrollToSection} 
                isNavbarActive={activeNavbar === navbar.idHTML} 
                isSubnavActive={activeSubNav}
              />
            </button>
          ))}
          <NavLink to="/contact" className={`bg-red-calm hover:bg-red-400 px-6 py-2 rounded-full transition text-white font-semibold text-sm`}>
            Contact Us
          </NavLink>

          {
            user && urlLocation === "/visitor" ? 
            <button onClick={handleLogout} className={`${isScrolled === true ? 'text-black' : 'text-white'} hover:text-red-calm transition duration-300 ease-in-out text-sm`}>Logout</button> :
    
            user && urlLocation !== "/visitor" ?
            <div 
            key="dashboard-visitor"
            className="flex flex-col justify-start items-center gap-4">
              <NavLink to="/visitor" className={`${isScrolled === true ? 'text-black' : 'text-white'} flex hover:text-red-calm transition duration-300 ease-in-out text-sm`}>
                Dashboard
              </NavLink>
            </div> :
    
            !user && urlLocation === "/login" ?
            <div 
            key="signup"
            className="flex flex-col justify-start items-center gap-4">
              <NavLink 
                to="/signup" 
                onClick={(e) => {
                  desktopNavBarTogle(navbar.idHTML);
                }}
                className={`${isScrolled ? 'text-black' : 'text-white'} flex hover:text-red-calm transition duration-300 ease-in-out text-sm`}>
                <svg
                  className="w-5 h-5 mx-2"
                  viewBox="0 0 500 500"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M249.985 106.235C292.319 106.236 325.725 139.231 325.726 178.826C325.726 218.422 292.319 251.418 249.985 251.418C207.651 251.418 174.244 218.422 174.244 178.826C174.244 139.23 207.651 106.235 249.985 106.235Z"
                    stroke="currentColor"
                    strokeWidth="30"
                  />
    
                  <circle
                    cx="250"
                    cy="250"
                    r="235"
                    stroke="currentColor"
                    strokeWidth="30"
                  />
    
                  <path
                    d="M129.623 372.261C134.512 211.677 369.179 211.677 374.068 372.261"
                    stroke="currentColor"
                    strokeWidth="30"
                  />
                </svg>
                Sign Up
              </NavLink>
            </div> :
            <div 
            key="login"
            className="flex flex-col justify-start items-center gap-4">
              <NavLink 
                to="/login" 
                onClick={(e) => {
                  desktopNavBarTogle(navbar.idHTML);
                }} 
                className={`${isScrolled ? 'text-black' : 'text-white'} flex hover:text-red-calm transition duration-300 ease-in-out text-sm`}>
                <svg
                  className="w-5 h-5 mx-2"
                  viewBox="0 0 500 500"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M249.985 106.235C292.319 106.236 325.725 139.231 325.726 178.826C325.726 218.422 292.319 251.418 249.985 251.418C207.651 251.418 174.244 218.422 174.244 178.826C174.244 139.23 207.651 106.235 249.985 106.235Z"
                    stroke="currentColor"
                    strokeWidth="30"
                  />
    
                  <circle
                    cx="250"
                    cy="250"
                    r="235"
                    stroke="currentColor"
                    strokeWidth="30"
                  />
    
                  <path
                    d="M129.623 372.261C134.512 211.677 369.179 211.677 374.068 372.261"
                    stroke="currentColor"
                    strokeWidth="30"
                  />
                </svg>
                Login
              </NavLink>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default MobileViewNavBarController;