const userService = require('../services/user.service');

class UserController {
  async getUsers(req, res) {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
  }

  async getRoles(req, res) {
    try {
      const roles = await userService.getAllRoles();
      res.json(roles);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching roles', error: error.message });
    }
  }

  async updateUserRoles(req, res) {
    try {
      const { id } = req.params;
      const { roles } = req.body;
      const user = await userService.updateUserRoles(id, roles);
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error updating user roles', error: error.message });
    }
  }
}

module.exports = new UserController();
