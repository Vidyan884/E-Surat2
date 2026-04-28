import React, { useState } from 'react';
import { Search, Upload, ScanLine, HelpCircle, ShieldCheck } from 'lucide-react';
import './TrackingPage.css';

const TrackingPage = ({ setActiveTab, onLogout }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResult, setShowResult] = useState(true);

  const handleSearch = (e) => {
    e.preventDefault();
    setShowResult(true);
  };

  return (
    <div className="tp-page">
      {/* Public Header */}
      <header className="tp-header">
        <div className="tp-header-inner">
          <div className="tp-header-brand">UNIA Electronic Letter System</div>
          <nav className="tp-header-nav">
            <a href="#" className="tp-nav-link active" onClick={(e) => e.preventDefault()}>Tracking</a>
            <a href="#" className="tp-nav-link" onClick={(e) => e.preventDefault()}>Verify Document</a>
            <a href="#" className="tp-nav-link" onClick={(e) => e.preventDefault()}>Archive</a>
            <a href="#" className="tp-nav-link" onClick={(e) => e.preventDefault()}>Support</a>
          </nav>
          <button className="tp-btn-login" onClick={() => onLogout && onLogout()}>
            Staff Login
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="tp-hero">
        <h1 className="tp-hero-title">Lacak Status Surat Anda</h1>
        <p className="tp-hero-subtitle">
          Masukkan nomor resi atau nomor registrasi surat untuk memantau proses administrasi dokumen Anda secara real-time.
        </p>
        <form className="tp-search-form" onSubmit={handleSearch}>
          <div className="tp-search-box">
            <Search size={18} className="tp-search-icon" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Contoh: UNIA/2023/10/REG-00123"
              className="tp-search-input"
            />
          </div>
          <button type="submit" className="tp-btn-search">Lacak Surat</button>
        </form>
      </section>

      {/* Result Section */}
      {showResult && (
        <>
          <section className="tp-result">
            <div className="tp-result-inner">
              {/* Detail Header */}
              <div className="tp-detail-header">
                <div>
                  <span className="tp-detail-label">DETAIL DOKUMEN</span>
                  <h2 className="tp-detail-number">UNIA/2023/10/REG-00123</h2>
                </div>
                <span className="tp-status-badge">Sedang Diproses</span>
              </div>

              {/* Two Column Content */}
              <div className="tp-detail-grid">
                {/* Left — Riwayat Proses */}
                <div className="tp-timeline-section">
                  <h3 className="tp-section-label">RIWAYAT PROSES</h3>
                  <div className="tp-timeline">
                    <div className="tp-timeline-item active">
                      <div className="tp-timeline-dot active"></div>
                      <div className="tp-timeline-content">
                        <span className="tp-timeline-title">Disposisi</span>
                        <p className="tp-timeline-desc">Dokumen diteruskan ke Wakil Rektor I bidang Akademik.</p>
                        <span className="tp-timeline-date">24 Okt 2023, 14:30 WIB</span>
                      </div>
                    </div>
                    <div className="tp-timeline-item active">
                      <div className="tp-timeline-dot active"></div>
                      <div className="tp-timeline-content">
                        <span className="tp-timeline-title">Verifikasi</span>
                        <p className="tp-timeline-desc">Dokumen telah diverifikasi oleh staf TU Fakultas.</p>
                        <span className="tp-timeline-date">23 Okt 2023, 09:15 WIB</span>
                      </div>
                    </div>
                    <div className="tp-timeline-item">
                      <div className="tp-timeline-dot"></div>
                      <div className="tp-timeline-content">
                        <span className="tp-timeline-title">Registrasi</span>
                        <p className="tp-timeline-desc">Surat masuk didaftarkan ke sistem.</p>
                        <span className="tp-timeline-date">22 Okt 2023, 10:00 WIB</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right — Informasi Surat */}
                <div className="tp-info-section">
                  <h3 className="tp-section-label">INFORMASI SURAT</h3>
                  <div className="tp-info-list">
                    <div className="tp-info-item">
                      <span className="tp-info-label">Pengirim</span>
                      <span className="tp-info-value">Fakultas Teknik</span>
                    </div>
                    <div className="tp-info-item">
                      <span className="tp-info-label">Perihal</span>
                      <span className="tp-info-value">Permohonan Izin Kegiatan Mahasiswa Nasional</span>
                    </div>
                    <div className="tp-info-item">
                      <span className="tp-info-label">Estimasi Selesai</span>
                      <span className="tp-info-value tp-info-bold">26 Okt 2023</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Bottom Info Cards */}
          <section className="tp-bottom-cards">
            <div className="tp-bottom-inner">
              {/* Card — Dimana Nomor Resi? */}
              <div className="tp-info-card">
                <h3 className="tp-info-card-title">
                  <HelpCircle size={20} />
                  Dimana Nomor Resi?
                </h3>
                <p className="tp-info-card-desc">
                  Nomor resi atau registrasi dapat ditemukan di pojok kanan atas pada tanda terima fisik yang diberikan oleh loket Tata Usaha, atau pada email notifikasi jika dokumen dikirimkan secara elektronik.
                </p>
                <div className="tp-resi-illustration">
                  <div className="tp-resi-doc">
                    <div className="tp-resi-stamp">UNIA/2023/10/REG-00123</div>
                    <p className="tp-resi-caption">Ilustrasi Tanda Terima Dokumen</p>
                  </div>
                </div>
              </div>

              {/* Card — Verifikasi Keaslian */}
              <div className="tp-info-card">
                <h3 className="tp-info-card-title">
                  <ShieldCheck size={20} />
                  Verifikasi Keaslian Dokumen
                </h3>
                <p className="tp-info-card-desc">
                  Pastikan dokumen digital yang Anda terima adalah resmi dari UNIA. Unggah file PDF atau pindai QR Code Tanda Tangan Elektronik.
                </p>
                <div className="tp-upload-area">
                  <Upload size={28} className="tp-upload-icon" />
                  <p className="tp-upload-text">Klik untuk Unggah PDF</p>
                  <p className="tp-upload-hint">Maks 5MB. Format didukung: .pdf</p>
                </div>
                <button className="tp-btn-qr">
                  <ScanLine size={16} />
                  Pindai QR Code
                </button>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Footer */}
      <footer className="tp-footer">
        <div className="tp-footer-inner">
          <p className="tp-footer-copy">© 2024 UNIA. <strong>Official Document Management System.</strong></p>
          <div className="tp-footer-links">
            <a href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
            <a href="#" onClick={(e) => e.preventDefault()}>Terms of Service</a>
            <a href="#" onClick={(e) => e.preventDefault()}>University Portal</a>
            <a href="#" onClick={(e) => e.preventDefault()}>Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TrackingPage;
