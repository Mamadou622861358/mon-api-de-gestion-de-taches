const Task = require('../models/Task');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');

// @desc    Obtenir toutes les tâches
// @route   GET /api/v1/tasks
// @route   GET /api/v1/users/:userId/tasks
// @access  Private
exports.getTasks = asyncHandler(async (req, res, next) => {
  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  // Filtrage (optionnel)
  const filter = {};
  if (req.query.status) filter.status = req.query.status;
  if (req.query.priority) filter.priority = req.query.priority;

  const tasksQuery = Task.find(filter)
    .skip(skip)
    .limit(limit)
    .populate('assignedTo', 'name email')
    .populate('createdBy', 'name email');

  const tasks = await tasksQuery;
  const total = await Task.countDocuments(filter);

  res.status(200).json({
    success: true,
    count: tasks.length,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total
    },
    data: tasks
  });
});

// @desc    Obtenir une seule tâche
// @route   GET /api/v1/tasks/:id
// @access  Private
exports.getTask = asyncHandler(async (req, res, next) => {
  // Trouve une tâche par son ID et populate les champs assignedTo et createdBy
  const task = await Task.findById(req.params.id)
    .populate({
      path: 'assignedTo',
      select: 'name email',
    })
    .populate({
      path: 'createdBy',
      select: 'name email',
    });

  // Si la tâche n'existe pas
  if (!task) {
    return next(
      new ErrorResponse(`Tâche non trouvée avec l'id ${req.params.id}`, 404)
    );
  }

  // Vérifie que l'utilisateur est autorisé à voir la tâche
  if (
    task.assignedTo.toString() !== req.user.id &&
    task.createdBy.toString() !== req.user.id &&
    req.user.role !== 'admin'
  ) {
    return next(new ErrorResponse(`Non autorisé à accéder à cette tâche`, 401));
  }

  res.status(200).json({
    success: true,
    data: task,
  });
});

// @desc    Créer une tâche
// @route   POST /api/v1/tasks
// @access  Private
exports.createTask = asyncHandler(async (req, res, next) => {
  // Ajoute l'ID de l'utilisateur créateur
  req.body.createdBy = req.user.id;

  // Crée la tâche
  const task = await Task.create(req.body);

  res.status(201).json({
    success: true,
    data: task,
  });
});

// @desc    Mettre à jour une tâche
// @route   PUT /api/v1/tasks/:id
// @access  Private
exports.updateTask = asyncHandler(async (req, res, next) => {
  // Trouve la tâche à mettre à jour
  let task = await Task.findById(req.params.id);

  // Si la tâche n'existe pas
  if (!task) {
    return next(
      new ErrorResponse(`Tâche non trouvée avec l'id ${req.params.id}`, 404)
    );
  }

  // Vérifie que l'utilisateur est autorisé à modifier la tâche
  if (
    task.createdBy.toString() !== req.user.id &&
    req.user.role !== 'admin'
  ) {
    return next(new ErrorResponse(`Non autorisé à modifier cette tâche`, 401));
  }

  // Met à jour la tâche
  task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: task,
  });
});

// @desc    Supprimer une tâche
// @route   DELETE /api/v1/tasks/:id
// @access  Private
exports.deleteTask = asyncHandler(async (req, res, next) => {
  const task = await Task.findById(req.params.id);
  
  if (!task) {
    return next(new ErrorResponse(`Tâche non trouvée avec l'id ${req.params.id}`, 404));
  }

  // Vérification des permissions
  if (task.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse(`Non autorisé à supprimer cette tâche`, 401));
  }

  // ✅ Utilisez deleteOne() ou findByIdAndDelete()
  await Task.deleteOne({ _id: req.params.id }); 
  // ou: await Task.findByIdAndDelete(req.params.id);

  res.status(200).json({ 
    success: true, 
    data: {},
    message: "Tâche supprimée avec succès"
  });
});