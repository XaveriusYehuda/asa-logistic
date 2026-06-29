const FINALRFQ_URL = import.meta.env.VITE_API_SERVER_FINALRFQ;

export async function uploadFinalRFQ(rfq_number, file) {

  if (!rfq_number || !file) {
    throw new Error("Irfq_number and file are required.");
  }

  // Menggunakan FormData karena kita mengirimkan file (binary)
  const formData = new FormData();
  formData.append("rfq_number", rfq_number);
  formData.append("final_document", file); // key ini harus sama dengan upload.single("final_document") di backend

  const response = await fetch(`${FINALRFQ_URL}/submit`, {
    method: "POST",
    credentials: "include", // Menyertakan cookie jika dibutuhkan oleh session/auth Anda
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || data.message || "Terjadi kesalahan saat mengunggah file.");
  }

  return data;
}

export function downloadFinalRFQ(rfq_number) {
  const encodedId = encodeURIComponent(rfq_number);
  window.open(`${FINALRFQ_URL}/download/${encodedId}`, "_blank");
}