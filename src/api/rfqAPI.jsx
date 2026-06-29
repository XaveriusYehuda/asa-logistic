const RFQ_URL = import.meta.env.VITE_API_SERVER_RFQ;

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
  console.log(data);

  if (!response.ok) {
    throw new Error(data.error || data.message || "Terjadi kesalahan");
  }

  return data;

  if (response.ok) {
    alert('Data dan Invoice berhasil disimpan!');
    return data;
  } else {
    setError('Gagal menyimpan data.');
  }
};

export async function getVisitorRfqList(userPublicId) {
  const response = await fetch(`${RFQ_URL}/user/${userPublicId}`, {
    method: "GET",
    credentials: "include",
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Gagal mengambil daftar RFQ.");
  return data; 
}