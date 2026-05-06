const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  const usersToCreate = [
    { username: 'admin', name: 'Admin BPSIT', roles: ['Super Admin'] },
    { username: 'pusdarmen', name: 'Sekretariat Pusdarmen', roles: ['Admin Persuratan'] },
    { username: 'rektor', name: 'Rektor UNIA', roles: ['Dean Level Signatory'] },
    { username: 'birohukum', name: 'Kepala Biro Hukum', roles: ['Reviewer'] },
    { username: 'dekan', name: 'Dekan Fakultas', roles: ['Department Head View'] },
    { username: 'staf', name: 'Staf Administrasi', roles: ['Staff'] }
  ];

  const roleDefinitions = [
    {
      name: 'Super Admin',
      description: 'Full system access with all administrative privileges',
      color: '#10b981',
      permissions: JSON.stringify({
        'Surat Masuk': ['View', 'Register', 'Archive', 'Dispose'],
        'Surat Keluar': ['Draft', 'Sign', 'Bypass Verification'],
        'User Management': ['View', 'Create', 'Edit', 'Delete'],
        'Produk Hukum': ['Access', 'Create', 'Harmonize'],
        'System': ['View Logs', 'Configure Roles', 'Backup'],
      })
    },
    {
      name: 'Admin Persuratan',
      description: 'Manages incoming and outgoing correspondence',
      color: '#047857',
      permissions: JSON.stringify({
        'Surat Masuk': ['View', 'Register', 'Archive', 'Dispose'],
        'Surat Keluar': ['Draft', 'Sign'],
        'User Management': [],
        'Produk Hukum': [],
        'System': ['View Logs'],
      })
    },
    {
      name: 'Reviewer',
      description: 'Reviews and verifies documents before approval',
      color: '#8b5cf6',
      permissions: JSON.stringify({
        'Surat Masuk': ['View'],
        'Surat Keluar': ['Draft'],
        'User Management': [],
        'Produk Hukum': ['Access'],
        'System': [],
      })
    },
    {
      name: 'Dean Level Signatory',
      description: 'Authorized to sign documents at faculty dean level',
      color: '#0ea5e9',
      permissions: JSON.stringify({
        'Surat Masuk': ['View', 'Dispose'],
        'Surat Keluar': ['Draft', 'Sign'],
        'User Management': [],
        'Produk Hukum': ['Access'],
        'System': [],
      })
    },
    {
      name: 'Staff',
      description: 'Basic access for general staff members',
      color: '#64748b',
      permissions: JSON.stringify({
        'Surat Masuk': ['View'],
        'Surat Keluar': [],
        'User Management': [],
        'Produk Hukum': [],
        'System': [],
      })
    },
    {
      name: 'Department Head View',
      description: 'Read-only access to department-level documents',
      color: '#059669',
      permissions: JSON.stringify({
        'Surat Masuk': ['View'],
        'Surat Keluar': ['Draft'],
        'User Management': [],
        'Produk Hukum': ['Access'],
        'System': [],
      })
    }
  ];

  for (const roleDef of roleDefinitions) {
    await prisma.role.upsert({
      where: { name: roleDef.name },
      update: {
        description: roleDef.description,
        color: roleDef.color,
        permissions: roleDef.permissions
      },
      create: {
        name: roleDef.name,
        description: roleDef.description,
        color: roleDef.color,
        permissions: roleDef.permissions
      }
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

  // ═══════════════════════════════════════════════════════════════
  // Template Surat — Contoh template isi surat per kategori
  // ═══════════════════════════════════════════════════════════════
  await prisma.templateSurat.deleteMany(); // Clear existing templates

  const templateSeeds = [
    {
      kategori: 'undangan',
      judul: 'Surat Undangan Rapat Koordinasi',
      konten: `Yth. [Nama Penerima]
[Jabatan Penerima]
di Tempat

Dengan hormat,

Sehubungan dengan pelaksanaan program kerja tahun akademik [Tahun Akademik], bersama ini kami mengundang Bapak/Ibu untuk menghadiri:

Acara    : Rapat Koordinasi [Nama Kegiatan]
Hari     : [Hari]
Tanggal  : [Tanggal]
Waktu    : [Waktu] WIB s.d. selesai
Tempat   : [Tempat Pelaksanaan]
Agenda   :
  1. Evaluasi program kerja semester berjalan
  2. Pembahasan rencana kegiatan mendatang
  3. Lain-lain

Mengingat pentingnya acara tersebut, kami mengharapkan kehadiran Bapak/Ibu tepat pada waktunya.

Demikian undangan ini kami sampaikan. Atas perhatian dan kehadirannya, kami ucapkan terima kasih.`
    },
    {
      kategori: 'permohonan',
      judul: 'Surat Permohonan Kerja Sama',
      konten: `Yth. [Nama Penerima]
[Jabatan Penerima]
[Nama Instansi/Perusahaan]
di [Kota]

Dengan hormat,

Universitas Islam Nusantara (UNIA) merupakan perguruan tinggi swasta yang senantiasa berupaya meningkatkan mutu pendidikan dan pengabdian kepada masyarakat. Dalam rangka mewujudkan Tri Dharma Perguruan Tinggi, kami bermaksud menjalin kerja sama dengan instansi/perusahaan yang Bapak/Ibu pimpin.

Adapun bentuk kerja sama yang kami ajukan meliputi:
1. [Bidang Kerja Sama 1]
2. [Bidang Kerja Sama 2]
3. [Bidang Kerja Sama 3]

Kami berharap kerja sama ini dapat memberikan manfaat bagi kedua belah pihak dan berkontribusi positif bagi pengembangan sumber daya manusia.

Sebagai tindak lanjut, kami mohon kiranya dapat diberikan waktu untuk melakukan audiensi guna membahas lebih lanjut rencana kerja sama dimaksud.

Demikian surat permohonan ini kami sampaikan. Atas perhatian dan kerja sama yang baik, kami mengucapkan terima kasih.`
    },
    {
      kategori: 'tugas',
      judul: 'Surat Tugas Dosen/Staf',
      konten: `SURAT TUGAS
Nomor: [Nomor Surat]

Yang bertanda tangan di bawah ini:
  Nama    : [Nama Pimpinan]
  NIP/NIK : [NIP/NIK Pimpinan]
  Jabatan : [Jabatan Pimpinan]

Dengan ini menugaskan kepada:
  Nama    : [Nama Yang Ditugaskan]
  NIP/NIK : [NIP/NIK]
  Jabatan : [Jabatan]
  Unit    : [Fakultas/Unit Kerja]

Untuk melaksanakan tugas sebagai berikut:
  Kegiatan  : [Nama Kegiatan]
  Tanggal   : [Tanggal Mulai] s.d. [Tanggal Selesai]
  Tempat    : [Lokasi Pelaksanaan]
  Keperluan : [Uraian Tugas/Keperluan]

Demikian surat tugas ini dibuat untuk dapat dilaksanakan dengan penuh tanggung jawab.

Dikeluarkan di : Bandung
Pada tanggal   : [Tanggal Terbit]`
    },
    {
      kategori: 'pengantar',
      judul: 'Surat Pengantar Dokumen Resmi',
      konten: `Yth. [Nama Penerima]
[Jabatan Penerima]
di [Kota Tujuan]

Dengan hormat,

Bersama surat ini, kami sampaikan dokumen sebagai berikut:

No. | Jenis Dokumen                         | Jumlah
----|---------------------------------------|--------
1.  | [Nama Dokumen 1]                      | [Jumlah] rangkap
2.  | [Nama Dokumen 2]                      | [Jumlah] rangkap
3.  | [Nama Dokumen 3]                      | [Jumlah] rangkap

Dokumen tersebut disampaikan sebagai kelengkapan administrasi terkait [Keperluan/Perihal Pengiriman].

Mohon kiranya dokumen tersebut dapat diterima dan diproses sebagaimana mestinya. Apabila terdapat kekurangan atau hal yang perlu dikonfirmasi, dapat menghubungi kami melalui:
  Kontak : [Nama PIC] — [No. Telepon PIC]
  Email  : [Alamat Email PIC]

Demikian surat pengantar ini kami sampaikan. Atas perhatian dan kerja samanya, kami ucapkan terima kasih.`
    },
    {
      kategori: 'keterangan',
      judul: 'Surat Keterangan Aktif Mahasiswa',
      konten: `SURAT KETERANGAN AKTIF
Nomor: [Nomor Surat]

Yang bertanda tangan di bawah ini:
  Nama    : [Nama Pejabat]
  NIP/NIK : [NIP/NIK Pejabat]
  Jabatan : [Jabatan Pejabat]

Dengan ini menerangkan bahwa:
  Nama                : [Nama Mahasiswa]
  NIM                 : [NIM]
  Program Studi       : [Nama Prodi]
  Fakultas            : [Nama Fakultas]
  Semester            : [Semester Aktif]
  Tahun Akademik      : [Tahun Akademik]

Adalah benar mahasiswa aktif pada Universitas Islam Nusantara yang terdaftar dan menjalankan kegiatan perkuliahan pada semester dan tahun akademik tersebut di atas.

Surat keterangan ini dibuat untuk keperluan [Tujuan Pembuatan Surat] dan berlaku sejak tanggal diterbitkan sampai dengan [Masa Berlaku/Akhir Semester].

Demikian surat keterangan ini dibuat dengan sebenarnya untuk dapat dipergunakan sebagaimana mestinya.

Dikeluarkan di : Bandung
Pada tanggal   : [Tanggal Terbit]`
    },
    {
      kategori: 'keterangan',
      judul: 'Surat Keterangan Lulus',
      konten: `SURAT KETERANGAN LULUS
Nomor: [Nomor Surat]

Yang bertanda tangan di bawah ini:
  Nama    : [Nama Pejabat]
  NIP/NIK : [NIP/NIK Pejabat]
  Jabatan : Dekan [Nama Fakultas]

Dengan ini menerangkan bahwa:
  Nama              : [Nama Mahasiswa]
  NIM               : [NIM]
  Tempat/Tgl Lahir  : [Tempat], [Tanggal Lahir]
  Program Studi     : [Nama Prodi]
  Fakultas          : [Nama Fakultas]
  IPK               : [IPK]
  Predikat          : [Predikat Kelulusan]

Adalah benar telah menyelesaikan seluruh program studi dan dinyatakan LULUS dalam Sidang Yudisium yang diselenggarakan pada tanggal [Tanggal Yudisium].

Surat keterangan ini diterbitkan sebagai pengganti sementara Ijazah dan Transkrip Nilai yang masih dalam proses pencetakan.

Demikian surat keterangan ini dibuat dengan sebenarnya.

Dikeluarkan di : Bandung
Pada tanggal   : [Tanggal Terbit]`
    }
  ];

  for (const tpl of templateSeeds) {
    await prisma.templateSurat.create({ data: tpl });
  }
  console.log(`Created ${templateSeeds.length} template surat.`);

  // ═══════════════════════════════════════════════════════════════
  // Kop Surat — Contoh header institusi
  // ═══════════════════════════════════════════════════════════════
  await prisma.kopSurat.deleteMany(); // Clear existing kop surat

  await prisma.kopSurat.create({
    data: {
      namaInstitusi: 'KEMENTERIAN PENDIDIKAN, KEBUDAYAAN, RISET, DAN TEKNOLOGI\nUNIVERSITAS ISLAM NUSANTARA',
      alamat: 'Jl. Soekarno-Hatta No. 530, Sekejati, Kec. Buahbatu, Kota Bandung, Jawa Barat 40286',
      kontak: 'Telp: (022) 7508015 — Fax: (022) 7508015',
      website: 'Laman: www.uninus.ac.id — Email: rektorat@uninus.ac.id',
      logoUrl: null,
      isActive: true
    }
  });

  await prisma.kopSurat.create({
    data: {
      namaInstitusi: 'KEMENTERIAN PENDIDIKAN, KEBUDAYAAN, RISET, DAN TEKNOLOGI\nUNIVERSITAS ISLAM NUSANTARA\nFAKULTAS TEKNIK',
      alamat: 'Jl. Soekarno-Hatta No. 530, Sekejati, Kec. Buahbatu, Kota Bandung, Jawa Barat 40286',
      kontak: 'Telp: (022) 7508016',
      website: 'Laman: ft.uninus.ac.id — Email: teknik@uninus.ac.id',
      logoUrl: null,
      isActive: false
    }
  });
  console.log('Created 2 kop surat (1 aktif, 1 nonaktif).');

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
