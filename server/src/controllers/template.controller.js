const templateService = require('../services/template.service');

class TemplateController {
  // Templates
  async getTemplates(req, res) {
    try {
      const templates = await templateService.getTemplates();
      res.json(templates);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching templates', error: error.message });
    }
  }

  async createTemplate(req, res) {
    try {
      const template = await templateService.createTemplate(req.body);
      res.status(201).json(template);
    } catch (error) {
      res.status(500).json({ message: 'Error creating template', error: error.message });
    }
  }

  async updateTemplate(req, res) {
    try {
      const template = await templateService.updateTemplate(req.params.id, req.body);
      res.json(template);
    } catch (error) {
      res.status(500).json({ message: 'Error updating template', error: error.message });
    }
  }

  async deleteTemplate(req, res) {
    try {
      await templateService.deleteTemplate(req.params.id);
      res.json({ message: 'Template deleted' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting template', error: error.message });
    }
  }

  // Kop Surat
  async getKopSurat(req, res) {
    try {
      const kop = await templateService.getKopSurat();
      res.json(kop);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching kop surat', error: error.message });
    }
  }

  async getActiveKop(req, res) {
    try {
      const kop = await templateService.getActiveKop();
      res.json(kop || {});
    } catch (error) {
      res.status(500).json({ message: 'Error fetching active kop surat', error: error.message });
    }
  }

  async createKopSurat(req, res) {
    try {
      const kop = await templateService.createKopSurat(req.body);
      res.status(201).json(kop);
    } catch (error) {
      res.status(500).json({ message: 'Error creating kop surat', error: error.message });
    }
  }

  async updateKopSurat(req, res) {
    try {
      const kop = await templateService.updateKopSurat(req.params.id, req.body);
      res.json(kop);
    } catch (error) {
      res.status(500).json({ message: 'Error updating kop surat', error: error.message });
    }
  }

  async deleteKopSurat(req, res) {
    try {
      await templateService.deleteKopSurat(req.params.id);
      res.json({ message: 'Kop surat deleted' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting kop surat', error: error.message });
    }
  }
}

module.exports = new TemplateController();
