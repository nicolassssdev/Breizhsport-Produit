const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Exemple de route
app.get('/', (req, res) => {
  res.send('Bienvenue sur mon API Breizhsport Produit !');
});

// Exemple de route pour obtenir des données
app.get('/api/data', (req, res) => {
  const data = { message: 'Ceci est une réponse de l\'API Breizhsport Produit !' };
  res.json(data);
});

// Exemple de route pour recevoir des données
app.post('/api/data', (req, res) => {
  const receivedData = req.body;
  res.json({ message: 'Données reçues avec succès !', data: receivedData });
});

// Écoute du serveur sur le port spécifié
app.listen(port, () => {
  console.log(`Le serveur écoute sur le port ${port}`);
});
