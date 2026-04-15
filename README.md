# Supermercado API

Una API REST completa para la gestión de un supermercado, incluyendo autenticación de usuarios y operaciones CRUD en productos. Incluye un frontend básico para interactuar con la API.

## Características

- **Autenticación JWT**: Sistema de login y registro seguro.
- **Gestión de Productos**: Crear, leer, actualizar y eliminar productos.
- **Gestión de Usuarios**: Registro y autenticación de usuarios.
- **Frontend Básico**: Interfaz web para consumir la API.
- **CORS Habilitado**: Para facilitar el desarrollo del frontend.

## Tecnologías Utilizadas

- **Backend**: Node.js, Express.js
- **Autenticación**: JSON Web Tokens (JWT)
- **Frontend**: HTML, CSS, JavaScript (con Bootstrap)
- **Base de Datos**: En memoria (arrays) para simplicidad

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Nickii-skz/Supermercado-Api.git
   cd supermercado-api
   ```

2. Instala las dependencias del backend:
   ```bash
   cd backend
   npm install
   ```

3. Crea un archivo `.env` en la carpeta `backend` con las siguientes variables:
   ```
   JWT_SECRET=tu_clave_secreta_aqui
   PORT=3000
   ```

4. Inicia el servidor:
   ```bash
   npm run dev
   ```
   El servidor correrá en `http://localhost:3000`.

## Uso

### Endpoints de la API

#### Autenticación
- `POST /auth/register` - Registrar un nuevo usuario
- `POST /auth/login` - Iniciar sesión

#### Productos
- `GET /productos` - Obtener todos los productos
- `GET /productos/:id` - Obtener un producto por ID
- `POST /productos` - Crear un nuevo producto (requiere autenticación)
- `PUT /productos/:id` - Actualizar un producto (requiere autenticación)
- `DELETE /productos/:id` - Eliminar un producto (requiere autenticación)

### Frontend

Abre `frontend/index.html` en tu navegador. Desde ahí puedes:
- Registrarte e iniciar sesión.
- Ver la lista de productos.
- Agregar, editar y eliminar productos (si estás autenticado).

## Estructura del Proyecto

```
supermercado-api/
├── backend/
│   ├── src/
│   │   ├── app.js
│   │   ├── data/
│   │   │   ├── products.js
│   │   │   └── users.js
│   │   ├── middleware/
│   │   │   └── auth.middleware.js
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   └── product.routes.js
│   │   └── utils/
│   │       └── jwt.js
│   └── package.json
├── frontend/
│   ├── index.html
│   ├── login.html
│   ├── dashboard.html
│   ├── js/
│   │   ├── api.js
│   │   ├── auth.js
│   │   └── products.js
│   └── styles/
│       └── styles.css
└── README.md
```

## Contribución

Si quieres contribuir:
1. Haz un fork del proyecto.
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`).
3. Haz commit de tus cambios (`git commit -am 'Agrega nueva funcionalidad'`).
4. Push a la rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## Licencia

Este proyecto está bajo la Licencia ISC.