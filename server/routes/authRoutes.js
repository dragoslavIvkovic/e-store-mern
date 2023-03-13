const express = require('express');
const { createUser , loginUserControl, getAllUsers, getUser, deleteUser,updateUser} = require('../controllers/userController');
const {authMiddleware ,isAdmin} = require('../middleware/authMiddleware')
const router = express.Router();

router.post('/register', createUser);
router.post('/login', loginUserControl);
router.get('/all-users', getAllUsers);
router.get('/:id',authMiddleware, isAdmin, getUser);
router.delete('/:id', deleteUser);
router.put('/edit-user',authMiddleware,updateUser);
module.exports = router;
