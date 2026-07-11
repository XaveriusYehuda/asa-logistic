import React, {useState, useEffect} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navigate, NavLink } from "react-router-dom";
import exportHandlingIcon from '../assets/service-card/export-handling-icon.webp'
import internationalFFIcon from '../assets/service-card/international-ff-icon.webp'
import domesticLogisticIcon from '../assets/service-card/domestic-logistic-icon.webp'
import documentClearanceIcon from '../assets/service-card/document-clearance-icon.webp'
import undernameEximIcon from '../assets/service-card/undername-exim-icon.webp'
import rightArrrow from '../assets/right-arrow-red.svg'
import rightArrrowWhite from '../assets/right-arrow-white.svg'
import deliveredIcon from '../assets/portfolio/delivered-cargo-icon.webp'
import handledClientsIcon from '../assets/portfolio/handled-clients-icon.webp'
import coveredCountriesIcon from '../assets/portfolio/covered-countries-icon.webp'
import alfiLogo from '../assets/alfi-logo.png'
import bgAchievements1 from '../assets/bg-achievement-1.webp'
import bgAchievements2 from '../assets/bg-achievement-2.webp'
import maerskLogo from '../assets/partner-grid/maersk-logo.png'
import hafaLogo from '../assets/partner-grid/hafa-logo.png'
import mscLogo from '../assets/partner-grid/msc-logo.png'
import logisticSolutionAcc from '../assets/logistic-solution-acc.webp'
import bgArticle from '../assets/bg-article.webp'
import whiteDownChevron from '../assets/white-down-chevron.svg';
import bgHero1 from '../assets/bg-hero-1.webp';
import bgHero2 from '../assets/bg-hero-2.webp';
import bgHero3 from '../assets/bg-hero-3.webp';
import forkLiftIcon from '../assets/formIcon.png';
import { SERVICE_SCHEMAS } from '../data/serviceSchemas';
import { uploadRFQ } from '../api/rfqAPI'
import sampleArticleFromDB from "../data/articleData";
import { animateScroll as scroll } from 'react-scroll';

