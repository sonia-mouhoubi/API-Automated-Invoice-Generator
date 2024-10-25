const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const ctrlCustomer = require("../controllers/customerController");

// Créer un client
router.post("/", authMiddleware, ctrlCustomer.createCustomer);

// Récupérer tous les clients d'un utilisateur
router.get("/", authMiddleware, ctrlCustomer.getCustomersByUserId);

// Récupérer les factures d'un client spécifique
router.get(
  "/invoices/:customerId",
  authMiddleware,
  ctrlCustomer.getInvoicesByCustomerId
);
module.exports = router;
