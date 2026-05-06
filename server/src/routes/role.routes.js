const express = require('express');
const router = express.Router();
const roleController = require('../controllers/role.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', authMiddleware.authenticateToken, roleController.getRoles);
router.post('/', authMiddleware.authenticateToken, roleController.createRole);
router.put('/:id', authMiddleware.authenticateToken, roleController.updateRole);
router.delete('/:id', authMiddleware.authenticateToken, roleController.deleteRole);

module.exports = router;
