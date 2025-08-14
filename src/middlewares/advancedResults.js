const advancedResults = (model, populate) => async (req, res, next) => {
  let query;

  // Copie de la requête
  const reqQuery = { ...req.query };

  // Champs à exclure pour le filtrage
  const removeFields = ['select', 'sort', 'page', 'limit'];

  // Supprime les champs spéciaux de la requête
  removeFields.forEach(param => delete reqQuery[param]);

  // Convertit la requête en string pour manipulation
  let queryStr = JSON.stringify(reqQuery);

  // Crée les opérateurs MongoDB ($gt, $gte, etc)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  // Trouve les ressources avec les filtres
  query = model.find(JSON.parse(queryStr));

  // Sélection des champs
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  // Tri
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.countDocuments();

  query = query.skip(startIndex).limit(limit);

  // Population des relations
  if (populate) {
    query = query.populate(populate);
  }

  // Exécution de la requête
  const results = await query;

  // Résultat de la pagination
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    };
  }

  res.advancedResults = {
    success: true,
    count: results.length,
    pagination,
    data: results
  };

  next();
};

module.exports = advancedResults;