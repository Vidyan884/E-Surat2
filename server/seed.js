const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');
  
  const roles = [
    { username: 'admin', name: 'Admin BPSIT', role: 'admin-teknis' },
    { username: 'pusdarmen', name: 'Sekretariat Pusdarmen', role: 'admin-pusat' },
    { username: 'rektor', name: 'Rektor UNIA', role: 'pimpinan' },
    { username: 'birohukum', name: 'Kepala Biro Hukum', role: 'biro-hukum' },
    { username: 'dekan', name: 'Dekan Fakultas', role: 'pimpinan-unit' },
    { username: 'staf', name: 'Staf Administrasi', role: 'staf-pelaksana' }
  ];

  for (const r of roles) {
    const hashedPassword = await bcrypt.hash('password123', 10);
    const user = await prisma.user.upsert({
      where: { username: r.username },
      update: {},
      create: {
        username: r.username,
        name: r.name,
        role: r.role,
        password: hashedPassword,
      },
    });
    console.log(`Created user: ${user.username} with role ${user.role}`);
  }

  // Create dummy surat masuk
  const sMasuk = await prisma.suratMasuk.upsert({
    where: { noAgenda: 'AG-2023-10-001' },
    update: {},
    create: {
      noAgenda: 'AG-2023-10-001',
      tanggal: new Date('2023-10-12'),
      noSurat: '001/KEMENDIKBUD/X/2023',
      perihal: 'Undangan Rapat Koordinasi Nasional Perguruan Tinggi Swasta Wilayah VII',
      asal: 'Kementerian Pendidikan dan Kebudayaan',
      sifat: 'Segera',
      status: 'Menunggu Disposisi'
    }
  });

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
