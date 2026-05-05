const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { authenticateToken } = require('../middlewares/auth.middleware');

router.get('/', authenticateToken, userController.getUsers);
router.get('/roles', authenticateToken, userController.getRoles);
router.put('/:id/roles', authenticateToken, userController.updateUserRoles);

module.exports = router;
