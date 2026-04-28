import React from 'react';
import { Search, ChevronDown, Eye, Download, Info, ChevronLeft, ChevronRight } from 'lucide-react';
import './ArsipDigital.css';

const ArsipDigital = () => {
  return (
    <div className="arsip-container">
      <div className="arsip-header">
        <h2 className="page-title">Repositori Arsip Digital</h2>
        <p className="page-subtitle">Kelola dan cari dokumen resmi yang telah diarsipkan secara sistematis.</p>
      </div>

      <div className="arsip-filter-box">
        <div className="filter-group lg">
          <label className="filter-label">Pencarian Dokumen</label>
          <div className="input-search-wrapper">
            <Search size={16} className="search-icon-left" />
            <input type="text" placeholder="Cari Nomor Surat, Perihal, atau Kata Kunci..." className="arsip-search-input" />
          </div>
        </div>

        <div className="filter-group">
          <label className="filter-label">Klasifikasi Dokumen</label>
          <div className="arsip-dropdown">
            <select defaultValue="">
              <option value="" disabled hidden>Semua Klasifikasi</option>
            </select>
            <ChevronDown size={14} className="dropdown-caret" />
          </div>
        </div>

        <div className="filter-group">
          <label className="filter-label">Tahun</label>
          <div className="arsip-dropdown">
            <select defaultValue="">
              <option value="" disabled hidden>Semua</option>
            </select>
            <ChevronDown size={14} className="dropdown-caret" />
          </div>
        </div>

        <div className="filter-group">
          <label className="filter-label">Jenis Surat</label>
          <div className="arsip-dropdown">
            <select defaultValue="">
              <option value="" disabled hidden>Semua Jenis</option>
            </select>
            <ChevronDown size={14} className="dropdown-caret" />
          </div>
        </div>
      </div>

      <div className="arsip-table-container">
        <table className="arsip-table">
          <thead>
            <tr>
              <th width="25%">No. Agenda / Nomor Surat</th>
              <th width="35%">Judul / Perihal</th>
              <th width="15%">Tanggal Diarsipkan</th>
              <th width="15%">Klasifikasi</th>
              <th width="10%">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="no-agenda">AGENDA-2024-089</div>
                <div className="no-surat">005/UN1.P/DIR/2024</div>
              </td>
              <td>
                <div className="judul-surat">Undangan Rapat Koordinasi Kurikulum Baru</div>
                <div className="perihal-surat-small">Terkait implementasi kurikulum merdeka di lingkungan fakultas.</div>
              </td>
              <td>12 Okt 2024</td>
              <td>
                <span className="badge-klasifikasi">Akademik</span>
              </td>
              <td>
                <div className="aksi-icons">
                  <Eye size={16} className="icon-action" />
                  <Download size={16} className="icon-action" />
                  <Info size={16} className="icon-action dark" />
                </div>
              </td>
            </tr>

            <tr>
              <td>
                <div className="no-agenda">AGENDA-2024-088</div>
                <div className="no-surat">112/UN1.KU/KEP/2024</div>
              </td>
              <td>
                <div className="judul-surat">SK Pengangkatan Staf Administrasi</div>
                <div className="perihal-surat-small">Penetapan status pegawai tetap untuk 5 staf administrasi.</div>
              </td>
              <td>10 Okt 2024</td>
              <td>
                <span className="badge-klasifikasi">Kepegawaian</span>
              </td>
              <td>
                <div className="aksi-icons">
                  <Eye size={16} className="icon-action" />
                  <Download size={16} className="icon-action" />
                  <Info size={16} className="icon-action dark" />
                </div>
              </td>
            </tr>

            <tr>
              <td>
                <div className="no-agenda">AGENDA-2024-085</div>
                <div className="no-surat">089/UN1.WR2/EDR/2024</div>
              </td>
              <td>
                <div className="judul-surat">Edaran Batas Akhir Pencairan Dana Triwulan III</div>
                <div className="perihal-surat-small">Instruksi pengajuan pencairan dana untuk unit kerja.</div>
              </td>
              <td>05 Okt 2024</td>
              <td>
                <span className="badge-klasifikasi">Keuangan</span>
              </td>
              <td>
                <div className="aksi-icons">
                  <Eye size={16} className="icon-action" />
                  <Download size={16} className="icon-action" />
                  <Info size={16} className="icon-action dark" />
                </div>
              </td>
            </tr>

            <tr>
              <td>
                <div className="no-agenda">AGENDA-2023-452</div>
                <div className="no-surat">001/UN1.R/SK/2023</div>
              </td>
              <td>
                <div className="judul-surat">Statuta Universitas Tahun 2023</div>
                <div className="perihal-surat-small">Dokumen legal dasar penyelenggaraan institusi.</div>
              </td>
              <td>02 Jan 2023</td>
              <td>
                <span className="badge-klasifikasi">Produk Hukum</span>
              </td>
              <td>
                <div className="aksi-icons">
                  <Eye size={16} className="icon-action" />
                  <Download size={16} className="icon-action" />
                  <Info size={16} className="icon-action dark" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>

         {/* Pagination Bar */}
         <div className="sk-pagination">
          <div className="sk-page-info">
            Menampilkan <strong>1</strong> hingga <strong>4</strong> dari <strong>12,450</strong> arsip
          </div>
          <div className="sk-page-buttons">
            <button className="btn-page text"><ChevronLeft size={16}/></button>
            <button className="btn-page number active">1</button>
            <button className="btn-page number">2</button>
            <button className="btn-page number">3</button>
            <button className="btn-page text disabled">...</button>
            <button className="btn-page number">1245</button>
            <button className="btn-page text"><ChevronRight size={16}/></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArsipDigital;
