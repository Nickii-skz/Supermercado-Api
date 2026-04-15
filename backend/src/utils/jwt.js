const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET || "super_clave_secreta";

function generateToken(user) {
  return jwt.sign(
    {
      sub: user.id,
      usuario: user.usuario,
      activo: user.activo
    },
    SECRET,
    { expiresIn: "1h" }
  );
}

function verifyToken(token) {
  return jwt.verify(token, SECRET);
}

module.exports = { generateToken, verifyToken };