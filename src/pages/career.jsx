import React, {useState} from "react";
import { motion } from "framer-motion";
import careerData from '../data/careerData';
import jobVacancyImage from '../assets/careerImage/jobVacancyImage.png';
import jobVacancyIcon from '../assets/careerImage/jobVacancyIcon.png';
import internshipImage from '../assets/careerImage/internshipImage.png';

const Career = ({currentCareerIndex, scrollToSection, pageVariants}) => {

  const accessCareerData = careerData;

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
          <div className={`absolute inset-0 bg-[url(src/assets/bg-career.png)] bg-cover bg-center bg-no-repeat}`} />
        </div>
        <div className="bg-black z-10 inset-0 absolute opacity-20">
        </div>

        <div
          className="absolute inset-0 md:relative z-10 flex flex-col items-center justify-center text-white gap-4 h-full md:h-[70%] px-6"
        >
          <h1 className={`font-inter text-center font-bold leading-tight text-4xl xl:text-6xl`}>
            <span className="font-extrabold text-red-calm text-5xl md:text-6xl xl:text-7xl px-1">.</span>
            Career
          </h1>
          <p className={`font-inter text-center text-sm md:text-md text-gray-200 max-w-xl mb-2`}>
            Join us and be part of ASA Logistics!
          </p>
        </div>

        <div className="absolute bottom-5 left-0 w-full flex items-start justify-start md:justify-center gap-8 xl:gap-12 px-8 my-4 overflow-x-auto no-scrollbar md:overflow-x-visible z-30">
          {careerData.map((slide, index) => (
            <button 
              key={slide.idHTML} 
              onClick={() => scrollToSection(slide.idHTML, slide.path)} 
              className={`group transition duration-300 ease-in-out origin-center cursor-pointer outline-none w-42 min-w-[90px]`}>

              <div className={`w-full h-1 rounded-full transition duration-300 ease-in-out ${currentCareerIndex === slide.idHTML ? 'bg-red-calm scale-x-110' : 'bg-gray-100/70 group-hover:bg-red-calm'}`}></div>

              <div className={`group-hover:text-red-calm font-inter font-semibold text-xs xl:text-sm transition duration-300 ease-in-out pt-3 ${currentCareerIndex === slide.idHTML ? 'text-red-calm' : 'text-gray-100/70'} rounded-full`}>
                {index === 0 ? "Information System" : index === 1 ? "Job Vacancy" : "Internship Program"}
              </div>
            </button>
          ))}
        </div>
      </section>
      <section id="informationsystem" className="relative px-8 pt-24 md:pt-32 pb-8 md:pb-16 bg-white w-full overflow-hidden text-center">
        <span className="inline-block bg-red-calm text-white px-10 py-1.5 rounded-full font-bold text-md mb-6 shadow-lg">
          ASA Information System
        </span>

        <h2 className="text-3xl/9 md:text-4xl/12 font-bold tracking-wide text-black mt-6 mb-10 max-w-3xl mx-auto">
          <div className="absolute inline h-2.5 w-2.5 block bg-red-calm ml-2 self-end mb-2.25 transform -translate-x-6 rounded-full"></div>
          Go For It
        </h2>

        <p className="text-black max-w-lg mx-auto text-md font-semibold mb-12 leading-8">
          The spot where we make great things happen to meet your business logistics needs. It's time for the miracles to begin.
        </p>

        <a href="#" className="inline-flex items-center gap-2 text-red-calm leading-7 text-clip tracking-wide font-inter text-sm md:text-base md:text-lg font-semibold hover:font-extrabold transition-colors group transition duration-300 ease-in-out fill-current">
          Login to ASA Information System
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
        </a>
      </section>
      <section id="jobvacancy" className="relative px-8 md:px-28 pt-14 pb-8 md:pb-16 bg-white w-full lg:w-5/6 overflow-hidden flex flex-col md:flex-row items-center justify-center justify-self-center">
        <div className="relative w-full h-full py-10 md:py-0 z-10 md:w-5/6 md:min-w-[380px] lg:min-w-[500px] md:max-w-[580px] md:h-[330px] bg-red-calm rounded-2xl shadow-xl opacity-100 flex flex-col justify-center transform translate-y-5 md:translate-x-20">
          <h3 className="md:mb-2 lg:mr-36 md:mr-30 ml-6 mr-6 md:ml-8 font-bold text-3xl lg:text-4xl text-white text-center md:text-right">. Join Us</h3>
          <p className="mt-4 mb-2 lg:mr-36 md:mr-30 mr-6 ml-6 md:ml-8 text-xs md:text-sm leading-6 md:leading-7 font-normal tracking-normal text-white overflow-hidden text-clip text-center md:text-right">Innovate and grow with the best team in a freight forwarding company that values excellence and professionalism.</p>
          <div className="mt-4 lg:mr-36 md:mr-30 ml-6 mr-6 md:ml-8 flex justify-center md:justify-end pr-2">
            <a href="#" className="inline-flex items-center gap-2 text-white leading-7 text-clip tracking-wide font-inter text-sm md:text-md md:text-lg font-semibold hover:font-extrabold transition-colors group transition duration-300 ease-in-out fill-current">
              Seek opportunities
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
            </a>
          </div>
          <img src={jobVacancyIcon} className="h-[150px] w-[210px] lg:h-[200px] lg:w-[280px] opacity-0 md:opacity-100 absolute z-40 -translate-x-20 translate-y-40 lg:-translate-x-25 lg:translate-y-35 translate" />
        </div>
        <div className="w-full z-40 h-[330px] md:h-[450px] md:w-2/3 md:min-w-[330px] md:max-w-[360px] bg-[url(src/assets/careerImage/jobVacancyImage.png)] bg-cover bg-start md:bg-center bg-no-repeat rounded-2xl shadow-xl opacity-100">
        </div>
      </section>
      <section class="relative my-14 px-16 leading-7 text-xs md:text-sm text-black font-inter font-semibold text-center tracking-widest">
        We strive to build a
        <span class="inline mx-1.5 text-red-calm text-xs md:text-sm font-inter font-semibold tracking-widest">strong and professional team</span>
        by prioritizing harmony among it's members.
      </section>
      <section id="internship" className="relative px-4 md:px-8 pt-8 md:pt-14 pb-8 md:pb-16 bg-white w-full overflow-hidden flex flex-col items-center justify-center">
        <span className="inline-block bg-red-calm text-white px-10 py-1.5 rounded-full font-bold text-md mb-6 shadow-lg">
          Internship
        </span>
        <div className="flex flex-col w-full my-18 md:flex-row items-center justify-center">
          <div className="flex w-full h-[340px] md:w-1/2 items-center justify-center">
            <div className="p-4 w-7/8 md:w-5/6 h-full bg-[url(src/assets/careerImage/internshipImage.png)] bg-cover bg-center bg-no-repeat rounded-2xl shadow-xl opacity-100"></div>
          </div>
          <div className="flex w-full h-[340px] md:w-1/2 items-center justify-center">
            <div className="flex flex-col w-full p-8 items-start justify-center">
              <h2 className="ml-4 text-3xl/9 md:text-4xl/12 font-bold tracking-wide text-black py-4 max-w-3xl text-left justify-self-start">
                <div className="absolute inline h-2.5 w-2.5 block bg-red-calm ml-2 self-end mb-2.25 transform -translate-x-6 rounded-full"></div>
                ASA Logistics Internship
              </h2>
              <p className="py-4 text-sm lg:text-base leading-6 md:leading-7 font-normal tracking-normal text-black overflow-hidden text-clip text-left">Learn and grow with ASA Logistics. Work experience at a freight forwarding company for young talents to bridge the gap between academic theory and industry reality.</p>
              <div className="flex justify-start py-4">
                <a href="#" className="inline-flex items-center gap-2 text-red-calm leading-7 text-clip tracking-wide font-inter text-sm md:text-base md:text-lg font-semibold hover:font-extrabold transition-colors group transition duration-300 ease-in-out fill-current">
                  Apply now
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
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Career;