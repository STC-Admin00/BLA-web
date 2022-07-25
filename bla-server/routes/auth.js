const router = require("express").Router();
const authController = require('../controllers/authController')

router.post('/login', authController.handleLogin);
router.post('/forgot-password', authController.forgotPassword)
router.put('/reset-password', authController.resetPassword)

module.exports = router;