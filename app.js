// APP.JS
const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const authRoutes = require("./routes/authRoutes.js");
const invoiceRoutes = require("./routes/invoiceRoutes.js");
const customerRoutes = require("./routes/customerRoutes.js");

// Endpoint de base pour tester l'API
app.get("/", (req, res) => {
  res.send("Connexion au serveur réussie.");
});

// Utilisez `cors()` pour autoriser les requêtes entre origines différentes
app.use(cors());

// Permet de gérer les problèmes de CORS ( partage de ressource entre origines multiples)
app.use((req, res, next) => {
  // On donne l'autorisation à tous le monde d'utiliser notre API (Orign : qui à le droit d'accéder à notre API, * tous le mode)
  res.setHeader("Access-Control-Allow-Origin", "*");
  // On donne l'autorisation d'utiliser certaine entête, certain headers sur l'objet request
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  // Ainsi que certaine méthode
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// Accéder au cors des requêtes gràce au middleware express.json
app.use(express.json());

// Routes de l'api
// Route pour l'authentification des utilisateurs
app.use("/auth", authRoutes);
app.use("/invoices", invoiceRoutes);
app.use("/customers", customerRoutes);

module.exports = app;
