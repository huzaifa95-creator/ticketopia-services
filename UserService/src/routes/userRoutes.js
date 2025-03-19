
const express = require('express');
const { check } = require('express-validator');
const userController = require('../controllers/userController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// All routes in this file require authentication
router.use(authenticate);

// Get user profile
router.get('/profile', userController.getProfile);

// Update user profile
router.put(
  '/profile',
  [check('name', 'Name is required').not().isEmpty()],
  userController.updateProfile
);

module.exports = router;
