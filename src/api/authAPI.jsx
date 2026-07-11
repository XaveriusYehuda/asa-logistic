const API_URL = import.meta.env.VITE_API_SERVER_AUTH;

async function handleResponse(response) {
  const text = await response.text(); // Ambil sebagai teks biasa terlebih dahulu
  const data = text ? JSON.parse(text) : {}; // Jika ada isinya, parse ke JSON. Jika kosong, jadikan objek kosong.

  if (!response.ok) {
    throw new Error(data.message || "Terjadi kesalahan pada server");
  }

  return data;
}

export async function login(email, password) {
  const response = await fetch(
    `${API_URL}/login`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }
  );

  return handleResponse(response);
}

export async function signup(
  username,
  email,
  password
) {
    
    const response = await fetch(
      `${API_URL}/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      }
    );

  return handleResponse(response);
}

export async function getProfile() {
  const response = await fetch(
    `${API_URL}/profile`,
    {
      credentials: "include",
    }
  );

  return handleResponse(response);
}

export async function logout() {
  const response = await fetch(
    `${API_URL}/logout`,
    {
      method: "POST",
      credentials: "include",
    }
  );

  return handleResponse(response);
}