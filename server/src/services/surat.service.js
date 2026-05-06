const prisma = require('../db');

class SuratService {
  async getSuratMasuk() {
    return await prisma.suratMasuk.findMany({
      orderBy: { tanggal: 'desc' }
    });
  }

  async createSuratMasuk(data) {
    return await prisma.suratMasuk.create({
      data: {
        ...data,
        tanggal: new Date(data.tanggal),
        status: 'Menunggu Disposisi'
      }
    });
  }

  async createDisposisi(suratMasukId, pengirimId, data) {
    const disposisi = await prisma.disposisi.create({
      data: {
        arahan: data.arahan,
        penerimaId: data.penerimaId,
        pengirimId,
        suratMasukId,
        batasWaktu: data.batasWaktu ? new Date(data.batasWaktu) : null,
      }
    });

    await prisma.suratMasuk.update({
      where: { id: suratMasukId },
      data: { status: 'Proses' }
    });

    return disposisi;
  }

  async getSuratKeluar() {
    return await prisma.suratKeluar.findMany({
      orderBy: { tanggal: 'desc' },
      include: {
        author: {
          select: { name: true, roles: { select: { name: true } } }
        }
      }
    });
  }

  async getSuratKeluarById(id) {
    return await prisma.suratKeluar.findUnique({
      where: { id },
      include: {
        author: {
          select: { id: true, name: true, username: true, roles: { select: { name: true } } }
        },
        kopSurat: true
      }
    });
  }

  async createSuratKeluar(authorId, data) {
    return await prisma.suratKeluar.create({
      data: {
        kategori: data.kategori,
        perihal: data.perihal,
        tujuan: data.tujuan,
        sifat: data.sifat,
        status: data.status || 'Draft',
        isiSurat: data.isiSurat,
        attachment: data.attachment,
        kopSuratId: data.kopSuratId || null,
        tanggal: data.tanggal ? new Date(data.tanggal) : new Date(),
        authorId
      }
    });
  }

  async updateSuratKeluar(id, data) {
    return await prisma.suratKeluar.update({
      where: { id },
      data: {
        kategori: data.kategori,
        perihal: data.perihal,
        tujuan: data.tujuan,
        sifat: data.sifat,
        status: data.status,
        isiSurat: data.isiSurat,
        attachment: data.attachment,
        kopSuratId: data.kopSuratId !== undefined ? data.kopSuratId : undefined
      }
    });
  }

  async updateSuratKeluarStatus(id, status) {
    const validStatuses = ['Draft', 'Review', 'Menunggu Penomoran', 'Menunggu TTE', 'Selesai', 'Perlu Perbaikan'];
    if (!validStatuses.includes(status)) {
      throw new Error(`Status tidak valid. Pilihan: ${validStatuses.join(', ')}`);
    }
    return await prisma.suratKeluar.update({
      where: { id },
      data: { status }
    });
  }

  async deleteSuratKeluar(id) {
    return await prisma.suratKeluar.delete({
      where: { id }
    });
  }
}

module.exports = new SuratService();
