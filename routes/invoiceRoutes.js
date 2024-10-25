const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

const ctrlInvoice = require("../controllers/invoiceController");

// Créer une nouvelle facture (nécessite authentification)
router.post("/", authMiddleware, ctrlInvoice.createInvoice);

// Ajout du middleware d'authentification
router.get("/", authMiddleware, ctrlInvoice.getInvoicesByUserId);

// Route pour récupérer une seule facture
router.get("/:invoiceId", authMiddleware, ctrlInvoice.getInvoiceById);
module.exports = router;
