const suratService = require('../services/surat.service');

class SuratController {
  async getSuratMasuk(req, res) {
    try {
      const surat = await suratService.getSuratMasuk();
      res.json(surat);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching surat masuk', error: error.message });
    }
  }

  async createSuratMasuk(req, res) {
    try {
      const newSurat = await suratService.createSuratMasuk(req.body);
      res.status(201).json(newSurat);
    } catch (error) {
      res.status(500).json({ message: 'Error creating surat masuk', error: error.message });
    }
  }

  async createDisposisi(req, res) {
    try {
      const disposisi = await suratService.createDisposisi(req.params.id, req.user.id, req.body);
      res.status(201).json(disposisi);
    } catch (error) {
      res.status(500).json({ message: 'Error creating disposisi', error: error.message });
    }
  }
}

module.exports = new SuratController();
