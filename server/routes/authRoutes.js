const express = require('express');
const { createUser , loginUserControl, getAllUsers, getUser, deleteUser} = require('../controllers/userController');
const router = express.Router();

router.post('/register', createUser);
router.post('/login', loginUserControl);
router.get('/all-users', getAllUsers);
router.get('/:id', getUser);
router.delete('/:id', deleteUser);
module.exports = router;
