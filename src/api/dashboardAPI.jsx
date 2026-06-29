// services/dashboardAPI.jsx

const DASHBOARD_URL = import.meta.env.VITE_API_SERVER_DASHBOARD;

/**
 * Mengambil jumlah/statistik data berdasarkan status_request
 */
export async function getDashboardStats() {
  const response = await fetch(`${DASHBOARD_URL}/stats`, {
    method: 'GET',
    credentials: "include"
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || data.message || "Gagal mengambil statistik dashboard");
  }
  return data;
}

/**
 * Mengambil maksimal 5 data pertama untuk setiap status_request
 */
export async function getDashboardRequests() {
  const response = await fetch(`${DASHBOARD_URL}/requests`, {
    method: 'GET',
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || data.message || "Gagal mengambil data request");
  }
  return data;
}

/**
 * Memperbarui status_request (misal: 'incoming' -> 'ongoing')
 * @param {string|number} rfq_number - ID internal dari rfq
 * @param {string} nextStatus - Status baru ('incoming' | 'ongoing' | 'completed')
 */
export async function updateRequestStatus(rfq_number, nextStatus) {
  const response = await fetch(`${DASHBOARD_URL}/update-status`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ rfq_number, nextStatus }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || data.message || "Gagal memperbarui status data");
  }
  return data;
}