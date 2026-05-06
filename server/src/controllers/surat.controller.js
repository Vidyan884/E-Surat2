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

  async getSuratKeluar(req, res) {
    try {
      const surat = await suratService.getSuratKeluar();
      res.json(surat);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching surat keluar', error: error.message });
    }
  }

  async getSuratKeluarById(req, res) {
    try {
      const surat = await suratService.getSuratKeluarById(req.params.id);
      if (!surat) return res.status(404).json({ message: 'Surat keluar tidak ditemukan' });
      res.json(surat);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching surat keluar', error: error.message });
    }
  }

  async createSuratKeluar(req, res) {
    try {
      const newSurat = await suratService.createSuratKeluar(req.user.id, req.body);
      res.status(201).json(newSurat);
    } catch (error) {
      res.status(500).json({ message: 'Error creating surat keluar', error: error.message });
    }
  }

  async updateSuratKeluar(req, res) {
    try {
      const updated = await suratService.updateSuratKeluar(req.params.id, req.body);
      res.json(updated);
    } catch (error) {
      res.status(500).json({ message: 'Error updating surat keluar', error: error.message });
    }
  }

  async updateSuratKeluarStatus(req, res) {
    try {
      const { status } = req.body;
      if (!status) return res.status(400).json({ message: 'Field "status" wajib diisi' });
      const updated = await suratService.updateSuratKeluarStatus(req.params.id, status);
      res.json(updated);
    } catch (error) {
      const code = error.message.startsWith('Status tidak valid') ? 400 : 500;
      res.status(code).json({ message: error.message });
    }
  }

  async deleteSuratKeluar(req, res) {
    try {
      await suratService.deleteSuratKeluar(req.params.id);
      res.json({ message: 'Surat keluar berhasil dihapus' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting surat keluar', error: error.message });
    }
  }
}

module.exports = new SuratController();
