const RFQ_URL = import.meta.env.VITE_API_SERVER_RFQ;

/**
 * Mengunggah data form RFQ dan berkas lampiran ke backend.
 * Backend akan mengembalikan data RFQ, lampiran, dan link PDF Utama yang berhasil digenerate.
 * 
 * @param {FormData} formData - Data form yang dikirim dari komponen React
 * @returns {Promise<Object>} Data respons sukses dari server
 */
export async function uploadRFQ(formData) {
  const response = await fetch(
    `${RFQ_URL}/submit`, 
    {
      method: 'POST',
      credentials: "include",
      body: formData, 
    }
  );

  console.log("Status:", response.status);

  const data = await response.json();
  console.log("Response Data:", data);

  if (!response.ok) {
    throw new Error(data.error || data.message || "Terjadi kesalahan saat menyimpan RFQ.");
  }

  return data;

  // if (response.ok) {
  //   alert('Data dan Invoice berhasil disimpan!');
  //   return data;
  // } else {
  //   setError('Gagal menyimpan data.');
  // }
};

/**
 * Mengambil semua daftar riwayat RFQ milik visitor tertentu berdasarkan public_id user.
 * 
 * @param {string} userPublicId - ID unik publik milik user/visitor
 * @returns {Promise<Object>} Daftar riwayat RFQ
 */

export async function getVisitorRfqList(userPublicId) {
  const response = await fetch(`${RFQ_URL}/user/${userPublicId}`, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || "Gagal mengambil daftar RFQ.");
  }
  return data; 
}