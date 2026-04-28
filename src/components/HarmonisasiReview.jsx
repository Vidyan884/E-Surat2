import React, { useState } from 'react';
import { ChevronRight, RefreshCw, MessageSquare, CheckCircle2 } from 'lucide-react';
import './HarmonisasiReview.css';

const HarmonisasiReview = () => {
  const [catatan, setCatatan] = useState('');
  const [pesan, setPesan] = useState('');

  return (
    <div className="hr-container">
      {/* Breadcrumb */}
      <div className="hr-breadcrumb">
        <a href="#" className="hr-bc-link" onClick={(e) => e.preventDefault()}>Produk Hukum</a>
        <ChevronRight size={14} className="hr-bc-sep" />
        <a href="#" className="hr-bc-link" onClick={(e) => e.preventDefault()}>Draft SK Rektor</a>
        <ChevronRight size={14} className="hr-bc-sep" />
        <span className="hr-bc-current">Harmonisasi</span>
      </div>

      {/* Page Header */}
      <div className="hr-page-header">
        <div className="hr-header-left">
          <h1 className="hr-title">Peraturan Rektor tentang Pedoman Akademik 2024</h1>
          <div className="hr-meta">
            <span className="hr-meta-item">
              <span className="hr-meta-hash">#</span> PR-2024-08-142
            </span>
            <span className="hr-meta-item">
              <span className="hr-meta-icon">👤</span> Diajukan oleh: Fakultas Teknik
            </span>
          </div>
        </div>
        <div className="hr-status-badge">
          <RefreshCw size={14} />
          Sedang Diharmonisasi
        </div>
      </div>

      {/* Three Column Layout */}
      <div className="hr-columns">
        {/* Column 1 — Draft Asal */}
        <div className="hr-draft-card">
          <div className="hr-draft-header">
            <h3 className="hr-draft-title">Draft Asal</h3>
            <span className="hr-version">Versi 1.0</span>
          </div>
          <div className="hr-draft-content">
            <div className="hr-pasal">
              <h4 className="hr-pasal-title">Pasal 4</h4>
              <p>(1) Mahasiswa wajib menyelesaikan beban studi sekurang-kurangnya 144 SKS untuk program Sarjana.</p>
            </div>
            <div className="hr-pasal">
              <h4 className="hr-pasal-title">Pasal 5</h4>
              <p>(1) Cuti akademik dapat diberikan paling lama 2 (dua) semester berturut-turut.</p>
              <p>(2) Selama masa cuti akademik, mahasiswa dibebaskan dari kewajiban membayar Uang Kuliah Tunggal (UKT).</p>
            </div>
            <div className="hr-pasal">
              <h4 className="hr-pasal-title">Pasal 6</h4>
              <p>Evaluasi hasil studi dilakukan pada setiap akhir semester dan digunakan sebagai dasar penentuan beban studi pada semester berikutnya.</p>
            </div>
          </div>
        </div>

        {/* Column 2 — Draft Revisi Legal */}
        <div className="hr-draft-card hr-draft-revisi">
          <div className="hr-draft-header">
            <div className="hr-draft-title-group">
              <h3 className="hr-draft-title">Draft Revisi Legal</h3>
              <span className="hr-badge-terbaru">TERBARU</span>
            </div>
            <span className="hr-version">Versi 1.1</span>
          </div>
          <div className="hr-draft-content">
            <div className="hr-pasal">
              <h4 className="hr-pasal-title">Pasal 4</h4>
              <p>(1) Mahasiswa wajib menyelesaikan beban studi sekurang-kurangnya 144 SKS untuk program Sarjana.</p>
            </div>
            <div className="hr-pasal hr-pasal-changed">
              <div className="hr-pasal-header-row">
                <h4 className="hr-pasal-title">Pasal 5</h4>
                <MessageSquare size={16} className="hr-comment-icon" />
              </div>
              <p>
                (1) Cuti akademik dapat diberikan paling lama 2 (dua) semester{' '}
                <span className="hr-text-deleted">berturut-turut</span>{' '}
                <span className="hr-text-added">secara kumulatif selama masa studi</span>.
              </p>
              <p>(2) Selama masa cuti akademik, mahasiswa dibebaskan dari kewajiban membayar Uang Kuliah Tunggal (UKT).</p>
            </div>
            <div className="hr-pasal">
              <h4 className="hr-pasal-title">Pasal 6</h4>
              <p>Evaluasi hasil studi dilakukan pada setiap akhir semester dan digunakan sebagai dasar penentuan beban studi pada semester berikutnya.</p>
            </div>
          </div>
        </div>

        {/* Column 3 — Right Panel */}
        <div className="hr-right-panel">
          {/* Card — Catatan Perbaikan Substantif */}
          <div className="hr-panel-card">
            <h3 className="hr-panel-title">Catatan Perbaikan Substantif</h3>

            <div className="hr-note-card">
              <div className="hr-note-header">
                <span className="hr-note-pasal">Pasal 5 Ayat 1</span>
                <span className="hr-note-time">10:42 AM</span>
              </div>
              <p className="hr-note-body">
                Penggunaan kata "berturut-turut" membatasi hak mahasiswa. Secara regulasi nasional, cuti dapat diambil secara kumulatif. Mohon disesuaikan.
              </p>
              <div className="hr-note-author">
                <div className="hr-note-avatar">SH</div>
                <span className="hr-note-author-name">Staf Ahli Hukum</span>
              </div>
            </div>

            <div className="hr-note-input-area">
              <textarea 
                value={catatan}
                onChange={(e) => setCatatan(e.target.value)}
                placeholder="Tambah catatan perbaikan..."
                className="hr-note-textarea"
                rows={2}
              />
              <div className="hr-note-input-footer">
                <button className="hr-btn-tambah">Tambah</button>
              </div>
            </div>
          </div>

          {/* Card — Keputusan Harmonisasi */}
          <div className="hr-panel-card">
            <h3 className="hr-panel-title">Keputusan Harmonisasi</h3>
            <p className="hr-panel-desc">
              Tentukan hasil akhir dari proses harmonisasi untuk dokumen ini. Tindakan ini akan mengubah status dokumen di sistem.
            </p>

            <div className="hr-keputusan-form">
              <label className="hr-keputusan-label">Pesan / Ringkasan Evaluasi (Opsional)</label>
              <textarea 
                value={pesan}
                onChange={(e) => setPesan(e.target.value)}
                placeholder="Masukkan ringkasan hasil harmonisasi..."
                className="hr-keputusan-textarea"
                rows={3}
              />
            </div>

            <div className="hr-keputusan-actions">
              <button className="hr-btn-setujui">
                <CheckCircle2 size={16} />
                Setujui (Harmonisasi Selesai)
              </button>
              <div className="hr-keputusan-secondary">
                <button className="hr-btn-revisi">Minta Revisi</button>
                <button className="hr-btn-tolak">Tolak</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HarmonisasiReview;
