import React, {useState} from "react";
import { motion } from "framer-motion";
import {resourceData, goalsData } from '../data/resourceData';
import bgHero3 from '../assets/bg-hero-3.webp';
import commitmentImage from '../assets/resourceImage/commitment.png';
import valuesImage from '../assets/resourceImage/values.png';
import cultureImage from '../assets/resourceImage/culture.png';
import rightArrrowWhite from '../assets/right-arrow-white.svg';
import driveIcon from '../assets/mainServiceCard/centerInternationalFreight.png';
import customsCredibility from '../assets/resourceImage/customsCredibility.png';
import deliveryAccuracy from '../assets/resourceImage/deliveryAccuracy.png';
import integratedSupplyChain from '../assets/resourceImage/integratedSupplyChain.png';
import realTimeTracking from '../assets/resourceImage/realTimeTracking.png';
import { Link } from "react-scroll";

const Resource = ({currentResourceIndex, scrollToSection, navigate, pageVariants}) => {

  const accessResourceData = resourceData;

  const accessGoalsData = goalsData;

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
          <div 
            style={{ 
              backgroundImage: `url(${bgHero3})`,
            }}     
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat}`} />
        </div>
        <div className="bg-black z-10 inset-0 absolute opacity-20">
        </div>

        <div
          className="absolute inset-0 md:relative z-10 flex flex-col items-center justify-center text-white gap-4 h-full md:h-[70%] px-6"
        >
          <h1 className={`font-inter text-center font-bold leading-tight text-4xl xl:text-6xl`}>
            <span className="font-extrabold text-red-calm text-5xl md:text-6xl xl:text-7xl px-1">.</span>
            Company Profile
          </h1>
          <p className={`font-inter text-center text-sm md:text-md text-gray-200 max-w-xl mb-2`}>
            It is our commitment to contribute to the continuous distribution of your business logistics from end to end.
          </p>
        </div>

        <div className="absolute bottom-5 left-0 w-full flex items-start justify-start md:justify-center gap-8 xl:gap-12 px-8 my-4 overflow-x-auto no-scrollbar md:overflow-x-visible z-30">
          {accessResourceData.map((slide, index) => (
            <Link 
              to={slide.idHTML}
              spy
              smooth
              duration={1500}
              offset={-70}
              key={slide.idHTML} 
              onClick={() => scrollToSection(slide.path)} 
              className={`group transition duration-300 ease-in-out origin-center cursor-pointer outline-none w-42 min-w-[90px]`}>

              <div className={`w-full h-1 rounded-full transition duration-300 ease-in-out ${currentResourceIndex === slide.idHTML ? 'bg-red-calm scale-x-110' : 'bg-gray-100/70 group-hover:bg-red-calm'}`}></div>

              <div className={`group-hover:text-red-calm font-inter font-semibold text-xs text-center xl:text-sm transition duration-300 ease-in-out pt-3 ${currentResourceIndex === slide.idHTML ? 'text-red-calm' : 'text-gray-100/70'} rounded-full`}>
                {index === 0 ? "Profile" : index === 1 ? "Goals" : index === 2 ? "Missions" : "Why Choose Us?"}
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section id="profile" className="relative px-8 pt-24 md:pt-32 pb-8 md:pb-16 bg-white overflow-hidden w-full h-auto flex flex-col md:flex-row">
        <div className="flex w-full md:w-1/2 items-center justify-start md:justify-center pl-4">
          <span className="font-extrabold text-red-calm text-4xl xl:text-5xl mx-0.5 mb-3 md:mb-2.5 xl:mb-5">.</span>
          <h2 className="font-bold font-inter text-black text-2xl md:text-3xl tracking-wide">ASA Logistics History</h2>
        </div>
        <div className="flex w-full md:w-1/2 items-center justify-center pt-4 md:pt-0 px-4">
          <p className="font-inter font-medium text-sm/6 text-black tracking-wide font-stretch-extra-expanded lg:mr-16">PT Ardana Sejahtera Abadi (ASA Logistics) was established in December 2013 and is based in Semarang, as stated in the notarial deed of Ida Widiyanti, S. H.. The enterprise is engaged in EMKL (Sea Freight Forwarding) and Freight Forwarder services.</p>
        </div>
      </section>
      <section id="goals" className="relative px-8 pt-8 pb-16 bg-white overflow-hidden w-full h-auto flex flex-col">
        <div className="flex items-center justify-center w-full py-4">
          <span className="font-extrabold text-red-calm text-3xl md:text-4xl xl:text-5xl mx-0.5 mb-2 xl:mb-5">.</span>
          <h2 className="font-bold font-inter text-center text-black text-3xl tracking-wide">The Goals</h2>
        </div>
        <div className="flex items-center justify-center w-full py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mx-8">
            {accessGoalsData.map((slide, index) => (
              <div class="group relative justify-items-center">
                <div class="max-w-[400px] pointer-events-none absolute inset-0 translate-x-0 translate-y-0 opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:scale-y-105 group-hover:-translate-y-2 rounded-2xl bg-white [background-image:repeating-linear-gradient(135deg,transparent,transparent_1px,#ef3c2e_2px,#ef3c2e_4px)]"></div>
                <div class="max-w-[400px] relative transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:-translate-x-5 group-hover:-translate-y-7 group-hover:outline-red-calm group-hover:outline-6 group-hover:scale-y-105 bg-white rounded-2xl p-6 h-full shadow-xl flex flex-col items-center text-center">
                  <h3 class="font-bold text-xl text-black mb-3">{slide.goalsTitle}</h3>
                  <p class="text-sm font-semibold text-black leading-snug">
                    {slide.goalsCaption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="missions" className="relative px-8 pt-8 pb-8 bg-white overflow-hidden w-full h-auto flex flex-col">
        <div className="flex w-full items-center justify-center py-4">
          <span className="font-extrabold text-red-calm text-3xl md:text-4xl xl:text-5xl mx-0.5 mb-2 xl:mb-5">.</span>
          <h2 className="font-bold font-inter text-center text-black text-3xl tracking-wide">The Missions</h2>
        </div>
        <div className="relative px-8 pt-8 pb-16 bg-white overflow-hidden w-full h-auto md:h-[580px] flex flex-col gap-6 md:gap-0 items-center justify-center">
          <div className="w-full md:w-[240px] lg:w-[280px] z-10 md:absolute md:left-1/2 md:-translate-x-[150%] bg-white rounded-2xl h-[400px] shadow-2xl flex flex-col items-center text-center px-10 py-6">
            <div className="h-40 lg:mb-6 flex items-center justify-center"> 
              <img src={valuesImage} alt="Our Values" className="h-full object-contain" />
            </div>
            <h3 className="flex font-bold text-xl/6 text-black my-4">Values</h3>
            <p className="flex text-xs text-black font-semibold leading-normal">
              Delivering high-quality services, on-time delivery, fast, accurate, secure, at competitive prices through professional management, and customer satisfaction
            </p>
          </div>
          <div className="w-full md:w-[240px] lg:w-[280px] md:relative z-10 md:z-20 bg-white rounded-2xl h-[400px] shadow-2xl flex flex-col items-center text-center px-10 py-6 md:scale-110">
            <div className="h-40 lg:mb-6 flex items-center justify-center"> 
              <img src={commitmentImage} alt="Our Commitment" class="h-full object-contain" />
            </div>
            <h3 className="flex font-bold text-xl/6 text-black my-4">Commitment</h3>
            <p className="flex text-xs text-black font-semibold leading-normal">
              Striving to continuously develop the quality of human resources, services, and communication in order to increase productivity, efficiency, and provide opportunities for innovation
            </p>
          </div>
          <div className="w-full md:w-[240px] lg:w-[280px] md:absolute z-10 bg-white md:left-1/2 md:translate-x-[50%] rounded-2xl h-[400px] shadow-2xl flex flex-col items-center text-center px-10 py-6">
            <div className="h-40 lg:mb-6 flex items-center justify-center"> 
              <img src={cultureImage} alt="Our Culture" class="h-full object-contain" />
            </div>
            <h3 className="flex font-bold text-xl/6 text-black my-4">Culture</h3>
            <p className="flex text-xs text-black font-semibold leading-normal">
              Partnering with customers to form balanced, mutually respectful, mutually beneficial cooperation, and to achieve better mutual prosperity
            </p>
          </div>
        </div>
      </section>
      <section className="relative py-16 px-8 lg:px-16 bg-white w-full min-h-[600px] h-[900px] flex flex-col lg:flex-row overflow-hidden justify-center items-center">
        <div className="flex lg:absolute z-10 lg:z-20 lg:top-[50%] lg:left-[50%] transform lg:-translate-x-[95%] lg:-translate-y-[55%] w-full h-[40%] lg:w-[600px] lg:h-[360px] bg-[url(./assets/logistic-solutions.png)] bg-cover bg-center bg-no-repeat rounded-tr-4xl rounded-tl-4xl md:rounded-4xl shadow-xl opacity-100">
        </div>
        <div className="flex lg:absolute z-20 lg:z-10 lg:top-[50%] lg:left-[50%] transform -translate-y-10 lg:-translate-x-[5%] lg:-translate-y-[35%] w-auto h-auto  lg:w-[600px] lg:h-[360px] bg-red-calm rounded-4xl shadow-xl opacity-100 flex flex-col justify-center py-8">
          <h3 className="mt-8 lg:mt-18 mb-2 mb-0 ml-24 mr-4 font-bold text-4xl text-white">. Logistic Solution</h3>
          <p className="mt-4 mb-2 ml-24 mr-8 pr-8 text-sm leading-7 font-normal tracking-normal text-white overflow-hidden text-clip">Assisting you in discovering the right solution through objective advice is our priority. Our service procurement process is conducted transparently, following the standards and specifications developed by our Supply Chain Solution team.</p>
          <div className="ml-24 mt-4 mb-4 lg:mb-12">
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
          <img src={driveIcon} className="hidden
            lg:block
            absolute
            -top-25
            right-0
            w-50
            translate-x-8
            translate-y-6
            pointer-events-none" />
        </div>
      </section>
      
      <section id="whychooseus" className="relative px-6 sm:px-12 pt-8 pb-16 bg-white overflow-hidden w-full h-auto">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-start">
            
            <div className="space-y-6">
              <h2 className="text-3xl font-extrabold font-inter text-black tracking-tight">
                Why Choose Us?
              </h2>
              <p className="text-black font-inter text-[15px] leading-relaxed font-medium">
                ASA Logistics is proud to be a leading partner in Customs Clearance and Sea Freight Forwarding services throughout Indonesia. With the support of our team of experts and the latest digital tracking system, we combine decades of experience to ensure the smooth flow of your goods. Through integrated supply chain solutions, we help large companies in Indonesia achieve sustainable logistics efficiency and competitive advantage.
              </p>
              <div className="pt-2">
                <button onClick={() => navigate('/service')} className="inline-flex items-center gap-2 text-red-calm leading-7 text-clip tracking-wide font-inter text-sm md:text-md md:text-lg font-semibold hover:font-extrabold transition-colors group transition duration-300 ease-in-out fill-current">
                  Explore our services
                  <svg
                    className="w-4 h-4 transform group-hover:translate-x-1 group-hover:scale-x-120 transition-transform mt-1 fill-current"
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

            <div className="space-y-12">
              <div className="flex items-start gap-4 lg:h-[140px] xl:h-[90px]">
                <div className="flex-shrink-0 w-16 h-16 mt-2 flex items-center justify-center">
                  <img src={customsCredibility} alt="Customs Credibility" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-inter text-black mb-2">Customs Credibility</h3>
                  <p className="text-black font-inter text-sm leading-relaxed font-medium">
                    A swift and accurate administrative process that is fully compliant with applicable regulations.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 lg:h-[140px] xl:h-[90px]">
                <div className="flex-shrink-0 w-16 h-16 mt-2 flex items-center justify-center">
                  <img src={realTimeTracking} alt="Real-Time Tracking" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-inter text-black mb-2">Real-Time Tracking</h3>
                  <p className="text-black font-inter text-sm leading-relaxed font-medium">
                    A digital monitoring system that tracks the location and status of a shipment at any time
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-12">
              <div className="flex items-start gap-4 lg:h-[140px] xl:h-[90px]">
                <div className="flex-shrink-0 w-16 h-16 mt-2 flex items-center justify-center">
                  <img src={deliveryAccuracy} alt="Delivery Accuracy" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-inter text-black mb-2">Delivery Accuracy</h3>
                  <p className="text-black font-inter text-sm leading-relaxed font-medium">
                    On-time delivery through efficient route planning to ensure a smooth supply chain
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 lg:h-[140px] xl:h-[90px]">
                <div className="flex-shrink-0 w-16 h-16 mt-2 flex items-center justify-center">
                  <img src={integratedSupplyChain} alt="Integrated Supply Chain" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-inter text-black mb-2">Integrated Supply Chain</h3>
                  <p className="text-black font-inter text-sm leading-relaxed font-medium">
                    Integrated services that improve operational efficiency
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      <section className="relative py-10 px-8 bg-white w-full overflow-hidden text-center">
        <span className="inline-block bg-red-calm text-white px-10 py-1.5 rounded-full font-bold text-md mb-6 shadow-lg">
          On Point
        </span>

        <h2 className="text-3xl/9 md:text-4xl/12 font-bold tracking-wide text-black mt-6 mb-10 max-w-3xl mx-auto">
          <div className="absolute inline h-2.5 w-2.5 block bg-red-calm ml-2 self-end mb-2.25 transform -translate-x-6 rounded-full"></div>
          Here to Fulfill Your Logistics Needs
        </h2>

        <p className="text-black max-w-lg mx-auto text-md font-semibold mb-14 leading-8">
          Stop worrying about complicated and complex logistics needs. Focus on your business and let us do of the rest when it comes to logistics.
        </p>

        <button onClick={() => navigate('/contact')} className="text-red-calm text-xl font-semibold mb-8 hover:font-bold hover:scale-110">Get a Free Quote</button>
      </section>
    </motion.div>
  );
};

export default Resource;