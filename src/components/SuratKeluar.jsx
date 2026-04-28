import React from 'react';
import { ChevronDown, Filter, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import './SuratKeluar.css';

const StatusBadge = ({ type, text }) => {
  return (
    <div className={`status-pill ${type}`}>
      <span className="status-dot"></span>
      {text}
    </div>
  );
}

const SuratKeluar = ({ setActiveTab }) => {
  return (
    <div className="surat-keluar-content">
      
      {/* Filter Bar */}
      <div className="sk-filter-bar">
        <div className="sk-filter-left">
          <div className="sk-dropdown">
            <select defaultValue="">
              <option value="" disabled hidden>Semua Status</option>
            </select>
            <ChevronDown size={14} className="sk-dropdown-icon" />
          </div>
          <div className="sk-dropdown">
            <select defaultValue="">
              <option value="" disabled hidden>Semua Kategori</option>
            </select>
            <ChevronDown size={14} className="sk-dropdown-icon" />
          </div>
        </div>
        <button className="btn-filter-lanjutan">
          <Filter size={14} />
          Filter Lanjutan
        </button>
      </div>

      {/* Table Section */}
      <div className="sk-table-container">
        <table className="sk-table">
          <thead>
            <tr>
              <th width="5%">NO</th>
              <th width="15%">TANGGAL DRAFT</th>
              <th width="35%">PERIHAL & KATEGORI</th>
              <th width="20%">TUJUAN</th>
              <th width="15%">STATUS</th>
              <th width="10%">AKSI</th>
            </tr>
          </thead>
          <tbody>
            {/* Row 1 */}
            <tr className="clickable-row" onClick={() => setActiveTab('surat-keluar-detail')}>
              <td>1</td>
              <td>
                <div className="sk-date">12 Okt 2023</div>
                <div className="sk-time">09:15 WIB</div>
              </td>
              <td>
                <div className="sk-subject">Undangan Rapat Senat Akademik...</div>
                <span className="sk-category-label">Undangan</span>
              </td>
              <td className="sk-target">Seluruh Anggota Senat Universitas</td>
              <td>
                <StatusBadge type="yellow" text="Menunggu Verifikasi" />
              </td>
              <td>
                <button className="btn-action-view" onClick={(e) => { e.stopPropagation(); setActiveTab('surat-keluar-detail'); }} title="Lihat Detail">
                  <Eye size={15} />
                </button>
              </td>
            </tr>

            {/* Row 2 */}
            <tr className="clickable-row" onClick={() => setActiveTab('surat-keluar-detail')}>
              <td>2</td>
              <td>
                <div className="sk-date">11 Okt 2023</div>
                <div className="sk-time">14:30 WIB</div>
              </td>
              <td>
                <div className="sk-subject">Permohonan Izin Penggunaan Auditorium...</div>
                <span className="sk-category-label">Permohonan</span>
              </td>
              <td className="sk-target">Kepala Biro Umum dan Aset</td>
              <td>
                <StatusBadge type="gray" text="Draft" />
              </td>
              <td>
                <button className="btn-action-view" onClick={(e) => { e.stopPropagation(); setActiveTab('surat-keluar-detail'); }} title="Lihat Detail">
                  <Eye size={15} />
                </button>
              </td>
            </tr>

            {/* Row 3 */}
            <tr className="clickable-row" onClick={() => setActiveTab('surat-keluar-detail')}>
              <td>3</td>
              <td>
                <div className="sk-date">10 Okt 2023</div>
                <div className="sk-time">11:05 WIB</div>
              </td>
              <td>
                <div className="sk-subject">Surat Tugas Pendampingan Lomba...</div>
                <span className="sk-category-label">Surat Tugas</span>
              </td>
              <td className="sk-target">Dr. Budi Santoso, M.T.</td>
              <td>
                <StatusBadge type="red" text="Perlu Perbaikan" />
              </td>
              <td>
                <button className="btn-action-view" onClick={(e) => { e.stopPropagation(); setActiveTab('surat-keluar-detail'); }} title="Lihat Detail">
                  <Eye size={15} />
                </button>
              </td>
            </tr>

            {/* Row 4 */}
            <tr className="clickable-row" onClick={() => setActiveTab('surat-keluar-detail')}>
              <td>4</td>
              <td>
                <div className="sk-date">09 Okt 2023</div>
                <div className="sk-time">15:20 WIB</div>
              </td>
              <td>
                <div className="sk-subject">Pemberitahuan Libur Akademik Pengganti...</div>
                <span className="sk-category-label">Pemberitahuan</span>
              </td>
              <td className="sk-target">Seluruh Civitas Akademika</td>
              <td>
                <StatusBadge type="blue" text="Disetujui" />
              </td>
              <td>
                <button className="btn-action-view" onClick={(e) => { e.stopPropagation(); setActiveTab('surat-keluar-detail'); }} title="Lihat Detail">
                  <Eye size={15} />
                </button>
              </td>
            </tr>

             {/* Row 5 */}
             <tr className="clickable-row" onClick={() => setActiveTab('surat-keluar-detail')}>
              <td>5</td>
              <td>
                <div className="sk-date">08 Okt 2023</div>
                <div className="sk-time">08:45 WIB</div>
              </td>
              <td>
                <div className="sk-subject">Surat Keputusan Pengangkatan Ketua...</div>
                <div className="sk-meta-row">
                  <span className="sk-category-label">Keputusan</span>
                  <span className="sk-ref-text">124/UNIA/SK/X/2023</span>
                </div>
              </td>
              <td className="sk-target">Kementerian Pendidikan,...</td>
              <td>
                <StatusBadge type="green" text="Sudah Nomor" />
              </td>
              <td>
                <button className="btn-action-view" onClick={(e) => { e.stopPropagation(); setActiveTab('surat-keluar-detail'); }} title="Lihat Detail">
                  <Eye size={15} />
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Pagination Bar */}
        <div className="sk-pagination">
          <div className="sk-page-info">
            Menampilkan <strong>1</strong> sampai <strong>5</strong> dari <strong>24</strong> surat
          </div>
          <div className="sk-page-buttons">
            <button className="btn-page text">Sebelumnya</button>
            <button className="btn-page number active">1</button>
            <button className="btn-page number">2</button>
            <button className="btn-page number">3</button>
            <button className="btn-page text">Selanjutnya</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SuratKeluar;
