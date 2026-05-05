const authService = require('../services/auth.service');

class AuthController {
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const result = await authService.login(username, password);
      res.json(result);
    } catch (error) {
      if (error.message === 'Pengguna tidak ditemukan') return res.status(404).json({ message: error.message });
      if (error.message === 'Password salah') return res.status(400).json({ message: error.message });
      res.status(500).json({ message: 'Terjadi kesalahan pada server', error: error.message });
    }
  }
}

module.exports = new AuthController();
