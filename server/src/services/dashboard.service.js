const prisma = require('../db');

class DashboardService {
  async getDashboardStats() {
    try {
      const now = new Date();
      const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

      // 1. Total counts
      const totalSuratMasuk = await prisma.suratMasuk.count();
      const totalSuratKeluar = await prisma.suratKeluar.count();
      
      const disposisiMenunggu = await prisma.disposisi.count({
        where: { status: 'Menunggu Tindak Lanjut' }
      });
      const suratMasukBaru = await prisma.suratMasuk.count({
        where: { status: 'Menunggu Disposisi' }
      });

      // 2. Average Response Time (Mocked for now, or simple calculation)
      // For simplicity, we just return a static value or a basic diff if we had an endedAt field.
      const rataRataRespon = 1.2;

      // 3. Urgent Tasks (Mixed Surat Masuk waiting disposisi and Surat Keluar needing review)
      const urgentSuratMasuk = await prisma.suratMasuk.findMany({
        where: { status: 'Menunggu Disposisi' },
        orderBy: { createdAt: 'desc' },
        take: 3,
        select: { id: true, noSurat: true, perihal: true, sifat: true, createdAt: true, status: true }
      });

      const reviewSuratKeluar = await prisma.suratKeluar.findMany({
        where: { status: 'Review' },
        orderBy: { updatedAt: 'desc' },
        take: 3,
        select: { id: true, noSurat: true, perihal: true, sifat: true, updatedAt: true, status: true }
      });

      // Format them into a unified task list
      const formatTime = (date) => {
        const diffMs = now - date;
        const diffHrs = Math.floor(diffMs / 3600000);
        if (diffHrs < 1) return 'Baru saja';
        if (diffHrs < 24) return `${diffHrs} jam yang lalu`;
        return `${Math.floor(diffHrs / 24)} hari yang lalu`;
      };

      const tasks = [
        ...urgentSuratMasuk.map(sm => ({
          id: sm.id,
          type: 'surat-masuk',
          title: `Surat Masuk: ${sm.perihal}`,
          desc: 'Surat masuk baru menunggu proses disposisi dari pimpinan.',
          refNumber: sm.noSurat || 'Belum Ada',
          time: formatTime(sm.createdAt),
          status: sm.sifat.toUpperCase(),
          statusType: sm.sifat.toLowerCase() === 'segera' || sm.sifat.toLowerCase() === 'penting' ? 'danger' : 'warning',
          date: sm.createdAt
        })),
        ...reviewSuratKeluar.map(sk => ({
          id: sk.id,
          type: 'surat-keluar',
          title: `Draf Surat Keluar: ${sk.perihal}`,
          desc: 'Draf surat keluar menunggu review dan persetujuan (Setujui & Selesaikan).',
          refNumber: sk.noSurat || 'Draf',
          time: formatTime(sk.updatedAt),
          status: 'PERLU REVIEW',
          statusType: 'warning',
          date: sk.updatedAt
        }))
      ];

      // Sort tasks by date desc and take top 5
      tasks.sort((a, b) => b.date - a.date);
      const recentTasks = tasks.slice(0, 5);

      // 4. Chart Data (Last 7 Days)
      const chartData = [];
      const days = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
      
      for (let i = 6; i >= 0; i--) {
        const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
        d.setHours(0, 0, 0, 0);
        const nextD = new Date(d.getTime() + 24 * 60 * 60 * 1000);

        const smCount = await prisma.suratMasuk.count({
          where: { createdAt: { gte: d, lt: nextD } }
        });
        const skCount = await prisma.suratKeluar.count({
          where: { createdAt: { gte: d, lt: nextD } }
        });

        chartData.push({
          day: days[d.getDay()],
          masuk: smCount,
          keluar: skCount
        });
      }

      return {
        stats: {
          totalSuratMasuk,
          totalSuratKeluar,
          disposisiMenunggu: disposisiMenunggu + suratMasukBaru,
          rataRataRespon
        },
        tasks: recentTasks,
        chartData
      };
    } catch (error) {
      console.error("Dashboard Stats Error:", error);
      throw error;
    }
  }
}

module.exports = new DashboardService();
