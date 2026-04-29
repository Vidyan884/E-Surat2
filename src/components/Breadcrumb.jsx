import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

const breadcrumbMap = {
  'dashboard': [{ label: 'Dashboard' }],
  'surat-masuk': [{ label: 'Dashboard', tab: 'dashboard' }, { label: 'Inbox' }],
  'surat-detail': [{ label: 'Dashboard', tab: 'dashboard' }, { label: 'Inbox', tab: 'surat-masuk' }, { label: 'Detail Surat' }],
  'surat-keluar': [{ label: 'Dashboard', tab: 'dashboard' }, { label: 'Surat Keluar' }],
  'surat-keluar-detail': [{ label: 'Dashboard', tab: 'dashboard' }, { label: 'Surat Keluar', tab: 'surat-keluar' }, { label: 'Verifikasi' }],
  'user-management': [{ label: 'Dashboard', tab: 'dashboard' }, { label: 'User Management' }],
  'user-detail': [{ label: 'Dashboard', tab: 'dashboard' }, { label: 'User Management', tab: 'user-management' }, { label: 'Detail User' }],
  'role-config': [{ label: 'Dashboard', tab: 'dashboard' }, { label: 'Role Config' }],
  'system-logs': [{ label: 'Dashboard', tab: 'dashboard' }, { label: 'System Logs' }],
  'persetujuan-akhir': [{ label: 'Dashboard', tab: 'dashboard' }, { label: 'Persetujuan Akhir' }],
  'bh-dashboard': [{ label: 'Biro Hukum' }],
  'buat-produk-hukum': [{ label: 'Biro Hukum', tab: 'bh-dashboard' }, { label: 'Buat Produk Hukum' }],
  'harmonisasi-review': [{ label: 'Biro Hukum', tab: 'bh-dashboard' }, { label: 'Harmonisasi Review' }],
  'bh-pengaturan': [{ label: 'Biro Hukum', tab: 'bh-dashboard' }, { label: 'Pengaturan' }],
  'bh-arsip-digital': [{ label: 'Biro Hukum', tab: 'bh-dashboard' }, { label: 'Arsip Digital' }],
};

const Breadcrumb = ({ activeTab, setActiveTab }) => {
  const crumbs = breadcrumbMap[activeTab];
  if (!crumbs || crumbs.length <= 1) return null;

  return (
    <nav className="py-3 px-4 md:px-6 mt-1" aria-label="Breadcrumb">
      <ol className="flex items-center flex-wrap gap-1">
        <li className="flex items-center">
          <button 
            className="flex items-center text-slate-500 hover:text-emerald-700 transition-colors p-1 rounded hover:bg-emerald-50" 
            onClick={() => setActiveTab(crumbs[0].tab || 'dashboard')}
            aria-label="Home"
          >
            <Home size={16} />
          </button>
        </li>
        {crumbs.map((crumb, idx) => (
          <li key={idx} className="flex items-center">
            <ChevronRight size={16} className="text-slate-400 mx-1" />
            {crumb.tab ? (
              <button 
                className="text-sm font-medium text-slate-500 hover:text-emerald-700 hover:underline underline-offset-4 transition-all" 
                onClick={() => setActiveTab(crumb.tab)}
              >
                {crumb.label}
              </button>
            ) : (
              <span className="text-sm font-semibold text-emerald-800">{crumb.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
