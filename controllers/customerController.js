const Customer = require("../models/Customer");
const Invoice = require("../models/Invoice");

// Créer un client
exports.createCustomer = async (req, res) => {
  const { lastName, firstName, email, phone } = req.body;
  const userId = req.userId; // ID de l'utilisateur provenant du middleware d'authentification

  // Vérification des données entrantes
  if (!lastName || !firstName || !email) {
    return res
      .status(400)
      .json({ message: "Tous les champs requis sont obligatoires." });
  }

  try {
    // Création du client
    const newCustomer = new Customer({
      lastName,
      firstName,
      email,
      phone,
      userId,
    });

    await newCustomer.save();
    res
      .status(201)
      .json({ message: "Client créé avec succès", customer: newCustomer });
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de la création du client",
      error: err.message,
    });
  }
};

// Récupérer tous les clients d'un utilisateur
exports.getCustomersByUserId = async (req, res) => {
  const userId = req.userId;

  try {
    const customers = await Customer.find({ userId });

    if (customers.length === 0) {
      return res.status(404).json({ message: "Aucun client trouvé." });
    }

    res.status(200).json(customers);
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de la récupération des clients",
      error: err.message,
    });
  }
};

// Récupérer les factures par client
exports.getInvoicesByCustomerId = async (req, res) => {
  const userId = req.userId;
  const { customerId } = req.params;

  try {
    // Vérifier si le client appartient à l'utilisateur
    const customer = await Customer.findOne({ _id: customerId, userId });

    if (!customer) {
      return res.status(404).json({ message: "Client non trouvé." });
    }

    // Récupérer les factures associées au client
    const invoices = await Invoice.find({ customerId });

    if (invoices.length === 0) {
      return res
        .status(404)
        .json({ message: "Aucune facture trouvée pour ce client." });
    }

    res.status(200).json(invoices);
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de la récupération des factures",
      error: err.message,
    });
  }
};
