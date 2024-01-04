const express = require('express');
const router = express.Router();
const controller = require('../controllers/utilisateur');

router.post('/register', controller.registerUser);
router.post('/login', controller.loginUser);

router.get('/', controller.getAllUsers);
router.get('/:userId', controller.getUserById);

router.put('/:userId', controller.updateUserById);

router.delete('/:userId', controller.deleteUserById);

module.exports = router;
