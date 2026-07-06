import React, {useState} from "react";
import { motion } from "framer-motion";
import { NavLink, useSearchParams } from "react-router-dom";
import article1 from '../assets/article-1.webp';
import customsCredibility from '../assets/resourceImage/customsCredibility.png';
import deliveryAccuracy from '../assets/resourceImage/deliveryAccuracy.png';
import integratedSupplyChain from '../assets/resourceImage/integratedSupplyChain.png';
import realTimeTracking from '../assets/resourceImage/realTimeTracking.png';
import sampleArticleFromDB from "../data/articleData";

const Article = ({article, pageVariants, navigate, choosenArticle, setChoosenArticle}) => {

  const [searchParams] = useSearchParams();

  const currentArticleIndex = searchParams.get("tab") || sampleArticleFromDB[choosenArticle].path;

  const currentArticleData =  sampleArticleFromDB.find(item => item.path === currentArticleIndex) || sampleArticleFromDB[choosenArticle];

  const renderArticle = currentArticleData || article;

  if (!renderArticle) {
    return <div className="text-center py-10">Artikel tidak ditemukan.</div>;
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };
  
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full"
    >
      <section className="flex flex-col max-w-6xl items-center justify-self-center justify-center p-8 my-18 md:my-26 mx-8 md:mx-24">
        <div className="flex flex-col w-full">
          <h1 className="text-3xl/9 md:text-4xl/12 font-bold tracking-wide text-black my-8 font-inter">
            {/* Checklist Dokumen Penting untuk Kelancaran Proses Ekspor-Impor */}
            {renderArticle.title}
            <span className="inline-block h-3 w-3 bg-red-calm ml-1 align-baseline ml-3"></span>
          </h1>

          {renderArticle.excerpt && (
            <p className="flex font-inter text-left pb-2 text-black text-base font-normal leading-8 italic">
              Logistik adalah seni mengelola kekacauan di balik layar agar konsumen bisa menikmati kemudahan di depan layar.
            </p>
          )}

          <p className="flex font-inter text-left pb-2 text-slate-500 text-sm font-medium leading-8">
            {/* 05 Juni 2026 */}
            {formatDate(renderArticle.created_at)}
          </p>

          {renderArticle.featured_image && (
            <div className="flex justify-center items-center w-full my-8 overflow-hidden rounded-sm">
              <img
                // src={article1}
                src={renderArticle.featured_image}
                alt={renderArticle.title}
                className="w-[500px] h-auto object-cover"
              />
            </div>
          )}
        </div>
        <div className="flex flex-col w-full mb-4">
          <div 
            className="
            
            prose p-8 min-w-full 

            prose-h3:mt-0 prose-h3:mb-0 prose-h3:py-4 prose-h3:text-xl/9 prose-h3:md:text-2xl/12 prose-h3:font-bold prose-h3:tracking-wide prose-h3:text-black prose-h3:text-left 

            prose-h2:mt-0 prose-h2:mb-0 prose-h2:py-4 prose-h2:text-3xl/9 prose-h2:md:text-4xl/12 prose-h2:font-bold prose-h2:tracking-wide prose-h2:text-black prose-h2:text-left 

            prose-p:mt-0 prose-p:mb-0 prose-p:text-sm prose-p:lg:text-base prose-p:xl:text-lg prose-p:leading-6 prose-p:md:leading-8 prose-p:font-normal prose-p:tracking-normal prose-p:text-black prose-p:text-clip prose-p:text-left prose-p:py-4

            prose-ul:list-disc prose-ul:pl-6 prose-li:text-sm prose-li:lg:text-base prose-li:xl:text-lg prose-li:leading-6 prose-li:md:leading-8 prose-li:font-normal prose-li:tracking-normal prose-li:text-black prose-li:text-clip prose-li:text-left prose-li:mb-4
            "
            dangerouslySetInnerHTML={{ __html: renderArticle.content }}
          />
        </div>

        <div className="relative py-10 px-8 bg-white w-full overflow-hidden text-center">
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
        </div>

        <div id="whychooseus" className="relative px-6 sm:px-12 pt-8 pb-16 bg-white overflow-hidden w-full h-auto">
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
        </div>
      </section>
    </motion.div>
  );
};

export default Article;