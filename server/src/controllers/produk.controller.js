const produkService = require('../services/produk.service');

class ProdukHukumController {
  async getAll(req, res) {
    try {
      const produkHukum = await produkService.getAll();
      res.json(produkHukum);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching produk hukum', error: error.message });
    }
  }

  async create(req, res) {
    try {
      const newProduk = await produkService.create(req.user.id, req.body);
      res.status(201).json(newProduk);
    } catch (error) {
      res.status(500).json({ message: 'Error creating produk hukum', error: error.message });
    }
  }

  async updateStatus(req, res) {
    try {
      const updated = await produkService.updateStatus(req.params.id, req.body.status);
      res.json(updated);
    } catch (error) {
      res.status(500).json({ message: 'Error updating status', error: error.message });
    }
  }
}

module.exports = new ProdukHukumController();
