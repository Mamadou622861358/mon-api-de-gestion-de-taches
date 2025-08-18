# Documentation du projet : API de gestion de tâches

## Description

Cette API permet de gérer des utilisateurs et des tâches. Elle est construite avec Node.js et Express, utilise MongoDB pour la persistance des données, et propose des fonctionnalités d’authentification, de gestion des utilisateurs et des tâches.

## Structure du projet

```
index.js                // Point d'entrée de l'application
package.json            // Dépendances et scripts
src/
  config/
    db.js               // Configuration de la base de données
  controllers/
    auth.js             // Contrôleur d'authentification
    tasks.js            // Contrôleur des tâches
    users.js            // Contrôleur des utilisateurs
  middlewares/
    advancedResults.js  // Middleware pour la gestion avancée des résultats
    async.js            // Middleware pour la gestion des fonctions asynchrones
    auth.js             // Middleware d'authentification
    error.js            // Middleware de gestion des erreurs
  models/
    Task.js             // Modèle de tâche
    User.js             // Modèle d'utilisateur
  routes/
    auth.js             // Routes d'authentification
    tasks.js            // Routes des tâches
    users.js            // Routes des utilisateurs
  utils/
    errorResponse.js    // Utilitaire pour les réponses d'erreur
```

## Installation

1. Installer les dépendances :
   ```bash
   npm install
   ```
2. Configurer les variables d’environnement (MongoDB URI, JWT secret, etc.) dans un fichier `.env`.

## Démarrage

```bash
npm start
```

## Fonctionnalités principales

- Authentification JWT (inscription, connexion)
- Gestion des utilisateurs (CRUD)
- Gestion des tâches (CRUD)
- Middleware de gestion des erreurs et des résultats avancés

## Endpoints principaux

- `/api/auth` : Authentification (login, register)
- `/api/users` : Gestion des utilisateurs
- `/api/tasks` : Gestion des tâches

## Technologies utilisées

- Node.js
- Express
- MongoDB (Mongoose)
- JWT pour l’authentification

## Déploiement

Le projet est déployé à l’adresse suivante :

[https://mon-api-de-gestion-de-taches.onrender.com](https://mon-api-de-gestion-de-taches.onrender.com)

## Auteur

Mamadou622861358
