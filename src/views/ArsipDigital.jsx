import React from 'react';
import { Search, ChevronDown, Eye, Download, Info, ChevronLeft, ChevronRight } from 'lucide-react';

const ArsipDigital = () => {
  return (
    <div className="p-4 md:p-6 lg:p-8 w-full max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-60 pointer-events-none"></div>
        <div className="relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">Repositori Arsip Digital</h2>
          <p className="text-slate-500 mt-1.5 text-sm md:text-base max-w-lg">Kelola dan cari dokumen resmi yang telah diarsipkan secara sistematis.</p>
        </div>
      </div>

      <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-xs font-semibold text-slate-600">Pencarian Dokumen</label>
            <div className="relative flex items-center">
              <Search size={16} className="absolute left-3 text-slate-400 pointer-events-none" />
              <input type="text" placeholder="Cari Nomor Surat, Perihal, atau Kata Kunci..." className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-600">Klasifikasi Dokumen</label>
            <div className="relative flex items-center">
              <select defaultValue="" className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 appearance-none transition-colors">
                <option value="" disabled hidden>Semua Klasifikasi</option>
                <option value="akademik">Akademik</option>
                <option value="kepegawaian">Kepegawaian</option>
                <option value="keuangan">Keuangan</option>
                <option value="hukum">Produk Hukum</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 text-slate-400 pointer-events-none" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-600">Tahun</label>
            <div className="relative flex items-center">
              <select defaultValue="" className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 appearance-none transition-colors">
                <option value="" disabled hidden>Semua</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider w-[25%]">No. Agenda / Nomor Surat</th>
                <th className="px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider w-[35%]">Judul / Perihal</th>
                <th className="px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider w-[15%]">Tanggal Diarsipkan</th>
                <th className="px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider w-[15%]">Klasifikasi</th>
                <th className="px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-center w-[10%]">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-emerald-50/50 transition-colors group">
                <td className="px-5 py-4 align-top">
                  <div className="text-xs font-bold text-slate-400 mb-1 tracking-wider uppercase">AGENDA-2024-089</div>
                  <div className="text-sm font-bold text-slate-800 font-mono">005/UN1.P/DIR/2024</div>
                </td>
                <td className="px-5 py-4 align-top">
                  <div className="text-sm font-bold text-slate-800 group-hover:text-emerald-700 transition-colors mb-1">Undangan Rapat Koordinasi Kurikulum Baru</div>
                  <div className="text-xs font-medium text-slate-500 line-clamp-2">Terkait implementasi kurikulum merdeka di lingkungan fakultas.</div>
                </td>
                <td className="px-5 py-4 align-top text-sm font-medium text-slate-700">12 Okt 2024</td>
                <td className="px-5 py-4 align-top">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200">Akademik</span>
                </td>
                <td className="px-5 py-4 align-top text-center">
                  <div className="flex items-center justify-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-700 hover:bg-emerald-100 transition-colors"><Eye size={16} /></button>
                    <button className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-700 hover:bg-emerald-100 transition-colors"><Download size={16} /></button>
                    <button className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-700 hover:bg-emerald-100 transition-colors"><Info size={16} /></button>
                  </div>
                </td>
              </tr>

              <tr className="hover:bg-emerald-50/50 transition-colors group">
                <td className="px-5 py-4 align-top">
                  <div className="text-xs font-bold text-slate-400 mb-1 tracking-wider uppercase">AGENDA-2024-088</div>
                  <div className="text-sm font-bold text-slate-800 font-mono">112/UN1.KU/KEP/2024</div>
                </td>
                <td className="px-5 py-4 align-top">
                  <div className="text-sm font-bold text-slate-800 group-hover:text-emerald-700 transition-colors mb-1">SK Pengangkatan Staf Administrasi</div>
                  <div className="text-xs font-medium text-slate-500 line-clamp-2">Penetapan status pegawai tetap untuk 5 staf administrasi.</div>
                </td>
                <td className="px-5 py-4 align-top text-sm font-medium text-slate-700">10 Okt 2024</td>
                <td className="px-5 py-4 align-top">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-orange-50 text-orange-700 border border-orange-200">Kepegawaian</span>
                </td>
                <td className="px-5 py-4 align-top text-center">
                  <div className="flex items-center justify-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-700 hover:bg-emerald-100 transition-colors"><Eye size={16} /></button>
                    <button className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-700 hover:bg-emerald-100 transition-colors"><Download size={16} /></button>
                    <button className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-700 hover:bg-emerald-100 transition-colors"><Info size={16} /></button>
                  </div>
                </td>
              </tr>

              <tr className="hover:bg-emerald-50/50 transition-colors group">
                <td className="px-5 py-4 align-top">
                  <div className="text-xs font-bold text-slate-400 mb-1 tracking-wider uppercase">AGENDA-2024-085</div>
                  <div className="text-sm font-bold text-slate-800 font-mono">089/UN1.WR2/EDR/2024</div>
                </td>
                <td className="px-5 py-4 align-top">
                  <div className="text-sm font-bold text-slate-800 group-hover:text-emerald-700 transition-colors mb-1">Edaran Batas Akhir Pencairan Dana Triwulan III</div>
                  <div className="text-xs font-medium text-slate-500 line-clamp-2">Instruksi pengajuan pencairan dana untuk unit kerja.</div>
                </td>
                <td className="px-5 py-4 align-top text-sm font-medium text-slate-700">05 Okt 2024</td>
                <td className="px-5 py-4 align-top">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">Keuangan</span>
                </td>
                <td className="px-5 py-4 align-top text-center">
                  <div className="flex items-center justify-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-700 hover:bg-emerald-100 transition-colors"><Eye size={16} /></button>
                    <button className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-700 hover:bg-emerald-100 transition-colors"><Download size={16} /></button>
                    <button className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-700 hover:bg-emerald-100 transition-colors"><Info size={16} /></button>
                  </div>
                </td>
              </tr>

              <tr className="hover:bg-emerald-50/50 transition-colors group">
                <td className="px-5 py-4 align-top">
                  <div className="text-xs font-bold text-slate-400 mb-1 tracking-wider uppercase">AGENDA-2023-452</div>
                  <div className="text-sm font-bold text-slate-800 font-mono">001/UN1.R/SK/2023</div>
                </td>
                <td className="px-5 py-4 align-top">
                  <div className="text-sm font-bold text-slate-800 group-hover:text-emerald-700 transition-colors mb-1">Statuta Universitas Tahun 2023</div>
                  <div className="text-xs font-medium text-slate-500 line-clamp-2">Dokumen legal dasar penyelenggaraan institusi.</div>
                </td>
                <td className="px-5 py-4 align-top text-sm font-medium text-slate-700">02 Jan 2023</td>
                <td className="px-5 py-4 align-top">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">Produk Hukum</span>
                </td>
                <td className="px-5 py-4 align-top text-center">
                  <div className="flex items-center justify-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-700 hover:bg-emerald-100 transition-colors"><Eye size={16} /></button>
                    <button className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-700 hover:bg-emerald-100 transition-colors"><Download size={16} /></button>
                    <button className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-700 hover:bg-emerald-100 transition-colors"><Info size={16} /></button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-slate-500">
            Menampilkan <strong className="text-slate-800">1</strong> hingga <strong className="text-slate-800">4</strong> dari <strong className="text-slate-800">12,450</strong> arsip
          </div>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-emerald-600 transition-colors"><ChevronLeft size={16} /></button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border bg-emerald-600 border-emerald-600 text-white text-sm font-semibold transition-colors">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-emerald-600 text-sm font-semibold transition-colors">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-emerald-600 text-sm font-semibold transition-colors">3</button>
            <span className="w-8 h-8 flex items-center justify-center text-slate-400 font-bold">...</span>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-emerald-600 text-sm font-semibold transition-colors">1245</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-emerald-600 transition-colors"><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArsipDigital;
