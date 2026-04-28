import React from 'react';
import { ChevronRight, CheckCircle2, Hash, Edit, XCircle } from 'lucide-react';
import './PersetujuanAkhir.css';

const PersetujuanAkhir = () => {
  return (
    <div className="pa-container">
      {/* Breadcrumb */}
      <div className="pa-breadcrumb">
        <a href="#" className="pa-breadcrumb-link" onClick={(e) => e.preventDefault()}>
          Produk Hukum
        </a>
        <ChevronRight size={14} className="pa-breadcrumb-sep" />
        <a href="#" className="pa-breadcrumb-link" onClick={(e) => e.preventDefault()}>
          PR-2023-041
        </a>
        <ChevronRight size={14} className="pa-breadcrumb-sep" />
        <span className="pa-breadcrumb-current">Persetujuan Akhir</span>
      </div>

      {/* Page Title */}
      <h1 className="pa-title">Persetujuan Akhir & Penomoran</h1>

      {/* Main Layout */}
      <div className="pa-layout">
        {/* Left Column — Document Preview */}
        <div className="pa-doc-column">
          <div className="pa-document-paper">
            {/* University Header */}
            <div className="pa-doc-header">
              <img 
                src="/university-seal.png" 
                alt="University Seal" 
                className="pa-doc-seal"
              />
              <h2 className="pa-doc-university">UNIVERSITAS NASIONAL INDONESIA</h2>
              <p className="pa-doc-address">Jalan Kebangsaan No. 1, Kota Akademik 12345</p>
            </div>

            <div className="pa-doc-divider"></div>

            {/* Document Title */}
            <div className="pa-doc-title-section">
              <h3 className="pa-doc-doc-title">PERATURAN REKTOR</h3>
              <div className="pa-doc-nomor-box">
                NOMOR: [NOMOR AKAN TERBIT OTOMATIS]
              </div>
            </div>

            {/* Legal Body */}
            <div className="pa-doc-body">
              <p>
                <strong>MENIMBANG:</strong> Bahwa dalam rangka peningkatan kualitas pelayanan akademik dan 
                tertib administrasi di lingkungan Universitas Nasional Indonesia, perlu ditetapkan 
                pedoman baru mengenai standar operasional prosedur pengelolaan dokumen 
                elektronik.
              </p>

              <p>
                <strong>MENGINGAT:</strong> 1. Undang-Undang Nomor 12 Tahun 2012 tentang Pendidikan Tinggi; 2. 
                Peraturan Pemerintah Nomor 4 Tahun 2014 tentang Penyelenggaraan Pendidikan 
                Tinggi dan Pengelolaan Perguruan Tinggi.
              </p>

              <p className="pa-doc-centered"><strong>MEMUTUSKAN:</strong></p>

              <p>
                <strong>MENETAPKAN:</strong> PERATURAN REKTOR TENTANG PENGELOLAAN DOKUMEN 
                ELEKTRONIK DAN TANDA TANGAN DIGITAL DI LINGKUNGAN UNIVERSITAS 
                NASIONAL INDONESIA.
              </p>

              <p className="pa-doc-pasal">
                Pasal 1: Seluruh dokumen resmi internal maupun eksternal wajib melalui sistem 
                manajemen dokumen legal terpadu.
              </p>

              <p className="pa-doc-pasal">
                Pasal 2: Peraturan ini berlaku sejak tanggal ditetapkan.
              </p>
            </div>

            {/* Signature Area */}
            <div className="pa-doc-signature">
              <p className="pa-doc-sig-place">Ditetapkan di Kota Akademik</p>
              <p className="pa-doc-sig-date">pada tanggal [TANGGAL SAH]</p>

              <div className="pa-doc-sig-stamp">
                <div className="pa-doc-sig-icon">
                  <CheckCircle2 size={28} />
                </div>
                <p className="pa-doc-sig-status">Menunggu Tanda Tangan</p>
                <p className="pa-doc-sig-status-sub">Digital Rektor</p>
              </div>

              <p className="pa-doc-sig-name">PROF. DR. BUDI SANTOSO, M.SC.</p>
              <p className="pa-doc-sig-title">Rektor Universitas Nasional Indonesia</p>
            </div>
          </div>
        </div>

        {/* Right Column — Action Cards */}
        <div className="pa-action-column">
          {/* Card 1 — Verifikasi Koordinasi */}
          <div className="pa-card">
            <h3 className="pa-card-title-label">VERIFIKASI KOORDINASI</h3>
            <div className="pa-verifikasi-list">
              <div className="pa-verifikasi-item">
                <CheckCircle2 size={20} className="pa-check-icon" />
                <div className="pa-verifikasi-info">
                  <span className="pa-verifikasi-name">Kabiro Hukum</span>
                  <span className="pa-verifikasi-date">Disetujui: 12 Okt 2023, 09:15</span>
                </div>
              </div>
              <div className="pa-verifikasi-item">
                <CheckCircle2 size={20} className="pa-check-icon" />
                <div className="pa-verifikasi-info">
                  <span className="pa-verifikasi-name">Wakil Rektor II</span>
                  <span className="pa-verifikasi-date">Disetujui: 13 Okt 2023, 14:30</span>
                </div>
              </div>
              <div className="pa-verifikasi-item">
                <CheckCircle2 size={20} className="pa-check-icon" />
                <div className="pa-verifikasi-info">
                  <span className="pa-verifikasi-name">Wakil Rektor I</span>
                  <span className="pa-verifikasi-date">Disetujui: 14 Okt 2023, 10:05</span>
                </div>
              </div>
            </div>
            <div className="pa-paraf-complete">
              <CheckCircle2 size={16} />
              <span>Syarat paraf lengkap.</span>
            </div>
          </div>

          {/* Card 2 — Penomoran Dokumen */}
          <div className="pa-card">
            <h3 className="pa-card-title-label">PENOMORAN DOKUMEN</h3>
            <p className="pa-card-desc">
              Dokumen belum memiliki nomor register resmi dari Tata Usaha.
            </p>
            <button className="pa-btn-generate">
              <Hash size={16} />
              Generate Nomor Register
            </button>
          </div>

          {/* Card 3 — Tindakan Eksekutif */}
          <div className="pa-card pa-card-action">
            <h3 className="pa-card-title-label">TINDAKAN EKSEKUTIF</h3>
            <button className="pa-btn-sign">
              <Edit size={16} />
              Tanda Tangani & Sahkan
            </button>
            <button className="pa-btn-revisi">
              <XCircle size={16} />
              Kembalikan untuk Revisi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersetujuanAkhir;
