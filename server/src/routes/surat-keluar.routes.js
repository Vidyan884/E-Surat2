const express = require('express');
const suratController = require('../controllers/surat.controller');
const { authenticateToken } = require('../middlewares/auth.middleware');

const router = express.Router();

// ─── Static routes first ───
router.get('/', authenticateToken, suratController.getSuratKeluar);
router.post('/', authenticateToken, suratController.createSuratKeluar);

// ─── Parameterized routes after ───
router.get('/:id', authenticateToken, suratController.getSuratKeluarById);
router.put('/:id', authenticateToken, suratController.updateSuratKeluar);
router.put('/:id/status', authenticateToken, suratController.updateSuratKeluarStatus);
router.delete('/:id', authenticateToken, suratController.deleteSuratKeluar);

module.exports = router;
