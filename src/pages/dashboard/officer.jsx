import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { AnimatePresence, motion } from "framer-motion";
import visitor1 from '../../assets/visitor1.png'
import visitorIcon from '../../assets/mainServiceCard/leftDomesticDelivery.png'
import Dashboard from "./officer-dashboard/Dashboard";
import Worksheet from "./officer-dashboard/Worksheet";
import { getRFQDetail } from "../../api/worksheetAPI";
import { useAsyncError } from "react-router-dom";

const Officer = ({pageVariants, triggerPopup}) => {

  const [activePage, setActivePage] = useState("dashboard");

  const [rfqData, setRfqData] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [popupActive, setPopupActive] = useState(false);

  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [dataVisitor, setDataVisitor] = useState(null);

  const [popupView, setPopupView] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [popupData, setPopupData] = useState(null);

  const { user, logout } = useAuth();

  useEffect(() => {
    if (!selectedRequestId) return;

    const fetchRfqData = async () => {
      try {
        setLoading(true);
        setError(null);
        // Memanggil API worksheet terpisah menggunakan ID dinamis
        const data = await getRFQDetail(selectedRequestId);
        setRfqData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRfqData();
  }, [selectedRequestId]);

  // Callback saat item di Dashboard di-klik (view / proceed)
  const handleSelectRequestFromDashboard = (rfq_number) => {
    // setRfqData(null);
    setSelectedRequestId(rfq_number); // Set ID data baru
    setActivePage("worksheet"); // Alihkan UI ke tab worksheet
  };

  const onUploadSuccess = (data) => {
    setDataVisitor(data);
  };

  const triggerPopupView = (content, popupDetailData) => {
    setPreviewUrl(content);
    setPopupView(true);
    setPopupData(popupDetailData);
  };

  const handleDownloadInPopupView = async () => {
    try {
      const url = `http://localhost:3000/api/rfq-final/download/${encodeURIComponent(selectedRequestId)}`;
      const response = await fetch(url); // Sekarang objek 'response' sudah ada!

      if (response.ok) {
        // Mengubah hasil fetch menjadi file download
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = `RFQ-${selectedRequestId}.pdf`; // Nama file download
        document.body.appendChild(a);
        a.click();
        a.remove();

        triggerPopup(
          "Pemberitahuan",
          <p className="py-4 text-sm lg:text-base leading-6 md:leading-7 font-semibold tracking-normal text-black text-left">
            File <span className="font-extrabold text-red-calm">berhasil</span> diunduh. 
          </p>
        );
      } else {
        triggerPopup(
          "Pemberitahuan",
          <p className="py-4 text-sm lg:text-base leading-6 md:leading-7 font-semibold tracking-normal text-black text-left">
            File <span className="font-extrabold text-red-calm">gagal</span> diunduh.
          </p>
        );
      }
    } catch (error) {
      triggerPopup(
        "Pemberitahuan",
        <p className="py-4 text-sm lg:text-base leading-6 md:leading-7 font-semibold tracking-normal text-black text-left">
          Terjadi kesalahan koneksi saat mengunduh file.
        </p>
      );
    }
  };

  const rfqNumber = rfqData ? rfqData.rfqNumber : "-";
  const picName =  rfqData ? rfqData.serviceDetails.pic_name : "-";
  const companyName =  rfqData ? rfqData.serviceDetails.company_name : "-";
  const companyAddress =  rfqData ? rfqData.serviceDetails.company_address : "-";
  const picEmail =  rfqData ? rfqData.serviceDetails.pic_email : "-";
  const picNumber =  rfqData ? rfqData.serviceDetails.pic_number : "-";
  const hsCode =  rfqData ? rfqData.serviceDetails.hs_code : "-";
  const notes =  rfqData ? rfqData.serviceDetails.notes : "-";

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full"
    >
      <div onClick={() => setPopupView(false)} className={`${popupView === true ? 'fixed' : 'hidden'} inset-0 z-60 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 md:p-10 transition-opacity`}>
  
        <div 
          className="bg-white rounded-[40px] max-w-7xl w-full max-h-[90vh] overflow-y-auto shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] relative p-8 md:p-12"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            <div className="lg:col-span-4 space-y-5">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-2.5 h-2.5 bg-[#ef3326] rounded-full inline-block"></span>
                <h2 className="text-2xl sm:text-3xl font-black text-black tracking-tight flex items-center gap-2">
                  Document Review
                </h2>
                <button onClick={() => handleDownloadInPopupView()} className="text-[#ef3326] bg-red-50 p-1.5 rounded-lg border border-red-200 hover:bg-red-100 transition-colors">
                  <svg className="w-4 h-4 stroke-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4 text-sm font-bold">
                <div>
                  <p className="text-[#ef3326] text-[11px] tracking-wide mb-0.5">Name</p>
                  <p className="text-black text-base font-extrabold">{picName}</p>
                </div>
                
                <div>
                  <p className="text-[#ef3326] text-[11px] tracking-wide mb-0.5">Company</p>
                  <p className="text-black text-base font-extrabold">{companyName}</p>
                </div>
                
                <div>
                  <p className="text-[#ef3326] text-[11px] tracking-wide mb-0.5">Mail Number</p>
                  <p className="text-black text-base font-extrabold">{rfqNumber}</p>
                </div>
                
                <div>
                  <p className="text-[#ef3326] text-[11px] tracking-wide mb-0.5">Email</p>
                  <p className="text-black text-base font-extrabold">{picEmail}</p>
                </div>
                
                <div>
                  <p className="text-[#ef3326] text-[11px] tracking-wide mb-0.5">Company Address</p>
                  <p className="text-black text-base font-extrabold">{companyAddress}</p>
                </div>
                
                <div>
                  <p className="text-[#ef3326] text-[11px] tracking-wide mb-0.5">Whatsapp Number</p>
                  <p className="text-black text-base font-extrabold">{picNumber}</p>
                </div>
                
                <div>
                  <p className="text-[#ef3326] text-[11px] tracking-wide mb-0.5">HS Code</p>
                  <p className="text-black text-base font-extrabold">{hsCode}</p>
                </div>
                
                <div>
                  <p className="text-[#ef3326] text-[11px] tracking-wide mb-0.5">The Documents We Deal With</p>
                  <p className="text-black text-base font-extrabold">-</p>
                </div>
                
                <div>
                  <p className="text-[#ef3326] text-[11px] tracking-wide mb-0.5">Notes</p>
                  <p className="text-black text-base font-extrabold">{notes}</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 h-full flex flex-col justify-center">
              <div className="bg-[#d2d2d2] rounded-[48px] p-4 flex items-center justify-center shadow-inner aspect-[4/5] lg:aspect-auto lg:h-[65vh] w-full overflow-hidden">
                
                {/* Section Preview PDF */}
                {previewUrl && (
                  <div className="bg-white w-full h-full rounded-[32px] shadow-lg overflow-y-auto select-text text-[10px] text-gray-800 font-medium">
                    
                    {/* Iframe Kontainer PDF */}
                    <iframe 
                      src={previewUrl} 
                      title="RFQ PDF Preview"
                      className="w-full h-full rounded-xl shadow-lg"
                      frameBorder="0"
                    />
                  </div>
                )}

              </div>
            </div>

          </div>
        </div>
      </div>
      <div className="h-screen bg-[#2D2D2D] flex font-sans antialiased text-black select-none">
    
        <aside className="w-64 bg-[#2D2D2D] text-white flex flex-col justify-between py-10 px-6 flex-shrink-0">
          <div className="space-y-12">
            <div className="flex items-center md:gap-1">
              <div className="bg-[url(./assets/logo-asa.png)] bg-center bg-no-repeat bg-size-[20px] h-[20px] w-[40px] md:bg-size-[60px] md:h-[35px] md:w-[75px] flex items-center justify-center"></div>
              <span className="font-extrabold font-inter tracking-wide text-base xl:text-lg">ASA Logistics</span>
            </div>

            <div className="flex flex-col items-center space-y-6">
              <div className="relative w-28 h-28">
                <div className="w-full h-full rounded-full outline-4 outline-red-calm outline-offset-4 p-1 overflow-hidden bg-white">
                  <img 
                    src={visitor1} 
                    alt="User Avatar" 
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <button className="absolute -bottom-2.5 -right-2.5 bg-red-calm text-white p-2 rounded-full shadow-md hover:bg-red-700 transition-colors border-2 border-white flex items-center justify-center">
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 500 500"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M500 477.249C500 483.283 497.606 489.07 493.343 493.336C489.081 497.603 483.3 500 477.273 500H22.7273C16.6996 500 10.9189 497.603 6.65666 493.336C2.39447 489.07 0 483.283 0 477.249C0 471.215 2.39447 465.429 6.65666 461.162C10.9189 456.895 16.6996 454.499 22.7273 454.499H477.273C483.3 454.499 489.081 456.895 493.343 461.162C497.606 465.429 500 471.215 500 477.249ZM45.4545 386.247V289.784C45.4373 286.79 46.0105 283.821 47.1416 281.05C48.2726 278.278 49.9391 275.756 52.0455 273.631L105.455 220.394L264.545 61.1393L305.682 19.9605C318.466 7.17917 335.795 0 353.864 0C371.932 0 389.261 7.17917 402.045 19.9605L434.091 52.039C446.859 64.8363 454.031 82.1836 454.031 100.27C454.031 118.357 446.859 135.705 434.091 148.502L181.818 402.399C179.695 404.508 177.176 406.176 174.407 407.308C171.638 408.441 168.673 409.015 165.682 408.997H68.1818C62.1542 408.997 56.3734 406.6 52.1112 402.334C47.849 398.067 45.4545 392.28 45.4545 386.247ZM154.091 235.865L218.409 300.249L345.227 173.3L280.909 108.916L154.091 235.865ZM338.636 51.129L313.182 76.6097L377.5 140.994L402.955 115.513C407.187 111.251 409.563 105.485 409.563 99.4742C409.563 93.4638 407.187 87.6976 402.955 83.435L370.682 51.129C366.424 46.8916 360.663 44.5132 354.659 44.5132C348.655 44.5132 342.895 46.8916 338.636 51.129ZM90.9091 363.496H155.227L186.136 332.555L121.818 268.17L90.9091 299.111V363.496Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </div>
              <h3 className="text-xl font-bold tracking-wide">Officer</h3>
            </div>

            <nav className="space-y-2 pt-4">
              <button
                onClick={() => setActivePage("dashboard")}
                className={`flex w-full items-center justify-center px-4 py-3 rounded-xl font-bold transition-all text-[15px]
                ${
                  activePage === "dashboard"
                    ? "text-white bg-white/5"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActivePage("worksheet")}
                disabled={!selectedRequestId}
                className={`flex w-full items-center justify-center px-4 py-3 rounded-xl font-bold transition-all text-[15px] ${
                  !selectedRequestId ? "opacity-40 cursor-not-allowed" : ""
                } ${
                  activePage === "worksheet" ? "text-white bg-white/5" : "text-gray-400 hover:text-white"
                }`}
              >
                Worksheet
              </button>
            </nav>
          </div>

          <div className="flex items-center justify-center">
            <button onClick={logout} className="flex items-center justify-center gap-3 px-4 py-3 rounded-xl font-bold text-gray-400 hover:text-white hover:bg-white/5 transition-all text-[15px]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"></path>
              </svg>
              Logout
            </button>
          </div>
        </aside>

        <div className="flex-1 relative overflow-hidden">
          <div className="absolute inset-0 bg-white rounded-tl-[50px] rounded-bl-[50px] pt-10 lg:py-14 px-2 lg:px-6 overflow-x-hidden">
            <AnimatePresence mode="wait">

              {activePage === "dashboard" && (
                <motion.div
                  key="dashboard"
                  initial={{
                    opacity: 0,
                    x: 50
                  }}
                  animate={{
                    opacity: 1,
                    x: 0
                  }}
                  exit={{
                    opacity: 0,
                    x: -50
                  }}
                  transition={{
                    duration: 0.35,
                    ease: "easeInOut"
                  }}
                  className="flex-1 flex flex-col justify-between overflow-y-auto"
                >
                  <Dashboard onSelectRequest={handleSelectRequestFromDashboard} />
                </motion.div>
              )}

              {activePage === "worksheet" && (
                <motion.div
                  key="worksheet"
                  initial={{
                    opacity: 0,
                    x: 50
                  }}
                  animate={{
                    opacity: 1,
                    x: 0
                  }}
                  exit={{
                    opacity: 0,
                    x: -50
                  }}
                  transition={{
                    duration: 0.35,
                    ease: "easeInOut"
                  }}
                  className="flex-1 flex flex-col justify-between overflow-y-auto"
                >
                  {loading ? (
                    <div className="p-8 text-center font-bold text-gray-600 animate-pulse">
                      Loading Data RFQ...
                    </div>
                  ) : error ? (
                    <div className="p-8 text-center text-red-500 font-bold">
                      Error: {error}
                    </div>
                  ) : rfqData ? (
                    <Worksheet 
                      selectedRequestId={selectedRequestId}
                      rfqNumber={rfqData.rfqNumber || rfqData.rfq_number} 
                      serviceDetails={rfqData.serviceDetails || rfqData.service_details} 
                      triggerPopup={triggerPopup}
                      previewUrl={previewUrl} 
                      setPreviewUrl={setPreviewUrl}
                      triggerPopupView={triggerPopupView}
                    />
                  ) : (
                    <div className="p-8 text-center text-gray-400">
                      Silakan pilih request di dashboard terlebih dahulu.
                    </div>
                  )}
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>   
      
      </div>
    </motion.div>
  );
};

export default Officer;