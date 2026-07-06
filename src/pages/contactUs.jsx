import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Popup from "../component/popup";
import { SERVICE_SCHEMAS } from '../data/serviceSchemas';
import { uploadRFQ } from '../api/rfqAPI'
import forkLiftIcon from '../assets/formIcon.png';

const ContactUs = ({ isLogin, pageVariants }) => {

  const [selectedService, setSelectedService] = useState('Export_Handling');
    
  const [serviceDetails, setServiceDetails] = useState({});

  const [files, setFiles] = useState({});

  const [error, setError] = useState(null);

  const [popupActive, setPopupActive] = useState(false);

  const [popupConfig, setPopupConfig] = useState({ title: "", content: null });

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

  const triggerPopup = (title, content) => {
    setPopupConfig({ title, content });
    setPopupActive(true);
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

  useEffect(() => {
    if (!isLogin) {
      triggerPopup(
        "Pemberitahuan",
        <p className="py-4 text-sm lg:text-base leading-6 md:leading-7 font-semibold tracking-normal text-black text-left">
          Silahkan <span className="font-extrabold text-red-calm">Login</span> Terlebih dahulu
        </p>
      );
      return; // Stop eksekusi di sini
    }
  }, [isLogin]);
  

  return (
    <>
      <Popup 
        popupActive={popupActive} 
        setPopupActive={setPopupActive} 
        contentTitle={popupConfig.title}
        contentText={popupConfig.content}
      />
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full"
      >
        <section className="relative pt-20 pb-14 my-16 px-4 sm:px-8 lg:px-16 bg-white relative overflow-hidden overflow-x-hidden w-full">
                
          <div className="text-center text-black mb-10">
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
      </motion.div>  
    </>
  );
};

export default ContactUs;