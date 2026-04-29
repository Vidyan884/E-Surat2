import React, { useState } from 'react';
import { ChevronRight, RefreshCw, MessageSquare, CheckCircle2 } from 'lucide-react';

const HarmonisasiReview = () => {
  const [catatan, setCatatan] = useState('');
  const [pesan, setPesan] = useState('');

  return (
    <div className="p-4 md:p-6 lg:p-8 w-full max-w-[1600px] mx-auto space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500 font-medium bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm w-max">
        <a href="#" className="hover:text-emerald-600 transition-colors" onClick={(e) => e.preventDefault()}>Produk Hukum</a>
        <ChevronRight size={14} className="text-slate-400" />
        <a href="#" className="hover:text-emerald-600 transition-colors" onClick={(e) => e.preventDefault()}>Draft SK Rektor</a>
        <ChevronRight size={14} className="text-slate-400" />
        <span className="text-slate-800 font-bold">Harmonisasi</span>
      </div>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-60 pointer-events-none"></div>
        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight mb-2">Peraturan Rektor tentang Pedoman Akademik 2024</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-600">
            <span className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
              <span className="text-slate-400 font-bold">#</span> PR-2024-08-142
            </span>
            <span className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
              <span className="text-slate-400">👤</span> Diajukan oleh: Fakultas Teknik
            </span>
          </div>
        </div>
        <div className="relative z-10 shrink-0">
          <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-100 text-orange-700 border border-orange-200 font-bold text-sm shadow-sm">
            <RefreshCw size={16} className="animate-spin-slow" />
            Sedang Diharmonisasi
          </div>
        </div>
      </div>

      {/* Three Column Layout */}
      <div className="flex flex-col lg:flex-row gap-6 items-start h-[calc(100vh-200px)] min-h-[600px]">
        {/* Column 1 — Draft Asal */}
        <div className="w-full lg:w-1/3 h-full flex flex-col bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between shrink-0">
            <h3 className="font-bold text-lg text-slate-800">Draft Asal</h3>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-1 rounded-md border border-slate-200">Versi 1.0</span>
          </div>
          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar font-serif text-sm leading-relaxed text-slate-700 space-y-6">
            <div className="space-y-2">
              <h4 className="font-bold text-base text-slate-900 font-sans">Pasal 4</h4>
              <p className="indent-4">(1) Mahasiswa wajib menyelesaikan beban studi sekurang-kurangnya 144 SKS untuk program Sarjana.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-base text-slate-900 font-sans">Pasal 5</h4>
              <p className="indent-4">(1) Cuti akademik dapat diberikan paling lama 2 (dua) semester berturut-turut.</p>
              <p className="indent-4">(2) Selama masa cuti akademik, mahasiswa dibebaskan dari kewajiban membayar Uang Kuliah Tunggal (UKT).</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-base text-slate-900 font-sans">Pasal 6</h4>
              <p className="indent-4">Evaluasi hasil studi dilakukan pada setiap akhir semester dan digunakan sebagai dasar penentuan beban studi pada semester berikutnya.</p>
            </div>
          </div>
        </div>

        {/* Column 2 — Draft Revisi Legal */}
        <div className="w-full lg:w-1/3 h-full flex flex-col bg-white rounded-2xl border-2 border-emerald-200 shadow-md overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          <div className="p-5 border-b border-emerald-100 bg-emerald-50/50 flex items-center justify-between shrink-0 relative z-10">
            <div className="flex items-center gap-3">
              <h3 className="font-bold text-lg text-emerald-900">Draft Revisi Legal</h3>
              <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-emerald-500 px-2 py-0.5 rounded shadow-sm">TERBARU</span>
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-1 rounded-md border border-emerald-200">Versi 1.1</span>
          </div>
          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar font-serif text-sm leading-relaxed text-slate-700 space-y-6 relative z-10">
            <div className="space-y-2">
              <h4 className="font-bold text-base text-slate-900 font-sans">Pasal 4</h4>
              <p className="indent-4">(1) Mahasiswa wajib menyelesaikan beban studi sekurang-kurangnya 144 SKS untuk program Sarjana.</p>
            </div>
            <div className="space-y-2 relative bg-orange-50/50 -mx-4 px-4 py-3 rounded-xl border border-orange-100 group">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-base text-slate-900 font-sans">Pasal 5</h4>
                <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center border border-orange-200 opacity-50 group-hover:opacity-100 transition-opacity">
                  <MessageSquare size={16} />
                </div>
              </div>
              <p className="indent-4">
                (1) Cuti akademik dapat diberikan paling lama 2 (dua) semester{' '}
                <span className="bg-red-100 text-red-700 line-through px-1 rounded mx-0.5 font-medium">berturut-turut</span>{' '}
                <span className="bg-emerald-100 text-emerald-800 font-bold px-1 rounded mx-0.5 border-b-2 border-emerald-500">secara kumulatif selama masa studi</span>.
              </p>
              <p className="indent-4">(2) Selama masa cuti akademik, mahasiswa dibebaskan dari kewajiban membayar Uang Kuliah Tunggal (UKT).</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-base text-slate-900 font-sans">Pasal 6</h4>
              <p className="indent-4">Evaluasi hasil studi dilakukan pada setiap akhir semester dan digunakan sebagai dasar penentuan beban studi pada semester berikutnya.</p>
            </div>
          </div>
        </div>

        {/* Column 3 — Right Panel */}
        <div className="w-full lg:w-1/3 h-full flex flex-col gap-6 overflow-y-auto custom-scrollbar pr-1">
          {/* Card — Catatan Perbaikan Substantif */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-5">
            <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Catatan Perbaikan Substantif</h3>

            <div className="bg-orange-50 rounded-xl border border-orange-200 p-4 relative">
              <div className="absolute -left-2 top-6 w-4 h-4 bg-orange-50 border-t border-l border-orange-200 rotate-[-45deg]"></div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-orange-800 bg-orange-100 px-2 py-0.5 rounded border border-orange-200">Pasal 5 Ayat 1</span>
                <span className="text-[10px] font-bold text-orange-500">10:42 AM</span>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed mb-3 font-medium">
                Penggunaan kata "berturut-turut" membatasi hak mahasiswa. Secara regulasi nasional, cuti dapat diambil secara kumulatif. Mohon disesuaikan.
              </p>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-[10px]">SH</div>
                <span className="text-xs font-semibold text-slate-500">Staf Ahli Hukum</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-2 border-t border-slate-100">
              <textarea 
                value={catatan}
                onChange={(e) => setCatatan(e.target.value)}
                placeholder="Tambah catatan perbaikan..."
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 transition-all resize-none"
                rows={2}
              />
              <div className="flex justify-end">
                <button className="bg-slate-800 hover:bg-slate-900 text-white px-5 py-2 rounded-xl text-sm font-bold transition-all shadow-sm">Tambah</button>
              </div>
            </div>
          </div>

          {/* Card — Keputusan Harmonisasi */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-5 mt-auto">
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-1">Keputusan Harmonisasi</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Tentukan hasil akhir dari proses harmonisasi untuk dokumen ini. Tindakan ini akan mengubah status dokumen di sistem.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Pesan / Ringkasan Evaluasi (Opsional)</label>
              <textarea 
                value={pesan}
                onChange={(e) => setPesan(e.target.value)}
                placeholder="Masukkan ringkasan hasil harmonisasi..."
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 transition-all resize-none"
                rows={3}
              />
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-[0_4px_12px_rgba(16,185,129,0.3)] hover:shadow-[0_6px_16px_rgba(16,185,129,0.4)] hover:-translate-y-1">
                <CheckCircle2 size={18} />
                Setujui (Harmonisasi Selesai)
              </button>
              <div className="grid grid-cols-2 gap-3">
                <button className="w-full bg-white hover:bg-orange-50 text-orange-600 border border-orange-200 px-4 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm">Minta Revisi</button>
                <button className="w-full bg-white hover:bg-red-50 text-red-600 border border-red-200 px-4 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm">Tolak</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HarmonisasiReview;
