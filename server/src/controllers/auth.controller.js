const authService = require('../services/auth.service');

class AuthController {
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const result = await authService.login(username, password);
      res.json(result);
    } catch (error) {
      if (error.message === 'User not found') return res.status(404).json({ message: error.message });
      if (error.message === 'Invalid password') return res.status(400).json({ message: error.message });
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  }
}

module.exports = new AuthController();
