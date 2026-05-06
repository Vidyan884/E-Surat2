const prisma = require('../db');

exports.getRoles = async (req, res) => {
  try {
    const roles = await prisma.role.findMany({
      include: {
        _count: {
          select: { users: true }
        }
      }
    });

    const formattedRoles = roles.map(role => ({
      id: role.id,
      name: role.name,
      description: role.description || '',
      color: role.color || '#64748b',
      permissions: role.permissions ? JSON.parse(role.permissions) : {},
      users: role._count.users
    }));

    res.json(formattedRoles);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan server', error: error.message });
  }
};

exports.updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, color, permissions } = req.body;

    const updatedRole = await prisma.role.update({
      where: { id },
      data: {
        description,
        color,
        permissions: permissions ? JSON.stringify(permissions) : undefined
      }
    });

    res.json(updatedRole);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengupdate peran', error: error.message });
  }
};

exports.createRole = async (req, res) => {
  try {
    const { name, description, color, permissions } = req.body;

    const newRole = await prisma.role.create({
      data: {
        name,
        description,
        color,
        permissions: permissions ? JSON.stringify(permissions) : undefined
      }
    });

    res.json(newRole);
  } catch (error) {
    res.status(500).json({ message: 'Gagal membuat peran baru', error: error.message });
  }
};

exports.deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.role.delete({ where: { id } });
    res.json({ message: 'Peran berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: 'Gagal menghapus peran', error: error.message });
  }
};
