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
}

module.exports = new SuratService();
