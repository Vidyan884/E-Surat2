import React, { useState } from 'react';
import { ChevronDown, ArrowRight, ArrowLeft, Plus, X, Upload, FileText, Check } from 'lucide-react';
import { useToast } from '../components/Toast';

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
    <div className="p-4 md:p-6 lg:p-8 w-full max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-60 pointer-events-none"></div>
        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">Buat Produk Hukum Baru</h1>
          <p className="text-slate-500 mt-1.5 text-sm md:text-base max-w-lg">Lengkapi informasi dasar untuk memulai proses draf produk hukum.</p>
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
          {/* ═══ STEP 1: Metadata ═══ */}
          {currentStep === 1 && (
            <>
              <h2 className="text-xl font-bold text-slate-800">Formulir Metadata</h2>
              <p className="text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full w-max mb-8 mt-2">Step 1 dari 3</p>

              <div className="flex-1 flex flex-col gap-6">
                {/* Jenis Produk Hukum */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Jenis Produk Hukum <span className="text-red-500">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <select 
                      value={formData.jenisProduk}
                      onChange={(e) => handleChange('jenisProduk', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 appearance-none transition-all cursor-pointer"
                    >
                      <option value="" disabled hidden>Pilih jenis produk hukum...</option>
                      <option value="peraturan-rektor">Peraturan Rektor</option>
                      <option value="keputusan-rektor">Keputusan Rektor</option>
                      <option value="surat-edaran">Surat Edaran</option>
                      <option value="instruksi">Instruksi</option>
                    </select>
                    <ChevronDown size={18} className="absolute right-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                {/* Judul / Perihal */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Judul / Perihal Dokumen <span className="text-red-500">*</span>
                  </label>
                  <textarea 
                    value={formData.judul}
                    onChange={(e) => handleChange('judul', e.target.value)}
                    placeholder="Masukkan judul atau perihal lengkap dokumen..."
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 transition-all min-h-[100px] resize-y"
                    rows={3}
                  />
                </div>

                {/* Unit Pengusul */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700">Unit Pengusul</label>
                  <div className="relative flex items-center">
                    <select 
                      value={formData.unitPengusul}
                      onChange={(e) => handleChange('unitPengusul', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 appearance-none transition-all cursor-pointer"
                    >
                      <option>Biro Umum dan Keuangan</option>
                      <option>Biro Hukum</option>
                      <option>Biro Akademik</option>
                      <option>Biro Kemahasiswaan</option>
                    </select>
                    <ChevronDown size={18} className="absolute right-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                {/* Two Column: Kerahasiaan & Prioritas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Tingkat Kerahasiaan */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-700">Tingkat Kerahasiaan</label>
                    <div className="flex flex-col gap-2.5">
                      {['biasa', 'rahasia', 'sangat-rahasia'].map((val) => {
                        const isSelected = formData.kerahasiaan === val;
                        const isDanger = val === 'sangat-rahasia';
                        return (
                          <label key={val} className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${isSelected ? (isDanger ? 'border-red-500 bg-red-50' : 'border-emerald-500 bg-emerald-50') : 'border-slate-200 bg-slate-50 hover:bg-slate-100'}`}>
                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${isSelected ? (isDanger ? 'border-red-500' : 'border-emerald-600') : 'border-slate-300'}`}>
                              {isSelected && <div className={`w-2 h-2 rounded-full ${isDanger ? 'bg-red-500' : 'bg-emerald-600'}`}></div>}
                            </div>
                            <input 
                              type="radio" name="kerahasiaan" value={val}
                              checked={isSelected}
                              onChange={(e) => handleChange('kerahasiaan', e.target.value)}
                              className="hidden"
                            />
                            <span className={`text-sm font-semibold capitalize ${isSelected ? (isDanger ? 'text-red-700' : 'text-emerald-800') : 'text-slate-600'}`}>
                              {val.replace('-', ' ')}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Prioritas Penanganan */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-700">Prioritas Penanganan</label>
                    <div className="flex flex-col gap-2.5">
                      {['biasa', 'segera', 'kilat'].map((val) => {
                        const isSelected = formData.prioritas === val;
                        return (
                          <label key={val} className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${isSelected ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 bg-slate-50 hover:bg-slate-100'}`}>
                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-emerald-600' : 'border-slate-300'}`}>
                              {isSelected && <div className="w-2 h-2 rounded-full bg-emerald-600"></div>}
                            </div>
                            <input 
                              type="radio" name="prioritas" value={val}
                              checked={isSelected}
                              onChange={(e) => handleChange('prioritas', e.target.value)}
                              className="hidden"
                            />
                            <span className={`text-sm font-semibold capitalize ${isSelected ? 'text-emerald-800' : 'text-slate-600'}`}>
                              {val}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ═══ STEP 2: Konsideran ═══ */}
          {currentStep === 2 && (
            <>
              <h2 className="text-xl font-bold text-slate-800">Konsideran Dokumen</h2>
              <p className="text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full w-max mb-8 mt-2">Step 2 dari 3</p>

              <div className="flex-1 flex flex-col gap-8">
                {/* Menimbang */}
                <div className="flex flex-col gap-3">
                  <div>
                    <label className="text-sm font-semibold text-slate-700 block mb-1">
                      Menimbang <span className="text-red-500">*</span>
                    </label>
                    <p className="text-xs text-slate-500 font-medium">Alasan dan pertimbangan yang mendasari pembuatan dokumen.</p>
                  </div>
                  <div className="flex flex-col gap-3">
                    {konsideran.menimbang.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200 group">
                        <span className="text-sm font-bold text-slate-400 mt-2 min-w-[20px] text-right">{String.fromCharCode(97 + idx)}.</span>
                        <textarea
                          value={item}
                          onChange={(e) => updateKonsideranItem('menimbang', idx, e.target.value)}
                          placeholder={`Butir pertimbangan ${idx + 1}...`}
                          className="w-full bg-transparent border-none outline-none text-slate-800 text-sm resize-y min-h-[40px] focus:ring-0 placeholder:text-slate-400 pt-2"
                          rows={2}
                        />
                        {konsideran.menimbang.length > 1 && (
                          <button 
                            className="text-slate-400 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                            onClick={() => removeKonsideranItem('menimbang', idx)}
                            title="Hapus butir"
                          >
                            <X size={16} />
                          </button>
                        )}
                      </div>
                    ))}
                    <button 
                      className="w-full py-3 rounded-xl border-2 border-dashed border-slate-300 text-sm font-semibold text-slate-500 hover:border-emerald-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all flex items-center justify-center gap-2"
                      onClick={() => addKonsideranItem('menimbang')}
                    >
                      <Plus size={16} />
                      Tambah Butir Pertimbangan
                    </button>
                  </div>
                </div>

                {/* Mengingat */}
                <div className="flex flex-col gap-3">
                  <div>
                    <label className="text-sm font-semibold text-slate-700 block mb-1">
                      Mengingat <span className="text-red-500">*</span>
                    </label>
                    <p className="text-xs text-slate-500 font-medium">Dasar hukum yang menjadi landasan dokumen.</p>
                  </div>
                  <div className="flex flex-col gap-3">
                    {konsideran.mengingat.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200 group">
                        <span className="text-sm font-bold text-slate-400 mt-2 min-w-[20px] text-right">{idx + 1}.</span>
                        <textarea
                          value={item}
                          onChange={(e) => updateKonsideranItem('mengingat', idx, e.target.value)}
                          placeholder={`Dasar hukum ${idx + 1}...`}
                          className="w-full bg-transparent border-none outline-none text-slate-800 text-sm resize-y min-h-[40px] focus:ring-0 placeholder:text-slate-400 pt-2"
                          rows={2}
                        />
                        {konsideran.mengingat.length > 1 && (
                          <button 
                            className="text-slate-400 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                            onClick={() => removeKonsideranItem('mengingat', idx)}
                            title="Hapus butir"
                          >
                            <X size={16} />
                          </button>
                        )}
                      </div>
                    ))}
                    <button 
                      className="w-full py-3 rounded-xl border-2 border-dashed border-slate-300 text-sm font-semibold text-slate-500 hover:border-emerald-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all flex items-center justify-center gap-2"
                      onClick={() => addKonsideranItem('mengingat')}
                    >
                      <Plus size={16} />
                      Tambah Dasar Hukum
                    </button>
                  </div>
                </div>

                {/* Memutuskan */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700">Memutuskan / Menetapkan</label>
                  <textarea
                    value={konsideran.memutuskan}
                    onChange={(e) => setKonsideran(prev => ({ ...prev, memutuskan: e.target.value }))}
                    placeholder="Rumusan diktum keputusan atau penetapan..."
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 transition-all min-h-[120px] resize-y"
                    rows={4}
                  />
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
                    File Draf Dokumen <span className="text-red-500">*</span>
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
                        <span className="text-sm font-bold text-slate-700 mb-1">Klik untuk memilih file atau drag & drop</span>
                        <span className="text-xs font-medium text-slate-500">Format: PDF, DOC, DOCX • Maks 25MB</span>
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
                  <label className="text-sm font-semibold text-slate-700">Catatan Tambahan (Opsional)</label>
                  <textarea
                    value={catatanTambahan}
                    onChange={(e) => setCatatanTambahan(e.target.value)}
                    placeholder="Catatan atau instruksi khusus untuk proses harmonisasi..."
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 transition-all min-h-[100px] resize-y"
                    rows={4}
                  />
                </div>

                {/* Summary Box */}
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 mt-4">
                  <h4 className="text-sm font-bold text-slate-800 mb-4">Ringkasan Pengajuan</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                    <div className="flex flex-col">
                      <span className="text-xs font-medium text-slate-500 mb-1">Jenis Produk</span>
                      <span className="text-sm font-semibold text-slate-800 capitalize">{formData.jenisProduk ? formData.jenisProduk.replace('-', ' ') : '—'}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-medium text-slate-500 mb-1">Unit Pengusul</span>
                      <span className="text-sm font-semibold text-slate-800">{formData.unitPengusul}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-medium text-slate-500 mb-1">Kerahasiaan</span>
                      <span className="text-sm font-semibold text-slate-800 capitalize">{formData.kerahasiaan}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-medium text-slate-500 mb-1">Prioritas</span>
                      <span className="text-sm font-semibold text-slate-800 capitalize">{formData.prioritas}</span>
                    </div>
                    {formData.judul && (
                      <div className="flex flex-col sm:col-span-2 mt-2 pt-4 border-t border-slate-200">
                        <span className="text-xs font-medium text-slate-500 mb-1">Judul Dokumen</span>
                        <span className="text-sm font-bold text-slate-800">{formData.judul}</span>
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
                <button className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-semibold text-sm text-slate-600 hover:bg-slate-100 transition-colors">
                  Batal
                </button>
              )}
            </div>
            
            <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-3">
              {currentStep === 3 && (
                <button 
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-semibold text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-colors"
                  onClick={() => addToast('Draf berhasil disimpan.', 'info')}
                >
                  Simpan Draf
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
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                  onClick={() => addToast('Dokumen berhasil diajukan ke proses harmonisasi.', 'success')}
                >
                  <Check size={16} strokeWidth={3} />
                  Ajukan Dokumen
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
