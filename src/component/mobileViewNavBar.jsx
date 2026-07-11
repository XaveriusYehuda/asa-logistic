import React from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, useSearchParams } from "react-router-dom";
import { Link } from "react-scroll";

const MobileViewNavBar = ({ isHamburgerActive, isMobileNavBarActive, navbarMenu, subnavFunction, isMainPageIndexActive, scrollToSection, isNavbarActive, isSubnavActive, isScrolled }) => {

  const [searchParams] = useSearchParams();

  const currentId = searchParams.get("tab") || navbarMenu[0].idHTML;

  const MotionNavLink = motion(NavLink);

  // Varian animasi container (dipertahankan sesuai bawaan Anda)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, 
        delayChildren: 0.05, 
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

  // Varian animasi item sub-menu (dipertahankan sesuai bawaan Anda)
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
      {/* isMobileNavBarActive sekarang menerima nilai boolean hasil evaluasi (activeNavbar === navbar.idHTML) */}
      {isMobileNavBarActive && (
        <motion.div
          // Menggunakan variants container yang sudah Anda definisikan agar staggerChildren bekerja
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="flex flex-col items-center gap-2 font-normal font-inter p-3 z-30 md:hidden overflow-hidden"
        >
          {navbarMenu.map((menu, index) => (
            <React.Fragment key={menu.idHTML}>
              {/* <MotionNavLink 
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
              </MotionNavLink> */}
              <motion.div variants={itemVariants}>
                <Link
                  to={menu.idHTML}
                  spy
                  smooth
                  duration={1500}
                  offset={-70}
                  onClick={() => {
                    if (isNavbarActive === "service") { 
                      subnavFunction(menu.path);
                    } else {
                      //  closeDropdown(); setTimeout(() => {scrollToSection(menu.path);}, 200);
                      scrollToSection(menu.path);
                    }
                  }}
                  className={`flex hover:text-red-calm ${String(currentId) === String(menu.idHTML) ? 'text-red-calm font-bold' : isScrolled ? 'text-black' : 'text-white'} transition duration-300 ease-in-out text-sm`}
                >
                  {menu.title}
                </Link>
              </motion.div>

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

export default MobileViewNavBar;