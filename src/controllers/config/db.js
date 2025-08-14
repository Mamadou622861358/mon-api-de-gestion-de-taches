const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI); // Pas d'options obsolètes
    console.log(`✅ MongoDB Connecté: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(`❌ Erreur MongoDB: ${error.message}`.red.bold);
    process.exit(1);
  }
};

module.exports = connectDB;