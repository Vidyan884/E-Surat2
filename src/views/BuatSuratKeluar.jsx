import React, { useState } from 'react';
import { ChevronDown, ArrowRight, ArrowLeft, Plus, X, Upload, FileText, Check, Calendar, Edit3 } from 'lucide-react';
import { useToast } from '../components/Toast';
import { useAuth } from '../contexts/AuthContext';

// Templates will be fetched dynamically

const BuatSuratKeluar = ({ setActiveTab }) => {
  const { addToast } = useToast();
  const { token } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    kategori: '',
    tujuan: '',
    perihal: '',
    sifat: 'biasa',
    isiRingkas: '',
  });
  
  const [dbTemplates, setDbTemplates] = useState([]);
  
  // Fetch templates on mount
  React.useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await fetch('/api/templates', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          setDbTemplates(await response.json());
        }
      } catch (err) {
        console.error('Failed to load templates:', err);
      }
    };
    fetchTemplates();
  }, [token]);

  const [uploadedFile, setUploadedFile] = useState(null);
  const [catatanTambahan, setCatatanTambahan] = useState('');
  const [showTemplateModal, setShowTemplateModal] = useState(false);

  const handleSubmit = async (status) => {
    if (!formData.kategori || !formData.tujuan || !formData.perihal) {
      addToast('Harap lengkapi field kategori, tujuan, dan perihal terlebih dahulu.', 'error');
      return;
    }
    
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/surat-keluar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          status,
          attachment: uploadedFile ? uploadedFile.name : null
        })
      });

      if (response.ok) {
        addToast(status === 'Draft' ? 'Draf berhasil disimpan.' : 'Surat keluar berhasil diajukan untuk verifikasi.', 'success');
        setTimeout(() => setActiveTab('surat-keluar'), 1500);
      } else {
        throw new Error('Failed to submit surat keluar');
      }
    } catch (err) {
      console.error(err);
      addToast('Terjadi kesalahan saat menyimpan surat.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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

  const selectTemplate = (template) => {
    handleChange('isiRingkas', template.content);
    if (!formData.kategori) {
      handleChange('kategori', template.kategori);
    }
    setShowTemplateModal(false);
    addToast('Template berhasil dimuat.', 'success');
  };

  const steps = [
    { number: 1, title: 'Tujuan & Perihal', desc: 'Penerima dan subjek surat' },
    { number: 2, title: 'Isi Ringkas', desc: 'Konten dan sifat surat' },
    { number: 3, title: 'Draf Dokumen', desc: 'Upload file draf / cetakan' },
  ];

  const goNext = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const goPrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 w-full max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-60 pointer-events-none"></div>
        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">Buat Surat Keluar Baru</h1>
          <p className="text-slate-500 mt-1.5 text-sm md:text-base max-w-lg">Inisiasi pembuatan draf surat keluar untuk proses penomoran dan pengiriman.</p>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Left — Progress Stepper */}
        <div className="w-full lg:w-72 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm shrink-0 lg:sticky top-24">
          <h3 className="text-[11px] font-bold text-slate-400 tracking-widest mb-6">PROGRESS PEMBUATAN</h3>
          <div className="flex flex-col gap-6 relative">
            {/* Vertical Line */}
            <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-slate-100 -z-10"></div>
            
            {steps.map((step) => {
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;
              
              let circleClass = "border-slate-200 bg-slate-50 text-slate-400 group-hover:border-emerald-300";
              if (isActive) circleClass = "border-emerald-600 bg-emerald-600 text-white shadow-md shadow-emerald-600/30";
              else if (isCompleted) circleClass = "border-emerald-600 bg-emerald-50 text-emerald-600";

              return (
                <div 
                  key={step.number} 
                  className="flex items-start gap-4 relative z-10 cursor-pointer group"
                  onClick={() => setCurrentStep(step.number)}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-sm transition-all border-2 ${circleClass}`}>
                    {isCompleted ? <Check size={14} strokeWidth={3} /> : <span>{step.number}</span>}
                  </div>
                  <div className="flex flex-col mt-1">
                    <span className={`text-sm font-bold transition-colors ${isActive || isCompleted ? 'text-slate-800' : 'text-slate-500 group-hover:text-emerald-700'}`}>
                      {step.title}
                    </span>
                    {step.desc && (
                      <span className="text-xs font-medium text-slate-400 mt-0.5">{step.desc}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right — Form */}
        <div className="flex-1 w-full bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm min-h-[500px] flex flex-col">
          {/* ═══ STEP 1: Tujuan & Perihal ═══ */}
          {currentStep === 1 && (
            <>
              <h2 className="text-xl font-bold text-slate-800">Tujuan & Perihal Dokumen</h2>
              <p className="text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full w-max mb-8 mt-2">Step 1 dari 3</p>

              <div className="flex-1 flex flex-col gap-6">
                {/* Kategori Surat */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Kategori Surat <span className="text-red-500">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <select 
                      value={formData.kategori}
                      onChange={(e) => handleChange('kategori', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 appearance-none transition-all cursor-pointer"
                    >
                      <option value="" disabled hidden>Pilih kategori surat...</option>
                      <option value="undangan">Surat Undangan</option>
                      <option value="permohonan">Surat Permohonan</option>
                      <option value="tugas">Surat Tugas</option>
                      <option value="pengantar">Surat Pengantar</option>
                      <option value="keterangan">Surat Keterangan</option>
                      <option value="lainnya">Lainnya</option>
                    </select>
                    <ChevronDown size={18} className="absolute right-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                {/* Tujuan Surat */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Penerima / Tujuan Surat <span className="text-red-500">*</span>
                  </label>
                  <textarea 
                    value={formData.tujuan}
                    onChange={(e) => handleChange('tujuan', e.target.value)}
                    placeholder="Contoh: Yth. Rektor Universitas Indonesia, Jl. Salemba Raya..."
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 transition-all min-h-[80px] resize-y"
                    rows={2}
                  />
                </div>

                {/* Perihal */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Perihal / Hal <span className="text-red-500">*</span>
                  </label>
                  <textarea 
                    value={formData.perihal}
                    onChange={(e) => handleChange('perihal', e.target.value)}
                    placeholder="Masukkan perihal atau subjek surat keluar..."
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 transition-all min-h-[100px] resize-y"
                    rows={3}
                  />
                </div>
              </div>
            </>
          )}

          {/* ═══ STEP 2: Isi Ringkas ═══ */}
          {currentStep === 2 && (
            <>
              <h2 className="text-xl font-bold text-slate-800">Isi Ringkas & Klasifikasi</h2>
              <p className="text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full w-max mb-8 mt-2">Step 2 dari 3</p>

              <div className="flex-1 flex flex-col gap-8">
                {/* Sifat Surat */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700">Sifat Surat</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {['biasa', 'penting', 'segera'].map((val) => {
                      const isSelected = formData.sifat === val;
                      const isDanger = val === 'segera';
                      const isWarning = val === 'penting';
                      
                      let selectedClass = 'border-emerald-500 bg-emerald-50';
                      let dotClass = 'border-emerald-600 bg-emerald-600';
                      let textClass = 'text-emerald-800';
                      
                      if (isDanger) {
                        selectedClass = 'border-red-500 bg-red-50';
                        dotClass = 'border-red-500 bg-red-500';
                        textClass = 'text-red-700';
                      } else if (isWarning) {
                        selectedClass = 'border-orange-500 bg-orange-50';
                        dotClass = 'border-orange-500 bg-orange-500';
                        textClass = 'text-orange-700';
                      }

                      return (
                        <label key={val} className={`flex items-center gap-3 p-4 rounded-xl border transition-all cursor-pointer ${isSelected ? selectedClass : 'border-slate-200 bg-slate-50 hover:bg-slate-100'}`}>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${isSelected ? dotClass.split(' ')[0] : 'border-slate-300'}`}>
                            {isSelected && <div className={`w-2.5 h-2.5 rounded-full ${dotClass.split(' ')[1]}`}></div>}
                          </div>
                          <input 
                            type="radio" name="sifat" value={val}
                            checked={isSelected}
                            onChange={(e) => handleChange('sifat', e.target.value)}
                            className="hidden"
                          />
                          <div className="flex flex-col">
                            <span className={`text-sm font-bold capitalize ${isSelected ? textClass : 'text-slate-700'}`}>
                              {val}
                            </span>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Isi Ringkas */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-slate-700">Isi Ringkas Surat</label>
                    <button 
                      className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1.5 rounded-lg hover:bg-emerald-100 transition-colors flex items-center gap-1.5 border border-emerald-200 shadow-sm"
                      onClick={() => setShowTemplateModal(true)}
                    >
                      <FileText size={14} /> Gunakan Template
                    </button>
                  </div>
                  <textarea 
                    value={formData.isiRingkas}
                    onChange={(e) => handleChange('isiRingkas', e.target.value)}
                    placeholder="Ketikkan isi draf surat secara singkat di sini atau pilih template..."
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 transition-all min-h-[200px] resize-y"
                    rows={8}
                  />
                  <p className="text-xs text-slate-400 mt-1 font-medium">Jika menggunakan file draf terpisah, Anda dapat mengosongkan bagian ini.</p>
                </div>
              </div>
            </>
          )}

          {/* ═══ STEP 3: Unggah Draf ═══ */}
          {currentStep === 3 && (
            <>
              <h2 className="text-xl font-bold text-slate-800">Unggah Draf Dokumen</h2>
              <p className="text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full w-max mb-8 mt-2">Step 3 dari 3</p>

              <div className="flex-1 flex flex-col gap-6">
                {/* Upload Area */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700">
                    File Draf Dokumen (Opsional jika sudah mengisi isi ringkas)
                  </label>
                  <div>
                    <input 
                      type="file" 
                      id="file-upload"
                      className="hidden"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileSelect}
                    />
                    {!uploadedFile ? (
                      <label 
                        htmlFor="file-upload" 
                        className="border-2 border-dashed border-slate-300 rounded-2xl bg-slate-50/50 hover:bg-slate-50 hover:border-emerald-400 transition-colors p-8 flex flex-col items-center justify-center text-center cursor-pointer group"
                      >
                        <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <Upload size={28} className="text-emerald-600" />
                        </div>
                        <span className="text-sm font-bold text-slate-700 mb-1">Klik untuk memilih file draf atau lampiran</span>
                        <span className="text-xs font-medium text-slate-500">Format: DOC, DOCX, PDF • Maks 15MB</span>
                      </label>
                    ) : (
                      <div className="flex items-center justify-between w-full bg-white p-4 rounded-xl border border-emerald-200 shadow-[0_4px_12px_rgba(16,185,129,0.08)]">
                        <div className="flex items-center gap-4 overflow-hidden">
                          <div className="w-12 h-12 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                            <FileText size={24} className="text-emerald-600" />
                          </div>
                          <div className="flex flex-col overflow-hidden">
                            <span className="text-sm font-bold text-slate-800 truncate pr-4">{uploadedFile.name}</span>
                            <span className="text-xs font-medium text-slate-500">{uploadedFile.size} MB</span>
                          </div>
                        </div>
                        <button 
                          className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors shrink-0"
                          onClick={() => setUploadedFile(null)}
                          title="Hapus file"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Catatan Tambahan */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700">Catatan Revisi / Evaluasi (Opsional)</label>
                  <textarea
                    value={catatanTambahan}
                    onChange={(e) => setCatatanTambahan(e.target.value)}
                    placeholder="Pesan untuk pimpinan atau verifikator dokumen..."
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 transition-all min-h-[100px] resize-y"
                    rows={4}
                  />
                </div>

                {/* Summary Box */}
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 mt-4">
                  <h4 className="text-sm font-bold text-slate-800 mb-4">Ringkasan Draf</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                    <div className="flex flex-col">
                      <span className="text-xs font-medium text-slate-500 mb-1">Kategori</span>
                      <span className="text-sm font-semibold text-slate-800 capitalize">{formData.kategori || '—'}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-medium text-slate-500 mb-1">Sifat</span>
                      <span className="text-sm font-semibold text-slate-800 capitalize">{formData.sifat}</span>
                    </div>
                    <div className="flex flex-col sm:col-span-2">
                      <span className="text-xs font-medium text-slate-500 mb-1">Tujuan</span>
                      <span className="text-sm font-bold text-slate-800">{formData.tujuan || '—'}</span>
                    </div>
                    {formData.perihal && (
                      <div className="flex flex-col sm:col-span-2 mt-2 pt-4 border-t border-slate-200">
                        <span className="text-xs font-medium text-slate-500 mb-1">Perihal</span>
                        <span className="text-sm font-bold text-slate-800">{formData.perihal}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Footer Buttons */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
            <div className="w-full sm:w-auto">
              {currentStep > 1 && (
                <button 
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-semibold text-sm text-slate-600 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-2"
                  onClick={goPrev}
                >
                  <ArrowLeft size={16} />
                  Sebelumnya
                </button>
              )}
              {currentStep === 1 && (
                <button 
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-semibold text-sm text-slate-600 hover:bg-slate-100 transition-colors"
                  onClick={() => setActiveTab('surat-keluar')}
                >
                  Batal
                </button>
              )}
            </div>
            
            <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-3">
              {currentStep === 3 && (
                <button 
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-semibold text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-colors disabled:opacity-50"
                  onClick={() => handleSubmit('Draft')}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Menyimpan...' : 'Simpan Draf'}
                </button>
              )}
              
              {currentStep < 3 ? (
                <button 
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                  onClick={goNext}
                >
                  Selanjutnya
                  <ArrowRight size={16} />
                </button>
              ) : (
                <button 
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  onClick={() => handleSubmit('Menunggu Verifikasi')}
                  disabled={isSubmitting}
                >
                  <Check size={16} strokeWidth={3} />
                  {isSubmitting ? 'Memproses...' : 'Ajukan Surat'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Template Selection Modal */}
      {showTemplateModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-5 md:p-6 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                  <FileText size={20} className="text-emerald-700" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-lg">Pilih Template Surat</h3>
                  <p className="text-sm text-slate-500">Pilih format draf sesuai kebutuhan</p>
                </div>
              </div>
              <button 
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                onClick={() => setShowTemplateModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5 md:p-6 bg-white space-y-4">
              {dbTemplates.length === 0 ? (
                <div className="text-center p-8 text-slate-500">Belum ada template yang tersedia. Minta Admin untuk menambahkannya.</div>
              ) : dbTemplates.map((template) => (
                <div 
                  key={template.id}
                  className="border border-slate-200 rounded-xl p-4 hover:border-emerald-400 hover:bg-emerald-50/30 transition-all cursor-pointer group"
                  onClick={() => selectTemplate(template)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">{template.judul}</h4>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">{template.kategori}</span>
                  </div>
                  <p className="text-sm text-slate-500 line-clamp-2 whitespace-pre-line bg-slate-50 p-3 rounded-lg font-mono text-xs">
                    {template.konten.substring(0, 150)}...
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuatSuratKeluar;
