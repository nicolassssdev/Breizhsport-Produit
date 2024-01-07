const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const produitRoutes = require('./routes/produit');

const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/product', produitRoutes);

app.get('/', (req, res) => {
  res.send('Bienvenue sur mon API Breizhsport Produit !');
});
// Middleware pour gérer les erreurs 404
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

// Middleware pour gérer les erreurs générales
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
