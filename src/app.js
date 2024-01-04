const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { Sequelize, DataTypes } = require("sequelize");
const cors = require("cors"); 

const userRoutes = require('./routes/utilisateur');

const sequelize = new Sequelize('breizhsport', 'root', 'root', {
    host: "172.20.0.3",
    dialect: "mysql",
    port: "3306",
  
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
});

sequelize.sync()
  .then(() => {
    console.log('Base de données synchronisée.');
  })
  .catch(err => {
    console.error('Erreur lors de la synchronisation de la base de données :', err);
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors()); 

app.get('/', (req, res) => {
  res.send('Bienvenue sur mon API Breizhsport Produit Ugur !');
});

// Utilisez vos routes Sequelize
app.use("/user", userRoutes);

// Middleware pour gérer les erreurs 404
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

// Middleware pour gérer les erreurs générales
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
