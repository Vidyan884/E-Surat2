import React, { useState } from 'react';
import { 
  Search, ChevronDown, Filter, Download, RefreshCw,
  LogIn, LogOut, FileText, UserPlus, Edit3, Trash2, 
  Shield, Settings, Eye, AlertTriangle, CheckCircle2, XCircle, Info
} from 'lucide-react';
import EmptyState from './EmptyState';
import './SystemLogs.css';

const logsData = [
  {
    id: 1,
    timestamp: '27 Apr 2026, 19:45:12',
    user: 'Ahmad Hidayat',
    userInitials: 'AH',
    role: 'Super Admin',
    action: 'Login',
    icon: LogIn,
    severity: 'info',
    module: 'Authentication',
    detail: 'Berhasil login dari IP 192.168.1.105',
    ip: '192.168.1.105',
  },
  {
    id: 2,
    timestamp: '27 Apr 2026, 19:32:08',
    user: 'Ahmad Hidayat',
    userInitials: 'AH',
    role: 'Super Admin',
    action: 'Role Updated',
    icon: Shield,
    severity: 'warning',
    module: 'User Management',
    detail: 'Mengubah role "Reviewer" — menambah permission Sign Documents',
    ip: '192.168.1.105',
  },
  {
    id: 3,
    timestamp: '27 Apr 2026, 18:55:41',
    user: 'Siti Surya',
    userInitials: 'SS',
    role: 'Admin Persuratan',
    action: 'Surat Registered',
    icon: FileText,
    severity: 'success',
    module: 'Surat Masuk',
    detail: 'Registrasi surat masuk #SM-2026-0412 dari Kementerian Pendidikan',
    ip: '192.168.1.87',
  },
  {
    id: 4,
    timestamp: '27 Apr 2026, 18:22:15',
    user: 'Budi Wibowo',
    userInitials: 'BW',
    role: 'Reviewer',
    action: 'Login Failed',
    icon: XCircle,
    severity: 'danger',
    module: 'Authentication',
    detail: 'Gagal login — password salah (percobaan ke-3)',
    ip: '10.0.0.54',
  },
  {
    id: 5,
    timestamp: '27 Apr 2026, 17:48:33',
    user: 'Ahmad Hidayat',
    userInitials: 'AH',
    role: 'Super Admin',
    action: 'User Created',
    icon: UserPlus,
    severity: 'success',
    module: 'User Management',
    detail: 'Membuat akun baru untuk Rina Maharani (Staff, HRD)',
    ip: '192.168.1.105',
  },
  {
    id: 6,
    timestamp: '27 Apr 2026, 17:15:09',
    user: 'Dina Ningsih',
    userInitials: 'DN',
    role: 'Staff',
    action: 'Document Viewed',
    icon: Eye,
    severity: 'info',
    module: 'Surat Masuk',
    detail: 'Melihat surat masuk #SM-2026-0398 — Undangan Rapat Koordinasi',
    ip: '192.168.1.42',
  },
  {
    id: 7,
    timestamp: '27 Apr 2026, 16:50:27',
    user: 'Siti Surya',
    userInitials: 'SS',
    role: 'Admin Persuratan',
    action: 'Document Edited',
    icon: Edit3,
    severity: 'warning',
    module: 'Surat Keluar',
    detail: 'Mengedit draft surat keluar #SK-2026-0201 — perubahan pada perihal',
    ip: '192.168.1.87',
  },
  {
    id: 8,
    timestamp: '27 Apr 2026, 16:12:44',
    user: 'Ahmad Hidayat',
    userInitials: 'AH',
    role: 'Super Admin',
    action: 'Config Changed',
    icon: Settings,
    severity: 'warning',
    module: 'System',
    detail: 'Mengubah konfigurasi sistem — auto-archive diaktifkan setelah 90 hari',
    ip: '192.168.1.105',
  },
  {
    id: 9,
    timestamp: '27 Apr 2026, 15:30:18',
    user: 'Budi Wibowo',
    userInitials: 'BW',
    role: 'Reviewer',
    action: 'Document Deleted',
    icon: Trash2,
    severity: 'danger',
    module: 'Arsip Digital',
    detail: 'Menghapus draft dokumen yang sudah expired — batch 12 file',
    ip: '10.0.0.54',
  },
  {
    id: 10,
    timestamp: '27 Apr 2026, 14:55:02',
    user: 'Siti Surya',
    userInitials: 'SS',
    role: 'Admin Persuratan',
    action: 'Logout',
    icon: LogOut,
    severity: 'info',
    module: 'Authentication',
    detail: 'Logout dari sesi aktif',
    ip: '192.168.1.87',
  },
];

