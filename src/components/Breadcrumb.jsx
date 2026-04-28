import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import './Breadcrumb.css';

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
    <nav className="breadcrumb-nav" aria-label="Breadcrumb">
      <ol className="breadcrumb-list">
        <li className="breadcrumb-item">
          <button className="breadcrumb-link home" onClick={() => setActiveTab(crumbs[0].tab || 'dashboard')}>
            <Home size={14} />
          </button>
        </li>
        {crumbs.map((crumb, idx) => (
          <li key={idx} className="breadcrumb-item">
            <ChevronRight size={14} className="breadcrumb-sep" />
            {crumb.tab ? (
              <button className="breadcrumb-link" onClick={() => setActiveTab(crumb.tab)}>
                {crumb.label}
              </button>
            ) : (
              <span className="breadcrumb-current">{crumb.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
