let currentPage = 1;
const limit = 5;
const filters = {
  nombre: "",
  subcategoria: "",
  estado: ""
};
let editingId = null;

function showTableError(message) {
  const box = document.getElementById("tableError");
  if (!box) return;
  box.textContent = message;
  box.classList.remove("d-none");
}

function hideTableError() {
  const box = document.getElementById("tableError");
  if (!box) return;
  box.classList.add("d-none");
}

function validateProductForm(data) {
  const errors = [];
  if (!data.nombre) errors.push("El nombre es obligatorio.");
  if (!data.descripcion) errors.push("La descripción es obligatoria.");
  if (!data.subcategoria) errors.push("La subcategoría es obligatoria.");
  if (!data.precio || data.precio <= 0) errors.push("El precio debe ser mayor a cero.");
  if (!data.precioxcantidad || data.precioxcantidad <= 0) errors.push("El precio por cantidad debe ser mayor a cero.");
  if (!data.estado || (data.estado !== "activo" && data.estado !== "inactivo")) {
    errors.push("El estado debe ser 'activo' o 'inactivo'.");
  }
  return errors;
}

function openProductModal(product = null) {
  editingId = product ? product.id : null;
  const title = document.getElementById("modalTitle");
  title.textContent = product ? "Editar producto" : "Crear producto";

  document.getElementById("productNombre").value = product ? product.nombre : "";
  document.getElementById("productDescripcion").value = product ? product.descripcion : "";
  document.getElementById("productSubcategoria").value = product ? product.subcategoria : "";
  document.getElementById("productPrecio").value = product ? product.precio : "";
  document.getElementById("productPrecioCantidad").value = product ? product.precioxcantidad : "";
  document.getElementById("productEstado").value = product ? product.estado : "activo";

  document.getElementById("formError").classList.add("d-none");
}

async function loadProducts() {
  hideTableError();

  const params = new URLSearchParams();
  if (filters.nombre) params.append("nombre", filters.nombre);
  if (filters.subcategoria) params.append("subcategoria", filters.subcategoria);
  if (filters.estado) params.append("estado", filters.estado);
  params.append("page", currentPage);
  params.append("limit", limit);

  const response = await request(`/productos?${params.toString()}`);

  if (response.error) {
    showTableError(response.error.message || "No fue posible cargar los productos.");
    return;
  }

  renderProducts(response.data || []);
  renderPagination(response.pagination || { page: 1, limit, total: 0, totalPages: 1 });
}

function renderProducts(products) {
  const body = document.getElementById("productBody");
  body.innerHTML = "";

  if (!products.length) {
    body.innerHTML = `
      <tr>
        <td colspan="7" class="text-center text-muted py-4">No hay productos para mostrar.</td>
      </tr>
    `;
    return;
  }

  products.forEach(product => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${product.nombre}</td>
      <td>${product.descripcion}</td>
      <td>${product.subcategoria}</td>
      <td>$${product.precio.toLocaleString()}</td>
      <td>$${product.precioxcantidad.toLocaleString()}</td>
      <td><span class="badge ${product.estado === 'activo' ? 'bg-success' : 'bg-secondary'}">${product.estado}</span></td>
      <td class="text-end">
        <button class="btn btn-sm btn-outline-primary me-2" onclick='openProductModal(${JSON.stringify(product)})' data-bs-toggle="modal" data-bs-target="#productModal">Editar</button>
        <button class="btn btn-sm btn-outline-danger" onclick="deleteProduct(${product.id})">Eliminar</button>
      </td>
    `;

    body.appendChild(row);
  });
}

function renderPagination(pagination) {
  const info = document.getElementById("paginationInfo");
  if (!info) return;

  info.textContent = `Página ${pagination.page} de ${pagination.totalPages} — ${pagination.total} productos`;
}

function applyFilters() {
  filters.nombre = document.getElementById("filterName").value.trim();
  filters.subcategoria = document.getElementById("filterCategory").value;
  filters.estado = document.getElementById("filterStatus").value;
  currentPage = 1;
  loadProducts();
}

function resetFilters() {
  document.getElementById("filterName").value = "";
  document.getElementById("filterCategory").value = "";
  document.getElementById("filterStatus").value = "";
  applyFilters();
}

function changePage(direction) {
  currentPage += direction;
  if (currentPage < 1) {
    currentPage = 1;
  }
  loadProducts();
}

async function saveProduct(event) {
  event.preventDefault();

  const data = {
    nombre: document.getElementById("productNombre").value.trim(),
    descripcion: document.getElementById("productDescripcion").value.trim(),
    subcategoria: document.getElementById("productSubcategoria").value.trim(),
    precio: Number(document.getElementById("productPrecio").value),
    precioxcantidad: Number(document.getElementById("productPrecioCantidad").value),
    estado: document.getElementById("productEstado").value
  };

  const errors = validateProductForm(data);
  const formError = document.getElementById("formError");

  if (errors.length) {
    formError.textContent = errors.join(" ");
    formError.classList.remove("d-none");
    return;
  }

  const method = editingId ? "PUT" : "POST";
  const endpoint = editingId ? `/productos/${editingId}` : "/productos";
  const response = await request(endpoint, method, data);

  if (response.error) {
    formError.textContent = response.error.message || "No se pudo guardar el producto.";
    formError.classList.remove("d-none");
    return;
  }

  const modal = bootstrap.Modal.getInstance(document.getElementById("productModal"));
  modal.hide();

  loadProducts();
}

async function deleteProduct(id) {
  const confirmed = confirm("¿Seguro que quieres eliminar este producto?");
  if (!confirmed) return;

  const response = await request(`/productos/${id}`, "DELETE");
  if (response.error) {
    showTableError(response.error.message || "No fue posible eliminar el producto.");
    return;
  }

  loadProducts();
}

function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

function initDashboard() {
  const token = getToken();
  if (!token) {
    redirectToLogin("Debes iniciar sesión para ver el panel.");
    return;
  }

  loadProducts();
}

window.addEventListener("DOMContentLoaded", initDashboard);
