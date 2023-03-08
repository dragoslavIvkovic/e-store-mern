const express = require('express');
const { createUser , loginUserControl} = require('../controllers/userController');
const router = express.Router();

router.post('/register', createUser);
router.post('/login', loginUserControl);
module.exports = router;
