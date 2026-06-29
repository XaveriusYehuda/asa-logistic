import React, {useState, useRef} from "react";
import { useAuth } from "../context/AuthContext";
import DesktopViewNavBar from '../component/desktopViewNavBar'
import navbarData from '../data/navbarData';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, useSearchParams } from "react-router-dom";

const DesktopViewNavBarController = ({scrollToSection,subnavFunction, activeSubNav, isLogin, activeDashboard, setActiveDashboard, urlLocation, handleLogout, isScrolled}) => {

  const [searchParams] = useSearchParams();

  const currentId = searchParams.get("tab") || navbarData[0].idHTML;

  const [activeNavbar, setActiveNavbar] = useState(null);

  const { user, logout } = useAuth();

  const timerRef = useRef(null);

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

  return (
    <>
      {navbarData.map((navbar, index) => (
        <div 
        key={navbar.idHTML}
        className="flex flex-col justify-start items-center">
          <button onClick={() => desktopNavBarTogle(navbar.idHTML)}>
            <NavLink to={navbar.mainPath} className={`${activeDashboard || isScrolled === true ? 'text-black' : 'text-white'} flex hover:text-red-calm transition duration-300 ease-in-out text-sm`}>
              {navbar.title}
              <motion.svg animate={{ rotate: activeNavbar === navbar.idHTML ? 180 : 0 }} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" width="18px" height="18px" className="inline fill-current mx-2">
                <path d="M4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289Z" fill="currentColor"></path>
              </motion.svg>
            </NavLink>
          </button>
          {/* <button onClick={() => desktopNavBarTogle(index)} className="flex hover:text-red-calm transition duration-300 ease-in-out text-white text-sm">
            {navbar.title}
            <motion.svg animate={{ rotate: isMainPageIndexActive === index && activeSubnav ? 180 : 0 }} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" width="18px" height="18px" className="inline fill-current mx-2">
              <path d="M4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289Z" fill="currentColor"></path>
            </motion.svg>
          </button> */}
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
          <button onClick={() => desktopNavBarTogle(signup)}>
            <NavLink to="/signup" className={`${activeDashboard || isScrolled === true ? 'text-black' : 'text-white'} flex hover:text-red-calm transition duration-300 ease-in-out text-sm`}>
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
          </button>
        </div> :
        <div 
        key="login"
        className="flex flex-col justify-start items-center gap-4">
          <button onClick={() => desktopNavBarTogle(login)}>
            <NavLink to="/login" className={`${activeDashboard || isScrolled === true ? 'text-black' : 'text-white'} flex hover:text-red-calm transition duration-300 ease-in-out text-sm`}>
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
          </button>
        </div>
      }
    </>
  );
};
 export default DesktopViewNavBarController;