const SystemLogs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState('All Severity');
  const [selectedModule, setSelectedModule] = useState('All Modules');
  const [expandedLog, setExpandedLog] = useState(null);

  const filteredLogs = logsData.filter(log => {
    const matchSearch = 
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.detail.toLowerCase().includes(searchQuery.toLowerCase());
    const matchSeverity = selectedSeverity === 'All Severity' || log.severity === selectedSeverity.toLowerCase();
    const matchModule = selectedModule === 'All Modules' || log.module === selectedModule;
    return matchSearch && matchSeverity && matchModule;
  });

  const severityCounts = {
    info: logsData.filter(l => l.severity === 'info').length,
    success: logsData.filter(l => l.severity === 'success').length,
    warning: logsData.filter(l => l.severity === 'warning').length,
    danger: logsData.filter(l => l.severity === 'danger').length,
  };

  return (
    <div className="sl-container">
      {/* Page Header */}
      <div className="sl-page-header">
        <div>
          <h1 className="sl-title">System Logs</h1>
          <p className="sl-subtitle">Monitor all system activities, user actions, and security events.</p>
        </div>
        <div className="sl-header-actions">
          <button className="sl-btn-outline">
            <RefreshCw size={14} />
            Refresh
          </button>
          <button className="sl-btn-outline">
            <Download size={14} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="sl-stats">
        <div className="sl-stat-card">
          <div className="sl-stat-icon info"><Info size={18} /></div>
          <div className="sl-stat-data">
            <span className="sl-stat-value">{severityCounts.info}</span>
            <span className="sl-stat-label">Info</span>
          </div>
        </div>
        <div className="sl-stat-card">
          <div className="sl-stat-icon success"><CheckCircle2 size={18} /></div>
          <div className="sl-stat-data">
            <span className="sl-stat-value">{severityCounts.success}</span>
            <span className="sl-stat-label">Success</span>
          </div>
        </div>
        <div className="sl-stat-card">
          <div className="sl-stat-icon warning"><AlertTriangle size={18} /></div>
          <div className="sl-stat-data">
            <span className="sl-stat-value">{severityCounts.warning}</span>
            <span className="sl-stat-label">Warning</span>
          </div>
        </div>
        <div className="sl-stat-card">
          <div className="sl-stat-icon danger"><XCircle size={18} /></div>
          <div className="sl-stat-data">
            <span className="sl-stat-value">{severityCounts.danger}</span>
            <span className="sl-stat-label">Error</span>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="sl-filter-bar">
        <div className="sl-search-box">
          <Search size={15} className="sl-search-icon" />
          <input
            type="text"
            placeholder="Search logs by user, action, or detail..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="sl-search-input"
          />
        </div>
        <div className="sl-filter-dropdowns">
          <div className="sl-select-wrapper">
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="sl-select"
            >
              <option>All Severity</option>
              <option>Info</option>
              <option>Success</option>
              <option>Warning</option>
              <option>Danger</option>
            </select>
            <ChevronDown size={14} className="sl-select-arrow" />
          </div>
          <div className="sl-select-wrapper">
            <select
              value={selectedModule}
              onChange={(e) => setSelectedModule(e.target.value)}
              className="sl-select"
            >
              <option>All Modules</option>
              <option>Authentication</option>
              <option>User Management</option>
              <option>Surat Masuk</option>
              <option>Surat Keluar</option>
              <option>Arsip Digital</option>
              <option>System</option>
            </select>
            <ChevronDown size={14} className="sl-select-arrow" />
          </div>
        </div>
      </div>

      {/* Log Entries */}
      <div className="sl-log-list">
        {filteredLogs.length === 0 ? (
          <EmptyState type="search" title="Tidak ada log ditemukan" desc="Coba ubah filter atau kata kunci pencarian Anda." />
        ) : (
          filteredLogs.map(log => {
            const IconComp = log.icon;
            const isExpanded = expandedLog === log.id;
            return (
              <div 
                key={log.id} 
                className={`sl-log-entry ${isExpanded ? 'expanded' : ''}`}
                onClick={() => setExpandedLog(isExpanded ? null : log.id)}
              >
                <div className="sl-log-main">
                  <div className={`sl-log-severity-bar ${log.severity}`}></div>
                  <div className={`sl-log-icon ${log.severity}`}>
                    <IconComp size={16} />
                  </div>
                  <div className="sl-log-body">
                    <div className="sl-log-top-row">
                      <span className="sl-log-action">{log.action}</span>
                      <span className={`sl-log-severity-badge ${log.severity}`}>
                        {log.severity === 'danger' ? 'Error' : log.severity.charAt(0).toUpperCase() + log.severity.slice(1)}
                      </span>
                    </div>
                    <p className="sl-log-detail">{log.detail}</p>
                    <div className="sl-log-meta">
                      <div className="sl-log-user-tag">
                        <span className="sl-log-avatar">{log.userInitials}</span>
                        <span>{log.user}</span>
                      </div>
                      <span className="sl-log-module">{log.module}</span>
                      <span className="sl-log-time">{log.timestamp}</span>
                    </div>
                  </div>
                </div>
                {isExpanded && (
                  <div className="sl-log-expanded">
                    <div className="sl-log-detail-grid">
                      <div className="sl-log-detail-item">
                        <span className="sl-log-detail-label">User</span>
                        <span className="sl-log-detail-value">{log.user} ({log.role})</span>
                      </div>
                      <div className="sl-log-detail-item">
                        <span className="sl-log-detail-label">IP Address</span>
                        <span className="sl-log-detail-value">{log.ip}</span>
                      </div>
                      <div className="sl-log-detail-item">
                        <span className="sl-log-detail-label">Module</span>
                        <span className="sl-log-detail-value">{log.module}</span>
                      </div>
                      <div className="sl-log-detail-item">
                        <span className="sl-log-detail-label">Timestamp</span>
                        <span className="sl-log-detail-value">{log.timestamp}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Pagination */}
      <div className="sl-pagination">
        <span className="sl-pagination-info">Showing {filteredLogs.length} of {logsData.length} log entries</span>
        <div className="sl-pagination-controls">
          <button className="sl-page-btn" disabled>Prev</button>
          <button className="sl-page-btn active">1</button>
          <button className="sl-page-btn">2</button>
          <button className="sl-page-btn">3</button>
          <button className="sl-page-btn">Next</button>
        </div>
      </div>
    </div>
  );
};

export default SystemLogs;
