const express = require("express");
const ctrlAuth = require("../controllers/authController");
const router = express.Router();

// Inscription
router.post("/register", ctrlAuth.register);
// Connexion
router.post("/login", ctrlAuth.login);

module.exports = router;
