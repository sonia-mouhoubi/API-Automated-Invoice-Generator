const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = mongoose
  .connect(process.env.DATABASE_URI, {
    autoIndex: false,
    maxPoolSize: 10,
    // serverSelectionTimeoutMS: 5000,
    // socketTimeoutMS: 45000,

    // A effacer
    serverSelectionTimeoutMS: 8000,
    socketTimeoutMS: 55000,
  })
  .then(async () => {
    console.log("Connexion à MongoDB réussie");
  })
  .catch((err) => {
    console.log("Connexion à MongoDb échouée :", err);
  });

// Fermer la connexion MongoDB lors de l'arrêt du processus
process.on("SIGINT", () => {
  mongoose.disconnect().then(() => {
    process.exit(0); // Quitter le processus
  });
});

process.on("SIGTERM", () => {
  mongoose.disconnect().then(() => {
    console.log("Connexion à MongoDb fermée");
    process.exit(0);
  });
});

module.exports = dbConnect;
