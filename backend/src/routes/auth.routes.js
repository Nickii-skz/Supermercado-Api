const express = require("express");
const users = require("../data/users");
const { generateToken } = require("../utils/jwt");

const router = express.Router();

router.post("/", (req, res) => {
  const { usuario, password } = req.body;

  const user = users.find(
    u => u.usuario === usuario && u.password === password
  );

  if (!user) {
    return res.status(401).json({
      error: { message: "Credenciales incorrectas" }
    });
  }

  const token = generateToken(user);

  res.json({
    data: { access_token: token }
  });
});

module.exports = router;