import React, { useState } from "react";
import { uploadFinalRFQ } from "../../../api/finalAPI";

const Worksheet = ({ rfqNumber, serviceDetails, selectedRequestId, onUploadSuccess, triggerPopup, previewUrl, setPreviewUrl, triggerPopupView }) => {

  const {
    company_name = "-",
    company_address = "-",
    pic_name = "-",
    pic_email = "-",
  } = serviceDetails || {};

  const popupDetailData = [rfqNumber, serviceDetails];

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const rfq_number = selectedRequestId;

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type !== "application/pdf") {
      setMessage({ type: "error", text: "Hanya file berformat PDF yang diperbolehkan!" });
      setFile(null);
    } else {
      setMessage({ type: "", text: "" });
      setFile(selectedFile);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage({ type: "error", text: "Silakan pilih file PDF terlebih dahulu." });
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const result = await uploadFinalRFQ(rfq_number, file);
      setMessage({ type: "success", text: result.message });
      setFile(null);
      if (onUploadSuccess) onUploadSuccess(result.data);
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleView = () => {
    triggerPopupView(`http://localhost:3000/api/rfq-final/view/${encodeURIComponent(selectedRequestId)}`, popupDetailData);
  };

  const handleDownload = async () => {
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
  
  return (
    <main id="worksheet" className="my-4">    
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-6 gap-4 mb-10">
        <h1 className="text-2xl font-bold tracking-widest text-black">Worksheet</h1>
        
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path>
              </svg>
            </span>
            <input type="text" placeholder="Search Name / Company ..." className="w-full bg-transparent text-sm text-gray-700 pl-9 pr-4 py-2 focus:outline-none placeholder-gray-400" />
          </div>
          <button className="bg-white text-red-calm px-6 py-2.5 rounded-full font-bold text-sm shadow-[0_8px_20px_rgba(0,0,0,0.08)] hover:scale-105 transition-all">
            Email
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto space-y-16 my-4">
        
        <div className="text-center space-y-5">
          <div className="flex items-center justify-center gap-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-black tracking-tight leading-normal">
              <div className="absolute inline h-2.5 w-2.5 block bg-red-calm ml-2 self-end mb-2.25 transform -translate-x-6 rounded-full"></div>
              Please upload the quotation document onto the following form
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div>
              <label className="block text-red-calm text-xs font-semibold tracking-wide mb-2">
                Please make sure the file is in PDF format and no larger than 5 MB*
              </label>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="text-sm text-gray-500 my-4 file:mr-4 file:p-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
              />
            </div>

            {message.text && (
              <p className={`text-xs font-bold ${message.type === "success" ? "text-green-600" : "text-red-600"}`}>
                {message.text}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="inline-block bg-red-calm text-white font-bold px-10 py-3.5 rounded-full text-sm shadow-[0_10px_25px_rgba(239,51,38,0.2)] hover:bg-red-700 transition-all cursor-pointer hover:scale-105 disabled:bg-gray-400"
              
            >
              {loading ? "Uploading ..." : "Upload Quotations"}
            </button>
          </form>
        </div>

        <div className="text-center space-y-8">
          <div className="flex items-center justify-center gap-2">
            <span className="w-2.5 h-2.5 bg-red-calm rounded-full inline-block"></span>
            <h2 className="text-2xl sm:text-3xl font-bold text-black tracking-tight">
              Please take a look at the client's quote request
            </h2>
          </div>

          <div className="space-y-5 max-w-md mx-auto">
            <div>
              <p className="text-base font-black text-black">{pic_name}</p>
              <p className="text-[11px] font-bold text-[#ef3326] tracking-wide mt-0.5">Name</p>
            </div>
            
            <div>
              <p className="text-base font-black text-black">{company_name}</p>
              <p className="text-[11px] font-bold text-[#ef3326] tracking-wide mt-0.5">Company</p>
            </div>
            
            <div>
              <p className="text-base font-black text-black">{rfqNumber || "-"}</p>
              <p className="text-[11px] font-bold text-[#ef3326] tracking-wide mt-0.5">Mail Number</p>
            </div>
            
            <div>
              <p className="text-base font-black text-black">{pic_email}</p>
              <p className="text-[11px] font-bold text-[#ef3326] tracking-wide mt-0.5">Email</p>
            </div>
            
            <div>
              <p className="text-base font-black text-black">{company_address}</p>
              <p className="text-[11px] font-bold text-[#ef3326] tracking-wide mt-0.5">Company Address</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 pt-4">
            <button 
              type="button" 
              onClick={() => handleView()}
              className="w-full max-w-xs bg-red-calm text-white font-bold py-3.5 rounded-full text-sm shadow-[0_10px_25px_rgba(239,51,38,0.2)] hover:bg-red-700 transition-all hover:scale-105">
              Detail Quote Request
            </button>
            <button 
              type="button" 
              onClick={() => handleDownload()}
              className="w-full max-w-xs bg-red-calm text-white font-bold py-3.5 rounded-full text-sm shadow-[0_10px_25px_rgba(239,51,38,0.2)] hover:bg-red-700 transition-all hover:scale-105">
              Download Quote Request
            </button>
          </div>

        </div>

      </div>
    </main>
  );
};

export default Worksheet;