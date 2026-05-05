const express = require('express');
const templateController = require('../controllers/template.controller');
const { authenticateToken } = require('../middlewares/auth.middleware');

const router = express.Router();

// Templates
router.get('/', authenticateToken, templateController.getTemplates);
router.post('/', authenticateToken, templateController.createTemplate);
router.put('/:id', authenticateToken, templateController.updateTemplate);
router.delete('/:id', authenticateToken, templateController.deleteTemplate);

// Kop Surat (nested paths)
router.get('/kop', authenticateToken, templateController.getKopSurat);
router.get('/kop/active', authenticateToken, templateController.getActiveKop);
router.post('/kop', authenticateToken, templateController.createKopSurat);
router.put('/kop/:id', authenticateToken, templateController.updateKopSurat);
router.delete('/kop/:id', authenticateToken, templateController.deleteKopSurat);

module.exports = router;
