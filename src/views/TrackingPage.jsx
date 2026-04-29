import React, { useState } from 'react';
import { Search, Upload, ScanLine, HelpCircle, ShieldCheck, Mail, ArrowRight } from 'lucide-react';

const TrackingPage = ({ setActiveTab, onLogout }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResult, setShowResult] = useState(true);

  const handleSearch = (e) => {
    e.preventDefault();
    setShowResult(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Public Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-600/20">
              <Mail size={20} />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-slate-800 leading-tight">UNIA E-Surat</span>
              <span className="text-xs font-semibold text-emerald-600 tracking-wider">PORTAL PUBLIK</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm font-bold text-emerald-600 border-b-2 border-emerald-600 py-7" onClick={(e) => e.preventDefault()}>Tracking Surat</a>
            <a href="#" className="text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors" onClick={(e) => e.preventDefault()}>Verifikasi Dokumen</a>
            <a href="#" className="text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors" onClick={(e) => e.preventDefault()}>Bantuan</a>
          </nav>
          <button 
            className="px-5 py-2.5 rounded-xl font-bold text-sm text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:text-emerald-700 hover:border-emerald-200 transition-all shadow-sm"
            onClick={() => onLogout && onLogout()}
          >
            Staff Login
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-emerald-800 text-white pt-20 pb-32 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-700/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-900/50 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>
        
        <div className="max-w-3xl mx-auto px-4 relative z-10 text-center flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Lacak Status Surat Anda</h1>
          <p className="text-emerald-100 text-lg mb-10 max-w-2xl leading-relaxed">
            Masukkan nomor resi atau nomor registrasi surat untuk memantau proses administrasi dokumen Anda secara real-time.
          </p>
          <form className="w-full max-w-2xl flex flex-col sm:flex-row gap-3 relative" onSubmit={handleSearch}>
            <div className="relative flex-1">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Contoh: UNIA/2023/10/REG-00123"
                className="w-full pl-12 pr-4 py-4 bg-white border-2 border-transparent text-slate-800 text-base font-medium rounded-2xl focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/20 transition-all shadow-lg"
              />
            </div>
            <button type="submit" className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-base rounded-2xl shadow-lg shadow-emerald-900/20 hover:shadow-emerald-900/40 transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5 whitespace-nowrap">
              Lacak Surat
              <ArrowRight size={18} />
            </button>
          </form>
        </div>
      </section>

      {/* Result Section */}
      {showResult && (
        <section className="-mt-16 px-4 pb-20 relative z-20">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
              {/* Detail Header */}
              <div className="p-6 md:p-8 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-1">DETAIL DOKUMEN</span>
                  <h2 className="text-xl md:text-2xl font-bold text-slate-800 font-mono tracking-tight">UNIA/2023/10/REG-00123</h2>
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-100 text-orange-700 border border-orange-200 font-bold text-sm shadow-sm w-max">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>
                  </span>
                  Sedang Diproses
                </div>
              </div>

              {/* Two Column Content */}
              <div className="grid grid-cols-1 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
                {/* Left — Riwayat Proses */}
                <div className="p-6 md:p-8 lg:col-span-3">
                  <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-8">RIWAYAT PROSES</h3>
                  <div className="flex flex-col gap-8 relative">
                    <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-slate-200"></div>
                    
                    <div className="flex items-start gap-6 relative z-10">
                      <div className="w-6 h-6 rounded-full bg-orange-500 ring-4 ring-white flex-shrink-0 flex items-center justify-center shadow-sm mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-base font-bold text-slate-800 mb-1">Disposisi</span>
                        <p className="text-sm text-slate-500 leading-relaxed mb-2">Dokumen diteruskan ke Wakil Rektor I bidang Akademik.</p>
                        <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-1 rounded-md w-max border border-orange-100">24 Okt 2023, 14:30 WIB</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-6 relative z-10">
                      <div className="w-6 h-6 rounded-full bg-emerald-500 ring-4 ring-white flex-shrink-0 flex items-center justify-center shadow-sm mt-0.5">
                        <CheckCircle size={14} className="text-white" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-base font-bold text-slate-800 mb-1">Verifikasi</span>
                        <p className="text-sm text-slate-500 leading-relaxed mb-2">Dokumen telah diverifikasi oleh staf TU Fakultas.</p>
                        <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md w-max border border-emerald-100">23 Okt 2023, 09:15 WIB</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-6 relative z-10">
                      <div className="w-6 h-6 rounded-full bg-emerald-500 ring-4 ring-white flex-shrink-0 flex items-center justify-center shadow-sm mt-0.5">
                        <CheckCircle size={14} className="text-white" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-base font-bold text-slate-800 mb-1">Registrasi</span>
                        <p className="text-sm text-slate-500 leading-relaxed mb-2">Surat masuk didaftarkan ke sistem.</p>
                        <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md w-max border border-emerald-100">22 Okt 2023, 10:00 WIB</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right — Informasi Surat */}
                <div className="p-6 md:p-8 lg:col-span-2 bg-slate-50/50">
                  <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-6">INFORMASI SURAT</h3>
                  <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1.5">
                      <span className="text-xs font-semibold text-slate-500">Pengirim</span>
                      <span className="text-sm font-bold text-slate-800">Fakultas Teknik</span>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <span className="text-xs font-semibold text-slate-500">Perihal</span>
                      <span className="text-sm font-bold text-slate-800 leading-snug">Permohonan Izin Kegiatan Mahasiswa Nasional</span>
                    </div>
                    <div className="my-2 border-t border-slate-200 border-dashed"></div>
                    <div className="flex flex-col gap-1.5">
                      <span className="text-xs font-semibold text-slate-500">Estimasi Selesai</span>
                      <span className="text-lg font-bold text-emerald-700">26 Okt 2023</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Bottom Info Cards */}
      <section className="px-4 pb-20 flex-1">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card — Dimana Nomor Resi? */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col h-full hover:shadow-md transition-shadow">
            <h3 className="flex items-center gap-3 text-lg font-bold text-slate-800 mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <HelpCircle size={20} />
              </div>
              Dimana Nomor Resi?
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed mb-6">
              Nomor resi atau registrasi dapat ditemukan di pojok kanan atas pada tanda terima fisik yang diberikan oleh loket Tata Usaha, atau pada email notifikasi.
            </p>
            <div className="mt-auto bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
              <div className="bg-white px-4 py-2 border-2 border-dashed border-slate-300 rounded-lg text-slate-700 font-mono font-bold text-sm mb-3">
                UNIA/2023/10/REG-00123
              </div>
              <p className="text-xs font-medium text-slate-400">Ilustrasi Tanda Terima Dokumen</p>
            </div>
          </div>

          {/* Card — Verifikasi Keaslian */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col h-full hover:shadow-md transition-shadow">
            <h3 className="flex items-center gap-3 text-lg font-bold text-slate-800 mb-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <ShieldCheck size={20} />
              </div>
              Verifikasi Dokumen
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed mb-6">
              Pastikan dokumen digital yang Anda terima adalah resmi dari UNIA. Unggah file PDF atau pindai QR Code Tanda Tangan Elektronik.
            </p>
            <div className="mt-auto flex flex-col gap-3">
              <button className="w-full flex flex-col items-center justify-center gap-2 border-2 border-dashed border-slate-200 hover:border-emerald-400 bg-slate-50 hover:bg-emerald-50 rounded-2xl p-6 transition-all group">
                <Upload size={24} className="text-slate-400 group-hover:text-emerald-500 transition-colors" />
                <span className="text-sm font-bold text-slate-600 group-hover:text-emerald-700 transition-colors">Klik untuk Unggah PDF</span>
                <span className="text-xs font-medium text-slate-400">Maks 5MB</span>
              </button>
              <button className="w-full py-3 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-sm">
                <ScanLine size={16} />
                Pindai QR Code
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">© 2024 UNIA. <strong className="text-slate-700">Official Document Management System.</strong></p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <a href="#" className="text-sm font-semibold text-slate-500 hover:text-emerald-600 transition-colors" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
            <a href="#" className="text-sm font-semibold text-slate-500 hover:text-emerald-600 transition-colors" onClick={(e) => e.preventDefault()}>Terms of Service</a>
            <a href="#" className="text-sm font-semibold text-slate-500 hover:text-emerald-600 transition-colors" onClick={(e) => e.preventDefault()}>University Portal</a>
            <a href="#" className="text-sm font-semibold text-slate-500 hover:text-emerald-600 transition-colors" onClick={(e) => e.preventDefault()}>Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

// CheckCircle icon component since it wasn't imported from lucide-react in the original code, though we used it.
const CheckCircle = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

export default TrackingPage;
