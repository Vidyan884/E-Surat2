import React from 'react';
import { Search, ChevronDown, Filter, Eye, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import './ProdukHukum.css';

const StatusBadge = ({ type, text }) => {
  return (
    <div className={`ph-status-pill ${type}`}>
      <span className="ph-status-dot"></span>
      {text}
    </div>
  );
}

const ProdukHukum = () => {
  return (
    <div className="produk-hukum-container">
      {/* Header Area */}
      <div className="ph-header-area">
        <div>
          <h2 className="ph-page-title">Daftar Produk Hukum</h2>
          <p className="ph-page-subtitle">Kelola dan pantau seluruh dokumen regulasi dan keputusan universitas.</p>
        </div>
        <button className="btn-ph-baru">
          <Plus size={16} />
          Buat Produk Hukum Baru
        </button>
      </div>

      {/* Filter Box */}
      <div className="ph-filter-box">
        <div className="ph-filter-group search">
          <label className="ph-filter-label">Pencarian</label>
          <div className="ph-input-wrapper">
            <Search size={16} className="ph-search-icon" />
            <input type="text" placeholder="Cari No. Register atau Judul..." className="ph-input" />
          </div>
        </div>

        <div className="ph-filter-group">
          <label className="ph-filter-label">Jenis Dokumen</label>
          <div className="ph-dropdown">
            <select defaultValue="">
              <option value="" disabled hidden>Semua Jenis</option>
            </select>
            <ChevronDown size={14} className="ph-caret" />
          </div>
        </div>

        <div className="ph-filter-group">
          <label className="ph-filter-label">Status</label>
          <div className="ph-dropdown">
            <select defaultValue="">
              <option value="" disabled hidden>Semua Status</option>
            </select>
            <ChevronDown size={14} className="ph-caret" />
          </div>
        </div>

        <button className="btn-terapkan-filter">
          <Filter size={16} className="filter-icon" />
          Terapkan<br/>Filter
        </button>
      </div>

      {/* Table Area */}
      <div className="ph-table-container">
        <table className="ph-table">
          <thead>
            <tr>
              <th width="15%">No. Register</th>
              <th width="35%">Judul Peraturan / Keputusan</th>
              <th width="15%">Jenis</th>
              <th width="15%">Tanggal Penetapan</th>
              <th width="12%">Status</th>
              <th width="8%">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {/* Row 1 */}
            <tr>
              <td className="txt-medium">PR-2023-0042</td>
              <td className="txt-dark">Pedoman Pelaksanaan Tridharma Perguruan Tinggi di Lingkungan Universitas</td>
              <td className="txt-muted">Peraturan<br/>Rektor</td>
              <td className="txt-medium">12 Okt 2023</td>
              <td><StatusBadge type="green" text="Berlaku" /></td>
              <td><Eye size={18} className="ph-action-icon" /></td>
            </tr>

            {/* Row 2 */}
            <tr>
              <td className="txt-medium">SKD-2023-0128</td>
              <td className="txt-dark">Pengangkatan Panitia Ujian Akhir Semester Ganjil TA 2023/2024 Fakultas Teknik</td>
              <td className="txt-muted">SK Dekan</td>
              <td className="txt-medium">-</td>
              <td><StatusBadge type="yellow" text="Harmonisasi" /></td>
              <td><Eye size={18} className="ph-action-icon" /></td>
            </tr>

            {/* Row 3 */}
            <tr>
              <td className="txt-medium">PR-2023-0043</td>
              <td className="txt-dark">Standar Biaya Operasional dan Penyelenggaraan Pendidikan Tahun 2024</td>
              <td className="txt-muted">Peraturan<br/>Rektor</td>
              <td className="txt-medium">-</td>
              <td><StatusBadge type="blue" text="Paraf" /></td>
              <td><Eye size={18} className="ph-action-icon" /></td>
            </tr>

            {/* Row 4 */}
            <tr>
              <td className="txt-medium">SE-2023-0015</td>
              <td className="txt-dark">Himbauan Pelaksanaan Kegiatan Ekstrakurikuler Mahasiswa</td>
              <td className="txt-muted">Surat Edaran</td>
              <td className="txt-medium">-</td>
              <td><StatusBadge type="gray" text="Draft" /></td>
              <td><Eye size={18} className="ph-action-icon" /></td>
            </tr>

          </tbody>
        </table>

         {/* Pagination */}
         <div className="ph-pagination">
          <div className="ph-page-info">
            Menampilkan 1 sampai 4 dari 45 dokumen
          </div>
          <div className="ph-page-buttons">
            <button className="btn-ph-page"><ChevronLeft size={16}/></button>
            <button className="btn-ph-page active">1</button>
            <button className="btn-ph-page">2</button>
            <button className="btn-ph-page">3</button>
            <button className="btn-ph-page disabled">...</button>
            <button className="btn-ph-page"><ChevronRight size={16}/></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProdukHukum;
