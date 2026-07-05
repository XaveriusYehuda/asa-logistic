import React, { useState, useEffect } from "react";

const Popup = ({ contentTitle, contentText, popupActive, setPopupActive }) => {

  // bawa baris ini ke parent
  // const [popupActive, setPopupActive] = useState(false);
  

  return (
    <div onClick={() => setPopupActive(false)} className={`${popupActive === true ? 'fixed' : 'hidden'} inset-0 z-70 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 md:p-10 transition-opacity`}>
  
      <div 
        className="bg-white rounded-[40px] max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] relative p-8 md:p-12"
        onClick={(e) => e.stopPropagation()}
      >
        
        <button 
          onClick={() => setPopupActive(false)}
          type="button"
          className="absolute top-6 right-8 text-[#ef3326] hover:scale-110 transition-transform p-1 focus:outline-none"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6 stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex w-full items-center justify-center">
          <div className="flex flex-col w-full p-8 items-center justify-center">
            <h2 className="ml-4 text-3xl/9 md:text-4xl/12 font-bold tracking-wide text-black py-4 max-w-3xl text-left">
              <div className="absolute inline h-2.5 w-2.5 block bg-red-calm ml-2 self-end mb-2.25 transform -translate-x-6 rounded-full"></div>
              { contentTitle }
            </h2>
            { contentText }
          </div>
        </div>

        {/* <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2.5 h-2.5 bg-[#ef3326] rounded-full inline-block"></span>
              <h2 className="text-2xl sm:text-3xl font-black text-black tracking-tight flex items-center gap-2">
                Document Review
              </h2>
              <button className="text-[#ef3326] bg-red-50 p-1.5 rounded-lg border border-red-200 hover:bg-red-100 transition-colors">
                <svg className="w-4 h-4 stroke-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
              </button>
            </div>

            <div className="space-y-4 text-sm font-bold">
              <div>
                <p className="text-[#ef3326] text-[11px] tracking-wide mb-0.5">Name</p>
                <p className="text-black text-base font-extrabold">Alivia Febriyanti Putri</p>
              </div>
              
              <div>
                <p className="text-[#ef3326] text-[11px] tracking-wide mb-0.5">Company</p>
                <p className="text-black text-base font-extrabold">Unilever</p>
              </div>
              
              <div>
                <p className="text-[#ef3326] text-[11px] tracking-wide mb-0.5">Mail Number</p>
                <p className="text-black text-base font-extrabold">111/ASA-LOG/IV/2026</p>
              </div>
              
              <div>
                <p className="text-[#ef3326] text-[11px] tracking-wide mb-0.5">Email</p>
                <p className="text-black text-base font-extrabold">asa@gmail.com</p>
              </div>
              
              <div>
                <p className="text-[#ef3326] text-[11px] tracking-wide mb-0.5">Company Address</p>
                <p className="text-black text-base font-extrabold">Jl Percepatan No 123A</p>
              </div>
              
              <div>
                <p className="text-[#ef3326] text-[11px] tracking-wide mb-0.5">Whatsapp Number</p>
                <p className="text-black text-base font-extrabold">098765432123</p>
              </div>
              
              <div>
                <p className="text-[#ef3326] text-[11px] tracking-wide mb-0.5">HS Code</p>
                <p className="text-black text-base font-extrabold">0901.11.00</p>
              </div>
              
              <div>
                <p className="text-[#ef3326] text-[11px] tracking-wide mb-0.5">The Documents We Deal With</p>
                <p className="text-black text-base font-extrabold">-</p>
              </div>
              
              <div>
                <p className="text-[#ef3326] text-[11px] tracking-wide mb-0.5">Notes</p>
                <p className="text-black text-base font-extrabold">-</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 h-full flex flex-col justify-center">
            <div className="bg-[#d2d2d2] rounded-[32px] p-6 sm:p-8 flex items-center justify-center shadow-inner aspect-[4/5] lg:aspect-auto lg:h-[65vh] w-full overflow-hidden">
              
              <div className="bg-white w-full h-full rounded-xl shadow-lg p-6 overflow-y-auto select-text text-[10px] text-gray-800 font-medium">
                <div className="flex justify-between items-start border-b pb-4 mb-4">
                  <div>
                    <h4 className="font-bold text-sm text-black">My Company</h4>
                    <p>Jl Pegangsaan Indah Barat A7 Kelapa Gading, Jakarta Utara</p>
                    <p>DKI Jakarta, Indonesia</p>
                    <p className="mt-1">Telp: +6281111000746, 082165089990</p>
                  </div>
                  <div className="text-right">
                    <h3 className="text-sm font-black tracking-wider text-black">INVOICE / RECEIPT</h3>
                    <p className="text-gray-400 italic">Kwitansi / Tagihan</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-[9px] mb-4">
                  <div className="border p-2 rounded">
                    <p className="font-bold text-gray-500">Ditujukan/</p>
                    <p className="font-bold text-black">Ditagihkan Ke : Adam aris</p>
                    <p>Delivered/</p>
                    <p className="font-bold text-black">Charge To : Adanaris</p>
                  </div>
                  <div className="border p-2 rounded space-y-0.5">
                    <p><span className="text-gray-500">Nomor Invoice :</span> <span className="font-bold text-black">INV/2017/0001</span></p>
                    <p><span className="text-gray-500">Nomor PO / SPK :</span> <span className="font-bold text-black">PO/SPK/Number</span></p>
                    <p><span className="text-gray-500">Tanggal :</span> <span className="font-bold text-black">2017-12-12</span></p>
                    <p><span className="text-gray-500">Jatuh Tempo :</span> <span className="font-bold text-black">2018-01-01</span></p>
                  </div>
                </div>

                <table className="w-full text-left text-[8px] border-collapse mb-4">
                  <thead>
                    <tr className="bg-gray-50 border-b border-t">
                      <th className="py-1 px-1">Jenis Jasa</th>
                      <th className="py-1 px-1">Deskripsi Jasa / Produk</th>
                      <th className="py-1 px-1 text-center">Qty / Pg</th>
                      <th className="py-1 px-1 text-right">Unit Price</th>
                      <th className="py-1 px-1 text-right">Jumlah Harga</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-1 px-1 font-bold">iphone x</td>
                      <td className="py-1 px-1 text-gray-500">original black</td>
                      <td className="py-1 px-1 text-center">1</td>
                      <td className="py-1 px-1 text-right">Rp 26.000.000</td>
                      <td className="py-1 px-1 text-right font-bold">Rp 26.000.000</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-1 px-1 font-bold">samsung Galaxy s9</td>
                      <td className="py-1 px-1 text-gray-500">Original Gold</td>
                      <td className="py-1 px-1 text-center">1</td>
                      <td className="py-1 px-1 text-right">Rp 8.000.000</td>
                      <td className="py-1 px-1 text-right font-bold">Rp 8.000.000</td>
                    </tr>
                  </tbody>
                </table>

                <div className="flex justify-end text-[8px]">
                  <div className="w-1/2 space-y-1 text-right">
                    <p><span className="text-gray-400">Subtotal :</span> <span className="font-bold ml-2">Rp 34.000.000,00</span></p>
                    <p><span className="text-gray-400">Pajak :</span> <span className="font-bold ml-2">Rp 3.393.294,12</span></p>
                    <p><span className="text-gray-400">Diskon :</span> <span className="font-bold ml-2">Rp 200.000</span></p>
                    <div className="border-t pt-1 font-bold text-black text-xs">
                      Jumlah Rp. <span className="bg-gray-200 px-2 py-0.5 rounded font-black">34.393.294,12</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div> */}

      </div>
    </div> 
  );
};

export default Popup;