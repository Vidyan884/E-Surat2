const prisma = require('../db');

class TemplateService {
  // Templates
  async getTemplates() {
    return await prisma.templateSurat.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  async createTemplate(data) {
    return await prisma.templateSurat.create({
      data: {
        kategori: data.kategori,
        judul: data.judul,
        konten: data.konten
      }
    });
  }

  async updateTemplate(id, data) {
    return await prisma.templateSurat.update({
      where: { id },
      data: {
        kategori: data.kategori,
        judul: data.judul,
        konten: data.konten
      }
    });
  }

  async deleteTemplate(id) {
    return await prisma.templateSurat.delete({
      where: { id }
    });
  }

  // Kop Surat
  async getKopSurat() {
    return await prisma.kopSurat.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  async getActiveKop() {
    return await prisma.kopSurat.findFirst({
      where: { isActive: true }
    });
  }

  async createKopSurat(data) {
    if (data.isActive) {
      await prisma.kopSurat.updateMany({ data: { isActive: false } });
    }
    return await prisma.kopSurat.create({
      data: {
        namaInstitusi: data.namaInstitusi,
        alamat: data.alamat,
        kontak: data.kontak,
        website: data.website || null,
        logoUrl: data.logoUrl || null,
        isActive: data.isActive || false
      }
    });
  }

  async updateKopSurat(id, data) {
    if (data.isActive) {
      await prisma.kopSurat.updateMany({ data: { isActive: false } });
    }
    return await prisma.kopSurat.update({
      where: { id },
      data: {
        namaInstitusi: data.namaInstitusi,
        alamat: data.alamat,
        kontak: data.kontak,
        website: data.website || null,
        logoUrl: data.logoUrl || null,
        isActive: data.isActive
      }
    });
  }

  async deleteKopSurat(id) {
    return await prisma.kopSurat.delete({
      where: { id }
    });
  }
}

module.exports = new TemplateService();
