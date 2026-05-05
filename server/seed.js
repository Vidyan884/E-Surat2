const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');
  
  const usersToCreate = [
    { username: 'admin', name: 'Admin BPSIT', roles: ['admin', 'admin-teknis'] },
    { username: 'pusdarmen', name: 'Sekretariat Pusdarmen', roles: ['admin-pusat'] },
    { username: 'rektor', name: 'Rektor UNIA', roles: ['pimpinan'] },
    { username: 'birohukum', name: 'Kepala Biro Hukum', roles: ['biro-hukum'] },
    { username: 'dekan', name: 'Dekan Fakultas', roles: ['pimpinan-unit'] },
    { username: 'staf', name: 'Staf Administrasi', roles: ['staf-pelaksana'] }
  ];

  const allRoles = [...new Set(usersToCreate.flatMap(u => u.roles)), 'legal'];
  for (const roleName of allRoles) {
    await prisma.role.upsert({
      where: { name: roleName },
      update: {},
      create: { name: roleName }
    });
  }

  const createdUsers = {};
  for (const u of usersToCreate) {
    const hashedPassword = await bcrypt.hash('password123', 10);
    const user = await prisma.user.upsert({
      where: { username: u.username },
      update: {
        roles: { connect: u.roles.map(r => ({ name: r })) }
      },
      create: {
        username: u.username,
        name: u.name,
        password: hashedPassword,
        roles: { connect: u.roles.map(r => ({ name: r })) }
      },
      include: { roles: true }
    });
    createdUsers[u.username] = user;
    console.log(`Created user: ${user.username} with roles: ${user.roles.map(r => r.name).join(', ')}`);
  }

  // Create dummy surat masuk
  const sMasuk1 = await prisma.suratMasuk.upsert({
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

  const sMasuk2 = await prisma.suratMasuk.upsert({
    where: { noAgenda: 'AG-2023-10-002' },
    update: {},
    create: {
      noAgenda: 'AG-2023-10-002',
      tanggal: new Date('2023-10-15'),
      noSurat: '124/DIKTI/X/2023',
      perihal: 'Pemberitahuan Pelaksanaan Hibah Penelitian 2024',
      asal: 'DIKTI',
      sifat: 'Penting',
      status: 'Selesai'
    }
  });
  console.log('Created dummy Surat Masuk.');

  // Create Disposisi
  await prisma.disposisi.deleteMany(); // Clear existing to prevent duplicates
  await prisma.disposisi.create({
    data: {
      arahan: 'Tolong segera dipelajari dan disiapkan draft tanggapan.',
      batasWaktu: new Date('2023-10-20'),
      status: 'Menunggu Tindak Lanjut',
      suratMasukId: sMasuk1.id,
      pengirimId: createdUsers['rektor'].id,
      penerimaId: createdUsers['pusdarmen'].id
    }
  });
  console.log('Created dummy Disposisi.');

  // Create Surat Keluar
  await prisma.suratKeluar.upsert({
    where: { noAgenda: 'AK-2023-10-001' },
    update: {},
    create: {
      noAgenda: 'AK-2023-10-001',
      tanggal: new Date('2023-10-18'),
      noSurat: '045/UNIA/REK/X/2023',
      perihal: 'Surat Balasan Kesiapan Mengikuti Rakornas PTS',
      tujuan: 'Kementerian Pendidikan dan Kebudayaan',
      sifat: 'Segera',
      status: 'Draft',
      authorId: createdUsers['staf'].id
    }
  });

  await prisma.suratKeluar.upsert({
    where: { noAgenda: 'AK-2023-10-002' },
    update: {},
    create: {
      noAgenda: 'AK-2023-10-002',
      tanggal: new Date('2023-10-19'),
      noSurat: '046/UNIA/REK/X/2023',
      perihal: 'Pengajuan Proposal Bantuan Dana Kegiatan Kemahasiswaan',
      tujuan: 'Pemerintah Provinsi',
      sifat: 'Biasa',
      status: 'Menunggu TTE',
      authorId: createdUsers['pusdarmen'].id
    }
  });
  console.log('Created dummy Surat Keluar.');

  // Create Produk Hukum
  await prisma.produkHukum.upsert({
    where: { noRegister: 'PH-2023-10-001' },
    update: {},
    create: {
      noRegister: 'PH-2023-10-001',
      jenis: 'Peraturan Rektor',
      judul: 'Peraturan Akademik UNIA Tahun 2023',
      tentang: 'Pedoman Penyelenggaraan Pendidikan dan Akademik',
      status: 'Harmonisasi',
      authorId: createdUsers['birohukum'].id
    }
  });

  await prisma.produkHukum.upsert({
    where: { noRegister: 'PH-2023-10-002' },
    update: {},
    create: {
      noRegister: 'PH-2023-10-002',
      jenis: 'Keputusan Rektor',
      judul: 'Pengangkatan Dekan Fakultas Teknik',
      tentang: 'Penetapan Jabatan Struktural di Lingkungan Fakultas Teknik',
      status: 'Selesai',
      authorId: createdUsers['birohukum'].id
    }
  });
  console.log('Created dummy Produk Hukum.');

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
