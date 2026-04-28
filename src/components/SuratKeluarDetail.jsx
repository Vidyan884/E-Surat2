import React, { useState } from 'react';
import { ZoomOut, ZoomIn, Printer, CheckCircle, FileEdit, XCircle, GraduationCap, ArrowLeft } from 'lucide-react';
import { useToast } from './Toast';
import ConfirmModal from './ConfirmModal';
import './SuratKeluarDetail.css';

const SuratKeluarDetail = ({ setActiveTab }) => {
  const { addToast } = useToast();
  const [showRejectModal, setShowRejectModal] = useState(false);

  return (
    <>
    <div className="surat-kd-container">
      {/* Left Column: PDF Viewer */}
      <div className="skd-pdf-col">
        <div className="pdf-toolbar">
          <div className="toolbar-left">
            <button className="btn-back" onClick={() => setActiveTab('surat-masuk')}>
              <ArrowLeft size={18} />
              <span>Kembali</span>
            </button>
            <span className="badge-draft">Draft</span>
            <span className="text-draft-no">No: UNIA/FT/2023/10/045</span>
          </div>
          <div className="toolbar-right">
            <ZoomOut size={16} className="toolbar-icon" />
            <span className="zoom-text">100%</span>
            <ZoomIn size={16} className="toolbar-icon" />
            <div className="toolbar-divider"></div>
            <Printer size={16} className="toolbar-icon black" />
          </div>
        </div>

        <div className="pdf-viewer-area">
          <div className="a4-paper">
            {/* Kop Surat */}
            <div className="kop-surat">
              <div className="kop-logo">
                <GraduationCap size={48} className="icon-graduation" color="#64748b" />
              </div>
              <div className="kop-text">
                <h1 className="univ-name">UNIVERSITAS NUSANTARA<br />ILMU ADMINISTRASI</h1>
                <p className="fak-name">Fakultas Teknologi Informasi</p>
                <p className="univ-address">Jl. Pendidikan No. 123, Jakarta 10110 | Telp: (021) 555-0123 | Email: info@unia.ac.id</p>
              </div>
            </div>
            <div className="kop-divider"></div>

            {/* Letter Body */}
            <div className="letter-body">
              <div className="letter-meta-grid">
                <div className="meta-left">
                  <div className="meta-row">
                    <span className="meta-label">Nomor</span>
                    <span className="meta-value">: UNIA/FT/2023/10/045</span>
                  </div>
                  <div className="meta-row">
                    <span className="meta-label">Lampiran</span>
                    <span className="meta-value">: 1 (Satu) Berkas</span>
                  </div>
                  <div className="meta-row align-top">
                    <span className="meta-label">Hal</span>
                    <span className="meta-value">: Permohonan Persetujuan<br/>Kegiatan Seminar Nasional</span>
                  </div>
                </div>
                <div className="meta-right">
                  Jakarta, 24 Oktober 2023
                </div>
              </div>

              <div className="letter-content">
                <p className="mb-4">
                  Yth. Wakil Rektor Bidang Akademik<br />
                  Universitas Nusantara Ilmu Administrasi<br />
                  di Tempat
                </p>

                <p className="mb-4 indent">
                  Dengan hormat,
                </p>

                <p className="mb-4 indent text-justify">
                  Sehubungan dengan program kerja tahunan Fakultas Teknologi Informasi untuk meningkatkan kompetensi mahasiswa dan dosen di bidang kecerdasan buatan, kami berencana menyelenggarakan Seminar Nasional dengan tema "Masa Depan AI dalam Administrasi Publik".
                </p>

                <p className="mb-4 indent text-justify">
                  Kegiatan ini direncanakan akan diselenggarakan pada:
                </p>

                <div className="jadwal-area mb-4">
                  <div className="meta-row">
                    <span className="jadwal-label">Hari, Tanggal</span>
                    <span className="meta-value">: Rabu, 15 November 2023</span>
                  </div>
                  <div className="meta-row">
                    <span className="jadwal-label">Waktu</span>
                    <span className="meta-value">: 08:00 - 15:00 WIB</span>
                  </div>
                  <div className="meta-row">
                    <span className="jadwal-label">Tempat</span>
                    <span className="meta-value">: Auditorium Utama UNIA</span>
                  </div>
                </div>

                <p className="indent text-justify">
                  Oleh karena itu, kami mengajukan permohonan persetujuan dan dukungan dana untuk penyelenggaraan kegiatan tersebut. Rincian anggaran dan susunan acara telah kami lampirkan bersama surat ini.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Verifikasi Panel */}
      <div className="skd-verifikasi-col">
        <div className="verifikasi-header">
          <h2>Verifikasi Dokumen</h2>
          <p>Review dan tindak lanjuti draft surat ini.</p>
        </div>

        <div className="verifikasi-section">
          <label className="section-label">PENGIRIM DRAFT</label>
          <div className="pengirim-card">
            <div className="avatar-circle">BS</div>
            <div className="pengirim-info">
              <h4>Budi Santoso</h4>
              <p>Dekan Fakultas Teknologi Informasi</p>
            </div>
          </div>
        </div>

        <div className="verifikasi-section">
          <label className="section-label">RIWAYAT STATUS</label>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-dot green"></div>
              <div className="timeline-content">
                <h5>Dibuat oleh Pengonsep</h5>
                <p>24 Okt 2023, 09:15 WIB</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot gray"></div>
              <div className="timeline-content">
                <h5>Menunggu Verifikasi Anda</h5>
                <p>24 Okt 2023, 09:30 WIB</p>
              </div>
            </div>
          </div>
        </div>

        <div className="verifikasi-section flex-1">
          <label className="section-label">CATATAN PERBAIKAN / PESAN</label>
          <textarea 
            className="skd-textarea" 
            placeholder="Tambahkan catatan jika surat perlu direvisi atau ditolak..."
          ></textarea>
        </div>

        <div className="verifikasi-actions">
          <button className="btn-skd-setujui" onClick={() => { addToast('Surat berhasil disetujui dan diteruskan.', 'success'); setTimeout(() => setActiveTab('surat-keluar'), 1200); }}>
            <CheckCircle size={16} />
            Setujui & Teruskan
          </button>
          <div className="action-buttons-row">
            <button className="btn-skd-outline" onClick={() => addToast('Revisi telah dikirim ke pembuat surat.', 'warning')}>
              <FileEdit size={16} />
              Kirim Revisi
            </button>
            <button className="btn-skd-outline red" onClick={() => setShowRejectModal(true)}>
              <XCircle size={16} />
              Tolak
            </button>
          </div>
        </div>
      </div>
    </div>

    <ConfirmModal
      isOpen={showRejectModal}
      onClose={() => setShowRejectModal(false)}
      onConfirm={() => { addToast('Surat telah ditolak.', 'error'); setTimeout(() => setActiveTab('surat-keluar'), 1200); }}
      title="Tolak Surat?"
      message="Anda yakin ingin menolak surat ini? Pembuat surat akan mendapat notifikasi penolakan."
      confirmText="Ya, Tolak"
      type="danger"
    />
    </>
  );
};

export default SuratKeluarDetail;
