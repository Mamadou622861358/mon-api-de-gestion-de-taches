// Import des modules nécessaires
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Définition du schéma utilisateur
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Veuillez ajouter un nom'], // Champ obligatoire
    trim: true, // Supprime les espaces inutiles
    maxlength: [50, 'Le nom ne peut pas dépasser 50 caractères'],
  },
  email: {
    type: String,
    required: [true, 'Veuillez ajouter un email'],
    unique: true, // Email unique
    match: [
      // Validation de format d'email
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Veuillez ajouter un email valide',
    ],
  },
  password: {
    type: String,
    required: [true, 'Veuillez ajouter un mot de passe'],
    minlength: 6, // Longueur minimale
    select: false, // Ne pas retourner le mot de passe par défaut dans les requêtes
  },
  role: {
    type: String,
    enum: ['user', 'admin'], // Rôles possibles
    default: 'user', // Valeur par défaut
  },
  createdAt: {
    type: Date,
    default: Date.now, // Date de création automatique
  },
});

// Middleware pour hacher le mot de passe avant sauvegarde
UserSchema.pre('save', async function (next) {
  // Vérifie si le mot de passe a été modifié
  if (!this.isModified('password')) {
    next();
  }

  // Génère un sel et hache le mot de passe
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Méthode pour générer un JWT
UserSchema.methods.getSignedJwtToken = function () {
  // Crée un token avec l'ID utilisateur et une expiration
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Méthode pour vérifier le mot de passe
UserSchema.methods.matchPassword = async function (enteredPassword) {
  // Compare le mot de passe entré avec le hash stocké
  return await bcrypt.compare(enteredPassword, this.password);
};

// Export du modèle User
module.exports = mongoose.model('User', UserSchema);