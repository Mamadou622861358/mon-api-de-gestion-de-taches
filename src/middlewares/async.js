// Wrapper pour les contrôleurs async/await qui évite d'avoir à utiliser try/catch
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;