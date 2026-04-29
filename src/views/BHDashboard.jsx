import React from 'react';
import { FileText, GitMerge, CheckCircle2, Clock, ArrowRight } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, colorClass, subtitle }) => {
  const bgColors = {
    'bg-blue': 'bg-blue-50 text-blue-600 border-blue-200',
    'bg-yellow': 'bg-orange-50 text-orange-600 border-orange-200',
    'bg-green': 'bg-emerald-50 text-emerald-600 border-emerald-200',
    'bg-purple': 'bg-purple-50 text-purple-600 border-purple-200',
  };

  const iconBg = bgColors[colorClass] || 'bg-slate-50 text-slate-600 border-slate-200';

  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-start gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${iconBg}`}>
        <Icon size={24} />
      </div>
      <div>
        <h3 className="text-2xl font-bold text-slate-800 leading-none mb-1">{value}</h3>
        <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
        {subtitle && (
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${colorClass === 'bg-yellow' || colorClass === 'bg-purple' ? 'bg-red-50 text-red-600' : 'bg-slate-100 text-slate-500'}`}>
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
};

const BHDashboard = ({ setActiveTab }) => {
  const recentDocs = [
    {
      id: 'PR-2024-0045',
      title: 'Peraturan Rektor tentang Pedoman Akademik 2024',
      type: 'Peraturan Rektor',
      status: 'Harmonisasi',
      statusType: 'yellow',
      date: '27 Apr 2026',
      pengusul: 'Fakultas Teknik',
    },
    {
      id: 'SKR-2024-0128',
      title: 'SK Pengangkatan Panitia UAS Ganjil TA 2024/2025',
      type: 'SK Rektor',
      status: 'Paraf',
      statusType: 'blue',
      date: '26 Apr 2026',
      pengusul: 'Biro Akademik',
    },
    {
      id: 'SE-2024-0016',
      title: 'Edaran Tata Tertib Penggunaan Laboratorium',
      type: 'Surat Edaran',
      status: 'Draft',
      statusType: 'gray',
      date: '25 Apr 2026',
      pengusul: 'Fakultas MIPA',
    },
    {
      id: 'PR-2024-0044',
      title: 'Standar Biaya Operasional Pendidikan Tahun 2025',
      type: 'Peraturan Rektor',
      status: 'Berlaku',
      statusType: 'green',
      date: '24 Apr 2026',
      pengusul: 'Biro Keuangan',
    },
    {
      id: 'SKD-2024-0089',
      title: 'SK Penetapan Dosen Pembimbing Skripsi Batch III',
      type: 'SK Dekan',
      status: 'Selesai',
      statusType: 'green',
      date: '23 Apr 2026',
      pengusul: 'Fasilkom',
    },
  ];

  const workflowItems = [
    { label: 'Menunggu Harmonisasi', count: 5, color: '#f59e0b' },
    { label: 'Menunggu Paraf', count: 3, color: '#3b82f6' },
    { label: 'Menunggu TTD Rektor', count: 2, color: '#8b5cf6' },
    { label: 'Perlu Revisi', count: 1, color: '#ef4444' },
  ];

  const getBadgeStyle = (type) => {
    switch (type) {
      case 'yellow': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'blue': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'green': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 w-full max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-60 pointer-events-none"></div>
        
        <div className="relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">Dashboard Biro Hukum</h2>
          <p className="text-slate-500 mt-1.5 text-sm md:text-base max-w-lg">Ringkasan aktivitas dan status produk hukum universitas.</p>
        </div>
        <div className="relative z-10 flex flex-col items-start sm:items-end bg-slate-50 px-4 py-2 rounded-lg border border-slate-100">
          <span className="text-[10px] font-bold text-slate-400 tracking-wider">PERIODE AKTIF</span>
          <span className="text-sm font-bold text-emerald-800">April 2026</span>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
        <StatCard
          title="Total Produk Hukum"
          value="142"
          icon={FileText}
          colorClass="bg-blue"
          subtitle="+8 bulan ini"
        />
        <StatCard
          title="Sedang Diharmonisasi"
          value="5"
          icon={GitMerge}
          colorClass="bg-yellow"
          subtitle="butuh tindakan"
        />
        <StatCard
          title="Dokumen Berlaku"
          value="98"
          icon={CheckCircle2}
          colorClass="bg-green"
        />
        <StatCard
          title="Menunggu TTD"
          value="2"
          icon={Clock}
          colorClass="bg-purple"
          subtitle="eskalasi"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left — Recent Documents */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 md:p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <h3 className="text-base font-bold text-slate-800">Dokumen Terbaru</h3>
            <button 
              className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 hover:bg-emerald-50 px-2 py-1 rounded transition-colors"
              onClick={() => setActiveTab('buat-produk-hukum')}
            >
              Lihat Semua <ArrowRight size={14} />
            </button>
          </div>

          <div className="flex-1 divide-y divide-slate-100">
            {recentDocs.map((doc) => (
              <div 
                key={doc.id} 
                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors cursor-pointer group"
                onClick={() => setActiveTab('harmonisasi-review')}
              >
                <div className="flex-1">
                  <div className="text-xs font-mono text-slate-500 mb-1">{doc.id}</div>
                  <div className="text-sm font-bold text-slate-800 group-hover:text-emerald-700 transition-colors mb-1.5">{doc.title}</div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">{doc.type}</span>
                    <span className="text-slate-400">• {doc.pengusul}</span>
                  </div>
                </div>
                <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${getBadgeStyle(doc.statusType)}`}>
                    {doc.status}
                  </span>
                  <span className="text-xs font-medium text-slate-400">{doc.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Workflow Summary */}
        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50">
              <h3 className="text-base font-bold text-slate-800">Antrian Workflow</h3>
            </div>
            <div className="p-5">
              <div className="space-y-4">
                {workflowItems.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: item.color }}></div>
                      <span className="text-sm font-medium text-slate-600">{item.label}</span>
                    </div>
                    <span className="text-sm font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">{item.count}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-500">Total Dalam Proses</span>
                <span className="text-lg font-bold text-emerald-600">
                  {workflowItems.reduce((acc, i) => acc + i.count, 0)}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden p-5">
            <h4 className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-wider">Aksi Cepat</h4>
            <div className="space-y-3">
              <button 
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg py-2.5 px-4 flex items-center gap-3 text-sm font-semibold transition-colors shadow-sm"
                onClick={() => setActiveTab('buat-produk-hukum')}
              >
                <FileText size={16} />
                Buat Dokumen Baru
              </button>
              <button 
                className="w-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 hover:border-slate-300 rounded-lg py-2.5 px-4 flex items-center gap-3 text-sm font-medium transition-colors"
                onClick={() => setActiveTab('harmonisasi-review')}
              >
                <GitMerge size={16} className="text-slate-400" />
                Review Harmonisasi
              </button>
              <button 
                className="w-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 hover:border-slate-300 rounded-lg py-2.5 px-4 flex items-center gap-3 text-sm font-medium transition-colors"
                onClick={() => setActiveTab('persetujuan-akhir')}
              >
                <CheckCircle2 size={16} className="text-slate-400" />
                Persetujuan Akhir
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BHDashboard;
