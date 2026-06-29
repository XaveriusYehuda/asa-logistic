import React, { useState, useRef } from "react";
import MobileViewNavBar from "../component/mobileViewNavBar";
import HamburgerButton from "../component/hamburger";
import navbarData from "../data/navbarData";
import { motion, AnimatePresence } from 'framer-motion';

const MobileViewNavBarController = ({subnavFunction, isMainPageIndexActive}) => {
  const [isMobileNavBarActive, setIsMobileNavBarActive] = useState(null);
  const [isHamburgerActive, setIsHamburgerActive] = useState(false);
  const [activeSubnav, setActiveSubnav] = useState(false);

  const navBarTogle = () => (
    setIsHamburgerActive(!isHamburgerActive)
  );

  const timerRef = useRef(null);
  
  const mobileNavBarTogle = (index) => {

    setIsMobileNavBarActive(current => 
      current === index ? null : index
    );

    setActiveSubnav(!activeSubnav);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setIsMobileNavBarActive(null);
      setActiveSubnav(false);
    }, 8000);
  };

  return (
    <>
      <HamburgerButton isHamburgerActive={isHamburgerActive} handleToggle={navBarTogle} />
      <div
      className={`${isHamburgerActive ? 'opacity-100' : 'opacity-0 pointer-events-none'} absolute top-full left-0 w-full h-auto pt-2 pb-6 overflow-hidden bg-black/70 backdrop-blur-sm transition duration-300 ease-in-out`}>
        <div className="flex flex-col items-center justify-center gap-4 font-normal font-inter px-2 z-30 md:hidden">
          {navbarData.map((navbar, index) => (
            <button key={index} onClick={() => mobileNavBarTogle(index)} className={`hover:text-red-calm ${isMainPageIndexActive === index ? 'text-red-calm font-bold' : 'text-white'} transition duration-300 ease-in-out text-xs`}>
              {/* <span className="flex w-[90px] justify-between justify-self-center"> */}
                {navbar.title}
                <motion.svg animate={{ rotate: isMainPageIndexActive === index && activeSubnav ? 180 : 0 }} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" width="18px" height="18px" className="inline fill-current mx-2">
                  <path d="M4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289Z" fill="currentColor"></path>
                </motion.svg>
              {/* </span> */}
              <MobileViewNavBar isHamburgerActive={isHamburgerActive} isMobileNavBarActive={isMobileNavBarActive === index} navbarMenu={navbar.subnav} subnavFunction={subnavFunction} isMainPageIndexActive={isMainPageIndexActive} />
            </button>
          ))}
          <a href="#" className="bg-red-calm hover:bg-red-400 px-4 py-2 rounded-full transition text-white font-semibold text-xs">Contact Us</a>
        </div>
      </div>
    </>
  );
};

export default MobileViewNavBarController;