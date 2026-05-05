const prisma = require('../db');
const bcrypt = require('bcryptjs');

class UserService {
  async getAllUsers() {
    return await prisma.user.findMany({
      include: { roles: true },
      orderBy: { createdAt: 'desc' }
    });
  }

  async getAllRoles() {
    return await prisma.role.findMany({
      orderBy: { name: 'asc' }
    });
  }

  async updateUserRoles(id, roleNames) {
    // roleNames is an array of strings e.g. ['admin', 'pimpinan']
    return await prisma.user.update({
      where: { id },
      data: {
        roles: {
          set: [], // clear existing
          connect: roleNames.map(r => ({ name: r }))
        }
      },
      include: { roles: true }
    });
  }
}

module.exports = new UserService();
