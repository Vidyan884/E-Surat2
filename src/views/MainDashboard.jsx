import React from 'react';
import { Mail, ArrowUpRight, TrendingUp, Inbox, Zap, ArrowRight, AlertCircle } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, indicator, colorStyle, isDanger, onClick }) => {
  const bgColors = {
    'bg-blue': 'bg-blue-50 text-blue-600',
    'bg-green': 'bg-emerald-50 text-emerald-600',
    'bg-red': 'bg-red-50 text-red-600',
    'bg-orange': 'bg-orange-50 text-orange-600',
  };

  const iconBg = bgColors[colorStyle] || 'bg-slate-50 text-slate-600';

  return (
    <div 
      className={`bg-white p-5 rounded-xl border transition-all duration-300 ${isDanger ? 'border-red-200 shadow-[0_0_15px_rgba(239,68,68,0.1)]' : 'border-slate-200 shadow-sm'} ${onClick ? 'cursor-pointer hover:-translate-y-1 hover:shadow-md' : ''}`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconBg}`}>
          <Icon size={20} />
        </div>
        {indicator && (
          <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
            <TrendingUp size={12} />
            <span>{indicator}</span>
          </div>
        )}
      </div>
      <div>
        <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-slate-800 flex items-baseline gap-2">
          {value}
          {isDanger && <span className="text-xs font-semibold text-red-500 bg-red-50 px-2 py-0.5 rounded">butuh tindakan</span>}
          {title === 'Rata-rata Respon' && <span className="text-sm font-medium text-slate-500"> Hari</span>}
        </h3>
      </div>
    </div>
  );
};

const TaskItem = ({ status, time, title, desc, refNumber, statusType, onClick }) => {
  const badgeColors = {
    'danger': 'bg-red-100 text-red-700',
    'warning': 'bg-orange-100 text-orange-700',
    'success': 'bg-emerald-100 text-emerald-700',
    'default': 'bg-slate-100 text-slate-700'
  };

  const badgeColor = badgeColors[statusType] || badgeColors['default'];

  return (
    <div 
      className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-200 transition-all cursor-pointer group"
      onClick={onClick}
    >
      <div className="flex justify-between items-center mb-2">
        <span className={`text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-md ${badgeColor}`}>
          {status}
        </span>
        <span className="text-xs text-slate-400 font-medium">{time}</span>
      </div>
      <h4 className="text-sm font-bold text-slate-800 mb-1 group-hover:text-emerald-700 transition-colors">{title}</h4>
      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">{desc}</p>
      <div className="flex justify-between items-center">
        <span className="text-[11px] font-mono text-slate-400 bg-white px-2 py-1 rounded border border-slate-100">
          {refNumber}
        </span>
        <button className="w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600 transition-colors" onClick={(e) => { e.stopPropagation(); onClick && onClick(); }}>
          <ArrowRight size={12} />
        </button>
      </div>
    </div>
  );
};

const VolumeChart = () => {
  const data = [
    { day: 'Sen', masuk: 120, keluar: 90 },
    { day: 'Sel', masuk: 120, keluar: 75 },
    { day: 'Rab', masuk: 120, keluar: 110 },
    { day: 'Kam', masuk: 120, keluar: 85 },
    { day: 'Jum', masuk: 120, keluar: 108 },
    { day: 'Sab', masuk: 55, keluar: 60 },
    { day: 'Min',  masuk: 45, keluar: 45 },
  ];

  const maxVal = 130;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 h-full flex flex-col">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h3 className="text-lg font-bold text-slate-800">Volume Lalu Lintas Surat</h3>
          <p className="text-sm text-slate-500 mt-1">Perbandingan surat masuk dan keluar dalam 7 hari terakhir</p>
        </div>
        <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-emerald-500"></span> Masuk</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-emerald-200"></span> Keluar</span>
        </div>
      </div>
      
      <div className="relative flex-1 min-h-[200px]">
        {/* Y-Axis */}
        <div className="absolute left-0 top-0 bottom-6 w-8 flex flex-col justify-between text-xs text-slate-400 font-medium">
          <span>150</span>
          <span>100</span>
          <span>50</span>
        </div>
        
        {/* Chart Area */}
        <div className="absolute left-8 right-0 top-0 bottom-0">
          {/* Grid lines */}
          <div className="absolute left-0 right-0 border-b border-dashed border-slate-200" style={{ top: '0%' }}></div>
          <div className="absolute left-0 right-0 border-b border-dashed border-slate-200" style={{ top: '50%' }}></div>
          <div className="absolute left-0 right-0 border-b border-slate-200" style={{ bottom: '24px' }}></div>
          
          {/* Bars */}
          <div className="absolute left-0 right-0 top-0 bottom-6 flex justify-between items-end px-2">
            {data.map((item, idx) => (
              <div key={idx} className="relative flex flex-col items-center w-8 group">
                {/* Tooltip */}
                <div className="absolute -top-12 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                  Masuk: {item.masuk} | Keluar: {item.keluar}
                </div>
                
                <div className="w-full flex items-end justify-center gap-0.5 h-full relative z-0">
                  <div className="w-2.5 bg-emerald-500 rounded-t-sm transition-all duration-500 hover:brightness-110" style={{ height: `${(item.masuk / maxVal) * 100}%` }}></div>
                  <div className="w-2.5 bg-emerald-200 rounded-t-sm transition-all duration-500 hover:brightness-110" style={{ height: `${(item.keluar / maxVal) * 100}%` }}></div>
                </div>
                <span className="absolute -bottom-6 text-xs text-slate-500 font-medium">{item.day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const MainDashboard = ({ setActiveTab }) => {
  return (
    <div className="p-4 md:p-6 lg:p-8 w-full max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-60 pointer-events-none"></div>
        
        <div className="relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">Ringkasan Eksekutif</h2>
          <p className="text-slate-500 mt-1.5 text-sm md:text-base max-w-lg">Pantauan real-time alur administrasi surat menyurat Universitas.</p>
        </div>
        <div className="relative z-10 flex flex-col items-start sm:items-end bg-slate-50 px-4 py-2 rounded-lg border border-slate-100">
          <span className="text-[10px] font-bold text-slate-400 tracking-wider">PERIODE AKTIF</span>
          <span className="text-sm font-bold text-emerald-800">Oktober 2026</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
        <StatCard 
          title="Total Surat Masuk" 
          value="1,248" 
          icon={Mail} 
          indicator="+12%" 
          colorStyle="bg-blue"
          onClick={() => setActiveTab('surat-masuk')}
        />
        <StatCard 
          title="Surat Keluar" 
          value="856" 
          icon={ArrowUpRight} 
          indicator="+5%" 
          colorStyle="bg-green"
          onClick={() => setActiveTab('surat-keluar')}
        />
        <StatCard 
          title="Disposisi Menunggu" 
          value="24" 
          icon={Inbox} 
          isDanger={true}
          colorStyle="bg-red"
          onClick={() => setActiveTab('surat-masuk')}
        />
        <StatCard 
          title="Rata-rata Respon" 
          value="1.2" 
          icon={Zap} 
          colorStyle="bg-orange"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Urgent Tasks */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-red-600">
              <AlertCircle size={20} />
              <h3 className="text-base font-bold text-slate-800">Tugas Perhatian</h3>
            </div>
            <a href="#" className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 hover:underline" onClick={(e) => { e.preventDefault(); setActiveTab('surat-masuk'); }}>
              Lihat Semua
            </a>
          </div>
          
          <div className="flex flex-col gap-3">
            <TaskItem 
              status="MENDESAK" 
              statusType="danger"
              time="2 jam yang lalu"
              title="Persetujuan MoU Universitas Kebangsaan"
              desc="Mohon arahan dan tanda tangan digital untuk draft MoU kerjasama pertukaran pelajar..."
              refNumber="Ref: 045/UNIA/KS/X/2023"
              onClick={() => setActiveTab('surat-detail')}
            />
            <TaskItem 
              status="PERLU REVIEW" 
              statusType="warning"
              time="Kemarin"
              title="Laporan Pertanggungjawaban Dies Natalis"
              desc="Review laporan keuangan dan kegiatan panitia Dies Natalis ke-45 sebelum diajukan ke rektor..."
              refNumber="Ref: 112/UNIA/LPJ/IX/2023"
              onClick={() => setActiveTab('surat-detail')}
            />
          </div>
        </div>

        {/* Chart */}
        <div className="lg:col-span-2">
          <VolumeChart />
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
