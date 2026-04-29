import React, { useState, useEffect } from 'react';
import { Calendar, ChevronDown, Filter, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const ITEMS_PER_PAGE = 4;

const SuratMasuk = ({ setActiveTab }) => {
  const { token } = useAuth();
  const [allSurat, setAllSurat] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchSurat = async () => {
      try {
        const response = await fetch('/api/surat-masuk', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          // Format data or just set it directly if mapping matches
          const formatted = data.map(s => ({
            ...s,
            tanggal: new Date(s.tanggal).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
            sifatColor: s.sifat.toLowerCase() === 'segera' ? 'red' : (s.sifat.toLowerCase() === 'penting' ? 'orange' : 'gray'),
            statusColor: s.status === 'Selesai' ? 'green' : (s.status === 'Proses' ? 'blue' : 'yellow')
          }));
          setAllSurat(formatted);
        }
      } catch (err) {
        console.error('Failed to fetch surat', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSurat();
  }, [token]);

  const totalPages = Math.max(1, Math.ceil(allSurat.length / ITEMS_PER_PAGE));
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentSurat = allSurat.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const getBadgeClass = (colorStr) => {
    switch (colorStr) {
      case 'red': return 'bg-red-100 text-red-700 border-red-200';
      case 'yellow': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'green': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'blue': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'orange': return 'bg-amber-100 text-amber-700 border-amber-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 w-full max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-60 pointer-events-none"></div>
        <div className="relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">Daftar Surat Masuk</h2>
          <p className="text-slate-500 mt-1.5 text-sm md:text-base max-w-lg">Kelola dan pantau seluruh surat masuk yang diterima institusi.</p>
        </div>
        <div className="relative z-10 shrink-0">
          <button 
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
            onClick={() => setActiveTab('buat-surat-masuk')}
          >
            <span className="text-lg leading-none">+</span>
            Registrasi Surat Baru
          </button>
        </div>
      </div>

      {/* Filter Card */}
      <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-600">Tanggal Terima</label>
            <div className="relative flex items-center">
              <input type="text" placeholder="mm/dd/yyyy" className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors" />
              <Calendar size={16} className="absolute right-3 text-slate-400 pointer-events-none" />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-600">Status</label>
            <div className="relative flex items-center">
              <select defaultValue="" className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 appearance-none transition-colors">
                <option value="" disabled hidden>Semua Status</option>
                <option value="Menunggu">Menunggu Disposisi</option>
                <option value="Proses">Proses</option>
                <option value="Selesai">Selesai</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 text-slate-400 pointer-events-none" />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-600">Sifat Surat</label>
            <div className="relative flex items-center">
              <select defaultValue="" className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 appearance-none transition-colors">
                <option value="" disabled hidden>Semua Sifat</option>
                <option value="Biasa">Biasa</option>
                <option value="Penting">Penting</option>
                <option value="Segera">Segera</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>
        <button className="w-full md:w-auto bg-slate-800 hover:bg-slate-900 text-white px-5 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 shrink-0">
          <Filter size={16} />
          Terapkan Filter
        </button>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-center w-[5%]">No.</th>
                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider w-[20%]">No. Agenda</th>
                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider w-[35%]">Informasi Surat</th>
                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider w-[20%]">Asal Surat</th>
                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider w-[15%]">Sifat & Status</th>
                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-center w-[5%]">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currentSurat.map((surat, idx) => (
                <tr 
                  key={surat.id} 
                  className="hover:bg-emerald-50/50 transition-colors group cursor-pointer" 
                  onClick={() => setActiveTab('surat-detail')}
                >
                  <td className="px-4 py-4 text-sm text-slate-500 text-center font-medium align-top">
                    {startIdx + idx + 1}
                  </td>
                  <td className="px-4 py-4 align-top">
                    <div className="text-sm font-bold text-emerald-800 bg-emerald-50 px-2 py-1 rounded w-max mb-1 border border-emerald-100">{surat.noAgenda}</div>
                    <div className="text-xs font-medium text-slate-400 flex items-center gap-1.5"><Calendar size={12}/> {surat.tanggal}</div>
                  </td>
                  <td className="px-4 py-4 align-top">
                    <a href="#" className="text-sm font-bold text-slate-800 group-hover:text-emerald-700 transition-colors block mb-1.5" onClick={(e) => { e.preventDefault(); setActiveTab('surat-detail'); }}>
                      {surat.noSurat}
                    </a>
                    <div className="text-xs text-slate-500 leading-relaxed line-clamp-2 pr-4">{surat.perihal}</div>
                  </td>
                  <td className="px-4 py-4 align-top">
                    <span className="text-sm font-medium text-slate-600">{surat.asal}</span>
                  </td>
                  <td className="px-4 py-4 align-top">
                    <div className="flex flex-col gap-2 items-start">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${getBadgeClass(surat.sifatColor)}`}>
                        {surat.sifat}
                      </span>
                      <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${getBadgeClass(surat.statusColor)}`}>
                        {surat.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center align-top">
                    <button 
                      className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-700 hover:bg-emerald-100 transition-colors inline-flex" 
                      onClick={(e) => { e.stopPropagation(); setActiveTab('surat-detail'); }} 
                      title="Lihat Detail"
                    >
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-slate-500">
            Menampilkan <strong className="text-slate-800">{startIdx + 1}</strong> sampai <strong className="text-slate-800">{Math.min(startIdx + ITEMS_PER_PAGE, allSurat.length)}</strong> dari <strong className="text-slate-800">{allSurat.length}</strong> surat
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

export default SuratMasuk;
