const express = require('express');
const suratController = require('../controllers/surat.controller');
const { authenticateToken } = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', authenticateToken, suratController.getSuratKeluar);
router.post('/', authenticateToken, suratController.createSuratKeluar);

module.exports = router;
