import React from 'react';
import { Search, ChevronDown, Filter, Eye, ChevronLeft, ChevronRight, Plus } from 'lucide-react';

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

const ProdukHukum = () => {
  return (
    <div className="p-4 md:p-6 lg:p-8 w-full max-w-7xl mx-auto space-y-6">
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-60 pointer-events-none"></div>
        <div className="relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">Daftar Produk Hukum</h2>
          <p className="text-slate-500 mt-1.5 text-sm md:text-base max-w-lg">Kelola dan pantau seluruh dokumen regulasi dan keputusan universitas.</p>
        </div>
        <div className="relative z-10 shrink-0">
          <button className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5">
            <Plus size={18} />
            Buat Produk Hukum Baru
          </button>
        </div>
      </div>

      {/* Filter Box */}
      <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
          <div className="flex flex-col gap-1.5 md:col-span-1">
            <label className="text-xs font-semibold text-slate-600">Pencarian</label>
            <div className="relative flex items-center">
              <Search size={16} className="absolute left-3 text-slate-400 pointer-events-none" />
              <input type="text" placeholder="Cari No. Register atau Judul..." className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors" />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-600">Jenis Dokumen</label>
            <div className="relative flex items-center">
              <select defaultValue="" className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 appearance-none transition-colors">
                <option value="" disabled hidden>Semua Jenis</option>
                <option value="pr">Peraturan Rektor</option>
                <option value="sk">SK Dekan</option>
                <option value="se">Surat Edaran</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 text-slate-400 pointer-events-none" />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-600">Status</label>
            <div className="relative flex items-center">
              <select defaultValue="" className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 appearance-none transition-colors">
                <option value="" disabled hidden>Semua Status</option>
                <option value="berlaku">Berlaku</option>
                <option value="harmonisasi">Harmonisasi</option>
                <option value="paraf">Paraf</option>
                <option value="draft">Draft</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>
        <button className="w-full md:w-auto bg-slate-800 hover:bg-slate-900 text-white px-5 py-2.5 md:py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-sm shrink-0">
          <Filter size={16} />
          <span className="hidden md:inline">Terapkan<br/>Filter</span>
          <span className="md:hidden">Terapkan Filter</span>
        </button>
      </div>

      {/* Table Area */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider w-[15%]">No. Register</th>
                <th className="px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider w-[35%]">Judul Peraturan / Keputusan</th>
                <th className="px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider w-[15%]">Jenis</th>
                <th className="px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider w-[15%]">Tanggal Penetapan</th>
                <th className="px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider w-[12%]">Status</th>
                <th className="px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-center w-[8%]">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {/* Row 1 */}
              <tr className="hover:bg-emerald-50/50 transition-colors group">
                <td className="px-5 py-4 text-sm font-bold text-slate-700 font-mono align-top">PR-2023-0042</td>
                <td className="px-5 py-4 align-top">
                  <div className="text-sm font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">Pedoman Pelaksanaan Tridharma Perguruan Tinggi di Lingkungan Universitas</div>
                </td>
                <td className="px-5 py-4 align-top text-sm font-medium text-slate-500">Peraturan<br/>Rektor</td>
                <td className="px-5 py-4 align-top text-sm font-medium text-slate-700">12 Okt 2023</td>
                <td className="px-5 py-4 align-top"><StatusBadge type="green" text="Berlaku" /></td>
                <td className="px-5 py-4 align-top text-center">
                  <button className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-700 hover:bg-emerald-100 transition-colors inline-flex">
                    <Eye size={18} />
                  </button>
                </td>
              </tr>

              {/* Row 2 */}
              <tr className="hover:bg-emerald-50/50 transition-colors group">
                <td className="px-5 py-4 text-sm font-bold text-slate-700 font-mono align-top">SKD-2023-0128</td>
                <td className="px-5 py-4 align-top">
                  <div className="text-sm font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">Pengangkatan Panitia Ujian Akhir Semester Ganjil TA 2023/2024 Fakultas Teknik</div>
                </td>
                <td className="px-5 py-4 align-top text-sm font-medium text-slate-500">SK Dekan</td>
                <td className="px-5 py-4 align-top text-sm font-medium text-slate-400">-</td>
                <td className="px-5 py-4 align-top"><StatusBadge type="yellow" text="Harmonisasi" /></td>
                <td className="px-5 py-4 align-top text-center">
                  <button className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-700 hover:bg-emerald-100 transition-colors inline-flex">
                    <Eye size={18} />
                  </button>
                </td>
              </tr>

              {/* Row 3 */}
              <tr className="hover:bg-emerald-50/50 transition-colors group">
                <td className="px-5 py-4 text-sm font-bold text-slate-700 font-mono align-top">PR-2023-0043</td>
                <td className="px-5 py-4 align-top">
                  <div className="text-sm font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">Standar Biaya Operasional dan Penyelenggaraan Pendidikan Tahun 2024</div>
                </td>
                <td className="px-5 py-4 align-top text-sm font-medium text-slate-500">Peraturan<br/>Rektor</td>
                <td className="px-5 py-4 align-top text-sm font-medium text-slate-400">-</td>
                <td className="px-5 py-4 align-top"><StatusBadge type="blue" text="Paraf" /></td>
                <td className="px-5 py-4 align-top text-center">
                  <button className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-700 hover:bg-emerald-100 transition-colors inline-flex">
                    <Eye size={18} />
                  </button>
                </td>
              </tr>

              {/* Row 4 */}
              <tr className="hover:bg-emerald-50/50 transition-colors group">
                <td className="px-5 py-4 text-sm font-bold text-slate-700 font-mono align-top">SE-2023-0015</td>
                <td className="px-5 py-4 align-top">
                  <div className="text-sm font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">Himbauan Pelaksanaan Kegiatan Ekstrakurikuler Mahasiswa</div>
                </td>
                <td className="px-5 py-4 align-top text-sm font-medium text-slate-500">Surat Edaran</td>
                <td className="px-5 py-4 align-top text-sm font-medium text-slate-400">-</td>
                <td className="px-5 py-4 align-top"><StatusBadge type="gray" text="Draft" /></td>
                <td className="px-5 py-4 align-top text-center">
                  <button className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-700 hover:bg-emerald-100 transition-colors inline-flex">
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
            Menampilkan <strong className="text-slate-800">1</strong> sampai <strong className="text-slate-800">4</strong> dari <strong className="text-slate-800">45</strong> dokumen
          </div>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-emerald-600 transition-colors"><ChevronLeft size={16} /></button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border bg-emerald-600 border-emerald-600 text-white text-sm font-semibold transition-colors">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-emerald-600 text-sm font-semibold transition-colors">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-emerald-600 text-sm font-semibold transition-colors">3</button>
            <span className="w-8 h-8 flex items-center justify-center text-slate-400 font-bold">...</span>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-emerald-600 transition-colors"><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProdukHukum;
