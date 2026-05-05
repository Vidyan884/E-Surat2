const prisma = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../middlewares/auth.middleware');

class AuthService {
  async login(username, password) {
    const user = await prisma.user.findUnique({ 
      where: { username },
      include: { roles: true }
    });
    if (!user) throw new Error('Pengguna tidak ditemukan');

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw new Error('Password salah');

    const roles = user.roles.map(r => r.name);

    const token = jwt.sign(
      { id: user.id, username: user.username, roles, name: user.name },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return { token, user: { id: user.id, username: user.username, name: user.name, roles } };
  }
}

module.exports = new AuthService();
