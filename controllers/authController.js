const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

// Inscription
exports.register = async (req, res) => {
  const { email, password, lastName, firstName } = req.body;

  // Validation des entrées
  if (!email || !password || !lastName || !firstName) {
    return res.status(400).json({ message: "Tous les champs sont requis." });
  }

  try {
    // Vérification si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "L'utilisateur existe déjà." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashedPassword,
      lastName,
      firstName,
    });
    await newUser.save();
    res.status(201).json({ message: "Utilisateur enregistré avec succès." });
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de l'enregistrement de l'utilisateur.",
      error: err.message,
    });
  }
};

// Connexion
exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Validation des entrées
  if (!email || !password) {
    return res.status(400).json({ message: "Email et mot de passe requis." });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Identifiants invalides." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Identifiants invalides." });
    }

    // Utilisation de la clé secrète depuis les variables d'environnement
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de la connexion de l'utilisateur.",
      error: err.message,
    });
  }
};
