require("dotenv").config();
const jwt = require("jsonwebtoken");

// Middleware d'authentification
const authMiddleware = (req, res, next) => {
  // Récupérer le token du header Authorization
  const token = req.headers["authorization"]?.split(" ")[1]; // Extraire le token du format "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: "Aucun token fourni" });
  }

  // Vérifier le token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(403)
        .json({ message: "Échec de l'authentification du token" });
    }
    req.userId = decoded.id; // Ajouter l'ID de l'utilisateur à la requête
    next(); // Passe au middleware suivant
  });
};

module.exports = authMiddleware;
