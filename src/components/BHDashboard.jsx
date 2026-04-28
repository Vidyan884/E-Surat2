import React from 'react';
import { FileText, GitMerge, CheckCircle2, Clock, AlertCircle, ArrowRight, Scale, Gavel, TrendingUp } from 'lucide-react';
import './BHDashboard.css';

const StatCard = ({ title, value, icon: Icon, colorClass, subtitle }) => {
  return (
    <div className={`bhd-stat-card ${colorClass}`}>
      <div className="bhd-stat-icon-wrap">
        <Icon size={20} />
      </div>
      <div className="bhd-stat-info">
        <span className="bhd-stat-value">{value}</span>
        <span className="bhd-stat-title">{title}</span>
        {subtitle && <span className="bhd-stat-subtitle">{subtitle}</span>}
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

  return (
    <div className="bhd-container">
      {/* Page Header */}
      <div className="bhd-header">
        <div>
          <h2 className="bhd-title">Dashboard Biro Hukum</h2>
          <p className="bhd-subtitle">Ringkasan aktivitas dan status produk hukum universitas.</p>
        </div>
        <div className="bhd-header-right">
          <span className="bhd-period-label">PERIODE</span>
          <span className="bhd-period-value">April 2026</span>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="bhd-stats-grid">
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
      <div className="bhd-main-grid">
        {/* Left — Recent Documents */}
        <div className="bhd-recent-section">
          <div className="bhd-section-header">
            <h3 className="bhd-section-title">Dokumen Terbaru</h3>
            <button className="bhd-link-all" onClick={() => setActiveTab('buat-produk-hukum')}>
              Lihat Semua <ArrowRight size={14} />
            </button>
          </div>

          <div className="bhd-doc-list">
            {recentDocs.map((doc) => (
              <div key={doc.id} className="bhd-doc-item" onClick={() => setActiveTab('harmonisasi-review')}>
                <div className="bhd-doc-main">
                  <div className="bhd-doc-id">{doc.id}</div>
                  <div className="bhd-doc-title">{doc.title}</div>
                  <div className="bhd-doc-meta">
                    <span className="bhd-doc-type">{doc.type}</span>
                    <span className="bhd-doc-pengusul">• {doc.pengusul}</span>
                  </div>
                </div>
                <div className="bhd-doc-right">
                  <span className={`bhd-status-badge ${doc.statusType}`}>{doc.status}</span>
                  <span className="bhd-doc-date">{doc.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Workflow Summary */}
        <div className="bhd-workflow-section">
          <div className="bhd-section-header">
            <h3 className="bhd-section-title">Antrian Workflow</h3>
          </div>

          <div className="bhd-workflow-list">
            {workflowItems.map((item, idx) => (
              <div key={idx} className="bhd-workflow-item">
                <div className="bhd-workflow-left">
                  <div className="bhd-workflow-dot" style={{ backgroundColor: item.color }}></div>
                  <span className="bhd-workflow-label">{item.label}</span>
                </div>
                <span className="bhd-workflow-count">{item.count}</span>
              </div>
            ))}
          </div>

          <div className="bhd-workflow-total">
            <span>Total Dalam Proses</span>
            <span className="bhd-workflow-total-count">
              {workflowItems.reduce((acc, i) => acc + i.count, 0)}
            </span>
          </div>

          {/* Quick Actions */}
          <div className="bhd-quick-actions">
            <h4 className="bhd-quick-title">Aksi Cepat</h4>
            <button className="bhd-quick-btn" onClick={() => setActiveTab('buat-produk-hukum')}>
              <FileText size={16} />
              Buat Dokumen Baru
            </button>
            <button className="bhd-quick-btn outline" onClick={() => setActiveTab('harmonisasi-review')}>
              <GitMerge size={16} />
              Review Harmonisasi
            </button>
            <button className="bhd-quick-btn outline" onClick={() => setActiveTab('persetujuan-akhir')}>
              <CheckCircle2 size={16} />
              Persetujuan Akhir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BHDashboard;
