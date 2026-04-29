import React from 'react';
import { ChevronRight, CheckCircle2, Hash, Edit, XCircle } from 'lucide-react';

const PersetujuanAkhir = () => {
  return (
    <div className="p-4 md:p-6 lg:p-8 w-full max-w-7xl mx-auto space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500 font-medium bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm w-max">
        <a href="#" className="hover:text-emerald-600 transition-colors" onClick={(e) => e.preventDefault()}>
          Produk Hukum
        </a>
        <ChevronRight size={14} className="text-slate-400" />
        <a href="#" className="hover:text-emerald-600 transition-colors" onClick={(e) => e.preventDefault()}>
          PR-2023-041
        </a>
        <ChevronRight size={14} className="text-slate-400" />
        <span className="text-slate-800 font-bold">Persetujuan Akhir</span>
      </div>

      {/* Page Title */}
      <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">Persetujuan Akhir & Penomoran</h1>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Left Column — Document Preview */}
        <div className="w-full lg:w-3/5 xl:w-2/3 h-[800px] overflow-y-auto custom-scrollbar bg-slate-200/50 rounded-2xl border border-slate-200 p-4 md:p-8 flex justify-center">
          <div className="w-full max-w-[800px] bg-white shadow-lg min-h-[1000px] rounded border border-slate-300 p-12 lg:p-16 relative">
            {/* University Header */}
            <div className="flex flex-col items-center text-center border-b-[3px] border-black pb-6 mb-8">
              <div className="w-24 h-24 bg-slate-200 rounded-full mb-4 flex items-center justify-center opacity-70">
                {/* Logo placeholder */}
              </div>
              <h2 className="font-serif font-bold text-2xl tracking-wide uppercase text-slate-800">UNIVERSITAS NASIONAL INDONESIA</h2>
              <p className="font-serif text-sm mt-1 text-slate-600">Jalan Kebangsaan No. 1, Kota Akademik 12345</p>
            </div>

            {/* Document Title */}
            <div className="text-center mb-10">
              <h3 className="font-serif font-bold text-xl uppercase text-slate-800 underline mb-2">PERATURAN REKTOR</h3>
              <div className="inline-block border border-slate-400 px-4 py-1.5 font-serif text-sm font-bold text-slate-600">
                NOMOR: [NOMOR AKAN TERBIT OTOMATIS]
              </div>
            </div>

            {/* Legal Body */}
            <div className="space-y-6 font-serif text-sm leading-relaxed text-justify">
              <div className="flex">
                <strong className="w-32 shrink-0">MENIMBANG:</strong> 
                <p>Bahwa dalam rangka peningkatan kualitas pelayanan akademik dan tertib administrasi di lingkungan Universitas Nasional Indonesia, perlu ditetapkan pedoman baru mengenai standar operasional prosedur pengelolaan dokumen elektronik.</p>
              </div>

              <div className="flex">
                <strong className="w-32 shrink-0">MENGINGAT:</strong> 
                <p>
                  1. Undang-Undang Nomor 12 Tahun 2012 tentang Pendidikan Tinggi;<br/>
                  2. Peraturan Pemerintah Nomor 4 Tahun 2014 tentang Penyelenggaraan Pendidikan Tinggi dan Pengelolaan Perguruan Tinggi.
                </p>
              </div>

              <div className="text-center font-bold my-8">MEMUTUSKAN:</div>

              <div className="flex">
                <strong className="w-32 shrink-0">MENETAPKAN:</strong> 
                <p className="uppercase font-bold">PERATURAN REKTOR TENTANG PENGELOLAAN DOKUMEN ELEKTRONIK DAN TANDA TANGAN DIGITAL DI LINGKUNGAN UNIVERSITAS NASIONAL INDONESIA.</p>
              </div>

              <div className="flex mt-6">
                <span className="w-20 shrink-0">Pasal 1:</span>
                <p>Seluruh dokumen resmi internal maupun eksternal wajib melalui sistem manajemen dokumen legal terpadu.</p>
              </div>

              <div className="flex">
                <span className="w-20 shrink-0">Pasal 2:</span>
                <p>Peraturan ini berlaku sejak tanggal ditetapkan.</p>
              </div>
            </div>

            {/* Signature Area */}
            <div className="flex justify-end pt-16">
              <div className="w-72 text-center text-sm font-serif">
                <p>Ditetapkan di Kota Akademik</p>
                <p>pada tanggal [TANGGAL SAH]</p>

                <div className="my-6 py-4 border-2 border-dashed border-emerald-300 rounded-xl bg-emerald-50 text-emerald-700 flex flex-col items-center justify-center opacity-80">
                  <CheckCircle2 size={28} className="mb-2" />
                  <p className="font-bold text-xs uppercase tracking-wider">Menunggu Tanda Tangan</p>
                  <p className="text-[10px] font-medium mt-0.5">Digital Rektor</p>
                </div>

                <p className="font-bold underline uppercase">Prof. Dr. Budi Santoso, M.Sc.</p>
                <p>Rektor Universitas Nasional Indonesia</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column — Action Cards */}
        <div className="w-full lg:w-2/5 xl:w-1/3 flex flex-col gap-6">
          {/* Card 1 — Verifikasi Koordinasi */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-[11px] font-bold text-slate-400 tracking-widest mb-4">VERIFIKASI KOORDINASI</h3>
            <div className="flex flex-col gap-4 relative">
              {/* Vertical line */}
              <div className="absolute left-2.5 top-3 bottom-3 w-[2px] bg-emerald-100 z-0"></div>
              
              <div className="flex items-start gap-3 relative z-10">
                <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center shrink-0 mt-0.5 ring-4 ring-white">
                  <CheckCircle2 size={12} className="text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-800">Kabiro Hukum</span>
                  <span className="text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded w-max mt-1 border border-emerald-100">Disetujui: 12 Okt 2023, 09:15</span>
                </div>
              </div>
              <div className="flex items-start gap-3 relative z-10">
                <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center shrink-0 mt-0.5 ring-4 ring-white">
                  <CheckCircle2 size={12} className="text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-800">Wakil Rektor II</span>
                  <span className="text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded w-max mt-1 border border-emerald-100">Disetujui: 13 Okt 2023, 14:30</span>
                </div>
              </div>
              <div className="flex items-start gap-3 relative z-10">
                <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center shrink-0 mt-0.5 ring-4 ring-white">
                  <CheckCircle2 size={12} className="text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-800">Wakil Rektor I</span>
                  <span className="text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded w-max mt-1 border border-emerald-100">Disetujui: 14 Okt 2023, 10:05</span>
                </div>
              </div>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2 text-sm font-bold text-emerald-700 bg-emerald-50 px-4 py-2.5 rounded-xl border border-emerald-100">
              <CheckCircle2 size={18} />
              <span>Syarat paraf lengkap.</span>
            </div>
          </div>

          {/* Card 2 — Penomoran Dokumen */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-[11px] font-bold text-slate-400 tracking-widest mb-3">PENOMORAN DOKUMEN</h3>
            <p className="text-sm text-slate-500 leading-relaxed mb-4">
              Dokumen belum memiliki nomor register resmi dari Tata Usaha.
            </p>
            <button className="w-full bg-slate-800 hover:bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5">
              <Hash size={16} />
              Generate Nomor Register
            </button>
          </div>

          {/* Card 3 — Tindakan Eksekutif */}
          <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-200 shadow-sm">
            <h3 className="text-[11px] font-bold text-emerald-800 tracking-widest mb-4">TINDAKAN EKSEKUTIF</h3>
            <div className="flex flex-col gap-3">
              <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-[0_4px_12px_rgba(16,185,129,0.3)] hover:shadow-[0_6px_16px_rgba(16,185,129,0.4)] hover:-translate-y-1">
                <Edit size={18} />
                Tanda Tangani & Sahkan
              </button>
              <button className="w-full bg-white hover:bg-red-50 text-red-600 border border-red-200 px-5 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md">
                <XCircle size={16} />
                Kembalikan untuk Revisi
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersetujuanAkhir;
