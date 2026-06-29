// services/worksheetService.js

const WORKSHEET_URL = import.meta.env.VITE_API_SERVER_WORKSHEET;

/**
 * Mengambil data detail RFQ berdasarkan ID
 * @param {string|number} rfq_number - ID dari RFQ yang ingin diambil
 */
export async function getRFQDetail(rfq_number) {

  const encodedId = encodeURIComponent(rfq_number);
  
  const response = await fetch(

    `${WORKSHEET_URL}/rfq-request/${encodedId}`,
    {
      method: 'GET',
      credentials: "include", 
    }
  );

  console.log("Status:", response.status);

  const data = await response.json();
  console.log(data);

  if (!response.ok) {
    throw new Error(data.error || data.message || "Gagal mengambil data dari server");
  }

  return data;
}