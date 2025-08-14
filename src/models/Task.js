const mongoose = require('mongoose');

// Définition du schéma de tâche
const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Veuillez ajouter un titre'],
    trim: true,
    maxlength: [100, 'Le titre ne peut pas dépasser 100 caractères'],
  },
  description: {
    type: String,
    required: [true, 'Veuillez ajouter une description'],
    maxlength: [500, 'La description ne peut pas dépasser 500 caractères'],
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'], // Priorités possibles
    default: 'medium', // Valeur par défaut
  },
  status: {
    type: String,
    enum: ['todo', 'in-progress', 'done'], // Statuts possibles
    default: 'todo', // Valeur par défaut
  },
  dueDate: {
    type: Date,
    required: [true, 'Veuillez ajouter une date limite'],
  },
  assignedTo: {
    type: mongoose.Schema.ObjectId,
    ref: 'User', // Référence à un utilisateur
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User', // Référence à l'utilisateur créateur
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Export du modèle Task
module.exports = mongoose.model('Task', TaskSchema);