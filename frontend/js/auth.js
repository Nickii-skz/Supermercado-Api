async function submitLogin(event) {
  event.preventDefault();

  const usuario = document.getElementById("usuario").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorBox = document.getElementById("loginError");

  errorBox.classList.add("d-none");
  errorBox.textContent = "";

  if (!usuario || !password) {
    errorBox.textContent = "Debes ingresar usuario y contraseña.";
    errorBox.classList.remove("d-none");
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuario, password })
    });

    const data = await response.json();

    if (data.error) {
      errorBox.textContent = data.error.message;
      errorBox.classList.remove("d-none");
      return;
    }

    localStorage.setItem("token", data.data.access_token);
    window.location.href = "dashboard.html";
  } catch (err) {
    errorBox.textContent = "Error de conexión con el servidor.";
    errorBox.classList.remove("d-none");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const message = params.get("message");

  if (message) {
    const errorBox = document.getElementById("loginError");
    if (errorBox) {
      errorBox.textContent = message;
      errorBox.classList.remove("d-none");
    }
  }

  if (localStorage.getItem("token")) {
    window.location.href = "dashboard.html";
  }
});
