import './index.css'
import React, { useState, useEffect } from 'react'
import { Routes, Route, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import HamburgerButton from './component/hamburger'
import MobileViewNavBarController from './controller/mobileViewNavBarController'
import DesktopViewNavBarController from './controller/desktopViewNavBarController'
import Footer from './component/footer';
import Popup from './component/popup';
import ScrollToTop from './component/scrollToTop';
import FloatingEmailButton from './component/mailToButton';
import serviceData from './data/serviceData';
import Service from './pages/service';
import About from './pages/about';
import Resource from './pages/resource';
import Article from './pages/article';
import Career from './pages/career';
import Login from './pages/login';
import SignUp from './pages/signup';
import ContactUs from './pages/contactUs';
import Visitor from './pages/dashboard/visitor';
import Officer from './pages/dashboard/officer';
import ProtectedRoute from './context/protectedRoute';
import { useAuth } from "./context/AuthContext";
import { animateScroll as scroll } from 'react-scroll';
import { Link as scrolllink } from 'react-scroll';

function App() {

  const [currentServiceIndex, setCurrentServiceIndex] = useState("export");

  const [currentResourceIndex, setCurrentResourceIndex] = useState("profile");

  const [currentCareerIndex, setCurrentCareerIndex] = useState("informationsystem");

  const [activeDashboard, setActiveDashboard] = useState(false);

  const [choosenArticle, setChoosenArticle] = useState(0);

  const [articleData, setArticleData] = useState(null);

  const [urlLocation, setUrlLocation] = useState(null);

  const [popupActive, setPopupActive] = useState(false);
    
  const [popupConfig, setPopupConfig] = useState({ title: "", content: null });

  const [isScrolled, setIsScrolled] = useState(false);

  const triggerPopup = (title, content) => {
    setPopupConfig({ title, content });
    setPopupActive(true);
  };
  
  const { user, logout } = useAuth();

  const location = useLocation();

  const navigate = useNavigate();

  const goToServiceSlide = (idHTML, path) => {
    // const index = serviceData.findIndex(data => data.idHTML === slideServiceIndex)
    setCurrentServiceIndex(idHTML);
    // window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    scroll.scrollToTop({
      duration: 1500, // 1.5 detik (makin besar angkanya, makin lambat)
      smooth: 'easeInOutQuint' // Jenis transisi (linear, easeIn, easeOut, dll)
    });
    navigate(path);
  }

  const scrollToSection = (path) => {
    navigate(path);
  };

  const pageVariants = {
    initial: {
      opacity: 0,
      y: -10,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      y: 10,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  useEffect(() => {
    console.log("Pathname aktif:", location.pathname);

    setUrlLocation(location.pathname);
    
    if (location.pathname === "/visitor" || location.pathname === "/officer" || location.pathname === "/login" || location.pathname === "/signup" || location.pathname === "/contact" || location.pathname === "/article") {
      setActiveDashboard(true);
    } else {
      setActiveDashboard(false);
    }
  }, [location.pathname]);

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      const logoutHandler = await logout();

      const message = logoutHandler.message;

      triggerPopup(
        "Pemberitahuan",
        <p className="py-4 text-sm lg:text-base leading-6 md:leading-7 font-semibold tracking-normal text-black text-left">
          <span className="font-extrabold text-red-calm">Logout</span> berhasil
        </p>
      );
      
      setTimeout(function() {
        // <Navigate to="/" />
        navigate('/');
      }, 2000);
      
    } catch (err) {
      triggerPopup(
        "Pemberitahuan",
        <p className="py-4 text-sm lg:text-base leading-6 md:leading-7 font-semibold tracking-normal text-black text-left">
          {err.message}
        </p>
      );
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="relatiVe w-full">
      <Popup 
        popupActive={popupActive} 
        setPopupActive={setPopupActive} 
        contentTitle={popupConfig.title}
        contentText={popupConfig.content}
      />
      <header className={`w-full z-50 transition-all duration-500 ${
          isScrolled
          ? "fixed top-0 left-0"
          : "absolute top-0 left-0"
        }`}>
        <div className="md:hidden h-full w-full z-30 bg-black/70 backdrop-blur-sm absolute">
        </div>
        <motion.nav
        animate={{
          backgroundColor: isScrolled
            ? "rgba(255,255,255,1)"
            : "rgba(255,255,255,0)",
          boxShadow: isScrolled
            ? "0 10px 30px rgba(0,0,0,0.1)"
            : "0 0 0 rgba(0,0,0,0)",
          backdropFilter: isScrolled
            ? "blur(15px)"
            : "blur(0px)",
        }}
        transition={{
          duration: 0.3,
        }}
        className={`${user?.role === "officer" ? 'hidden' : 'relative'} z-50 flex items-center w-min-full justify-between px-2 md:px-4 lg:px-8 ${isScrolled ? 'py-6' : 'py-3 md:py-6 xl:py-10'} text-white`}>
          <div className="flex items-center md:gap-2">
            <div className={`${isScrolled ? 'bg-[url(./assets/logo-asa-black.png)]' : activeDashboard ? 'bg-[url(./assets/logo-asa-white.png)]' : 'bg-[url(./assets/logo-asa-white.png)]'} bg-center bg-no-repeat bg-size-[50px] h-[40px] w-[80px] md:bg-size-[70px] md:h-[40px] md:w-[100px] flex items-center justify-center`}></div>
            <span className={`${isScrolled ? 'text-black' : activeDashboard ? 'text-white' : 'text-white'} font-extrabold font-inter tracking-wide text-lg xl:text-xl`}>Ardana Sejahtera Abadi</span>
          </div>

          <div className="hidden md:flex items-center gap-2 lg:gap-6 xl:gap-8 font-normal font-inter">
            <DesktopViewNavBarController scrollToSection={scrollToSection} subnavFunction={goToServiceSlide} activeSubNav={currentServiceIndex} isLogin={ user?.role } activeDashboard={activeDashboard} setActiveDashboard={setActiveDashboard} urlLocation={urlLocation} handleLogout={handleLogout} isScrolled={isScrolled} />
          </div>
          <div className="md:hidden flex flex-col items-center gap-4 w-[70px]">
            <MobileViewNavBarController subnavFunction={goToServiceSlide} isMainPageIndexActive={currentServiceIndex} scrollToSection={scrollToSection} activeSubNav={currentServiceIndex} isLogin={ user?.role } activeDashboard={activeDashboard} setActiveDashboard={setActiveDashboard} urlLocation={urlLocation} handleLogout={handleLogout} isScrolled={isScrolled} />
          </div>
        </motion.nav>
      </header>

      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<About isLogin={user} scrollToSection={scrollToSection} navigate={navigate} pageVariants={pageVariants} setArticleData={setArticleData} choosenArticle={choosenArticle} setChoosenArticle={setChoosenArticle} triggerPopup={triggerPopup} />} />
          <Route path="/home" element={<About isLogin={user} scrollToSection={scrollToSection} navigate={navigate} pageVariants={pageVariants} setArticleData={setArticleData} choosenArticle={choosenArticle} setChoosenArticle={setChoosenArticle} triggerPopup={triggerPopup} />} />
          <Route path="/article" element={<Article article={articleData} pageVariants={pageVariants} navigate={navigate} choosenArticle={choosenArticle} setChoosenArticle={setChoosenArticle} />} />
          <Route path="/service" element={<Service goToServiceSlide={goToServiceSlide} currentServiceIndexcheck={currentServiceIndex} navigate={navigate} pageVariants={pageVariants} />} />
          <Route path="/resource" element={<Resource currentResourceIndex={currentResourceIndex} scrollToSection={scrollToSection} navigate={navigate} pageVariants={pageVariants} />} />
          <Route path="/career" element={<Career currentResourceIndex={currentResourceIndex} scrollToSection={scrollToSection} navigate={navigate} pageVariants={pageVariants} />} />
          <Route path="/login" element={<Login pageVariants={pageVariants} triggerPopup={triggerPopup} popupActive={popupActive} setPopupActive={setPopupActive} popupConfig={popupConfig} setPopupConfig={setPopupConfig} />} />
          <Route path="/signup" element={<SignUp pageVariants={pageVariants} triggerPopup={triggerPopup} popupActive={popupActive} setPopupActive={setPopupActive} popupConfig={popupConfig} setPopupConfig={setPopupConfig} />} />
          <Route path="/contact" element={<ContactUs isLogin={user} pageVariants={pageVariants} />} />
          <Route path="/visitor" element={
            <ProtectedRoute setActiveDashboard={setActiveDashboard} allowedRole="visitor">
              <Visitor pageVariants={pageVariants}/>
            </ProtectedRoute>
          }
          />
          <Route path="/officer" element={
            <ProtectedRoute setActiveDashboard={setActiveDashboard} allowedRole="officer">
              <Officer pageVariants={pageVariants} triggerPopup={triggerPopup} />
            </ProtectedRoute>
          }

          />
        </Routes>
      </AnimatePresence>
      

      <ScrollToTop />
      <FloatingEmailButton />
      <Footer isLogin={ user?.role }/>
    </section>
  )
}

export default App
