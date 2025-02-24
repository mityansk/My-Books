const router = require('express').Router();
const AuthController = require('../controllers/Auth.controller');
const verifyRefreshToken = require('../middleware/verifyRefreshToken');

router
.post('/signIn', AuthController.signIn)
.post('/signUp', AuthController.signUp)
.get('/signOut', AuthController.signOut)
.get('/refreshTokens', verifyRefreshToken, AuthController.refreshTokens);

module.exports = router;
