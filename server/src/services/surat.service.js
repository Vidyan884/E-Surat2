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

  async createSuratKeluar(authorId, data) {
    return await prisma.suratKeluar.create({
      data: {
        perihal: data.perihal,
        tujuan: data.tujuan,
        sifat: data.sifat,
        status: data.status || 'Draft',
        attachment: data.attachment,
        tanggal: data.tanggal ? new Date(data.tanggal) : new Date(),
        authorId
      }
    });
  }
}

module.exports = new SuratService();
