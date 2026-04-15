const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/productos", productRoutes);

app.get("/", (req, res) => {
  res.json({
    data: "API Supermercado funcionando"
  });
});

app.use((req, res) => {
  res.status(404).json({
    error: {
      code: "NOT_FOUND",
      message: "Ruta no encontrada"
    }
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    error: {
      code: "SERVER_ERROR",
      message: "Ocurrió un error en el servidor"
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

