import React from 'react';
import { ChevronDown, Filter, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

const StatusBadge = ({ type, text }) => {
  const getBadgeClass = (colorStr) => {
    switch (colorStr) {
      case 'red': return 'bg-red-100 text-red-700 border-red-200';
      case 'yellow': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'green': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'blue': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'gray': return 'bg-slate-100 text-slate-700 border-slate-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getDotClass = (colorStr) => {
    switch (colorStr) {
      case 'red': return 'bg-red-500';
      case 'yellow': return 'bg-orange-500';
      case 'green': return 'bg-emerald-500';
      case 'blue': return 'bg-blue-500';
      case 'gray': return 'bg-slate-500';
      default: return 'bg-slate-500';
    }
  };

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-semibold ${getBadgeClass(type)}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${getDotClass(type)}`}></span>
      {text}
    </div>
  );
}

const SuratKeluar = ({ setActiveTab }) => {
  return (
    <div className="p-4 md:p-6 lg:p-8 w-full max-w-7xl mx-auto space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-60 pointer-events-none"></div>
        <div className="relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">Daftar Surat Keluar</h2>
          <p className="text-slate-500 mt-1.5 text-sm md:text-base max-w-lg">Kelola dan pantau seluruh surat keluar institusi.</p>
        </div>
        <div className="relative z-10 shrink-0">
          <button 
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
            onClick={() => setActiveTab('buat-surat-keluar')}
          >
            <span className="text-lg leading-none">+</span>
            Buat Surat Baru
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-600">Status</label>
            <div className="relative flex items-center">
              <select defaultValue="" className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 appearance-none transition-colors">
                <option value="" disabled hidden>Semua Status</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 text-slate-400 pointer-events-none" />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-600">Kategori</label>
            <div className="relative flex items-center">
              <select defaultValue="" className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 appearance-none transition-colors">
                <option value="" disabled hidden>Semua Kategori</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>
        <button className="w-full md:w-auto bg-slate-800 hover:bg-slate-900 text-white px-5 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 shrink-0">
          <Filter size={16} />
          Filter Lanjutan
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-center w-[5%]">No.</th>
                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider w-[15%]">Tanggal Draft</th>
                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider w-[35%]">Perihal & Kategori</th>
                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider w-[20%]">Tujuan</th>
                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider w-[15%]">Status</th>
                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-center w-[10%]">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {/* Row 1 */}
              <tr className="hover:bg-emerald-50/50 transition-colors group cursor-pointer" onClick={() => setActiveTab('surat-keluar-detail')}>
                <td className="px-4 py-4 text-sm text-slate-500 text-center font-medium align-top">1</td>
                <td className="px-4 py-4 align-top">
                  <div className="text-sm font-bold text-slate-800 mb-1">12 Okt 2023</div>
                  <div className="text-xs font-medium text-slate-400">09:15 WIB</div>
                </td>
                <td className="px-4 py-4 align-top">
                  <div className="text-sm font-bold text-slate-800 group-hover:text-emerald-700 transition-colors block mb-1.5">Undangan Rapat Senat Akademik...</div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 inline-block">Undangan</span>
                </td>
                <td className="px-4 py-4 align-top">
                  <span className="text-sm font-medium text-slate-600">Seluruh Anggota Senat Universitas</span>
                </td>
                <td className="px-4 py-4 align-top">
                  <StatusBadge type="yellow" text="Menunggu Verifikasi" />
                </td>
                <td className="px-4 py-4 text-center align-top">
                  <button className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-700 hover:bg-emerald-100 transition-colors inline-flex" onClick={(e) => { e.stopPropagation(); setActiveTab('surat-keluar-detail'); }} title="Lihat Detail">
                    <Eye size={18} />
                  </button>
                </td>
              </tr>

              {/* Row 2 */}
              <tr className="hover:bg-emerald-50/50 transition-colors group cursor-pointer" onClick={() => setActiveTab('surat-keluar-detail')}>
                <td className="px-4 py-4 text-sm text-slate-500 text-center font-medium align-top">2</td>
                <td className="px-4 py-4 align-top">
                  <div className="text-sm font-bold text-slate-800 mb-1">11 Okt 2023</div>
                  <div className="text-xs font-medium text-slate-400">14:30 WIB</div>
                </td>
                <td className="px-4 py-4 align-top">
                  <div className="text-sm font-bold text-slate-800 group-hover:text-emerald-700 transition-colors block mb-1.5">Permohonan Izin Penggunaan Auditorium...</div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 inline-block">Permohonan</span>
                </td>
                <td className="px-4 py-4 align-top">
                  <span className="text-sm font-medium text-slate-600">Kepala Biro Umum dan Aset</span>
                </td>
                <td className="px-4 py-4 align-top">
                  <StatusBadge type="gray" text="Draft" />
                </td>
                <td className="px-4 py-4 text-center align-top">
                  <button className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-700 hover:bg-emerald-100 transition-colors inline-flex" onClick={(e) => { e.stopPropagation(); setActiveTab('surat-keluar-detail'); }} title="Lihat Detail">
                    <Eye size={18} />
                  </button>
                </td>
              </tr>

              {/* Row 3 */}
              <tr className="hover:bg-emerald-50/50 transition-colors group cursor-pointer" onClick={() => setActiveTab('surat-keluar-detail')}>
                <td className="px-4 py-4 text-sm text-slate-500 text-center font-medium align-top">3</td>
                <td className="px-4 py-4 align-top">
                  <div className="text-sm font-bold text-slate-800 mb-1">10 Okt 2023</div>
                  <div className="text-xs font-medium text-slate-400">11:05 WIB</div>
                </td>
                <td className="px-4 py-4 align-top">
                  <div className="text-sm font-bold text-slate-800 group-hover:text-emerald-700 transition-colors block mb-1.5">Surat Tugas Pendampingan Lomba...</div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 inline-block">Surat Tugas</span>
                </td>
                <td className="px-4 py-4 align-top">
                  <span className="text-sm font-medium text-slate-600">Dr. Budi Santoso, M.T.</span>
                </td>
                <td className="px-4 py-4 align-top">
                  <StatusBadge type="red" text="Perlu Perbaikan" />
                </td>
                <td className="px-4 py-4 text-center align-top">
                  <button className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-700 hover:bg-emerald-100 transition-colors inline-flex" onClick={(e) => { e.stopPropagation(); setActiveTab('surat-keluar-detail'); }} title="Lihat Detail">
                    <Eye size={18} />
                  </button>
                </td>
              </tr>

              {/* Row 4 */}
              <tr className="hover:bg-emerald-50/50 transition-colors group cursor-pointer" onClick={() => setActiveTab('surat-keluar-detail')}>
                <td className="px-4 py-4 text-sm text-slate-500 text-center font-medium align-top">4</td>
                <td className="px-4 py-4 align-top">
                  <div className="text-sm font-bold text-slate-800 mb-1">09 Okt 2023</div>
                  <div className="text-xs font-medium text-slate-400">15:20 WIB</div>
                </td>
                <td className="px-4 py-4 align-top">
                  <div className="text-sm font-bold text-slate-800 group-hover:text-emerald-700 transition-colors block mb-1.5">Pemberitahuan Libur Akademik Pengganti...</div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 inline-block">Pemberitahuan</span>
                </td>
                <td className="px-4 py-4 align-top">
                  <span className="text-sm font-medium text-slate-600">Seluruh Civitas Akademika</span>
                </td>
                <td className="px-4 py-4 align-top">
                  <StatusBadge type="blue" text="Disetujui" />
                </td>
                <td className="px-4 py-4 text-center align-top">
                  <button className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-700 hover:bg-emerald-100 transition-colors inline-flex" onClick={(e) => { e.stopPropagation(); setActiveTab('surat-keluar-detail'); }} title="Lihat Detail">
                    <Eye size={18} />
                  </button>
                </td>
              </tr>

               {/* Row 5 */}
               <tr className="hover:bg-emerald-50/50 transition-colors group cursor-pointer" onClick={() => setActiveTab('surat-keluar-detail')}>
                <td className="px-4 py-4 text-sm text-slate-500 text-center font-medium align-top">5</td>
                <td className="px-4 py-4 align-top">
                  <div className="text-sm font-bold text-slate-800 mb-1">08 Okt 2023</div>
                  <div className="text-xs font-medium text-slate-400">08:45 WIB</div>
                </td>
                <td className="px-4 py-4 align-top">
                  <div className="text-sm font-bold text-slate-800 group-hover:text-emerald-700 transition-colors block mb-1.5">Surat Keputusan Pengangkatan Ketua...</div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 inline-block">Keputusan</span>
                    <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">124/UNIA/SK/X/2023</span>
                  </div>
                </td>
                <td className="px-4 py-4 align-top">
                  <span className="text-sm font-medium text-slate-600">Kementerian Pendidikan,...</span>
                </td>
                <td className="px-4 py-4 align-top">
                  <StatusBadge type="green" text="Sudah Nomor" />
                </td>
                <td className="px-4 py-4 text-center align-top">
                  <button className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-700 hover:bg-emerald-100 transition-colors inline-flex" onClick={(e) => { e.stopPropagation(); setActiveTab('surat-keluar-detail'); }} title="Lihat Detail">
                    <Eye size={18} />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-slate-500">
            Menampilkan <strong className="text-slate-800">1</strong> sampai <strong className="text-slate-800">5</strong> dari <strong className="text-slate-800">24</strong> surat
          </div>
          <div className="flex items-center gap-1">
            <button className="h-8 px-3 flex items-center justify-center rounded-lg border bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed text-sm font-medium transition-colors">Sebelumnya</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border bg-emerald-600 border-emerald-600 text-white text-sm font-semibold transition-colors">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-emerald-600 text-sm font-semibold transition-colors">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-emerald-600 text-sm font-semibold transition-colors">3</button>
            <button className="h-8 px-3 flex items-center justify-center rounded-lg border bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-emerald-600 text-sm font-medium transition-colors">Selanjutnya</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SuratKeluar;
