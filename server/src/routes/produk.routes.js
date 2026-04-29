const express = require('express');
const produkController = require('../controllers/produk.controller');
const { authenticateToken } = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', authenticateToken, produkController.getAll);
router.post('/', authenticateToken, produkController.create);
router.patch('/:id/status', authenticateToken, produkController.updateStatus);

module.exports = router;
