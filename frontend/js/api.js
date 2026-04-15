const BASE_URL = "http://localhost:3000";

function getToken() {
  return localStorage.getItem("token");
}

function redirectToLogin(message) {
  localStorage.removeItem("token");
  const query = message ? `?message=${encodeURIComponent(message)}` : "";
  window.location.href = `login.html${query}`;
}

async function request(endpoint, method = "GET", body = null) {
  const headers = {
    "Content-Type": "application/json"
  };

  const token = getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(BASE_URL + endpoint, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined
  });

  const data = await res.json().catch(() => ({ error: { code: "NO_RESPONSE", message: "No se recibió respuesta JSON" } }));

  if (res.status === 401 || res.status === 403) {
    redirectToLogin(data.error?.message || "Acceso no autorizado");
    return data;
  }

  return data;
}
