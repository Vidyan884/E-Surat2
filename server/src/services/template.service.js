const prisma = require('../db');

class TemplateService {
  // Templates
  async getTemplates() {
    return await prisma.templateSurat.findMany({
      include: { kopSurat: true },
      orderBy: { createdAt: 'desc' }
    });
  }

  async createTemplate(data) {
    return await prisma.templateSurat.create({
      data: {
        kategori: data.kategori,
        judul: data.judul,
        konten: data.konten,
        kopSuratId: data.kopSuratId || null
      }
    });
  }

  async updateTemplate(id, data) {
    return await prisma.templateSurat.update({
      where: { id },
      data: {
        kategori: data.kategori,
        judul: data.judul,
        konten: data.konten,
        kopSuratId: data.kopSuratId !== undefined ? data.kopSuratId : undefined
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
        alamat: data.alamat || null,
        kontak: data.kontak || null,
        website: data.website || null,
        logoUrl: data.logoUrl || null,
        isActive: data.isActive || false,
        isImageOnly: data.isImageOnly || false
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
        alamat: data.alamat || null,
        kontak: data.kontak || null,
        website: data.website || null,
        logoUrl: data.logoUrl || null,
        isActive: data.isActive,
        isImageOnly: data.isImageOnly !== undefined ? data.isImageOnly : false
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
