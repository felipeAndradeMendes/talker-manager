const app = require('../index');
const express = require('express');
const router = express.Router();
const generateToken = require('../utils/generateToken');
const { validateEmail, validatePassword } = require('../middlewares/validateLogin');

// POST
router.post('/', validateEmail, validatePassword, (req, res) => {
  const token = generateToken();
  res.status(200).json({ token });
});

module.exports = router;