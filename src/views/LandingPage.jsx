import React from 'react';
import { ArrowRight, Search, FileText, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';

const LandingPage = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-emerald-500 selection:text-white">
      {/* Header / Navbar */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center border border-slate-100 overflow-hidden p-1">
              <img src="/logo.png" alt="UNIA Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-slate-800 leading-none tracking-tight">UNIA E-Surat</span>
              <span className="text-[10px] uppercase tracking-widest font-bold text-emerald-600">Sistem Persuratan</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => onNavigate('tracking')}
              className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors hidden sm:block"
            >
              Lacak Dokumen
            </button>
            <button 
              onClick={() => onNavigate('login')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/40 hover:-translate-y-0.5 transition-all flex items-center gap-2"
            >
              Login Sistem
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 opacity-80 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-sky-50 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 opacity-60 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Hero Text */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100/50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Sistem Terintegrasi
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.15] tracking-tight mb-6">
                Digitalisasi <span className="text-emerald-600">Tata Naskah</span> Universitas
              </h1>
              <p className="text-lg text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Kelola surat menyurat, lacak proses disposisi, dan akses arsip digital produk hukum Universitas Nasional Indonesia dalam satu platform pintar yang aman dan efisien.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button 
                  onClick={() => onNavigate('login')}
                  className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-2xl text-base font-bold shadow-xl shadow-slate-900/20 hover:shadow-slate-900/30 hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                >
                  Mulai Gunakan Sistem
                </button>
                <button 
                  onClick={() => onNavigate('tracking')}
                  className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-8 py-4 rounded-2xl text-base font-bold shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                >
                  <Search size={20} className="text-emerald-600" />
                  Lacak Surat / Dokumen
                </button>
              </div>

              {/* Stats */}
              <div className="mt-12 grid grid-cols-3 gap-6 border-t border-slate-200 pt-8 max-w-xl mx-auto lg:mx-0">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-slate-900">10k+</span>
                  <span className="text-xs font-medium text-slate-500 mt-1">Dokumen Terekam</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-slate-900">100%</span>
                  <span className="text-xs font-medium text-slate-500 mt-1">Paperless</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-slate-900">24/7</span>
                  <span className="text-xs font-medium text-slate-500 mt-1">Akses Sistem</span>
                </div>
              </div>
            </div>

            {/* Hero Image/Illustration */}
            <div className="flex-1 w-full max-w-[600px] lg:max-w-none relative">
              {/* Decorative elements behind image */}
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100 to-sky-50 rounded-3xl transform rotate-3 scale-105 opacity-50"></div>
              
              <div className="relative bg-white rounded-3xl border border-slate-200 shadow-2xl p-2 md:p-4 overflow-hidden transform transition-transform hover:-translate-y-2 duration-500">
                {/* Mockup Top Bar */}
                <div className="flex items-center gap-1.5 px-4 py-3 border-b border-slate-100 mb-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-orange-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                {/* Mockup Content */}
                <div className="bg-slate-50 rounded-xl border border-slate-100 p-4 md:p-6 flex flex-col gap-4">
                  {/* Mock Card 1 */}
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-start gap-4 animate-fade-in-up">
                    <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                      <FileText size={20} />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                      <div className="h-3 bg-slate-100 rounded w-1/2"></div>
                      <div className="flex gap-2 mt-2">
                        <span className="px-2 py-1 bg-orange-100 text-orange-600 rounded text-[10px] font-bold">Proses Disposisi</span>
                      </div>
                    </div>
                  </div>
                  {/* Mock Card 2 */}
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-start gap-4 animate-fade-in-up" style={{ animationDelay: '150ms' }}>
                    <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                      <ShieldCheck size={20} />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                      <div className="h-3 bg-slate-100 rounded w-2/3"></div>
                      <div className="flex gap-2 mt-2">
                        <span className="px-2 py-1 bg-emerald-100 text-emerald-600 rounded text-[10px] font-bold">Selesai & Diarsipkan</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -right-6 top-20 bg-white p-3 rounded-xl border border-slate-200 shadow-xl flex items-center gap-3 animate-float">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <CheckCircle2 size={16} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-800">Verifikasi Sukses</span>
                    <span className="text-[10px] text-slate-500">Baru saja</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white border-y border-slate-200 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">Fitur Utama E-Surat</h2>
            <p className="text-slate-600">Dikembangkan khusus untuk memenuhi standar administrasi dan legalitas tata naskah dinas perguruan tinggi.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-100/50 transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                <FileText size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Tata Naskah Digital</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Pengelolaan surat masuk, surat keluar, dan produk hukum (SK, Peraturan) sepenuhnya terdigitalisasi dari draf hingga pengesahan.
              </p>
            </div>
            
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-100/50 transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <Clock size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Disposisi & Tracking</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Alur pergerakan dokumen terpantau secara real-time. Proses disposisi dan persetujuan lebih cepat tanpa terkendala jarak.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-100/50 transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-orange-600 group-hover:text-white transition-all">
                <ShieldCheck size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Arsip Aman Terpusat</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Seluruh dokumen tersimpan rapi dalam arsip digital yang dienkripsi, memudahkan pencarian kembali berdasarkan metadata.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-12 text-slate-400 text-sm border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="UNIA" className="w-8 h-8 opacity-80 grayscale" />
            <span className="font-semibold text-slate-300">Universitas Nasional Indonesia</span>
          </div>
          <p>© 2026 UNIA E-Surat. All rights reserved.</p>
        </div>
      </footer>
      
      {/* Add some simple animations in global CSS or here */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}} />
    </div>
  );
};

export default LandingPage;
