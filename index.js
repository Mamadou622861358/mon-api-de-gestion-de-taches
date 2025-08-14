// Assurez-vous que ces imports sont corrects
const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const errorHandler = require('./src/middlewares/error'); // Vérifiez ce chemin
require('dotenv').config(); // Chargera automatiquement .env à la racine
const connectDB=require("./src/config/db")
// Ajoutez ceci pour déboguer
console.log('MONGO_URI:', process.env.MONGO_URI);
console.log('NODE_ENV:', process.env.NODE_ENV);

// Le reste de votre code...

// Chargez les variables d'environnement AVANT toute autre chose
dotenv.config({ path: './config/config.env' });

// Connexion à la base de données
connectDB();

// Import des routes - vérifiez que ces fichiers existent
const auth = require('./src/routes/auth');
const users = require('./src/routes/users');
const tasks = require('./src/routes/tasks');

// Initialisation de l'application Express
const app = express();

// Middleware pour parser le JSON
app.use(express.json());

// Middleware CORS
app.use(cors());

// Middleware de logging en développement
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Montage des routeurs - vérifiez que ces variables contiennent bien des routeurs Express
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/tasks', tasks);

// Middleware de gestion des erreurs - assurez-vous que errorHandler est bien exporté
app.use(errorHandler);

// Configuration du port
const PORT = process.env.PORT || 5000;

// Démarrage du serveur
const server = app.listen(
  PORT,
  console.log(
    `Serveur en mode ${process.env.NODE_ENV} sur le port ${PORT}`.yellow.bold
  )
);

// Gestion des erreurs non catchées
process.on('unhandledRejection', (err, promise) => {
  console.log(`Erreur: ${err.message}`.red);
  server.close(() => process.exit(1));
});