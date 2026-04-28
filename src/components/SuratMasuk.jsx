import React, { useState } from 'react';
import { Calendar, ChevronDown, Filter, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import './SuratMasuk.css';

const allSurat = [
  { id: 1, noAgenda: 'AG-2023-10-001', tanggal: '12 Okt 2023', noSurat: '001/KEMENDIKBUD/X/2023', perihal: 'Undangan Rapat Koordinasi Nasional Perguruan Tinggi Swasta Wilayah VII', asal: 'Kementerian Pendidikan dan Kebudayaan', sifat: 'SEGERA', sifatColor: 'red', status: 'Menunggu Disposisi', statusColor: 'yellow' },
  { id: 2, noAgenda: 'AG-2023-10-002', tanggal: '11 Okt 2023', noSurat: '145/PT-MANDIRI/X/2023', perihal: 'Penawaran Kerjasama Program Magang Kampus Merdeka Semester Ganjil', asal: 'PT. Bank Mandiri (Persero) Tbk', sifat: 'BIASA', sifatColor: 'gray', status: 'Proses', statusColor: 'blue' },
  { id: 3, noAgenda: 'AG-2023-10-003', tanggal: '10 Okt 2023', noSurat: '089/LLDIKTI/IX/2023', perihal: 'Pemberitahuan Penilaian Angka Kredit Dosen Periode II Tahun 2023', asal: 'LLDIKTI Wilayah VII Jawa Timur', sifat: 'PENTING', sifatColor: 'orange', status: 'Selesai', statusColor: 'green' },
  { id: 4, noAgenda: 'AG-2023-10-004', tanggal: '9 Okt 2023', noSurat: '072/DIKTI/IX/2023', perihal: 'Permintaan Data Mahasiswa Asing Semester Ganjil 2023/2024', asal: 'Direktorat Jenderal Pendidikan Tinggi', sifat: 'BIASA', sifatColor: 'gray', status: 'Selesai', statusColor: 'green' },
  { id: 5, noAgenda: 'AG-2023-10-005', tanggal: '8 Okt 2023', noSurat: '201/FKIP/X/2023', perihal: 'Laporan Pelaksanaan Praktek Kerja Lapangan Mahasiswa Semester V', asal: 'Fakultas Keguruan dan Ilmu Pendidikan', sifat: 'BIASA', sifatColor: 'gray', status: 'Proses', statusColor: 'blue' },
  { id: 6, noAgenda: 'AG-2023-10-006', tanggal: '7 Okt 2023', noSurat: '033/BAN-PT/IX/2023', perihal: 'Jadwal Visitasi Akreditasi Program Studi Teknik Informatika', asal: 'Badan Akreditasi Nasional PT', sifat: 'SEGERA', sifatColor: 'red', status: 'Menunggu Disposisi', statusColor: 'yellow' },
  { id: 7, noAgenda: 'AG-2023-10-007', tanggal: '6 Okt 2023', noSurat: '118/RISTEKDIKTI/X/2023', perihal: 'Sosialisasi Kebijakan Merdeka Belajar Kampus Merdeka (MBKM)', asal: 'Kemristekdikti', sifat: 'PENTING', sifatColor: 'orange', status: 'Selesai', statusColor: 'green' },
  { id: 8, noAgenda: 'AG-2023-10-008', tanggal: '5 Okt 2023', noSurat: '056/LPPM/IX/2023', perihal: 'Pengumuman Hibah Penelitian Internal Universitas Tahun Anggaran 2024', asal: 'LPPM Universitas', sifat: 'BIASA', sifatColor: 'gray', status: 'Proses', statusColor: 'blue' },
  { id: 9, noAgenda: 'AG-2023-10-009', tanggal: '4 Okt 2023', noSurat: '092/FH/X/2023', perihal: 'Permohonan Narasumber Seminar Hukum Bisnis Digital', asal: 'Fakultas Hukum', sifat: 'BIASA', sifatColor: 'gray', status: 'Selesai', statusColor: 'green' },
];

const ITEMS_PER_PAGE = 3;

const SuratMasuk = ({ setActiveTab }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(allSurat.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentSurat = allSurat.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="surat-masuk-content">
      <div className="page-header">
        <h2 className="page-title">Daftar Surat Masuk</h2>
        <p className="page-subtitle">Kelola dan pantau seluruh surat masuk yang diterima institusi.</p>
      </div>

      <div className="filter-card">
        <div className="filter-inputs">
          <div className="input-group">
            <label>Tanggal Terima</label>
            <div className="input-wrapper">
              <input type="text" placeholder="mm/dd/yyyy" />
              <Calendar size={16} className="input-icon right" />
            </div>
          </div>
          <div className="input-group">
            <label>Status</label>
            <div className="input-wrapper">
              <select defaultValue="">
                <option value="" disabled hidden>Semua Status</option>
              </select>
              <ChevronDown size={16} className="input-icon right" />
            </div>
          </div>
          <div className="input-group">
            <label>Sifat Surat</label>
            <div className="input-wrapper">
              <select defaultValue="">
                <option value="" disabled hidden>Semua Sifat</option>
              </select>
              <ChevronDown size={16} className="input-icon right" />
            </div>
          </div>
        </div>
        <button className="btn-filter">
          <Filter size={16} />
          Terapkan Filter
        </button>
      </div>

      <div className="table-container">
        <table className="surat-table">
          <thead>
            <tr>
              <th width="5%">No.</th>
              <th width="20%">No. Agenda</th>
              <th width="35%">Informasi Surat</th>
              <th width="20%">Asal Surat</th>
              <th width="15%">Sifat & Status</th>
              <th width="5%">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentSurat.map((surat, idx) => (
              <tr key={surat.id} className="clickable-row" onClick={() => setActiveTab('surat-detail')}>
                <td className="text-center">{startIdx + idx + 1}</td>
                <td>
                  <div className="no-agenda">{surat.noAgenda}</div>
                  <div className="tanggal-agenda">{surat.tanggal}</div>
                </td>
                <td>
                  <a href="#" className="link-surat" onClick={(e) => { e.preventDefault(); setActiveTab('surat-detail'); }}>{surat.noSurat}</a>
                  <div className="perihal-surat">{surat.perihal}</div>
                </td>
                <td className="asal-surat">{surat.asal}</td>
                <td>
                  <div className="badges-wrapper">
                    <span className={`badge-kapsul ${surat.sifatColor}`}>{surat.sifat}</span>
                    <span className={`badge-kapsul ${surat.statusColor}`}>{surat.status}</span>
                  </div>
                </td>
                <td className="text-center">
                  <button className="btn-action-view" onClick={(e) => { e.stopPropagation(); setActiveTab('surat-detail'); }} title="Lihat Detail">
                    <Eye size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination-wrapper">
          <div className="pagination-text">
            Menampilkan <strong>{startIdx + 1}</strong> sampai <strong>{Math.min(startIdx + ITEMS_PER_PAGE, allSurat.length)}</strong> dari <strong>{allSurat.length}</strong> surat
          </div>
          <div className="pagination-buttons">
            <button className={`page-btn ${currentPage === 1 ? 'disabled' : ''}`} onClick={() => goToPage(currentPage - 1)}>
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button 
                key={page}
                className={`page-btn ${currentPage === page ? 'active' : ''}`}
                onClick={() => goToPage(page)}
              >
                {page}
              </button>
            ))}
            <button className={`page-btn ${currentPage === totalPages ? 'disabled' : ''}`} onClick={() => goToPage(currentPage + 1)}>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuratMasuk;
