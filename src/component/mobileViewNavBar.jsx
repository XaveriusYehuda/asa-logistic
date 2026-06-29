import React, { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';

const MobileViewNavBar = ({ isHamburgerActive, isMobileNavBarActive, navbarMenu, subnavFunction, isMainPageIndexActive }) => {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        // Mengatur jeda kemunculan antar child element (0.1 detik)
        staggerChildren: 0.1, 
        delayChildren: 0.05, // Jeda opsional sebelum child pertama muncul
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1, 
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
    },
    visible: { 
      opacity: 1, 
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 15
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.2 }
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isMobileNavBarActive && (
        <motion.div
        key={isMobileNavBarActive}
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center gap-4 font-normal font-inter p-3 z-30 md:hidden overflow-hidden"
        >
          {navbarMenu.map((menu, index) => (
            <motion.button key={index} onClick={() => subnavFunction(index)} variants={itemVariants} className={`hover:text-red-calm ${isMainPageIndexActive === index ? 'text-red-calm font-bold' : 'text-white'} transition duration-300 ease-in-out text-xs`}>
              {menu.title}
            </motion.button>
          ))}
          {/* <a href="#" className="hover:text-red-calm transition text-white text-xs">Resources</a>
          <a href="#" className="hover:text-red-calm transition text-white text-xs">Service</a>
          <a href="#" className="hover:text-red-calm transition text-white text-xs">Career</a>
          <a href="#" className="bg-red-calm hover:bg-red-400 px-4 py-2 rounded-full transition text-white font-semibold text-xs">Contact Us</a> */}
          {/* <div className={`${isNavBarActive ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5 pointer-events-none'} absolute top-full left-0 w-full pt-2 pb-6 bg-black/70 transition duration-300 ease-in-out`}> */}
          {/* </div> */}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileViewNavBar;