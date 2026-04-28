import React from 'react';
import { Building2, Hash, Calendar, ClipboardList, X, Send, ArrowLeft } from 'lucide-react';
import { useToast } from './Toast';
import './SuratDetail.css';

const SuratDetail = ({ setActiveTab }) => {
  const { addToast } = useToast();

  const handleKirimDisposisi = () => {
    addToast('Disposisi berhasil dikirim ke Wakil Rektor I.', 'success');
    setTimeout(() => setActiveTab('surat-masuk'), 1200);
  };

  return (
    <div className="surat-detail-container">
      {/* Left Column: Letter Preview */}
      <div className="letter-preview-col">
        <div className="preview-header">
          <button className="btn-back" onClick={() => setActiveTab('surat-masuk')}>
            <ArrowLeft size={18} />
            <span>Kembali</span>
          </button>
          <div className="badge-surat-masuk">SURAT MASUK</div>
          <div className="diterima-text">Diterima: 12 Okt 2023</div>
        </div>

        <h2 className="letter-title">Undangan Rapat Koordinasi Nasional APTISI 2023</h2>

        <div className="letter-meta">
          <div className="meta-item">
            <Building2 size={14} className="meta-icon" />
            <span>Asal: Kementerian Pendidikan dan Kebudayaan</span>
          </div>
          <div className="meta-item">
            <Hash size={14} className="meta-icon" />
            <span>No: 124/B.1/KU/2023</span>
          </div>
          <div className="meta-item">
            <Calendar size={14} className="meta-icon" />
            <span>Tgl Surat: 10 Okt 2023</span>
          </div>
        </div>

        <div className="document-mock">
          <div className="doc-paper">
            <div className="doc-kop">
              <div className="kop-logo-box"></div>
              <div className="kop-text">
                <h3>KEMENTERIAN<br/>PENDIDIKAN</h3>
                <p>Jl. Jenderal Sudirman Senayan, Jakarta</p>
              </div>
            </div>
            <div className="doc-separator"></div>
            
            <div className="doc-content-skeleton">
              <div className="skel-line short"></div>
              <div className="skel-line medium"></div>
              
              <div className="skel-line long format-mt"></div>
              <div className="skel-line long"></div>
              <div className="skel-line very-long"></div>
              
              <div className="skel-line long format-mt"></div>
              <div className="skel-line very-long"></div>
              
              <div className="skel-flex-end format-mt2">
                <div className="skel-line short"></div>
              </div>
              <div className="skel-ttd-box">
                Area TTD
              </div>
              <div className="skel-flex-end">
                <div className="skel-line medium"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Disposition Form */}
      <div className="disposisi-form-col">
        <div className="disposisi-header">
          <ClipboardList size={22} className="disposisi-icon" />
          <h3>Lembar Disposisi</h3>
        </div>

        <div className="form-section">
          <label className="form-label">SIFAT DISPOSISI</label>
          <div className="sifat-options">
            <button className="btn-sifat">Sangat Segera</button>
            <button className="btn-sifat active">Segera</button>
            <button className="btn-sifat">Biasa</button>
          </div>
        </div>

        <div className="form-section">
          <label className="form-label">DITERUSKAN KEPADA</label>
          <div className="chips-input-wrapper">
            <div className="chips-container">
              <div className="chip">
                Wakil Rektor I <X size={14} className="chip-close" />
              </div>
              <div className="chip">
                Dekan Fakultas Tarbiyah <X size={14} className="chip-close" />
              </div>
            </div>
            <input type="text" placeholder="Ketik jabatan atau nama..." className="chip-input-field" />
          </div>
          <span className="input-hint">Gunakan koma atau enter untuk menambah tujuan.</span>
        </div>

        <div className="form-section">
          <label className="form-label">INSTRUKSI / CATATAN PIMPINAN</label>
          <textarea 
            className="catatan-textarea" 
            placeholder="Tuliskan instruksi atau arahan untuk tindak lanjut surat ini..."
            rows="8"
          ></textarea>
        </div>

        <div className="form-section">
          <label className="form-label">INSTRUKSI CEPAT</label>
          <div className="instruksi-cepat-pills">
            <button className="btn-pill">Tindak lanjuti</button>
            <button className="btn-pill">Wakili / Hadiri</button>
            <button className="btn-pill">Siapkan bahan</button>
            <button className="btn-pill">Untuk diketahui</button>
          </div>
        </div>

        <div className="disposisi-footer-actions">
          <button className="btn-batal" onClick={() => setActiveTab('surat-masuk')}>Batal</button>
          <button className="btn-kirim" onClick={handleKirimDisposisi}>
            <Send size={16} />
            Kirim Disposisi
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuratDetail;
