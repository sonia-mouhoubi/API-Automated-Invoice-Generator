const Invoice = require("../models/Invoice");

exports.createInvoice = async (req, res) => {
  const { clientLastName, clientEmail, items, tva } = req.body;
  const userId = req.userId; // L'ID de l'utilisateur provenant du middleware d'authentification

  // Vérification des données entrantes
  if (
    !clientLastName ||
    !clientEmail ||
    !items ||
    items.length === 0 ||
    tva === undefined
  ) {
    return res.status(400).json({ message: "Tous les champs sont requis" });
  }

  // Calcul du total et de la TVA
  let totalAmount = 0;

  items.forEach((item) => {
    const { quantity, price } = item;
    // Calculer le montant total pour chaque article
    if (quantity && price) {
      totalAmount += quantity * price;
    }
  });

  // Calcul de la TVA
  const tvaAmount = (totalAmount * tva) / 100; // TVA en pourcentage
  totalAmount += tvaAmount; // Ajouter la TVA au total

  try {
    // Création de la facture
    const newInvoice = new Invoice({
      userId,
      clientLastName,
      clientEmail,
      items,
      tva, // Incluez le champ tva lors de la création de la facture
      totalAmount,
    });

    await newInvoice.save();
    res
      .status(201)
      .json({ message: "Facture créée avec succès", invoice: newInvoice });
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de la création de la facture",
      error: err.message,
    });
  }
};

// Récupérer toutes les factures d'un utilisateur
exports.getInvoicesByUserId = async (req, res) => {
  const userId = req.userId;

  try {
    const invoices = await Invoice.find({ userId });

    if (invoices.length === 0) {
      return res.status(404).json({ message: "Aucune facture trouvée." });
    }

    res.status(200).json(invoices);
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de la récupération des factures.",
      error: err.message,
    });
  }
};

// Récupérer une facture par son ID
exports.getInvoiceById = async (req, res) => {
  const userId = req.userId;
  const { invoiceId } = req.params;

  try {
    const invoice = await Invoice.findOne({ _id: invoiceId, userId });

    if (!invoice) {
      return res.status(404).json({ message: "Facture non trouvée." });
    }

    res.status(200).json(invoice);
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de la récupération de la facture.",
      error: err.message,
    });
  }
};
