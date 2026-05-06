const express = require('express');
const templateController = require('../controllers/template.controller');
const { authenticateToken } = require('../middlewares/auth.middleware');

const router = express.Router();

// ─── Kop Surat (statis — harus didefinisikan sebelum route berparameter) ───
router.get('/kop/active', authenticateToken, templateController.getActiveKop);
router.get('/kop', authenticateToken, templateController.getKopSurat);
router.post('/kop', authenticateToken, templateController.createKopSurat);
router.put('/kop/:id', authenticateToken, templateController.updateKopSurat);
router.delete('/kop/:id', authenticateToken, templateController.deleteKopSurat);

// ─── Template Surat (berparameter — setelah semua route statis) ───
router.get('/', authenticateToken, templateController.getTemplates);
router.post('/', authenticateToken, templateController.createTemplate);
router.put('/:id', authenticateToken, templateController.updateTemplate);
router.delete('/:id', authenticateToken, templateController.deleteTemplate);

module.exports = router;
