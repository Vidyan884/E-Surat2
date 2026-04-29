import React, { useState } from 'react';
import { ChevronDown, ArrowRight, ArrowLeft, Plus, X, Upload, FileText, Check, Calendar } from 'lucide-react';
import { useToast } from '../components/Toast';

const BuatSuratMasuk = ({ setActiveTab }) => {
  const { addToast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    asalSurat: '',
    noSurat: '',
    tanggalSurat: '',
    perihal: '',
    sifat: 'biasa',
    kategori: '',
  });

  const [uploadedFile, setUploadedFile] = useState(null);
  const [catatanTambahan, setCatatanTambahan] = useState('');

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

  const steps = [
    { number: 1, title: 'Informasi Surat', desc: 'Data pengirim dan perihal' },
    { number: 2, title: 'Klasifikasi', desc: 'Sifat dan kategori surat' },
    { number: 3, title: 'Unggah File', desc: 'Upload dokumen fisik/digital' },
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
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">Registrasi Surat Masuk</h1>
          <p className="text-slate-500 mt-1.5 text-sm md:text-base max-w-lg">Lengkapi informasi untuk mendaftarkan surat yang diterima institusi.</p>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Left — Progress Stepper */}
        <div className="w-full lg:w-72 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm shrink-0 lg:sticky top-24">
          <h3 className="text-[11px] font-bold text-slate-400 tracking-widest mb-6">PROGRESS REGISTRASI</h3>
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
          {/* ═══ STEP 1: Informasi Surat ═══ */}
          {currentStep === 1 && (
            <>
              <h2 className="text-xl font-bold text-slate-800">Informasi Surat</h2>
              <p className="text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full w-max mb-8 mt-2">Step 1 dari 3</p>

              <div className="flex-1 flex flex-col gap-6">
                {/* Asal Surat */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Asal Surat (Instansi/Pengirim) <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text"
                    value={formData.asalSurat}
                    onChange={(e) => handleChange('asalSurat', e.target.value)}
                    placeholder="Contoh: Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi"
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Nomor Surat */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-700">
                      Nomor Surat <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text"
                      value={formData.noSurat}
                      onChange={(e) => handleChange('noSurat', e.target.value)}
                      placeholder="Contoh: 123/KEMENDIKBUD/2023"
                      className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 transition-all"
                    />
                  </div>

                  {/* Tanggal Surat */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-700">
                      Tanggal Surat <span className="text-red-500">*</span>
                    </label>
                    <div className="relative flex items-center">
                      <input 
                        type="date"
                        value={formData.tanggalSurat}
                        onChange={(e) => handleChange('tanggalSurat', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Perihal */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Perihal / Hal <span className="text-red-500">*</span>
                  </label>
                  <textarea 
                    value={formData.perihal}
                    onChange={(e) => handleChange('perihal', e.target.value)}
                    placeholder="Masukkan perihal surat..."
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 transition-all min-h-[100px] resize-y"
                    rows={3}
                  />
                </div>
              </div>
            </>
          )}

          {/* ═══ STEP 2: Klasifikasi ═══ */}
          {currentStep === 2 && (
            <>
              <h2 className="text-xl font-bold text-slate-800">Klasifikasi Dokumen</h2>
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

                {/* Kategori */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Kategori / Klasifikasi
                  </label>
                  <div className="relative flex items-center">
                    <select 
                      value={formData.kategori}
                      onChange={(e) => handleChange('kategori', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 appearance-none transition-all cursor-pointer"
                    >
                      <option value="" disabled hidden>Pilih kategori surat...</option>
                      <option value="undangan">Undangan</option>
                      <option value="pemberitahuan">Pemberitahuan</option>
                      <option value="permohonan">Permohonan</option>
                      <option value="laporan">Laporan</option>
                      <option value="lainnya">Lainnya</option>
                    </select>
                    <ChevronDown size={18} className="absolute right-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ═══ STEP 3: Unggah File ═══ */}
          {currentStep === 3 && (
            <>
              <h2 className="text-xl font-bold text-slate-800">Unggah File Surat</h2>
              <p className="text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full w-max mb-8 mt-2">Step 3 dari 3</p>

              <div className="flex-1 flex flex-col gap-6">
                {/* Upload Area */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Scan Dokumen Surat <span className="text-red-500">*</span>
                  </label>
                  <div>
                    <input 
                      type="file" 
                      id="file-upload"
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png"
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
                        <span className="text-xs font-medium text-slate-500">Format: PDF, JPG, PNG • Maks 10MB</span>
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
                    placeholder="Catatan mengenai kelengkapan berkas, tujuan disposisi awal, dll..."
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 transition-all min-h-[100px] resize-y"
                    rows={4}
                  />
                </div>

                {/* Summary Box */}
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 mt-4">
                  <h4 className="text-sm font-bold text-slate-800 mb-4">Ringkasan Registrasi</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                    <div className="flex flex-col sm:col-span-2">
                      <span className="text-xs font-medium text-slate-500 mb-1">Pengirim / Asal Surat</span>
                      <span className="text-sm font-bold text-slate-800">{formData.asalSurat || '—'}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-medium text-slate-500 mb-1">Nomor Surat</span>
                      <span className="text-sm font-semibold text-slate-800">{formData.noSurat || '—'}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-medium text-slate-500 mb-1">Sifat</span>
                      <span className="text-sm font-semibold text-slate-800 capitalize">{formData.sifat}</span>
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
                  onClick={() => setActiveTab('surat-masuk')}
                >
                  Batal
                </button>
              )}
            </div>
            
            <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-3">
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
                  onClick={() => { addToast('Surat masuk berhasil diregistrasi.', 'success'); setTimeout(() => setActiveTab('surat-masuk'), 1500); }}
                >
                  <Check size={16} strokeWidth={3} />
                  Registrasi Surat
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuatSuratMasuk;
