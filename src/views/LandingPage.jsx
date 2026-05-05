import React, { useState, useEffect } from 'react';
import { ArrowRight, Search, FileText, ShieldCheck, Clock, CheckCircle2, ChevronRight, BarChart3, Users, Building } from 'lucide-react';

const LandingPage = ({ onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-emerald-500 selection:text-white">
      {/* Header / Navbar */}
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white shadow-md flex items-center justify-center border border-slate-100 overflow-hidden p-1.5">
              <img src="/logo.png" alt="UNIA Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <span className={`text-xl font-bold leading-none tracking-tight ${scrolled ? 'text-emerald-950' : 'text-white'}`}>UNIA E-Surat</span>
              <span className="text-[10px] uppercase tracking-widest font-bold text-emerald-600">Sistem Persuratan</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button 
              onClick={() => onNavigate('tracking')}
              className={`text-sm font-semibold transition-colors hidden sm:block ${scrolled ? 'text-slate-600 hover:text-emerald-600' : 'text-white hover:text-emerald-700'}`}
            >
              Lacak Dokumen
            </button>
            <button 
              onClick={() => onNavigate('login')}
              className="bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-emerald-900/20 hover:shadow-emerald-900/40 hover:-translate-y-0.5 transition-all flex items-center gap-2 border border-emerald-600"
            >
              Login Sistem
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-emerald-950 text-white">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-600 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 opacity-30 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-500 rounded-full blur-[150px] translate-y-1/3 -translate-x-1/3 opacity-20 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Hero Text */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-emerald-50 text-xs font-bold uppercase tracking-wider mb-8 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_rgba(251,191,36,0.8)]"></span>
                Sistem Terintegrasi v2.0
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.15] tracking-tight mb-6">
                Digitalisasi <span className="text-amber-400">Tata Naskah</span> Universitas
              </h1>
              <p className="text-lg text-emerald-100/80 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
                Kelola surat menyurat, lacak proses disposisi, dan akses arsip digital produk hukum <strong className="font-semibold text-white">Universitas Al-Amien Prenduan</strong> dalam satu platform pintar yang aman dan efisien.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button 
                  onClick={() => onNavigate('login')}
                  className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-slate-900 px-8 py-4 rounded-2xl text-base font-bold shadow-xl shadow-amber-500/20 hover:shadow-amber-500/40 hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                >
                  Mulai Gunakan Sistem
                </button>
                <button 
                  onClick={() => onNavigate('tracking')}
                  className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-2xl text-base font-bold shadow-sm backdrop-blur-md hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                >
                  <Search size={20} className="text-amber-400" />
                  Lacak Surat / Dokumen
                </button>
              </div>

              {/* Stats */}
              <div className="mt-14 grid grid-cols-3 gap-6 border-t border-white/10 pt-8 max-w-xl mx-auto lg:mx-0">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-white">10k+</span>
                  <span className="text-xs font-medium text-emerald-200 mt-1 uppercase tracking-wider">Dokumen</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-white">100%</span>
                  <span className="text-xs font-medium text-emerald-200 mt-1 uppercase tracking-wider">Paperless</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-white">24/7</span>
                  <span className="text-xs font-medium text-emerald-200 mt-1 uppercase tracking-wider">Akses</span>
                </div>
              </div>
            </div>

            {/* Hero Image/Illustration */}
            <div className="flex-1 w-full max-w-[600px] lg:max-w-none relative">
              {/* Decorative elements behind image */}
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-400 to-emerald-400 rounded-[2.5rem] transform rotate-3 scale-105 opacity-30 blur-lg"></div>
              
              <div className="relative bg-white/5 backdrop-blur-2xl rounded-[2rem] border border-white/20 shadow-2xl p-2 md:p-4 overflow-hidden transform transition-transform hover:-translate-y-2 duration-500">
                {/* Mockup Top Bar */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 mb-2">
                  <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-400/80"></div>
                </div>
                {/* Mockup Content */}
                <div className="bg-slate-900/50 rounded-xl border border-white/10 p-4 md:p-6 flex flex-col gap-4">
                  {/* Mock Card 1 */}
                  <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10 flex items-start gap-4 animate-fade-in-up">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                      <FileText size={20} />
                    </div>
                    <div className="flex-1 space-y-2.5">
                      <div className="h-3.5 bg-white/20 rounded w-3/4"></div>
                      <div className="h-2.5 bg-white/10 rounded w-1/2"></div>
                      <div className="flex gap-2 mt-2">
                        <span className="px-2 py-1 bg-amber-500/20 text-amber-300 rounded text-[10px] font-bold border border-amber-500/30">Proses Disposisi</span>
                      </div>
                    </div>
                  </div>
                  {/* Mock Card 2 */}
                  <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10 flex items-start gap-4 animate-fade-in-up" style={{ animationDelay: '150ms' }}>
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                      <ShieldCheck size={20} />
                    </div>
                    <div className="flex-1 space-y-2.5">
                      <div className="h-3.5 bg-white/20 rounded w-5/6"></div>
                      <div className="h-2.5 bg-white/10 rounded w-2/3"></div>
                      <div className="flex gap-2 mt-2">
                        <span className="px-2 py-1 bg-emerald-500/20 text-emerald-300 rounded text-[10px] font-bold border border-emerald-500/30">Selesai & Diarsipkan</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -right-6 top-20 bg-slate-800 p-3 rounded-xl border border-white/10 shadow-xl flex items-center gap-3 animate-float backdrop-blur-xl">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 size={16} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-white">Verifikasi Sukses</span>
                    <span className="text-[10px] text-slate-400">Baru saja</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-950 mb-4 tracking-tight">Fitur Utama E-Surat</h2>
            <p className="text-slate-600 text-lg">Dikembangkan khusus untuk memenuhi standar administrasi dan legalitas tata naskah dinas perguruan tinggi.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-900/5 transition-all group duration-300">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-emerald-700 group-hover:text-white transition-all shadow-sm">
                <FileText size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-700 transition-colors">Tata Naskah Digital</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Pengelolaan surat masuk, surat keluar, dan produk hukum (SK, Peraturan) sepenuhnya terdigitalisasi dari draf hingga pengesahan.
              </p>
            </div>
            
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-900/5 transition-all group duration-300">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white transition-all shadow-sm">
                <Clock size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-700 transition-colors">Disposisi & Tracking</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Alur pergerakan dokumen terpantau secara real-time. Proses disposisi dan persetujuan lebih cepat tanpa terkendala jarak.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-900/5 transition-all group duration-300">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-emerald-700 group-hover:text-white transition-all shadow-sm">
                <ShieldCheck size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-700 transition-colors">Arsip Aman Terpusat</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Seluruh dokumen tersimpan rapi dalam arsip digital yang dienkripsi, memudahkan pencarian kembali berdasarkan metadata.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Integration & Workflow Section */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-emerald-950 mb-4 tracking-tight">Alur Kerja yang Fleksibel</h2>
                <p className="text-slate-600 text-lg leading-relaxed">
                  Sistem persuratan Universitas Al-Amien Prenduan dirancang untuk mengakomodasi berbagai skenario tata naskah dengan proses review yang terstruktur.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-slate-200 flex items-center justify-center shrink-0 text-emerald-700 font-bold">1</div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-1">Pengajuan Dokumen</h4>
                    <p className="text-slate-600 text-sm">Unit kerja dapat mengajukan draft surat keluar atau produk hukum langsung melalui sistem.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-slate-200 flex items-center justify-center shrink-0 text-amber-500 font-bold">2</div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-1">Harmonisasi & Review</h4>
                    <p className="text-slate-600 text-sm">Biro Hukum atau pimpinan melakukan review, memberikan catatan, dan menyetujui draft dokumen.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-slate-200 flex items-center justify-center shrink-0 text-emerald-700 font-bold">3</div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-1">Pengesahan & Distribusi</h4>
                    <p className="text-slate-600 text-sm">Dokumen yang disetujui akan diberi nomor secara otomatis dan didistribusikan ke penerima terkait.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex-1 w-full relative">
              <div className="absolute inset-0 bg-emerald-100 rounded-[3rem] transform -rotate-3 scale-105"></div>
              <div className="relative bg-white rounded-[2.5rem] border border-slate-200 shadow-xl p-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col items-center text-center gap-3">
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center">
                      <Building size={24} />
                    </div>
                    <span className="font-bold text-slate-800">Biro Hukum</span>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col items-center text-center gap-3 mt-8">
                    <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center">
                      <Users size={24} />
                    </div>
                    <span className="font-bold text-slate-800">Unit Kerja</span>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col items-center text-center gap-3 -mt-8">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                      <BarChart3 size={24} />
                    </div>
                    <span className="font-bold text-slate-800">Pimpinan</span>
                  </div>
                  <div className="bg-emerald-950 p-6 rounded-2xl border border-emerald-800 flex flex-col items-center text-center gap-3 text-white">
                    <div className="w-12 h-12 bg-emerald-800/50 text-amber-400 rounded-xl flex items-center justify-center border border-emerald-700">
                      <ShieldCheck size={24} />
                    </div>
                    <span className="font-bold">E-Surat Core</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-emerald-950 pt-16 pb-8 text-emerald-100/60 border-t border-emerald-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 border-b border-emerald-900/50 pb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <img src="/logo.png" alt="UNIA" className="w-10 h-10 brightness-0 invert opacity-90" />
                <span className="text-xl font-bold text-white tracking-tight">Universitas Al-Amien Prenduan</span>
              </div>
              <p className="text-sm leading-relaxed max-w-sm">
                Sistem Informasi Persuratan Terpadu untuk menunjang aktivitas tata naskah yang efektif, efisien, dan ramah lingkungan di lingkungan Universitas.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">Tautan Cepat</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-amber-400 transition-colors">Beranda</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('tracking'); }} className="hover:text-amber-400 transition-colors">Lacak Surat</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('login'); }} className="hover:text-amber-400 transition-colors">Login Admin</a></li>
                <li><a href="https://unia.ac.id" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition-colors">Website UNIA</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">Hubungi Kami</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <Building size={16} className="mt-0.5 shrink-0" />
                  <span>Jl. Raya Prenduan, Sumenep, Jawa Timur</span>
                </li>
                <li className="flex items-center gap-2">
                  <FileText size={16} className="shrink-0" />
                  <span>info@unia.ac.id</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
            <p>© 2026 UNIA E-Surat. All rights reserved.</p>
            <p>Dikembangkan oleh Tim IT Universitas Al-Amien Prenduan</p>
          </div>
        </div>
      </footer>
      
      {/* Global Animations */}
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
