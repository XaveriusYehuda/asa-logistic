import React, { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, useSearchParams } from "react-router-dom";

const DesktopViewNavBar = ({ scrollToSection, isNavbarActive, navbarMenu, subnavFunction, isSubnavActive, isScrolled }) => {

  const [searchParams] = useSearchParams();

  const currentId = searchParams.get("tab") || navbarMenu[0].idHTML;

  const MotionNavLink = motion(NavLink);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      backgroundColor: isScrolled
        ? "rgba(255,255,255,0.75)"
        : "rgba(255,255,255,0)",
      boxShadow: isScrolled
        ? "0 10px 30px rgba(0,0,0,0.1)"
        : "0 0 0 rgba(0,0,0,0)",
      backdropFilter: isScrolled
        ? "blur(15px)"
        : "blur(0px)",
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
    <AnimatePresence>
      {isNavbarActive && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={`
            absolute
            top-full
            ${
              isScrolled 
                ? '-translate-x-2 translate-y-2'
                : '-translate-x-2 -translate-y-12'
            }
            mt-5
            w-72
            overflow-hidden
            rounded-2xl
            bg-white/95
            backdrop-blur-xl
            shadow-2xl
            ${
              isScrolled 
                ? 'border border-gray-200'
                : ''
            }
            py-2
            z-50
            flex
            flex-col
            items-center
            justify-center
            gap-2
          `}
        >
          {navbarMenu.map((menu, index) => (
            <React.Fragment key={menu.idHTML}>
              <MotionNavLink 
                to={menu.path}
                variants={itemVariants}
                onClick={() => {
                  if (isNavbarActive === "service") { 
                    subnavFunction(menu.idHTML);
                  } else {
                    scrollToSection(menu.idHTML);
                  }
                }}
                className={`flex hover:text-red-calm ${String(currentId) === String(menu.idHTML) ? 'text-red-calm font-bold' : isScrolled ? 'text-black' : 'text-white'} transition duration-300 ease-in-out text-sm`}
              >
                {menu.title}
              </MotionNavLink>

              {index !== navbarMenu.length - 1 && (
                <div className="mx-4 border-b border-gray-100" />
              )}
            </React.Fragment>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DesktopViewNavBar;