import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, Filter, Eye, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const ITEMS_PER_PAGE = 4;

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
  const { token } = useAuth();
  const [allProduk, setAllProduk] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchProduk = async () => {
      try {
        const response = await fetch('/api/produk-hukum', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          const formatted = data.map(p => {
            let statusColor = 'gray';
            if (p.status === 'Draft') statusColor = 'gray';
            else if (p.status === 'Harmonisasi') statusColor = 'yellow';
            else if (p.status === 'Paraf') statusColor = 'blue';
            else if (p.status === 'Selesai') statusColor = 'green';
            else if (p.status === 'Berlaku') statusColor = 'green';

            const dateObj = new Date(p.createdAt);
            return {
              ...p,
              tanggalStr: dateObj.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
              statusColor
            };
          });
          setAllProduk(formatted);
        }
      } catch (err) {
        console.error('Failed to fetch produk hukum', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduk();
  }, [token]);

  const totalPages = Math.max(1, Math.ceil(allProduk.length / ITEMS_PER_PAGE));
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProduk = allProduk.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

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
              {isLoading ? (
                <tr>
                  <td colSpan="6" className="px-5 py-8 text-center text-slate-500">Memuat data...</td>
                </tr>
              ) : currentProduk.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-5 py-8 text-center text-slate-500">Belum ada produk hukum.</td>
                </tr>
              ) : (
                currentProduk.map((produk) => (
                  <tr key={produk.id} className="hover:bg-emerald-50/50 transition-colors group">
                    <td className="px-5 py-4 text-sm font-bold text-slate-700 font-mono align-top">
                      {produk.noRegister || '-'}
                    </td>
                    <td className="px-5 py-4 align-top">
                      <div className="text-sm font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">{produk.judul}</div>
                      <div className="text-xs text-slate-500 mt-1">{produk.tentang}</div>
                    </td>
                    <td className="px-5 py-4 align-top text-sm font-medium text-slate-500">{produk.jenis}</td>
                    <td className="px-5 py-4 align-top text-sm font-medium text-slate-700">{produk.tanggalStr}</td>
                    <td className="px-5 py-4 align-top"><StatusBadge type={produk.statusColor} text={produk.status} /></td>
                    <td className="px-5 py-4 align-top text-center">
                      <button className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-700 hover:bg-emerald-100 transition-colors inline-flex">
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-slate-500">
            Menampilkan <strong className="text-slate-800">{allProduk.length > 0 ? startIdx + 1 : 0}</strong> sampai <strong className="text-slate-800">{Math.min(startIdx + ITEMS_PER_PAGE, allProduk.length)}</strong> dari <strong className="text-slate-800">{allProduk.length}</strong> dokumen
          </div>
          <div className="flex items-center gap-1">
            <button 
              className={`w-8 h-8 flex items-center justify-center rounded-lg border transition-colors ${currentPage === 1 ? 'bg-slate-100 border-slate-200 text-slate-300 cursor-not-allowed' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-emerald-600'}`} 
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={16} />
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button 
                key={page}
                className={`w-8 h-8 flex items-center justify-center rounded-lg border transition-colors text-sm font-semibold ${currentPage === page ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-emerald-600'}`}
                onClick={() => goToPage(page)}
              >
                {page}
              </button>
            ))}
            
            <button 
              className={`w-8 h-8 flex items-center justify-center rounded-lg border transition-colors ${currentPage === totalPages ? 'bg-slate-100 border-slate-200 text-slate-300 cursor-not-allowed' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-emerald-600'}`} 
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProdukHukum;
