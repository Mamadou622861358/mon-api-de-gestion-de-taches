const express = require('express');
const {
  register,
  login,
  getMe,
} = require('../controllers/auth');
const { protect } = require('../middlewares/auth');

const router = express.Router();

// Route pour l'enregistrement
router.post('/register', register);

// Route pour la connexion
router.post('/login', login);

// Route pour obtenir les infos de l'utilisateur connecté
router.get('/me', protect, getMe);

module.exports = router;