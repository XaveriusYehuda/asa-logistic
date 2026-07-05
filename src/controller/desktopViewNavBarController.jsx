import React, {useState, useRef, useEffect} from "react";
import { useAuth } from "../context/AuthContext";
import DesktopViewNavBar from '../component/desktopViewNavBar'
import navbarData from '../data/navbarData';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, useSearchParams, useLocation } from "react-router-dom";
import { animateScroll as scroll } from 'react-scroll';

const DesktopViewNavBarController = ({scrollToSection,subnavFunction, activeSubNav, isLogin, activeDashboard, setActiveDashboard, urlLocation, handleLogout, isScrolled}) => {

  const [searchParams] = useSearchParams();

  const currentId = searchParams.get("tab") || navbarData[0].idHTML;

  const [activeNavbar, setActiveNavbar] = useState(null);

  const { user, logout } = useAuth();

  const location = useLocation();

  const timerRef = useRef(null);

  const navRef = useRef(null);

  const closeDropdown = () => {
    setActiveNavbar(null);

    if (timerRef.current) {
        clearTimeout(timerRef.current);
    }
  };

  const desktopNavBarTogle = (navbar) => {

    setActiveNavbar(current => 
      current === navbar ? null : navbar
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
      }

    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };

  }, []);

  useEffect(() => {

    const handleKeyDown = (e) => {

      if (e.key === "Escape") {
        closeDropdown();
      }

    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };

  }, []);

  return (
    <div ref={navRef}  className="flex items-center gap-2 lg:gap-6 xl:gap-8">
      {navbarData.map((navbar, index) => (
        <div 
        key={navbar.idHTML}
        className="flex flex-col justify-start items-center">
          <NavLink 
            to={navbar.mainPath}
            onClick={(e) => {
              if(isScrolled){ 
                e.preventDefault(); 
                // desktopNavBarTogle(navbar.idHTML);
              }

              desktopNavBarTogle(navbar.idHTML);
            }}
            className={`${activeDashboard || isScrolled === true ? 'text-black' : activeNavbar === navbar.idHTML ? 'text-red-calm' : 'text-white'} flex hover:text-red-calm transition duration-300 ease-in-out text-sm`}>
            {navbar.title}
            <motion.svg animate={{ rotate: activeNavbar === navbar.idHTML ? 180 : 0 }} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" width="18px" height="18px" className="inline fill-current mx-2">
              <path d="M4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289Z" fill="currentColor"></path>
            </motion.svg>
          </NavLink>
          <DesktopViewNavBar isScrolled={isScrolled} scrollToSection={scrollToSection} isNavbarActive={activeNavbar === navbar.idHTML} navbarMenu={navbar.subnav} subnavFunction={subnavFunction} isSubnavActive={activeSubNav} />
        </div>
      ))}
      
      <NavLink to="/contact" className={`bg-red-calm hover:bg-red-400 px-6 py-2 rounded-full transition text-white font-semibold text-sm`}>
        Contact Us
      </NavLink>
      
      {
        user && urlLocation === "/visitor" ? 
        <button onClick={handleLogout} className={`${activeDashboard || isScrolled === true ? 'text-black' : 'text-white'} hover:text-red-calm transition duration-300 ease-in-out text-sm`}>Logout</button> :

        user && urlLocation !== "/visitor" ?
        <div 
        key="dashboard-visitor"
        className="flex flex-col justify-start items-center gap-4">
          <NavLink to="/visitor" className={`${activeDashboard || isScrolled === true ? 'text-black' : 'text-white'} flex hover:text-red-calm transition duration-300 ease-in-out text-sm`}>
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
              if(isScrolled){ 
                e.preventDefault(); 
                // desktopNavBarTogle(navbar.idHTML);
              }

              desktopNavBarTogle(navbar.idHTML);
            }}
            className={`${activeDashboard || isScrolled === true ? 'text-black' : 'text-white'} flex hover:text-red-calm transition duration-300 ease-in-out text-sm`}>
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
              if(isScrolled){ 
                e.preventDefault(); 
                // desktopNavBarTogle(navbar.idHTML);
              }

              desktopNavBarTogle(navbar.idHTML);
            }} 
            className={`${activeDashboard || isScrolled === true ? 'text-black' : 'text-white'} flex hover:text-red-calm transition duration-300 ease-in-out text-sm`}>
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
  );
};
 export default DesktopViewNavBarController;