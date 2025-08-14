// Import des modules
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');

// @desc    Enregistrer un utilisateur
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
  // Crée un nouvel utilisateur avec les données de la requête
  const user = await User.create(req.body);

  // Génère un token pour l'utilisateur
  const token = user.getSignedJwtToken();

  // Réponse avec le token
  res.status(200).json({ success: true, token });
});

// @desc    Connecter un utilisateur
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Vérifie que l'email et le mot de passe sont fournis
  if (!email || !password) {
    return next(new ErrorResponse('Veuillez fournir un email et un mot de passe', 400));
  }

  // Trouve l'utilisateur par email en incluant le mot de passe
  const user = await User.findOne({ email }).select('+password');

  // Si l'utilisateur n'existe pas
  if (!user) {
    return next(new ErrorResponse('Identifiants invalides', 401));
  }

  // Vérifie le mot de passe
  const isMatch = await user.matchPassword(password);

  // Si le mot de passe ne correspond pas
  if (!isMatch) {
    return next(new ErrorResponse('Identifiants invalides', 401));
  }

  // Génère un token
  const token = user.getSignedJwtToken();

  // Réponse avec le token
  res.status(200).json({ success: true, token });
});

// @desc    Obtenir l'utilisateur connecté
// @route   GET /api/v1/auth/me
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
  // Renvoie les informations de l'utilisateur connecté
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});