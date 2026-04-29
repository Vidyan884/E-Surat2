import React, { useState } from 'react';
import { 
  Search, ChevronDown, Filter, Download, RefreshCw,
  LogIn, LogOut, FileText, UserPlus, Edit3, Trash2, 
  Shield, Settings, Eye, AlertTriangle, CheckCircle2, XCircle, Info
} from 'lucide-react';
import EmptyState from '../components/EmptyState';

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

  const getSeverityStyles = (severity) => {
    switch(severity) {
      case 'info': return { bar: 'bg-blue-500', iconBg: 'bg-blue-50 text-blue-600 border-blue-200', badge: 'bg-blue-100 text-blue-700 border-blue-200', text: 'Info' };
      case 'success': return { bar: 'bg-emerald-500', iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-200', badge: 'bg-emerald-100 text-emerald-700 border-emerald-200', text: 'Success' };
      case 'warning': return { bar: 'bg-orange-500', iconBg: 'bg-orange-50 text-orange-600 border-orange-200', badge: 'bg-orange-100 text-orange-700 border-orange-200', text: 'Warning' };
      case 'danger': return { bar: 'bg-red-500', iconBg: 'bg-red-50 text-red-600 border-red-200', badge: 'bg-red-100 text-red-700 border-red-200', text: 'Error' };
      default: return { bar: 'bg-slate-500', iconBg: 'bg-slate-50 text-slate-600 border-slate-200', badge: 'bg-slate-100 text-slate-700 border-slate-200', text: 'Unknown' };
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 w-full max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-60 pointer-events-none"></div>
        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">System Logs</h1>
          <p className="text-slate-500 mt-1.5 text-sm md:text-base max-w-lg">Monitor all system activities, user actions, and security events.</p>
        </div>
        <div className="relative z-10 flex items-center gap-3 w-full sm:w-auto shrink-0">
          <button className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl font-bold text-sm text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 hover:text-emerald-700 hover:border-emerald-200 transition-all flex items-center justify-center gap-2 shadow-sm">
            <RefreshCw size={16} />
            Refresh
          </button>
          <button className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl font-bold text-sm text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 hover:text-emerald-700 hover:border-emerald-200 transition-all flex items-center justify-center gap-2 shadow-sm">
            <Download size={16} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 border border-blue-200">
            <Info size={24} />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-slate-800 leading-none mb-1">{severityCounts.info}</span>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Info</span>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200">
            <CheckCircle2 size={24} />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-slate-800 leading-none mb-1">{severityCounts.success}</span>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Success</span>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 border border-orange-200">
            <AlertTriangle size={24} />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-slate-800 leading-none mb-1">{severityCounts.warning}</span>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Warning</span>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0 border border-red-200">
            <XCircle size={24} />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-slate-800 leading-none mb-1">{severityCounts.danger}</span>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Error</span>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search logs by user, action, or detail..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 transition-all"
          />
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-48 shrink-0">
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 appearance-none transition-all font-medium cursor-pointer"
            >
              <option>All Severity</option>
              <option value="info">Info</option>
              <option value="success">Success</option>
              <option value="warning">Warning</option>
              <option value="danger">Error</option>
            </select>
            <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
          <div className="relative w-full sm:w-48 shrink-0">
            <select
              value={selectedModule}
              onChange={(e) => setSelectedModule(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 appearance-none transition-all font-medium cursor-pointer"
            >
              <option>All Modules</option>
              <option>Authentication</option>
              <option>User Management</option>
              <option>Surat Masuk</option>
              <option>Surat Keluar</option>
              <option>Arsip Digital</option>
              <option>System</option>
            </select>
            <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Log Entries */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        {filteredLogs.length === 0 ? (
          <div className="p-8">
            <EmptyState type="search" title="Tidak ada log ditemukan" desc="Coba ubah filter atau kata kunci pencarian Anda." />
          </div>
        ) : (
          <div className="flex flex-col divide-y divide-slate-100">
            {filteredLogs.map(log => {
              const IconComp = log.icon;
              const isExpanded = expandedLog === log.id;
              const styles = getSeverityStyles(log.severity);
              
              return (
                <div 
                  key={log.id} 
                  className={`relative flex flex-col transition-all cursor-pointer ${isExpanded ? 'bg-slate-50' : 'bg-white hover:bg-slate-50'}`}
                  onClick={() => setExpandedLog(isExpanded ? null : log.id)}
                >
                  <div className={`absolute left-0 top-0 bottom-0 w-1 ${styles.bar}`}></div>
                  
                  <div className="p-4 md:p-5 pl-6 flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${styles.iconBg}`}>
                      <IconComp size={18} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 mb-1.5">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold text-slate-800">{log.action}</span>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${styles.badge}`}>
                            {styles.text}
                          </span>
                        </div>
                        <span className="text-xs font-medium text-slate-400 hidden sm:block">{log.timestamp}</span>
                      </div>
                      
                      <p className="text-sm text-slate-600 leading-relaxed mb-3 pr-4">{log.detail}</p>
                      
                      <div className="flex flex-wrap items-center gap-3 text-xs">
                        <div className="flex items-center gap-1.5 bg-slate-100 px-2 py-1 rounded-md border border-slate-200 w-max">
                          <span className="w-4 h-4 rounded-full bg-slate-300 text-slate-600 flex items-center justify-center font-bold text-[8px]">{log.userInitials}</span>
                          <span className="font-semibold text-slate-700">{log.user}</span>
                        </div>
                        <span className="font-semibold text-slate-500 bg-slate-100 border border-slate-200 px-2 py-1 rounded-md">{log.module}</span>
                        <span className="font-medium text-slate-400 sm:hidden">{log.timestamp}</span>
                      </div>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="pl-20 pr-5 pb-5">
                      <div className="bg-white rounded-xl border border-slate-200 p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 shadow-sm">
                        <div className="flex flex-col gap-1">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">User</span>
                          <span className="text-sm font-semibold text-slate-800">{log.user} <span className="text-slate-500 font-medium">({log.role})</span></span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">IP Address</span>
                          <span className="text-sm font-mono font-semibold text-slate-800 bg-slate-100 px-2 py-0.5 rounded w-max border border-slate-200">{log.ip}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Module</span>
                          <span className="text-sm font-semibold text-slate-800">{log.module}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Timestamp</span>
                          <span className="text-sm font-semibold text-slate-800">{log.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="p-4 border border-slate-200 rounded-xl bg-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <span className="text-sm text-slate-500">
          Showing <strong className="text-slate-800">{filteredLogs.length}</strong> of <strong className="text-slate-800">{logsData.length}</strong> log entries
        </span>
        <div className="flex items-center gap-2">
          <button className="px-4 py-1.5 rounded-lg border bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed text-sm font-semibold transition-colors">Prev</button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border bg-emerald-600 border-emerald-600 text-white text-sm font-semibold transition-colors">1</button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-emerald-600 text-sm font-semibold transition-colors">2</button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-emerald-600 text-sm font-semibold transition-colors">3</button>
          <button className="px-4 py-1.5 rounded-lg border bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-emerald-600 text-sm font-semibold transition-colors">Next</button>
        </div>
      </div>
    </div>
  );
};

export default SystemLogs;
