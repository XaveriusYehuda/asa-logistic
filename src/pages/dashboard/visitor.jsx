import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import visitor1 from '../../assets/visitor1.png'
import visitorIcon from '../../assets/mainServiceCard/leftDomesticDelivery.png'
import { getVisitorRfqList } from "../../api/rfqAPI";
import { downloadFinalRFQ } from "../../api/finalAPI";

const Visitor = ({pageVariants}) => {

  const { user } = useAuth();

  const [rfqList, setRfqList] = useState([]);
  const [selectedRfq, setSelectedRfq] = useState(null);
  const [loadingList, setLoadingList] = useState(true);
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    if (user?.public_id) {
      getVisitorRfqList(user.public_id)
        .then((data) => {
          // data bisa berupa array langsung atau data.rfq_requests tergantung rest api backend Anda
          setRfqList(data.rfq_requests || data || []);
          setLoadingList(false);
        })
        .catch((err) => {
          console.error(err);
          setLoadingList(false);
        });
    }
  }, [user]);

  // 2. Handler saat visitor memilih opsi di Dropdown
  const handleDropdownChange = (e) => {
    const rfqNum = e.target.value;
    if (!rfqNum) {
      setSelectedRfq(null);
      setErrorText("");
      return;
    }

    // Temukan data objek rfq berdasarkan nomor yang dipilih
    const foundRfq = rfqList.find((item) => item.rfq_number === rfqNum);
    setSelectedRfq(foundRfq);

    // Cek status_request dari tabel rfq_requests Anda ('incoming', 'ongoing', 'completed')
    if (foundRfq && foundRfq.status_request !== "completed") {
      setErrorText("Berkas belum bisa diunduh karena Officer belum selesai memproses.");
    } else {
      setErrorText(""); // Bersih jika statusnya sudah 'completed'
    }
  };

  // 3. Handler saat tombol download ditekan
  const handleDownloadClick = () => {
    if (selectedRfq && selectedRfq.status_request === "completed") {
      downloadFinalRFQ(selectedRfq.rfq_number);
    }
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full"
    >
      <section className="bg-white py-16 md:py-28 px-4 sm:px-8 relative overflow-hidden font-inter min-h-screen flex items-center justify-center">

        <div className="bg-white rounded-[50px] max-w-5xl w-full p-8 sm:p-12 lg:p-16 shadow-[5px_5px_20px_rgba(0,0,0,0.25)] relative z-10 border border-gray-100/50">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4 mb-4">          
              <h2 className="text-3xl/9 md:text-4xl/12 font-bold tracking-wide text-black max-w-3xl ml-4">
                <div className="absolute inline h-2.5 w-2.5 block bg-red-calm ml-2 self-end mb-2.75 transform -translate-x-6 rounded-full"></div>
                Hello, {user ? (<span className="capitalize">{ user.username }!</span>) : (<p>Silakan login terlebih dahulu</p>)}
              </h2>

              <h3 className="text-xl font-bold text-black tracking-tight">
                Welcome to the dashboard.
              </h3>

              <div className="space-y-4 text-gray-900 text-sm sm:text-[15px] leading-relaxed font-medium">
                <p>
                  Thank you for entrusting your logistics needs to us.
                </p>
                <p>
                  As a trusted logistics partner, we provide safe, efficient, and transparent ocean freight solutions to support the success of your global business.
                </p>
                <p>
                  Please review the details of the price quote we have prepared, and feel free to download the quotation document.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col items-center text-center space-y-5 lg:pl-8">

              <div className="p-6 space-y-10 max-w-md ml-4">

                <div className="relative w-28 h-28 justify-self-center">
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
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-2">
                      Pilih Riwayat Nomor RFQ Anda
                    </label>
                    
                    {loadingList ? (
                      <p className="text-xs text-gray-400 italic">Memuat riwayat RFQ...</p>
                    ) : (
                      <select
                        onChange={handleDropdownChange}
                        className="w-full bg-white border border-gray-300 text-black text-sm rounded-xl px-4 py-3 font-semibold focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                      >
                        <option value="">-- Pilih Dokumen RFQ --</option>
                        {rfqList.map((rfq) => (
                          <option key={rfq.id} value={rfq.rfq_number}>
                            {rfq.rfq_number} ({rfq.service_type})
                          </option>
                        ))}
                      </select>
                    )}
                  </div>

                  {errorText && (
                    <div className="flex items-center gap-2 text-red-600 bg-red-50 px-4 py-2.5 rounded-xl border border-red-200/50">
                      <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <p className="text-xs font-bold leading-tight">{errorText}</p>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handleDownloadClick}
                    disabled={!selectedRfq || selectedRfq.status_request !== "completed"}
                    className="w-full flex items-center justify-center gap-2 bg-red-calm hover:bg-red-700 text-white font-bold py-3 px-5 rounded-full text-xs shadow-md transition-all active:scale-95 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed disabled:shadow-none"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"></path>
                    </svg>
                    Unduh Quotasi Resmi (PDF)
                  </button>
                </div>
              </div>
              
              {/* <div className="relative w-28 h-28">
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

              <h4 className="text-xl font-bold text-black">Xaverius</h4>

              <p className="text-red-calm text-sm font-medium leading-relaxed max-w-sm">
                We apologize, we are currently processing your request for a quote. Please allow our staff some time to handle it for you.
              </p>

              <div className="pt-2">
                <button 
                  type="button" 
                  className="bg-red-calm opacity-50 text-white font-bold px-8 py-3 rounded-full text-sm shadow-sm cursor-not-allowed transition-all"
                  disabled
                >
                  Download Quotations
                </button>
              </div> */}

            </div>

          </div>
        </div>

        <div className="absolute bottom-0 right-4 w-44 sm:w-56 lg:w-64 pointer-events-none hidden sm:block z-20 translate-y-4">
          <img src={visitorIcon} className="opacity-0 w-full h-auto" alt="boxes-illustration" />
        </div>
      </section>
    </motion.div>
  );
};

export default Visitor;
