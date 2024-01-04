const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const Utilisateur = require('../models/utilisateur');

// Middleware pour gérer les erreurs
const handleErrors = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    next(error);
  }
};

// Fonction pour créer un nouvel utilisateur
const registerUser = handleErrors(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { username, password, email, pictureUrl, role } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new Utilisateur({
    username,
    hashPassword: hashedPassword,
    email,
    isConfirmed: false, 
    pictureUrl,
    role,
  });

  const savedUser = await newUser.save();
  res.status(201).json(savedUser);
});

// Fonction pour authentifier un utilisateur
const loginUser = handleErrors(async (req, res) => {
  // Logique d'authentification ici en fonction de vos besoins
  // Vérification du nom d'utilisateur, du mot de passe, etc.
  // Vous pouvez utiliser bcrypt.compare pour comparer les mots de passe hachés

  res.status(200).json({ message: 'Authentification réussie' });
});

// Fonction pour récupérer tous les utilisateurs
const getAllUsers = handleErrors(async (req, res) => {
  const users = await Utilisateur.findAll();
  res.status(200).json(users);
});

// Fonction pour récupérer un utilisateur par son ID
const getUserById = handleErrors(async (req, res) => {
  const user = await Utilisateur.findById(req.params.userId);
  res.status(200).json(user);
});

// Fonction pour mettre à jour un utilisateur par son ID
const updateUserById = handleErrors(async (req, res) => {
  const updatedUser = await Utilisateur.findByIdAndUpdate(
    req.params.userId,
    { $set: req.body },
    { new: true }
  );
  res.status(200).json(updatedUser);
});

// Fonction pour supprimer un utilisateur par son ID
const deleteUserById = handleErrors(async (req, res) => {
  const removedUser = await Utilisateur.findByIdAndDelete(req.params.userId);
  res.status(200).json(removedUser);
});

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById
};
