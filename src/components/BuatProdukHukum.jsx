import React, { useState } from 'react';
import { ChevronDown, ArrowRight, ArrowLeft, Plus, X, Upload, FileText, Check } from 'lucide-react';
import { useToast } from './Toast';
import './BuatProdukHukum.css';

const BuatProdukHukum = () => {
  const { addToast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    jenisProduk: '',
    judul: '',
    unitPengusul: 'Biro Umum dan Keuangan',
    kerahasiaan: 'biasa',
    prioritas: 'biasa',
  });

  const [konsideran, setKonsideran] = useState({
    menimbang: [''],
    mengingat: [''],
    memutuskan: '',
  });

  const [uploadedFile, setUploadedFile] = useState(null);
  const [catatanTambahan, setCatatanTambahan] = useState('');

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addKonsideranItem = (type) => {
    setKonsideran(prev => ({
      ...prev,
      [type]: [...prev[type], ''],
    }));
  };

  const removeKonsideranItem = (type, index) => {
    setKonsideran(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }));
  };

  const updateKonsideranItem = (type, index, value) => {
    setKonsideran(prev => ({
      ...prev,
      [type]: prev[type].map((item, i) => i === index ? value : item),
    }));
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile({
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2),
        type: file.type,
      });
    }
  };

  const steps = [
    { number: 1, title: 'Metadata', desc: 'Informasi dasar dokumen' },
    { number: 2, title: 'Konsideran', desc: 'Dasar hukum & pertimbangan' },
    { number: 3, title: 'Unggah Draf', desc: 'Upload file dokumen' },
  ];

  const goNext = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const goPrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="bph-container">
      {/* Page Header */}
      <div className="bph-page-header">
        <h1 className="bph-title">Buat Produk Hukum Baru</h1>
        <p className="bph-subtitle">Lengkapi informasi dasar untuk memulai proses draf produk hukum.</p>
      </div>

      {/* Main Layout */}
      <div className="bph-layout">
        {/* Left — Progress Stepper */}
        <div className="bph-stepper-card">
          <h3 className="bph-stepper-title">PROGRESS PEMBUATAN</h3>
          <div className="bph-steps">
            {steps.map((step) => (
              <div 
                key={step.number} 
                className={`bph-step ${currentStep === step.number ? 'active' : ''} ${currentStep > step.number ? 'completed' : ''}`}
                onClick={() => setCurrentStep(step.number)}
              >
                <div className="bph-step-number">
                  {currentStep > step.number ? <Check size={14} /> : <span>{step.number}</span>}
                </div>
                <div className="bph-step-info">
                  <span className="bph-step-name">{step.title}</span>
                  {step.desc && <span className="bph-step-desc">{step.desc}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Form */}
        <div className="bph-form-card">
          {/* ═══ STEP 1: Metadata ═══ */}
          {currentStep === 1 && (
            <>
              <h2 className="bph-form-title">Formulir Metadata</h2>
              <p className="bph-form-step-label">Step 1 dari 3</p>

              <div className="bph-form-body">
                {/* Jenis Produk Hukum */}
                <div className="bph-field">
                  <label className="bph-label">
                    Jenis Produk Hukum <span className="bph-required">*</span>
                  </label>
                  <div className="bph-select-wrapper">
                    <select 
                      value={formData.jenisProduk}
                      onChange={(e) => handleChange('jenisProduk', e.target.value)}
                      className="bph-select"
                    >
                      <option value="">Pilih jenis produk hukum...</option>
                      <option value="peraturan-rektor">Peraturan Rektor</option>
                      <option value="keputusan-rektor">Keputusan Rektor</option>
                      <option value="surat-edaran">Surat Edaran</option>
                      <option value="instruksi">Instruksi</option>
                    </select>
                    <ChevronDown size={16} className="bph-select-arrow" />
                  </div>
                </div>

                {/* Judul / Perihal */}
                <div className="bph-field">
                  <label className="bph-label">
                    Judul / Perihal Dokumen <span className="bph-required">*</span>
                  </label>
                  <textarea 
                    value={formData.judul}
                    onChange={(e) => handleChange('judul', e.target.value)}
                    placeholder="Masukkan judul atau perihal lengkap dokumen..."
                    className="bph-textarea"
                    rows={3}
                  />
                </div>

                {/* Unit Pengusul */}
                <div className="bph-field">
                  <label className="bph-label">Unit Pengusul</label>
                  <div className="bph-select-wrapper">
                    <select 
                      value={formData.unitPengusul}
                      onChange={(e) => handleChange('unitPengusul', e.target.value)}
                      className="bph-select"
                    >
                      <option>Biro Umum dan Keuangan</option>
                      <option>Biro Hukum</option>
                      <option>Biro Akademik</option>
                      <option>Biro Kemahasiswaan</option>
                    </select>
                    <ChevronDown size={16} className="bph-select-arrow" />
                  </div>
                </div>

                {/* Two Column: Kerahasiaan & Prioritas */}
                <div className="bph-two-col">
                  {/* Tingkat Kerahasiaan */}
                  <div className="bph-field">
                    <label className="bph-label">Tingkat Kerahasiaan</label>
                    <div className="bph-radio-group">
                      <label className={`bph-radio-item ${formData.kerahasiaan === 'biasa' ? 'selected' : ''}`}>
                        <input 
                          type="radio" name="kerahasiaan" value="biasa"
                          checked={formData.kerahasiaan === 'biasa'}
                          onChange={(e) => handleChange('kerahasiaan', e.target.value)}
                          className="bph-radio"
                        />
                        <span>Biasa</span>
                      </label>
                      <label className={`bph-radio-item ${formData.kerahasiaan === 'rahasia' ? 'selected' : ''}`}>
                        <input 
                          type="radio" name="kerahasiaan" value="rahasia"
                          checked={formData.kerahasiaan === 'rahasia'}
                          onChange={(e) => handleChange('kerahasiaan', e.target.value)}
                          className="bph-radio"
                        />
                        <span>Rahasia</span>
                      </label>
                      <label className={`bph-radio-item danger ${formData.kerahasiaan === 'sangat-rahasia' ? 'selected' : ''}`}>
                        <input 
                          type="radio" name="kerahasiaan" value="sangat-rahasia"
                          checked={formData.kerahasiaan === 'sangat-rahasia'}
                          onChange={(e) => handleChange('kerahasiaan', e.target.value)}
                          className="bph-radio"
                        />
                        <span>Sangat Rahasia</span>
                      </label>
                    </div>
                  </div>

                  {/* Prioritas Penanganan */}
                  <div className="bph-field">
                    <label className="bph-label">Prioritas Penanganan</label>
                    <div className="bph-radio-group">
                      <label className={`bph-radio-item ${formData.prioritas === 'biasa' ? 'selected' : ''}`}>
                        <input 
                          type="radio" name="prioritas" value="biasa"
                          checked={formData.prioritas === 'biasa'}
                          onChange={(e) => handleChange('prioritas', e.target.value)}
                          className="bph-radio"
                        />
                        <span>Biasa</span>
                      </label>
                      <label className={`bph-radio-item ${formData.prioritas === 'segera' ? 'selected' : ''}`}>
                        <input 
                          type="radio" name="prioritas" value="segera"
                          checked={formData.prioritas === 'segera'}
                          onChange={(e) => handleChange('prioritas', e.target.value)}
                          className="bph-radio"
                        />
                        <span>Segera</span>
                      </label>
                      <label className={`bph-radio-item ${formData.prioritas === 'kilat' ? 'selected' : ''}`}>
                        <input 
                          type="radio" name="prioritas" value="kilat"
                          checked={formData.prioritas === 'kilat'}
                          onChange={(e) => handleChange('prioritas', e.target.value)}
                          className="bph-radio"
                        />
                        <span>Kilat</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ═══ STEP 2: Konsideran ═══ */}
          {currentStep === 2 && (
            <>
              <h2 className="bph-form-title">Konsideran Dokumen</h2>
              <p className="bph-form-step-label">Step 2 dari 3</p>

              <div className="bph-form-body">
                {/* Menimbang */}
                <div className="bph-field">
                  <label className="bph-label">
                    Menimbang <span className="bph-required">*</span>
                  </label>
                  <p className="bph-field-hint">Alasan dan pertimbangan yang mendasari pembuatan dokumen.</p>
                  <div className="bph-entry-list">
                    {konsideran.menimbang.map((item, idx) => (
                      <div key={idx} className="bph-entry-item">
                        <span className="bph-entry-letter">{String.fromCharCode(97 + idx)}.</span>
                        <textarea
                          value={item}
                          onChange={(e) => updateKonsideranItem('menimbang', idx, e.target.value)}
                          placeholder={`Butir pertimbangan ${idx + 1}...`}
                          className="bph-entry-textarea"
                          rows={2}
                        />
                        {konsideran.menimbang.length > 1 && (
                          <button 
                            className="bph-entry-remove"
                            onClick={() => removeKonsideranItem('menimbang', idx)}
                          >
                            <X size={14} />
                          </button>
                        )}
                      </div>
                    ))}
                    <button className="bph-btn-add-entry" onClick={() => addKonsideranItem('menimbang')}>
                      <Plus size={14} />
                      Tambah Butir Pertimbangan
                    </button>
                  </div>
                </div>

                {/* Mengingat */}
                <div className="bph-field">
                  <label className="bph-label">
                    Mengingat <span className="bph-required">*</span>
                  </label>
                  <p className="bph-field-hint">Dasar hukum yang menjadi landasan dokumen.</p>
                  <div className="bph-entry-list">
                    {konsideran.mengingat.map((item, idx) => (
                      <div key={idx} className="bph-entry-item">
                        <span className="bph-entry-number">{idx + 1}.</span>
                        <textarea
                          value={item}
                          onChange={(e) => updateKonsideranItem('mengingat', idx, e.target.value)}
                          placeholder={`Dasar hukum ${idx + 1}...`}
                          className="bph-entry-textarea"
                          rows={2}
                        />
                        {konsideran.mengingat.length > 1 && (
                          <button 
                            className="bph-entry-remove"
                            onClick={() => removeKonsideranItem('mengingat', idx)}
                          >
                            <X size={14} />
                          </button>
                        )}
                      </div>
                    ))}
                    <button className="bph-btn-add-entry" onClick={() => addKonsideranItem('mengingat')}>
                      <Plus size={14} />
                      Tambah Dasar Hukum
                    </button>
                  </div>
                </div>

                {/* Memutuskan */}
                <div className="bph-field">
                  <label className="bph-label">Memutuskan / Menetapkan</label>
                  <textarea
                    value={konsideran.memutuskan}
                    onChange={(e) => setKonsideran(prev => ({ ...prev, memutuskan: e.target.value }))}
                    placeholder="Rumusan diktum keputusan atau penetapan..."
                    className="bph-textarea"
                    rows={4}
                  />
                </div>
              </div>
            </>
          )}

          {/* ═══ STEP 3: Unggah Draf ═══ */}
          {currentStep === 3 && (
            <>
              <h2 className="bph-form-title">Unggah Draf Dokumen</h2>
              <p className="bph-form-step-label">Step 3 dari 3</p>

              <div className="bph-form-body">
                {/* Upload Area */}
                <div className="bph-field">
                  <label className="bph-label">
                    File Draf Dokumen <span className="bph-required">*</span>
                  </label>
                  <div className="bph-upload-area">
                    <input 
                      type="file" 
                      id="file-upload"
                      className="bph-file-input"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileSelect}
                    />
                    {!uploadedFile ? (
                      <label htmlFor="file-upload" className="bph-upload-label">
                        <Upload size={32} className="bph-upload-icon" />
                        <span className="bph-upload-text">Klik untuk memilih file atau drag & drop</span>
                        <span className="bph-upload-hint">Format: PDF, DOC, DOCX • Maks 25MB</span>
                      </label>
                    ) : (
                      <div className="bph-uploaded-file">
                        <div className="bph-file-info">
                          <FileText size={24} className="bph-file-icon" />
                          <div className="bph-file-details">
                            <span className="bph-file-name">{uploadedFile.name}</span>
                            <span className="bph-file-size">{uploadedFile.size} MB</span>
                          </div>
                        </div>
                        <button 
                          className="bph-file-remove"
                          onClick={() => setUploadedFile(null)}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Catatan Tambahan */}
                <div className="bph-field">
                  <label className="bph-label">Catatan Tambahan (Opsional)</label>
                  <textarea
                    value={catatanTambahan}
                    onChange={(e) => setCatatanTambahan(e.target.value)}
                    placeholder="Catatan atau instruksi khusus untuk proses harmonisasi..."
                    className="bph-textarea"
                    rows={4}
                  />
                </div>

                {/* Summary Box */}
                <div className="bph-summary-box">
                  <h4 className="bph-summary-title">Ringkasan Pengajuan</h4>
                  <div className="bph-summary-grid">
                    <div className="bph-summary-item">
                      <span className="bph-summary-label">Jenis</span>
                      <span className="bph-summary-value">{formData.jenisProduk || '—'}</span>
                    </div>
                    <div className="bph-summary-item">
                      <span className="bph-summary-label">Unit Pengusul</span>
                      <span className="bph-summary-value">{formData.unitPengusul}</span>
                    </div>
                    <div className="bph-summary-item">
                      <span className="bph-summary-label">Kerahasiaan</span>
                      <span className="bph-summary-value">{formData.kerahasiaan}</span>
                    </div>
                    <div className="bph-summary-item">
                      <span className="bph-summary-label">Prioritas</span>
                      <span className="bph-summary-value">{formData.prioritas}</span>
                    </div>
                  </div>
                  {formData.judul && (
                    <div className="bph-summary-item full">
                      <span className="bph-summary-label">Judul</span>
                      <span className="bph-summary-value">{formData.judul}</span>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Footer Buttons */}
          <div className="bph-form-footer">
            {currentStep > 1 && (
              <button className="bph-btn-batal" onClick={goPrev}>
                <ArrowLeft size={16} />
                Sebelumnya
              </button>
            )}
            {currentStep === 1 && <button className="bph-btn-batal">Batal</button>}
            
            <div className="bph-footer-right">
              {currentStep === 3 && (
                <button className="bph-btn-draft" onClick={() => addToast('Draf berhasil disimpan.', 'info')}>Simpan Draf</button>
              )}
              {currentStep < 3 ? (
                <button className="bph-btn-next" onClick={goNext}>
                  Selanjutnya
                  <ArrowRight size={16} />
                </button>
              ) : (
                <button className="bph-btn-next bph-btn-submit" onClick={() => addToast('Dokumen berhasil diajukan ke proses harmonisasi.', 'success')}>
                  <Check size={16} />
                  Ajukan ke Harmonisasi
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuatProdukHukum;
