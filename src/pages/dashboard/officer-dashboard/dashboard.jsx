import React, { useState, useEffect } from "react";
import { getDashboardStats, getDashboardRequests, updateRequestStatus } from "../../../api/dashboardAPI";

const Dashboard = ({ onSelectRequest }) => {

  const [stats, setStats] = useState({ incoming: 0, ongoing: 0, completed: 0 });
  const [requests, setRequests] = useState({ incoming: [], ongoing: [], completed: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fungsi Fetch Data Menggunakan Service API Terpisah
  const initDashboardData = async () => {
    try {
      setLoading(true);
      const statsData = await getDashboardStats();
      const requestsData = await getDashboardRequests();

      setStats(statsData);
      setRequests(requestsData);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initDashboardData();
  }, []);

  // Handler memproses klik tombol View atau Proceed
  const handleProcessRequest = async (rfq_number, currentStatus) => {
    try {
      if (currentStatus === "incoming") {
        // Panggil service update status ke database
        await updateRequestStatus(rfq_number, "ongoing");
      }
      
      // Kirim id ke parent (Officer) untuk memicu perubahan halaman & reload data rfq worksheet
      if (onSelectRequest) {
        onSelectRequest(rfq_number);
      }
    } catch (err) {
      alert("Gagal memproses aksi: " + err.message);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500 font-bold">Loading Dashboard Data...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500 font-bold">Error: {error}</div>;
  }

  console.log(requests.incoming[0]);
  return (
    <main id="dashboard">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-6 gap-4 mb-8">
          <h1 className="text-xl xl:text-2xl font-bold tracking-widest text-black">Dashboard</h1>
          
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start px-8 mb-6">
          <div className="lg:col-span-7 space-y-4 pr-2 lg:pr-16">
            <div className="flex items-center gap-2">
              <div className="inline h-2.5 w-2.5 block bg-red-calm self-end mb-1.25 rounded-full"></div>
              <h2 className="text-2xl lg:text-4xl font-bold text-black">Hello, Officer !</h2>
            </div>
            <h3 className="text-lg font-bold text-black">Welcome to the dashboard.</h3>
            <p className="text-sm font-medium text-black leading-relaxed max-w-xl">
              Please check the incoming requests to display the offer requests that have been received. You can process them in the worksheet. Each processed offer request can be viewed under "Completed Requests". Have a productive day! ✨
            </p>
          </div>

          <div className="lg:col-span-5 space-y-3 w-full max-w-md mx-auto lg:ml-auto self-center">
            <div className="bg-red-calm text-white rounded-full px-8 py-1.5 flex justify-between items-center shadow-md">
              <span className="text-xl font-extrabold tracking-wide">Incoming</span>
              <span className="text-3xl font-black">{stats.incoming || 0}</span>
            </div>
            <div className="bg-red-calm text-white rounded-full px-8 py-1.5 flex justify-between items-center shadow-md">
              <span className="text-xl font-extrabold tracking-wide">Ongoing</span>
              <span className="text-3xl font-black">{stats.ongoing || 0}</span>
            </div>
            <div className="bg-red-calm text-white rounded-full px-8 py-1.5 flex justify-between items-center shadow-md">
              <span className="text-xl font-extrabold tracking-wide">Completed</span>
              <span className="text-3xl font-black">{stats.completed || 0}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start p-8">
          
          <div className="bg-white rounded-[32px] p-6 shadow-[5px_5px_20px_rgba(0,0,0,0.25)] border border-gray-100 flex flex-col justify-between min-h-[340px]">
            <div>
              <div className="flex justify-between items-center mb-6">
                <h4 className="font-bold text-md text-black">Incoming Request</h4>
                <span className="w-6 h-6 bg-red-calm text-white text-[14px] font-semibold rounded-full flex items-center justify-center">{requests.incoming.length}</span>
              </div>
              
              <table className="w-full text-left text-xs font-bold text-black">
                <thead>
                  <tr className="border-b border-transparent text-gray-900">
                    <th className="pb-3 text-center font-bold">No</th>
                    <th className="pb-3 px-2">|</th>
                    <th className="pb-3 text-center font-bold">Name</th>
                    <th className="pb-3 text-center font-bold">Company</th>
                    <th className="pb-3 text-center font-bold">Action</th>
                  </tr>
                </thead>
                <tbody className="space-y-2">
                  {requests.incoming.map((item, index) => (
                    <tr key={item.id} className="align-middle">
                      <td className="py-1.5 text-gray-900 font-bold">{index + 1}</td>
                      <td className="py-1.5 px-2 text-gray-300">|</td>
                      <td className="py-1.5 text-black text-center font-bold capitalize">{item.client_name || "N/A"}</td>
                      <td className="py-1.5 text-black text-center font-bold capitalize">{item.company_name || "N/A"}</td>
                      <td className="py-1.5 text-center space-x-1.5">
                        <button onClick={() => handleProcessRequest(item.rfq_number, "incoming")} className="text-red-500 font-bold hover:underline">view</button>
                        <button onClick={() => handleProcessRequest(item.rfq_number, "incoming")} className="text-green-500 font-bold hover:underline">proceed</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="text-center pt-4">
              <button className="text-red-500 font-bold text-xs hover:underline">Overview</button>
            </div>
          </div>

          <div className="bg-white rounded-[32px] p-6 shadow-[5px_5px_20px_rgba(0,0,0,0.25)] border border-gray-100 flex flex-col justify-between min-h-[340px]">
            <div>
              <div className="flex justify-between items-center mb-6">
                <h4 className="font-bold text-md text-black">Ongoing Request</h4>
                <span className="w-6 h-6 bg-red-calm text-white text-[14px] font-semibold rounded-full flex items-center justify-center">{requests.ongoing.length}</span>
              </div>
              
              <table className="w-full text-left text-xs font-bold text-black">
                <thead>
                  <tr className="border-b border-transparent text-gray-900">
                    <th className="pb-3 text-center font-bold">No</th>
                    <th className="pb-3 px-2">|</th>
                    <th className="pb-3 text-center font-bold">Name</th>
                    <th className="pb-3 text-center font-bold">Company</th>
                    <th className="pb-3 text-center font-bold">Action</th>
                  </tr>
                </thead>
                <tbody className="space-y-2">
                  {requests.ongoing.map((item, index) => (
                    <tr ey={item.id} className="align-middle">
                      <td className="py-1.5 text-gray-900 font-bold">{index + 1}</td>
                      <td className="py-1.5 px-2 text-gray-300">|</td>
                      <td className="py-1.5 text-black text-center font-bold capitalize">{item.client_name || "N/A"}</td>
                      <td className="py-1.5 text-black text-center font-bold capitalize">{item.company_name || "N/A"}</td>
                      <td className="py-1.5 text-center space-x-1.5">
                        <button onClick={() => handleProcessRequest(item.rfq_number, "ongoing")} className="text-red-500 font-bold hover:underline">view</button>
                        <button onClick={() => handleProcessRequest(item.rfq_number, "ongoing")} className="text-green-500 font-bold hover:underline">proceed</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="text-center pt-4">
              <button className="text-red-500 font-bold text-xs hover:underline">Overview</button>
            </div>
          </div>

          <div className="bg-white rounded-[32px] p-6 shadow-[5px_5px_20px_rgba(0,0,0,0.25)] border border-gray-100 flex flex-col justify-between min-h-[340px]">
            <div>
              <div className="flex justify-between items-center mb-6">
                <h4 className="font-bold text-md text-black">Completed Request</h4>
                <span className="w-6 h-6 bg-red-calm text-white text-[14px] font-semibold rounded-full flex items-center justify-center">{requests.completed.length}</span>
              </div>
              
              <table className="w-full text-left text-xs font-bold text-black">
                <thead>
                  <tr className="border-b border-transparent text-gray-900">
                    <th className="pb-3 text-center font-bold">No</th>
                    <th className="pb-3 px-2">|</th>
                    <th className="pb-3 text-center font-bold">Name</th>
                    <th className="pb-3 text-center font-bold">Company</th>
                    <th className="pb-3 text-center font-bold">Action</th>
                  </tr>
                </thead>
                <tbody className="space-y-2">
                  {requests.completed.map((item, index) => (
                    <tr ey={item.id} className="align-middle">
                      <td className="py-1.5 text-gray-900 font-bold">{index + 1}</td>
                      <td className="py-1.5 px-2 text-gray-300">|</td>
                      <td className="py-1.5 text-black text-center font-bold capitalize">{item.client_name || "N/A"}</td>
                      <td className="py-1.5 text-black text-center font-bold capitalize">{item.company_name || "N/A"}</td>
                      <td className="py-1.5 text-center space-x-1.5">
                        <button onClick={() => handleProcessRequest(item.rfq_number, "completed")} className="text-red-500 font-bold hover:underline">view</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="text-center pt-4">
              <button className="text-red-500 font-bold text-xs hover:underline">Overview</button>
            </div>
          </div>

        </div>
    </main>
  );
};

export default Dashboard; 