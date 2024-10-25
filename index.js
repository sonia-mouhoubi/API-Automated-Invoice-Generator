const app = require("./app");
const PORT = 3000;
const dbConnect = require("./db/db.js");

// Démarrer le serveur seulement après la connexion à MongoDB
dbConnect
  .then(() => {
    app.listen(PORT, () => {
      // // `Serveur démarré sur le port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(
      "Impossible de démarrer le serveur, erreur de connexion à MongoDB :",
      err
    );
  });
