const express = require('express');
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/tasks');
const { protect } = require('../middlewares/auth');

// Ajout de la pagination et des filtres avancés
const advancedResults = require('../middlewares/advancedResults');
const Task = require('../models/Task');

const router = express.Router();

// Toutes les routes protégées par authentification
router.use(protect);

router
  .route('/')
  .get(
    advancedResults(Task, [
      { path: 'assignedTo', select: 'name email' },
      { path: 'createdBy', select: 'name email' },
    ]),
    getTasks
  )
  .post(createTask);

router
  .route('/:id')
  .get(getTask)
  .put(updateTask)
  .delete(deleteTask);

// Route pour les tâches d'un utilisateur spécifique
router.route('/user/:userId').get(getTasks);

module.exports = router;