const express = require("express");
const products = require("../data/products");
const auth = require("../middleware/auth.middleware");

const router = express.Router();

router.use(auth);

// GET
router.get("/", (req, res) => {
  res.json({ data: products.filter(p => !p.eliminado) });
});

// POST
router.post("/", (req, res) => {
  const nuevo = req.body;

  nuevo.id = products.length + 1;
  nuevo.eliminado = false;

  products.push(nuevo);

  res.status(201).json({ data: nuevo });
});

// PUT
router.put("/:id", (req, res) => {
  const product = products.find(p => p.id == req.params.id);

  if (!product) {
    return res.status(404).json({ error: "No encontrado" });
  }

  Object.assign(product, req.body);

  res.json({ data: product });
});

// DELETE
router.delete("/:id", (req, res) => {
  const product = products.find(p => p.id == req.params.id);

  if (!product) {
    return res.status(404).json({ error: "No encontrado" });
  }

  product.eliminado = true;

  res.json({ data: "eliminado" });
});

module.exports = router;