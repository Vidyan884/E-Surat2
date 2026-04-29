const prisma = require('../db');

class ProdukHukumService {
  async getAll() {
    return await prisma.produkHukum.findMany({
      orderBy: { createdAt: 'desc' },
      include: { author: true }
    });
  }

  async create(authorId, data) {
    return await prisma.produkHukum.create({
      data: {
        jenis: data.jenis,
        judul: data.judul,
        tentang: data.tentang,
        authorId,
        status: 'Draft'
      }
    });
  }

  async updateStatus(id, status) {
    return await prisma.produkHukum.update({
      where: { id },
      data: { status }
    });
  }
}

module.exports = new ProdukHukumService();