const About = ( {isLogin, navigate, pageVariants, setArticleData, choosenArticle, setChoosenArticle, triggerPopup} ) => {

  const heroData = [
    {
      bgImage : bgHero1,
      title1 : "Delivering Trust",
      title2 : "Across Borders",
      text : "Be convinced that every shipment requires a willing partner who understands precision, acceleration, and trust."
    },
    {
      bgImage : bgHero2,
      title1 : "Your Gateway to",
      title2 : "Global Logistics",
      text : "From export handling to international freight forwarding, we connect your business to the world with speed, compliance, and reliability."
    },
    {
      bgImage : bgHero3,
      title1 : "One Partner for",
      title2 : "Every Logistics Need",
      text : "Whether you need export handling, import clearance, freight forwarding, domestic delivery, or undername services, PT Ardana Sejahtera Abadi is your single, reliable partner for end-to-end logistics solutions."
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const [selectedService, setSelectedService] = useState('Export_Handling');
  
  const [serviceDetails, setServiceDetails] = useState({});

  const [files, setFiles] = useState({});

  const currentSchema = SERVICE_SCHEMAS[selectedService];

  const handleInputChange = (fieldName, value) => {
    setServiceDetails(prev => ({
      ...prev,
      [fieldName]: value 
    }));
  };

  const handleFileChange = (documentType, file) => {
    setFiles(prev => ({
      ...prev,
      [documentType]: file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLogin) {
      triggerPopup(
        "Pemberitahuan",
        <p className="py-4 text-sm lg:text-base leading-6 md:leading-7 font-semibold tracking-normal text-black text-left">
          Silahkan <span className="font-extrabold text-red-calm">Login</span> Terlebih dahulu
        </p>
      );
      return; // Stop eksekusi di sini
    }

    const formData = new FormData();

    if (isLogin && isLogin.public_id) {
      formData.append("user_id", isLogin.public_id);
    }
  
    formData.append('service_type', selectedService);
    
    formData.append('service_details', JSON.stringify(serviceDetails));
    
    Object.keys(files).forEach(key => {
      if (files[key]) {
        formData.append(`files[${key}]`, files[key]);
      }
    });

    try {
      await uploadRFQ(formData);
      triggerPopup(
        "Pemberitahuan",
        <p className="py-4 text-sm lg:text-base leading-6 md:leading-7 font-semibold tracking-normal text-black text-left">
          RFQ untuk layanan <span className="font-extrabold text-red-calm">{selectedService.replace('_', ' ')}</span> berhasil dikirim!
        </p>
      );
    } catch (err) {
      setError('Terjadi kesalahan jaringan.');
      triggerPopup(
        "Error",
        <p className="y-4 text-sm lg:text-base leading-6 md:leading-7 font-semibold tracking-normal text-black text-left">
          Terjadi kesalahan jaringan saat mengirim data.
        </p>
      );
    }
  };

  const currentData = heroData[currentIndex];

  const activeArticle = (data, index) => {
    setChoosenArticle(index);
    setArticleData(data);
    // window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    scroll.scrollToTop({
      duration: 1500, // 1.5 detik (makin besar angkanya, makin lambat)
      smooth: 'easeInOutQuint' // Jenis transisi (linear, easeIn, easeOut, dll)
    });
    navigate(`/article?tab=${data.path}`);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      goToNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  const goToNext = () => {
    const isLastSlide = currentIndex === heroData.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  }
  
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full"
    >
      <section className="w-full">
        <section className="relative h-screen overflow-hidden">
          <div className="md:hidden h-full w-full"></div>
          <div className="md:relative md:h-[88px] lg:h-[120px] w-full"></div>
          <div className="absolute inset-0 z-0 overflow-hidden">
            
            {heroData.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${
                  currentIndex === index ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  backgroundImage: `url(${slide.bgImage})`,
                }}
              />
            ))}

          </div>
          <div className="bg-black z-10 inset-0 absolute opacity-20">
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 md:relative z-10 flex flex-col items-start justify-center text-white gap-6 h-full md:h-[70%] px-6 lg:px-46"
            >
              <h1 className="font-inter font-bold leading-tight text-4xl xl:text-6xl">
                {currentData.title1}<br></br>{currentData.title2}
              </h1>
              <p className="font-inter text-sm md:text-md text-gray-200 max-w-xl pr-8 mb-2">
                {currentData.text}
              </p>
              
              <div className="flex flex-wrap gap-4 pr-8">
                <button onClick={() => navigate('/contact')} className="bg-red-calm hover:bg-white text-white hover:text-red-calm text-md px-4 py-2 md:px-8 md:py-2 rounded-full font-bold transition">
                  Start Now! 
                </button>
                <button onClick={() => navigate('/service')} className="border border-red-calm text-white hover:text-red-calm hover:bg-white hover:border-none textmd px-4 py-2 md:px-8 md:py-2 rounded-full font-bold transition">
                  List of Service
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-10 left-0 w-full flex justify-center gap-3 px-8">
            {heroData.map((slide, index) => (
              <button key={index} onClick={() => goToSlide(index)} className={`relative z-30 transition duration-300 ease-in-out h-1 w-24 hover:bg-red-calm ${currentIndex === index ? 'bg-red-calm scale-x-110' : 'bg-gray-400/50'} rounded-full`}></button>
            ))}
          </div>
        </section> 
        <section id="home" className="relative pt-20 pb-14 px-8 bg-white overflow-x-hidden w-full">
          <div className="hidden md:flex bg-[url(./assets/globe-background.png)] bg-contain bg-center bg-no-repeat absolute inset-0 opacity-60 pointer-events-none">
          </div>

          <div className="relative z-10 max-w-7xl mx-auto text-center">
            <span className="inline-block bg-red-calm text-white px-10 py-1.5 rounded-full font-bold text-md mb-6 shadow-lg">
              Our Service
            </span>

            <h2 className="text-3xl/9 md:text-4xl/12 font-bold tracking-wide text-black my-8 max-w-3xl mx-auto">
              Logistics Services to Brace Your Business <br /> for The Global Market
              <div className="absolute inline h-3 w-3 block bg-red-calm ml-2 self-end mb-2.25"></div>
            </h2>

            <p className="text-black max-w-4xl text-md mx-auto font-semibold mb-20 leading-8">
              We understand our clients' need for reliable and trustworthy logistics services. We are committed to meeting our clients' logistics needs, as demonstrated by our investment of time and experience, as well as our professional human resources and business network.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-7">
              
              <div className="group relative justify-items-center">
                <div className="max-w-[270px] pointer-events-none absolute inset-0 translate-x-0 translate-y-0 opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:scale-y-105 group-hover:-translate-y-2 rounded-2xl bg-white [background-image:repeating-linear-gradient(135deg,transparent,transparent_1px,#ef3c2e_2px,#ef3c2e_4px)]"></div>
                <div className="max-w-[270px] relative transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:-translate-x-5 group-hover:-translate-y-7 group-hover:outline-red-calm group-hover:outline-6 group-hover:scale-y-105 bg-white rounded-2xl p-6 h-full shadow-xl flex flex-col items-center text-center">
                  <div className="h-40 mb-6 flex items-center justify-center">
                    <img src={exportHandlingIcon} alt="Export Handling" className="absolute max-h-full translate -translate-y-5 scale-95 lg:scale-105" />
                  </div>
                  <h3 className="font-bold text-xl text-black mb-3">Export Handling</h3>
                  <p className="text-sm font-semibold text-black leading-snug">
                    Efficient and structured export handling to ensure shipment runs smoothly from start to finish.
                  </p>
                </div>
              </div>

              
              <div className="group relative justify-items-center">
                <div className="max-w-[270px] pointer-events-none absolute inset-0 translate-x-0 translate-y-0 opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:scale-y-105 group-hover:-translate-y-2 rounded-2xl bg-white [background-image:repeating-linear-gradient(135deg,transparent,transparent_1px,#ef3c2e_2px,#ef3c2e_4px)]"></div>
                <div className="max-w-[270px] relative transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:-translate-x-5 group-hover:-translate-y-7 group-hover:outline-red-calm group-hover:outline-6 group-hover:scale-y-105 bg-white rounded-2xl p-6 h-full shadow-xl flex flex-col items-center text-center">
                  <div className="h-40 mb-6 flex items-center justify-center"> 
                    <img src={internationalFFIcon} alt="International Freight" className="absolute max-h-full translate -translate-y-7 -translate-x-2" />
                  </div>
                  <h3 className="font-bold text-xl/6 text-black mb-3">International Freight Forwarding</h3>
                  <p className="text-sm text-black font-semibold leading-snug">
                    Flexible and reliable global shipping solutions, connecting your business to the world.
                  </p>
                </div>
              </div>

              
              <div className="group relative justify-items-center">
                <div className="max-w-[270px] pointer-events-none absolute inset-0 translate-x-0 translate-y-0 opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:scale-y-105 group-hover:-translate-y-2 rounded-2xl bg-white [background-image:repeating-linear-gradient(135deg,transparent,transparent_1px,#ef3c2e_2px,#ef3c2e_4px)]"></div>
                <div className="max-w-[270px] relative transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:-translate-x-5 group-hover:-translate-y-7 group-hover:outline-red-calm group-hover:outline-6 group-hover:scale-y-105 bg-white rounded-2xl p-6 h-full shadow-xl flex flex-col items-center text-center">
                  <div className="h-40 mb-6 flex items-center justify-center">
                    <img src={documentClearanceIcon} alt="Import Clearance" className="absolute max-h-full translate -translate-y-4 lg:-translate-y-7 scale-80 lg:scale-90" />
                  </div>
                  <h3 className="font-bold text-xl text-black mb-3">Import Clearance</h3>
                  <p className="text-sm text-black font-semibold leading-snug">
                    Fast and accurate import customs services, comply with all international regulations and documentation clearly.
                  </p>
                </div>
              </div>

              
              <div className="group relative justify-items-center">
                <div className="max-w-[270px] pointer-events-none absolute inset-0 translate-x-0 translate-y-0 opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:scale-y-105 group-hover:-translate-y-2 rounded-2xl bg-white [background-image:repeating-linear-gradient(135deg,transparent,transparent_1px,#ef3c2e_2px,#ef3c2e_4px)]"></div>
                <div className="max-w-[270px] relative transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:-translate-x-5 group-hover:-translate-y-7 group-hover:outline-red-calm group-hover:outline-6 group-hover:scale-y-105 bg-white rounded-2xl p-6 h-full shadow-xl flex flex-col items-center text-center">
                  <div className="h-40 mb-6 flex items-center justify-center">
                    <img src={domesticLogisticIcon} alt="Domestic Delivery" className="absolute max-h-full translate -translate-y-2 lg:-translate-y-4 translate-x-4 scale-70 lg:scale-80" />
                  </div>
                  <h3 className="font-bold text-xl text-black mb-3">Domestic Delivery</h3>
                  <p className="text-sm text-black font-semibold leading-snug">
                    An adaptive and responsive domestic logistics network, providing timely and cost-effective shipping.
                  </p>
                </div>
              </div>

              
              <div className="group relative justify-items-center">
                <div className="max-w-[270px] pointer-events-none absolute inset-0 translate-x-0 translate-y-0 opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:scale-y-105 group-hover:-translate-y-2 rounded-2xl bg-white [background-image:repeating-linear-gradient(135deg,transparent,transparent_1px,#ef3c2e_2px,#ef3c2e_4px)]"></div>
                <div className="max-w-[270px] relative transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:-translate-x-5 group-hover:-translate-y-7 group-hover:outline-red-calm group-hover:outline-6 group-hover:scale-y-105 bg-white rounded-2xl p-6 h-full shadow-xl flex flex-col items-center text-center">
                  <div className="h-40 mb-6 flex items-center justify-center">
                    <img src={undernameEximIcon} alt="Domestic Delivery" className="absolute max-h-full translate -translate-y-4 lg:-translate-y-6 scale-75 lg:scale-85" />
                  </div>
                  <h3 className="font-bold text-xl/6 text-black mb-3">Undername Exim</h3>
                  <p className="text-sm text-black font-semibold leading-snug">
                    A practical solution to legality issues through a flag leasing system for international trade.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="flex justify-center my-6 mx-auto text-xs md:text-sm text-black font-inter font-semibold tracking-widest">
          Get to know us better. 
          <button onClick={() => navigate('/contact')} className="inline-flex items-center gap-2 text-red-calm text-clip tracking-widest font-inter text-xs md:text-sm font-semibold hover:font-extrabold transition-colors group transition duration-300 ease-in-out fill-current ml-2">
            Get a Quote for Your Business
            <svg
              className="w-4 h-4 transform group-hover:translate-x-1 group-hover:scale-x-120 transition-transform fill-current"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.30176 1.42822L10.3857 0.344238C10.8447 -0.114746 11.5869 -0.114746 12.041 0.344238L21.5332 9.83154C21.9922 10.2905 21.9922 11.0327 21.5332 11.4868L12.041 20.979C11.582 21.438 10.8398 21.438 10.3857 20.979L9.30176 19.895C8.83789 19.4312 8.84766 18.6743 9.32129 18.2202L15.2051 12.6147H1.17188C0.522461 12.6147 0 12.0923 0 11.4429V9.88037C0 9.23096 0.522461 8.7085 1.17188 8.7085H15.2051L9.32129 3.10303C8.84277 2.64893 8.83301 1.89209 9.30176 1.42822Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </section>
        <section id="portfolio" className="relative pt-12 pb-14 px-8 bg-white overflow-x-hidden w-full">
          <div className="relative mx-auto max-w-7xl text-center">
            <span className="inline-block bg-red-calm text-white px-10 py-1.5 rounded-full font-bold text-md mb-6 shadow-lg">
              Our Portfolio
            </span>

            <h2 className="text-3xl/9 md:text-4xl/12 font-bold tracking-wide text-black my-8 px-4 md:px-2 max-w-3xl mx-auto">
              Because The Stats Say It All
              <div className="absolute inline h-3 w-3 block bg-red-calm ml-2 self-end mb-2.25"></div>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 justify-self-center gap-4 md:gap-18 mb-6 lg:max-w-[1000px]">
              <div className="group relative flex">
                <div className="max-w-[270px] px-6 h-full flex flex-col items-center text-center">
                  <div className="h-40 mt-10 mb-4 flex items-center justify-center">
                    <img src={deliveredIcon} alt="Delivered Cargo" className="absolute max-h-full scale-90" />
                  </div>
                  <h3 className="font-bold text-3xl/6 text-black my-6 tracking-wide">1000+</h3>
                  <h4 className="text-xl/6 font-bold text-black mt-4 mb-3">
                    Delivered Cargo <div className="absolute inline h-1.75 w-1.75 block bg-red-calm ml-1 self-end mb-1.25"></div>
                  </h4>
                  <p className="text-sm font-semibold text-black leading-snug my-4">We have safely, punctually, and reliably delivered thousands of shipments to various countries.</p>
                </div>
              </div>
              <div className="group relative flex justify-self-center">
                <div className="max-w-[270px] px-6 h-full flex flex-col items-center text-center">
                  <div className="h-40 mt-10 mb-4 flex items-center justify-center">
                    <img src={handledClientsIcon} alt="Handled Clients" className="absolute max-h-full scale-85" />
                  </div>
                  <h3 className="font-bold text-3xl/6 text-black my-6 tracking-wide">350+</h3>
                  <h4 className="text-xl/6 font-bold text-black mt-4 mb-3">
                    Handled Clients<div className="absolute inline h-1.75 w-1.75 block bg-red-calm ml-1 self-end mb-1.25"></div>
                  </h4>
                  <p className="text-sm font-semibold text-black leading-snug my-4">We have handled hundreds of clients from various business scales with professional services and the best customs solutions.</p>
                </div>
              </div>
              <div className="group relative flex justify-self-center">
                <div className="max-w-[270px] px-6 h-full flex flex-col items-center text-center">
                  <div className="h-40 mt-10 mb-4 flex items-center justify-center">
                    <img src={coveredCountriesIcon} alt="Country Covered" className="absolute max-h-full scale-90" />
                  </div>
                  <h3 className="font-bold text-3xl/6 text-black my-6 tracking-wide">18+</h3>
                  <h4 className="text-xl/6 font-bold text-black mt-4 mb-3">
                    Covered Countries<div className="absolute inline h-1.75 w-1.75 block bg-red-calm ml-1 self-end mb-1.25"></div>
                  </h4>
                  <p className="text-sm font-semibold text-black leading-snug my-4">We have safely, punctually, and reliably delivered thousands of shipments to various countries.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="rfq" className="relative py-26 px-4 sm:px-8 lg:px-16 bg-black-calm relative overflow-hidden overflow-x-hidden w-full">
                
          <div className="text-center text-white mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-2 tracking-wide">Need to Make an Enquiry?</h2>
            <p className="text-lg sm:text-xl font-medium opacity-90">Start Save Your Money Today</p>
          </div>

          <div className="bg-white rounded-[50px] max-w-6xl mx-auto p-8 sm:p-12 lg:p-16 shadow-2xl relative z-10">
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              
              <form id="rfqForm" onSubmit={handleSubmit} className="space-y-5">
                
                <div className="relative">
                  <select value={selectedService} onChange={(e) => {
                    setSelectedService(e.target.value);
                    setServiceDetails({}); 
                    setFiles({});
                    }} 
                    className="peer w-full bg-white text-black border-2 border-black rounded-full py-2.5 pl-5 pr-12 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-red-calm appearance-none autofill:shadow-[inset_0_0_0_30px_white]">
                    <option value="Export_Handling">Export Handling</option>
                    <option value="Import_Clearance">Import Clearance</option>
                    <option value="International_FF">International FF</option>
                    <option value="Domestic_Delivery">Domestic Delivery</option>
                    <option value="Undername_Export">Undername Export</option>
                    <option value="Undername_Import">Undername Import</option>
                  </select>
                  <label 
                    htmlFor="select" 
                    className="absolute left-5 top-3 text-black font-bold text-sm pointer-events-none transition-all duration-200 bg-white px-1 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-red-500 peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:text-xs"
                  >
                    Service
                  </label>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-black">
                    <svg
                      className="w-4"
                      viewBox="0 0 20 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.94342 13.5223L0.440763 4.30639C-0.146921 3.66941 -0.146921 2.6394 0.440763 2.0092L1.8537 0.477735C2.44139 -0.159245 3.39168 -0.159245 3.97312 0.477735L10 7.01017L16.0269 0.477735C16.6146 -0.159245 17.5649 -0.159245 18.1463 0.477735L19.5592 2.0092C20.1469 2.64618 20.1469 3.67619 19.5592 4.30639L11.0566 13.5223C10.4814 14.1592 9.5311 14.1592 8.94342 13.5223Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </div>

                {currentSchema.fields.map(field => (
                  <div key={field.name} className="relative mt-6"> 
                    {field.type === 'select' ? (
                      <>
                        <select 
                          onChange={(e) => handleInputChange(field.name, e.target.value)}
                          className="peer w-full bg-white text-black border-2 border-black rounded-full py-2.5 pl-5 pr-12 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-red-calm appearance-none autofill:shadow-[inset_0_0_0_30px_white]"
                        >
                          {field.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                        <label 
                          htmlFor="select" 
                          className="absolute left-5 top-3 text-black font-bold text-sm pointer-events-none transition-all duration-200 bg-white px-1 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-red-500 peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:text-xs"
                        >
                          Service
                        </label>
                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-black">
                          <svg
                            className="w-4"
                            viewBox="0 0 20 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8.94342 13.5223L0.440763 4.30639C-0.146921 3.66941 -0.146921 2.6394 0.440763 2.0092L1.8537 0.477735C2.44139 -0.159245 3.39168 -0.159245 3.97312 0.477735L10 7.01017L16.0269 0.477735C16.6146 -0.159245 17.5649 -0.159245 18.1463 0.477735L19.5592 2.0092C20.1469 2.64618 20.1469 3.67619 19.5592 4.30639L11.0566 13.5223C10.4814 14.1592 9.5311 14.1592 8.94342 13.5223Z"
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                      </>
                    ) :
                    (
                      <div className="relative">
                        <input 
                          type={field.type} 
                          id={field.name}
                          required={field.required}
                          placeholder=" " 
                          accept={field.accept}
                          onChange={(e) => handleInputChange(field.name, e.target.value)} 
                          className="peer w-full bg-white text-black border-2 border-black rounded-full py-2.5 pl-5 pr-12 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-red-calm appearance-none autofill:shadow-[inset_0_0_0_30px_white]"
                        />
                        <label 
                          htmlFor={field.name}
                          className="absolute left-5 top-1/2 -translate-y-1/2 text-black font-bold text-sm pointer-events-none transition-all duration-200 bg-white px-1 
                          peer-focus:-top-0 peer-focus:text-xs peer-focus:text-red-500 
                          peer-[&:not(:placeholder-shown)]:-top-0 peer-[&:not(:placeholder-shown)]:text-xs appearance-none"
                        >
                          {field.label}
                        </label>
                        <div className={`${field.svg === "chevron" ? 'absolute' : 'hidden'} inset-y-0 right-4 flex items-center pointer-events-none text-black`}>
                          <svg
                            className="w-4"
                            viewBox="0 0 20 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8.94342 13.5223L0.440763 4.30639C-0.146921 3.66941 -0.146921 2.6394 0.440763 2.0092L1.8537 0.477735C2.44139 -0.159245 3.39168 -0.159245 3.97312 0.477735L10 7.01017L16.0269 0.477735C16.6146 -0.159245 17.5649 -0.159245 18.1463 0.477735L19.5592 2.0092C20.1469 2.64618 20.1469 3.67619 19.5592 4.30639L11.0566 13.5223C10.4814 14.1592 9.5311 14.1592 8.94342 13.5223Z"
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                        <div className={`${field.svg === "plus" ? 'absolute' : 'hidden'} inset-y-0 right-4 flex items-center pointer-events-none text-black`}>
                          <svg
                            className="w-4 h-4"
                            viewBox="0 0 500 500"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M457.056 207.731H297.872V42.7567C297.872 19.1332 278.743 0 255.124 0C231.505 0 212.376 19.1332 212.376 42.7567V207.731H42.5532C19.1294 207.731 0 226.865 0 250.488C0 274.112 19.1294 293.245 42.7484 293.245H212.571V457.243C212.571 480.867 231.7 500 255.319 500C278.938 500 298.068 480.867 298.068 457.243V293.245H457.252C480.871 293.245 500 274.112 500 250.488C499.707 226.865 480.675 207.731 457.056 207.731Z"
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {currentSchema.requiredFiles.map(docType => (
                  <div key={docType.name} className="relative mt-6"> 
                    {(
                      <div className="relative">
                        <input 
                          type={docType.type} 
                          id={docType.name}
                          required={docType.required}
                          placeholder=" " 
                          accept={docType.accept}
                          onChange={(e) => handleFileChange(docType.name, e.target.files[0])} 
                          className="peer w-full bg-white text-black border-2 border-black rounded-full py-2.5 pl-5 pr-12 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-red-calm appearance-none autofill:shadow-[inset_0_0_0_30px_white]"
                        />
                        <label 
                          htmlFor={docType.name}
                          className="absolute left-5 top-1/2 -translate-y-1/2 text-black font-bold text-sm pointer-events-none transition-all duration-200 bg-white px-1 
                          peer-focus:-top-0 peer-focus:text-xs peer-focus:text-red-500 
                          peer-[&:not(:placeholder-shown)]:-top-0 peer-[&:not(:placeholder-shown)]:text-xs appearance-none"
                        >
                          {docType.label}
                        </label>
                        <div className={`${docType.svg === "plus" ? 'absolute' : 'hidden'} inset-y-0 right-4 flex items-center pointer-events-none text-black`}>
                          <svg
                            className="w-4 h-4"
                            viewBox="0 0 500 500"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M457.056 207.731H297.872V42.7567C297.872 19.1332 278.743 0 255.124 0C231.505 0 212.376 19.1332 212.376 42.7567V207.731H42.5532C19.1294 207.731 0 226.865 0 250.488C0 274.112 19.1294 293.245 42.7484 293.245H212.571V457.243C212.571 480.867 231.7 500 255.319 500C278.938 500 298.068 480.867 298.068 457.243V293.245H457.252C480.871 293.245 500 274.112 500 250.488C499.707 226.865 480.675 207.731 457.056 207.731Z"
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                <div key={"notes"}>
                  <textarea 
                    rows="3"
                    type="text"
                    id="notes"
                    required={true}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    value={serviceDetails['notes'] || ''}
                    placeholder={`Notes
  Example : What kind of documents would you like us to handle?`} 
                    className="w-full bg-white text-black border-2 border-black rounded-[24px] py-3 px-5 font-bold text-sm placeholder-black resize-none focus:outline-none focus:ring-2 focus:ring-red-500 focus:placeholder-transform focus:placeholder-translate-x-5">
                  </textarea>
                </div>

              </form>

              <div className="flex self-center">
                <div className="space-y-4">
                  <div className="flex items-center gap-1.5 text-lg font-bold text-black">
                    <div className="inline h-2 w-2 block bg-red-calm self-end mb-1.5 rounded-full"></div>
                    <span>Get in touch with us</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-black leading-tight">
                    We take care about transportation for your business
                  </h3>

                  <p className="text-black text-sm font-medium leading-relaxed">
                    Our dedication is to handle your business transportation management through excellent service to ensure smooth distribution and operational efficiency at every step.
                  </p>

                  <div className="space-y-3.5 text-sm font-medium text-black">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-red-calm text-white flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px]">
                        <svg
                          className="w-5 h-5"
                          viewBox="0 0 364 530"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M248.267 374.309C307.509 385.416 348.238 411.335 348.238 440.956C348.238 481.684 274.185 515.008 181.619 515.008C89.0529 515.008 15 481.684 15 440.956C15 411.335 59.4318 381.714 118.674 374.309"
                            stroke="currentColor"
                            strokeWidth="30"
                            strokeMiterlimit="10"
                          />

                          <path
                            d="M40.9351 229.9L44.6378 237.305L52.043 248.413L159.42 422.436C166.825 437.246 189.041 444.651 203.852 433.543C207.554 429.841 211.257 426.138 214.959 422.436L322.336 226.197C329.741 211.387 337.147 181.766 337.147 166.955C333.444 81.7951 263.094 15.1481 177.933 15.1481C96.4748 11.4455 26.1245 78.0925 22.4219 163.253C22.4219 185.468 29.8272 211.387 40.9351 229.9Z"
                            stroke="currentColor"
                            strokeWidth="30"
                            strokeMiterlimit="10"
                          />

                          <path
                            d="M181.644 203.982C210.272 203.982 233.481 180.774 233.481 152.145C233.481 123.517 210.272 100.309 181.644 100.309C153.015 100.309 129.807 123.517 129.807 152.145C129.807 180.774 153.015 203.982 181.644 203.982Z"
                            stroke="currentColor"
                            strokeWidth="30"
                            strokeMiterlimit="10"
                          />
                        </svg>
                      </div>
                      <span>Semarang Indah E2 No.65, Kota Semarang, 50144</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-[#ef3326] text-white flex items-center justify-center flex-shrink-0 text-[10px]">
                        <svg
                          className="w-3.75 h-3.75"
                          viewBox="0 0 500 500"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M481.836 24.0335L380.276 0.596485C369.241 -1.94252 357.913 3.81907 353.421 14.1704L306.547 123.543C302.445 133.113 305.18 144.343 313.285 150.886L372.464 199.323C337.308 274.224 275.883 336.527 199.42 372.366L150.984 313.188C144.343 305.082 133.211 302.348 123.64 306.449L14.2677 353.323C3.81869 357.913 -1.94291 369.241 0.596097 380.276L24.0331 481.836C26.4745 492.383 35.8493 500 46.8842 500C296.977 500 500 297.368 500 46.8846C500 35.9473 492.481 26.4748 481.836 24.0335Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                      <span>024-76438979</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-[#ef3326] text-white flex items-center justify-center flex-shrink-0 text-[10px]">
                        <svg
                          className="w-4.5 h-3"
                          viewBox="0 0 530 380"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M446.818 15H253.636H60.4545C24.0909 15 15 52.6344 15 71.4516V319.839C15 355.968 45.303 365 60.4545 365H469.545C505.909 365 515 334.892 515 319.839V71.4516C515 26.2903 469.545 15 446.818 15Z"
                            stroke="currentColor"
                            strokeWidth="30"
                          />
                          <path
                            d="M38.4824 26.7273L273.06 237.847L495.909 26.7273"
                            stroke="currentColor"
                            strokeWidth="30"
                          />
                        </svg>

                      </div>
                      <span>asalogistic.office@gmail.com</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-[#ef3326] text-white flex items-center justify-center flex-shrink-0 text-[10px]">
                        <svg
                          className="w-4 h-4"
                          viewBox="0 0 501 500"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M250.556 121.806C179.471 121.806 122.134 179.042 122.134 250C122.134 320.958 179.471 378.194 250.556 378.194C321.64 378.194 378.977 320.958 378.977 250C378.977 179.042 321.64 121.806 250.556 121.806ZM250.556 333.343C204.619 333.343 167.065 295.967 167.065 250C167.065 204.033 204.507 166.657 250.556 166.657C296.604 166.657 334.047 204.033 334.047 250C334.047 295.967 296.493 333.343 250.556 333.343ZM414.184 116.563C414.184 133.186 400.772 146.463 384.23 146.463C367.577 146.463 354.277 133.075 354.277 116.563C354.277 100.05 367.689 86.6618 384.23 86.6618C400.772 86.6618 414.184 100.05 414.184 116.563ZM499.24 146.91C497.34 106.856 488.175 71.3768 458.78 42.1455C429.496 12.9142 393.954 3.76548 353.83 1.75722C312.475 -0.585741 188.525 -0.585741 147.17 1.75722C107.158 3.65391 71.6153 12.8026 42.2204 42.0339C12.8254 71.2652 3.77217 106.744 1.76035 146.798C-0.586782 188.079 -0.586782 311.81 1.76035 353.09C3.6604 393.144 12.8254 428.623 42.2204 457.855C71.6153 487.086 107.046 496.234 147.17 498.243C188.525 500.586 312.475 500.586 353.83 498.243C393.954 496.346 429.496 487.197 458.78 457.855C488.063 428.623 497.228 393.144 499.24 353.09C501.587 311.81 501.587 188.19 499.24 146.91ZM445.815 397.384C437.097 419.251 420.22 436.098 398.201 444.912C365.23 457.966 286.992 454.954 250.556 454.954C214.12 454.954 135.77 457.855 102.91 444.912C81.0038 436.21 64.1269 419.363 55.2972 397.384C42.2204 364.471 45.2381 286.372 45.2381 250C45.2381 213.628 42.3321 135.418 55.2972 102.616C64.0151 80.7486 80.8921 63.9016 102.91 55.0876C135.882 42.0339 214.12 45.0463 250.556 45.0463C286.992 45.0463 365.342 42.1455 398.201 55.0876C420.108 63.79 436.985 80.6371 445.815 102.616C458.891 135.529 455.874 213.628 455.874 250C455.874 286.372 458.891 364.582 445.815 397.384Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                      <span>asa.logistic</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <div className="flex justify-center mt-12">
              <button type="submit" form="rfqForm" className="bg-red-calm text-white font-bold px-10 py-3 rounded-full text-sm shadow-md hover:bg-red-700 transition-all duration-300 hover:scale-105">
                Get a Free Quote
              </button>
            </div>

            <div className="absolute -bottom-10 -right-25 w-50 lg:w-70 pointer-events-none hidden sm:block z-20">
              <img src={forkLiftIcon} className="opacity-100 w-full h-auto" alt="forklift-placeholder" />
            </div>

          </div>
        </section>
        <section id="achievements" className="relative pt-28 pb-6 px-8 bg-white w-full overflow-hidden">
          <div className="absolute z-0 top-0 left-15 w-[25%] opacity-0 md:opacity-75"><img src={bgAchievements1} /></div>
          <div className="absolute z-0 bottom-5 -right-13 w-[25%] opacity-0 md:opacity-75"><img src={bgAchievements2} /></div>
          <div className="relative z-10 max-w-7xl mx-auto text-center">
            <span className="inline-block bg-red-calm text-white px-10 py-1.5 rounded-full font-bold text-md mb-8 shadow-lg">
              Our Achievements
            </span>

            <div className="w-5/6 md:w-[440px] relative justify-self-center bg-white rounded-2xl p-6 h-full shadow-xl flex flex-col items-center text-center px-12 py-2 mx-6 my-6">
              <h3 className="font-bold mt-6 text-xl text-black mb-3">A Member of</h3>
              <div className="h-40 mb-4 flex items-center justify-center scale-95">
                <img src={alfiLogo} alt="ALFI Logo" />
              </div>
            </div>

            <div className="flex justify-center items-center flex-row mt-30 mb-6">
              <div className="flex text-black text-base font-semibold tracking-widest pointer-events-none">
                Find out the status of your quotation. 
              </div>
              <button onClick={() => navigate('/login')} className="flex w-42 text-red-calm font-semibold text-base hover:font-bold hover:text-base mx-2">Check your quotation</button>
            </div>
                      
          </div>
        </section>
        <section className="relative pt-10 px-8 bg-white w-full overflow-hidden">
          <div className="grid grid-col-1 md:grid-cols-3 gap-18 md:gap-4 items-center justify-items-center w-full">
            <div className="relative max-w-[250px]">
              <img src={maerskLogo} alt="Maersk Logo" />
            </div>
            <div className="relative max-w-[250px]">
              <img src={hafaLogo} alt="Hafa Cargo Logo" />
            </div>
            <div className="relative max-w-[150px]">
              <img src={mscLogo} alt="MSC Logo" />
            </div>
          </div>
        </section>
        <section className="relative py-16 px-8 lg:px-16 bg-white w-full min-h-[600px] h-[900px] flex flex-col lg:flex-row overflow-hidden justify-center items-center">
          <div className="flex lg:absolute z-10 lg:z-20 lg:top-[50%] lg:left-[50%] transform lg:-translate-x-[95%] lg:-translate-y-[55%] w-full h-[40%] lg:w-[600px] lg:h-[360px] bg-[url(./assets/logistic-solutions.png)] bg-cover bg-center bg-no-repeat rounded-tr-4xl rounded-tl-4xl md:rounded-4xl shadow-xl opacity-100">
          </div>
          <div className="flex lg:absolute z-20 lg:z-10 lg:top-[50%] lg:left-[50%] transform -translate-y-10 lg:-translate-x-[5%] lg:-translate-y-[35%] w-auto h-auto  lg:w-[600px] lg:h-[360px] bg-black-calm rounded-4xl shadow-xl opacity-100 flex flex-col justify-center py-8">
            <h3 className="my-2 mx-8 lg:ml-20 xl:ml-24 mr-4 font-bold text-3xl lg:text-4xl text-white">. Logistic Solution</h3>
            <p className="my-4 mx-8 lg:ml-20 xl:ml-24 mr-8 text-xs md:text-sm leading-7 font-normal tracking-normal text-white overflow-hidden text-clip">Assisting you in discovering the right solution through objective advice is our priority. Our service procurement process is conducted transparently, following the standards and specifications developed by our Supply Chain Solution team.</p>
            <div className="my-4 mx-8 lg:ml-20 xl:ml-24 mr-8 mb-4 lg:mb-12">
              <button onClick={() => navigate('/contact')} className="inline-flex items-center gap-2 text-white leading-7 text-clip tracking-wide font-inter text-sm md:text-base font-semibold hover:font-extrabold transition-colors group transition duration-300 ease-in-out fill-current">
                Get a Quote for Your Business
                <svg
                  className="w-4 h-4 transform group-hover:translate-x-1 group-hover:scale-x-120 transition-transform fill-current"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.30176 1.42822L10.3857 0.344238C10.8447 -0.114746 11.5869 -0.114746 12.041 0.344238L21.5332 9.83154C21.9922 10.2905 21.9922 11.0327 21.5332 11.4868L12.041 20.979C11.582 21.438 10.8398 21.438 10.3857 20.979L9.30176 19.895C8.83789 19.4312 8.84766 18.6743 9.32129 18.2202L15.2051 12.6147H1.17188C0.522461 12.6147 0 12.0923 0 11.4429V9.88037C0 9.23096 0.522461 8.7085 1.17188 8.7085H15.2051L9.32129 3.10303C8.84277 2.64893 8.83301 1.89209 9.30176 1.42822Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
            <img src={logisticSolutionAcc} className="hidden
            lg:block
            absolute
            -bottom-4
            right-0
            w-50
            translate-x-8
            translate-y-6
            pointer-events-none" />
          </div>
        </section>
        <section id="articles" className="relative py-8 px-8 bg-white w-full overflow-hidden text-center">
          <span className="inline-block bg-red-calm text-white px-10 py-1.5 rounded-full font-bold text-md mb-8 shadow-lg">
            Recent Articles
          </span>
          <div className="py-14 flex flex-col justify-center overflow-hidden">
            <div className="absolute inset-x-0 bottom-15 z-0">
              <img 
                src={bgArticle} 
                className="w-full h-[400px] bottom-0 object-cover blur-xs" 
                alt="bg-container"
              />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto w-full">
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8 mb-16">
                
                {sampleArticleFromDB.map((data, index) => (
                  <div key={data.path} className="bg-white rounded-2xl mx-2 shadow-xl transition-transform hover:-translate-y-2 duration-300 overflow-hidden">
                    <div className="h-min-[15%] h-max-[55%] h-auto overflow-hidden">
                      <img 
                        src={data.featured_image}
                        alt="Logistics Strategy" 
                        className="w-full object-cover"
                      />
                    </div>
                    <div className="p-6 pb-10 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl text-left font-bold text-black leading-tight mb-2 line-clamp-3" title={data.title}>
                          {data.title}
                        </h3>
                      </div>
                      
                      <button 
                        onClick={() => activeArticle(data, index)} 
                        className="text-red-calm font-semibold hover:font-bold transition-colors flex items-center"
                      >
                        View More
                      </button>
                    </div>
                  </div>
                ))}
                
                {/* <button onClick={() => navigate('/article2')} className="bg-white rounded-2xl mx-6 overflow-hidden shadow-xl transition-transform hover:-translate-y-2 duration-300">
                  <div className="h-[55%] overflow-hidden">
                    <img 
                      src={article1}
                      alt="Logistics Strategy" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 pb-10">
                    <h3 className="text-xl text-left font-bold text-black leading-tight mb-2">
                      Logistics Efficiency Strategy: The Vital Role of PPJK and EMKL for Businesses in Indonesia
                    </h3>
                    <a href="#" className="text-red-calm font-semibold hover:font-bold transition-colors flex items-center my-4">
                      View More
                    </a>
                  </div>
                </button>
                <button onClick={() => navigate('/article3')} className="bg-white rounded-2xl mx-6 overflow-hidden shadow-xl transition-transform hover:-translate-y-2 duration-300">
                  <div className="h-[55%] overflow-hidden">
                    <img 
                      src={article1}
                      alt="Logistics Strategy" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 pb-10">
                    <h3 className="text-xl text-left font-bold text-black leading-tight mb-2">
                      Logistics Efficiency Strategy: The Vital Role of PPJK and EMKL for Businesses in Indonesia
                    </h3>
                    <a href="#" className="text-red-calm font-semibold hover:font-bold transition-colors flex items-center my-4">
                      View More
                    </a>
                  </div>
                </button> */}

              </div>

              <div className="absolute bottom-3 w-full flex justify-center gap-3 px-8">
                {/* <div className="h-1 w-24 bg-gray-400/50 rounded-full"></div> */}
                <div className="h-1 w-24 bg-red-600 rounded-full"></div>
                {/* <div className="h-1 w-24 bg-gray-400/50 rounded-full"></div> */}
              </div>

            </div>
          </div>
        </section>
        <section className="relative py-10 px-8 bg-white w-full overflow-hidden text-center">
          <span className="inline-block bg-red-calm text-white px-10 py-1.5 rounded-full font-bold text-md mb-6 shadow-lg">
            Our Service
          </span>

          <h2 className="text-3xl/9 md:text-4xl/12 font-bold tracking-wide text-black mt-6 mb-10 max-w-3xl mx-auto">
            <div className="absolute inline h-2.5 w-2.5 block bg-red-calm ml-2 self-end mb-2.25 transform -translate-x-6 rounded-full"></div>
            Here to Fulfill Your Logistics Needs
          </h2>

          <p className="text-black max-w-lg mx-auto text-md font-semibold mb-14 leading-8">
            Stop worrying about complicated and complex logistics needs. Focus on your business and let us do of the rest when it comes to logistics.
          </p>

          <button onClick={() => navigate('/contact')} className="inline-flex items-center gap-2 text-red-calm leading-7 text-clip tracking-wide font-inter text-lg md:text-xl font-bold hover:font-extrabold transition-colors group transition duration-300 ease-in-out fill-current my-8">
            Get a Free Quote 
          </button>
        </section>
      </section>
    </motion.div>
  );
};

export default About;