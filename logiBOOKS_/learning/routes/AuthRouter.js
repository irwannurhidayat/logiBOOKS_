const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser, getMyUsers} = require('../controllers/AuthController')
const { authMiddleware } = require('../middleware/UserMiddleware')
router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout',authMiddleware, logoutUser)
router.get('/me', authMiddleware,getMyUsers)

module.exports = router