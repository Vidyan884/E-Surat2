const express = require('express');
const suratController = require('../controllers/surat.controller');
const { authenticateToken } = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', authenticateToken, suratController.getSuratMasuk);
router.post('/', authenticateToken, suratController.createSuratMasuk);
router.post('/:id/disposisi', authenticateToken, suratController.createDisposisi);

module.exports = router;
