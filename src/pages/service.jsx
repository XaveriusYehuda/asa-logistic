import React, {useState, useEffect} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import rightArrrow from '../assets/right-arrow-red.svg'
import serviceData from '../data/serviceData';

const Service = ({ goToServiceSlide, currentServiceIndexcheck, navigate, pageVariants }) => {

  const [searchParams] = useSearchParams();
  
  const currentServiceIndex = searchParams.get("tab") || serviceData[0].idHTML;

  const currentServiceData =  serviceData.find(item => item.idHTML === currentServiceIndex) || serviceData[0];

  console.log(currentServiceIndex);

  const accessServiceData = serviceData;

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full"
    >
      <section className="relative h-screen overflow-hidden">
        <div className="md:hidden h-full w-full"></div>
        <div className="md:relative md:h-[88px] lg:h-[120px] w-full"></div>
        <div className="absolute inset-0 z-0 overflow-hidden">
          {accessServiceData.map((slide, index) => (
            <div
              key={slide.idHTML}
              className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${
                currentServiceIndex === slide.idHTML ? "opacity-100" : "opacity-0"
              }`}
              style={{
                backgroundImage: `url(${slide.heroImage})`,
              }}
            />
          ))}
        </div>
        <div className="bg-black z-10 inset-0 absolute opacity-45">
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentServiceIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 md:relative z-10 flex flex-col items-center justify-center text-white gap-4 h-full md:h-[70%] px-6"
          >
            <h1 className={`font-inter text-center font-bold leading-tight text-4xl xl:text-6xl`}>
              <span className="font-extrabold text-red-calm text-5xl md:text-6xl xl:text-7xl px-1">.</span>
              {currentServiceData.heroTitle}
            </h1>
            <p className={`font-inter text-center text-sm md:text-md text-gray-200 max-w-xl mb-2`}>
              {currentServiceData.heroCaption}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-5 left-0 w-full flex items-start justify-start md:justify-center gap-8 xl:gap-12 px-8 my-4 overflow-x-auto no-scrollbar md:overflow-x-visible z-30">
          {accessServiceData.map((slide, index) => (
            <button 
              key={slide.idHTML} 
              onClick={() => goToServiceSlide(slide.idHTML, slide.path)} 
              className={`group transition duration-300 ease-in-out origin-center cursor-pointer outline-none w-46 min-w-[90px]`}>

              <div className={`w-full h-1 rounded-full transition duration-300 ease-in-out ${currentServiceIndex === slide.idHTML ? 'bg-red-calm scale-x-110' : 'bg-gray-100/70 group-hover:bg-red-calm'}`}></div>

              <div className={`group-hover:text-red-calm font-inter font-semibold text-xs xl:text-sm transition duration-300 ease-in-out pt-3 ${currentServiceIndex === slide.idHTML ? 'text-red-calm' : 'text-gray-100/70'} rounded-full`}>
                {index === 0 ? "Export Handling" : index === 1 ? "Import Clearance" : index === 2 ? "International Freight" : index === 3 ? "Domestic Delivery" : "Undername Export Import"}
              </div>
            </button>
          ))}
        </div>
      </section>
      <section id={currentServiceData.idHTML} className="relative pt-20 px-8 bg-white overflow-x-hidden w-full">
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <span className="inline-block bg-red-calm text-white px-10 py-1.5 rounded-full font-bold text-md mb-6 shadow-lg">
            {currentServiceData.mainTag}
          </span>

          <h2 className="text-3xl/9 md:text-4xl/12 font-bold tracking-wide text-black my-8 max-w-3xl mx-auto">
            <span className="font-extrabold text-red-calm text-3xl md:text-4xl xl:text-5xl mx-0.5">.</span>
            {currentServiceData.mainTittle}
          </h2>

          <p className="text-black max-w-4xl text-md mx-auto font-semibold mb-6 leading-8">
            {currentServiceData.mainCaption}
          </p>
        </div>
      </section>
      <section className="relative px-8 py-18 bg-white overflow-hidden w-full h-auto md:h-[580px] flex flex-col gap-6 md:gap-0 items-center justify-center">
        <div className="w-full md:w-[240px] lg:w-[280px] z-10 md:absolute md:left-1/2 md:-translate-x-[150%] bg-white rounded-2xl h-[400px] shadow-2xl flex flex-col items-center text-center px-10 py-6">
          <div className="h-40 lg:mb-6 flex items-center justify-center"> 
            <img src={currentServiceData.centerCardImage} alt={currentServiceData.centerCardTitle} className="h-full object-contain" />
          </div>
          <h3 className="flex font-bold text-xl/6 text-black my-4">{currentServiceData.centerCardTitle}</h3>
          <p className="flex text-sm text-black font-semibold leading-snug">
            {currentServiceData.centerCardCaption}
          </p>
        </div>
        <div className="w-full md:w-[240px] lg:w-[280px] md:relative z-10 md:z-20 bg-white rounded-2xl h-[400px] shadow-2xl flex flex-col items-center text-center px-10 py-6 md:scale-110">
          <div className="h-40 lg:mb-6 flex items-center justify-center"> 
            <img src={currentServiceData.leftCardImage} alt={currentServiceData.leftCardTitle} className="h-full object-contain" />
          </div>
          <h3 className="flex font-bold text-xl/6 text-black my-4">{currentServiceData.leftCardTitle}</h3>
          <p className="flex text-sm text-black font-semibold leading-snug">
            {currentServiceData.leftCardCaption}
          </p>
        </div>
        <div className="w-full md:w-[240px] lg:w-[280px] md:absolute z-10 bg-white md:left-1/2 md:translate-x-[50%] rounded-2xl h-[400px] shadow-2xl flex flex-col items-center text-center px-10 py-6">
          <div className="h-40 lg:mb-6 flex items-center justify-center"> 
            <img src={currentServiceData.rightCardImage} alt={currentServiceData.rightCardTitle} className="h-full object-contain" />
          </div>
          <h3 className="flex font-bold text-xl/6 text-black my-4">{currentServiceData.rightCardTitle}</h3>
          <p className="flex text-sm text-black font-semibold leading-snug">
            {currentServiceData.rightCardCaption}
          </p>
        </div>
      </section>
      <section className="relative px-6 py-4 md:p-8 mb-8 md:mb-24 bg-white overflow-hidden w-full h-auto flex flex-col md:flex-row">
        <div className="relative flex w-full md:w-7/12">
          <div className="flex flex-col gap-4 py-8 px-4 md:px-6 xl:p-8 justify-center">
            <h3 className="font-bold text-3xl text-black">
              <span className="inline-block bg-red-calm text-white rounded-full font-bold h-2 w-2 mr-1.5 shadow-lg"></span>
              {currentServiceData.subTitle}
              <span className="inline font-bold text-3xl text-red-calm">
                {currentServiceData.subTitleRed}
              </span>
            </h3>
            <p className="mr-8 lg:mr-24 text-md leading-7 font-semibold tracking-normal text-black overflow-hidden text-clip">{currentServiceData.subCaption}</p>
            <button onClick={() => navigate('/contact')} className="inline-flex items-center gap-2 text-red-calm leading-7 text-clip tracking-wide font-inter text-sm md:text-base md:text-lg font-semibold hover:font-extrabold transition-colors group transition duration-300 ease-in-out fill-current">
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
        </div>
        <div className="relative flex w-full md:w-5/12 justify-center items-center py-16">
          <div className={`w-[85%] z-20 h-[250px] bg-cover bg-center rounded-2xl shadow-2xl/30`} style={{backgroundImage : `url(${currentServiceData.subImage})`}}>
          </div>
          <div className={`absolute z-0 transform translate-x-1/16 translate-y-1/10 w-[85%] h-[250px] bg-red-calm rounded-2xl shadow-2xl/30`}>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Service;