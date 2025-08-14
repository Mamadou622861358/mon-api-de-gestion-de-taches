// Import des modules
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

// Middleware pour protéger les routes
exports.protect = async (req, res, next) => {
  let token;

  // Vérifie la présence du token dans les headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Extrait le token du header
    token = req.headers.authorization.split(' ')[1];
  }

  // Si aucun token trouvé
  if (!token) {
    return next(new ErrorResponse('Non autorisé à accéder à cette route', 401));
  }

  try {
    // Vérifie et décode le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Trouve l'utilisateur associé au token
    req.user = await User.findById(decoded.id);

    // Si l'utilisateur n'existe pas
    if (!req.user) {
      return next(new ErrorResponse('Aucun utilisateur trouvé avec cet ID', 404));
    }

    next(); // Passe au prochain middleware
  } catch (err) {
    return next(new ErrorResponse('Non autorisé à accéder à cette route', 401));
  }
};

// Middleware pour vérifier les rôles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    // Vérifie si le rôle de l'utilisateur est autorisé
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `Le rôle ${req.user.role} n'est pas autorisé à accéder à cette route`,
          403
        )
      );
    }
    next();
  };
};