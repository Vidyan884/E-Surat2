import React from 'react';
import { Mail, ArrowUpRight, TrendingUp, Inbox, Zap, ArrowRight, AlertCircle } from 'lucide-react';
import './MainDashboard.css';

const StatCard = ({ title, value, icon: Icon, indicator, colorStyle, isDanger, onClick }) => {
  return (
    <div className={`stat-card ${isDanger ? 'border-danger' : ''}`} onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      <div className="stat-header">
        <div className={`icon-wrapper ${colorStyle}`}>
          <Icon size={20} />
        </div>
        {indicator && (
          <div className="indicator">
            <TrendingUp size={12} />
            <span>{indicator}</span>
          </div>
        )}
      </div>
      <div className="stat-body">
        <p className="stat-title">{title}</p>
        <h3 className="stat-value">
          {value}
          {isDanger && <span className="stat-subtext"> butuh tindakan</span>}
          {title === 'Rata-rata Respon' && <span className="stat-subtext-large"> Hari</span>}
        </h3>
      </div>
    </div>
  );
};

const TaskItem = ({ status, time, title, desc, refNumber, statusType, onClick }) => {
  return (
    <div className="task-item" onClick={onClick} style={{ cursor: 'pointer' }}>
      <div className="task-header">
        <span className={`status-badge ${statusType}`}>{status}</span>
        <span className="task-time">{time}</span>
      </div>
      <h4 className="task-title">{title}</h4>
      <p className="task-desc">{desc}</p>
      <div className="task-footer">
        <span className="task-ref">{refNumber}</span>
        <button className="btn-arrow" onClick={(e) => { e.stopPropagation(); onClick && onClick(); }}>
          <ArrowRight size={16} />
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
    <div className="chart-container">
      <div className="chart-header">
        <div>
          <h3 className="chart-title">Volume Lalu Lintas Surat</h3>
          <p className="chart-subtitle">Perbandingan surat masuk dan keluar dalam 7 hari terakhir</p>
        </div>
        <div className="chart-legend">
          <span className="legend-item"><span className="dot dot-masuk"></span> Masuk</span>
          <span className="legend-item"><span className="dot dot-keluar"></span> Keluar</span>
        </div>
      </div>
      <div className="chart-area">
        <div className="y-axis">
          <span>150</span>
          <span>100</span>
          <span>50</span>
        </div>
        <div className="bars-area">
          <div className="grid-line" style={{ bottom: '100%' }}></div>
          <div className="grid-line" style={{ bottom: '50%' }}></div>
          <div className="grid-line" style={{ bottom: '0%' }}></div>
          
          <div className="bars-wrapper">
            {data.map((item, idx) => (
              <div key={idx} className="bar-group">
                <div className="bar-stack">
                  <div className="bar bar-masuk" style={{ height: `${(item.masuk / maxVal) * 100}%` }}></div>
                  <div className="bar-gap"></div>
                  <div className="bar bar-keluar" style={{ height: `${(item.keluar / maxVal) * 100}%` }}></div>
                </div>
                <span className="x-label">{item.day}</span>
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
    <div className="dashboard-content">
      <div className="dashboard-header">
        <div>
          <h2 className="page-title">Ringkasan Eksekutif</h2>
          <p className="page-subtitle">Pantauan real-time alur administrasi surat menyurat Universitas.</p>
        </div>
        <div className="period-info">
          <span className="period-label">PERIODE AKTIF</span>
          <span className="period-value">Oktober 2023</span>
        </div>
      </div>

      <div className="stats-grid">
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

      <div className="main-grid">
        <div className="tasks-section">
          <div className="section-header">
            <div className="section-title-wrapper">
              <AlertCircle size={20} className="alert-icon" />
              <h3 className="section-title">Tugas Mendapat Perhatian</h3>
            </div>
            <a href="#" className="link-all" onClick={(e) => { e.preventDefault(); setActiveTab('surat-masuk'); }}>Lihat Semua</a>
          </div>
          
          <div className="task-list">
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
              desc="Review laporan keuangan dan kegiatan panitia Dies Natalis ke-45 sebelum diajukan ke..."
              refNumber="Ref: 112/UNIA/LPJ/IX/2023"
              onClick={() => setActiveTab('surat-detail')}
            />
          </div>
        </div>

        <div className="chart-section">
          <VolumeChart />
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
