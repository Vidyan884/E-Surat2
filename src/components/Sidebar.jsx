import React, { useState } from 'react';
import { 
  LayoutDashboard, Mail, Users, Settings, FileText, Plus,
  Scale, Gavel, GitMerge, Archive, HelpCircle, LogOut, Building2, CheckSquare
} from 'lucide-react';
import ConfirmModal from './ConfirmModal';

const Sidebar = ({ activeTab, setActiveTab, onLogout, isOpen, role }) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const logoutModal = (
    <ConfirmModal
      isOpen={showLogoutModal}
      onClose={() => setShowLogoutModal(false)}
      onConfirm={() => onLogout && onLogout()}
      title="Keluar dari Sistem?"
      message="Anda yakin ingin logout? Sesi aktif Anda akan berakhir."
      confirmText="Ya, Logout"
      cancelText="Batal"
      type="warning"
    />
  );

  const handleLogoutClick = (e) => {
    e.preventDefault();
    setShowLogoutModal(true);
  };

  const NavItem = ({ id, icon: Icon, label, activeIds }) => {
    const isActive = activeIds ? activeIds.includes(activeTab) : activeTab === id;
    return (
      <li className="relative">
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); setActiveTab(id); }} 
          className={`flex items-center px-6 py-2.5 gap-3 text-sm transition-all group ${
            isActive 
              ? 'bg-white text-emerald-800 font-semibold' 
              : 'text-slate-500 hover:bg-slate-100 hover:text-emerald-800 font-medium'
          }`}
        >
          {isActive && (
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-700 rounded-r-md"></div>
          )}
          <Icon size={18} className={`shrink-0 transition-colors ${isActive ? 'text-emerald-700' : 'text-slate-400 group-hover:text-emerald-700'}`} />
          <span>{label}</span>
        </a>
      </li>
    );
  };

  const BottomLink = ({ icon: Icon, label, onClick }) => (
    <a 
      href="#" 
      onClick={onClick} 
      className="flex items-center px-2 py-2.5 gap-3 text-sm font-medium text-slate-500 hover:text-emerald-800 hover:bg-slate-100 rounded-md transition-all"
    >
      <Icon size={18} className="shrink-0 text-slate-400 group-hover:text-emerald-700" />
      <span>{label}</span>
    </a>
  );

  const sidebarClasses = `w-[260px] bg-white h-full flex flex-col border-r border-slate-200 transition-transform duration-300 fixed md:relative z-[3000] ${
    isOpen ? 'translate-x-0 shadow-2xl md:shadow-none' : '-translate-x-full md:translate-x-0'
  }`;

  // ── Role-based UI Configuration ──
  let brandTitle = "UNIA Admin";
  let brandSubtitle = "Official Portal";
  
  if (role === 'biro-hukum') {
    brandTitle = "Biro Hukum";
    brandSubtitle = "Administrasi Pusat";
  } else if (['pimpinan', 'pimpinan-unit'].includes(role)) {
    brandTitle = "Executive Portal";
    brandSubtitle = role === 'pimpinan' ? "Universitas" : "Fakultas / Unit";
  } else if (['staf-pelaksana', 'admin-pusat'].includes(role)) {
    brandTitle = "Administrasi Surat";
    brandSubtitle = role === 'admin-pusat' ? "Sekretariat Pusat" : "Staf Pelaksana";
  } else if (role === 'legal') {
    brandTitle = "Legal Services";
    brandSubtitle = "Academic Affairs";
  }

  let showCta = false;
  let ctaText = "";
  let ctaTarget = "";

  if (['admin-teknis', 'admin-pusat', 'staf-pelaksana', 'admin'].includes(role)) {
    showCta = true;
    ctaText = "Buat Surat Keluar";
    ctaTarget = "buat-surat-keluar";
  } else if (['biro-hukum', 'legal'].includes(role)) {
    showCta = true;
    ctaText = "Buat Produk Hukum";
    ctaTarget = "buat-produk-hukum";
  }

  // Use specialized dashboards if necessary
  const dashboardId = ['biro-hukum', 'legal'].includes(role) ? 'bh-dashboard' : 'dashboard';

  return (
    <div className={sidebarClasses}>
      <div className="h-16 flex items-center px-6 gap-3 border-b border-slate-200 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center shrink-0 overflow-hidden p-0.5">
          <img src="/logo.png" alt="UNIA Logo" className="w-full h-full object-contain" />
        </div>
        <div>
          <h1 className="text-[15px] font-bold text-emerald-900 leading-tight tracking-tight">{brandTitle}</h1>
          <p className="text-[11px] text-slate-500">{brandSubtitle}</p>
        </div>
      </div>

      {showCta && (
        <div className="p-4">
          <button onClick={() => setActiveTab(ctaTarget)} className="w-full bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg py-2.5 flex items-center justify-center gap-2 text-sm font-semibold transition-colors shadow-sm">
            <Plus size={16} />
            {ctaText}
          </button>
        </div>
      )}

      <nav className="flex-1 overflow-y-auto py-2">
        <ul className="flex flex-col gap-0.5">
          <NavItem id={dashboardId} activeIds={['dashboard', 'bh-dashboard']} icon={LayoutDashboard} label="Dashboard" />
          
          {['admin-teknis', 'admin', 'admin-pusat', 'pimpinan', 'pimpinan-unit'].includes(role) && (
            <NavItem id="surat-masuk" activeIds={['surat-masuk', 'surat-detail', 'buat-surat-masuk']} icon={Mail} label="Surat Masuk" />
          )}

          {['admin-teknis', 'admin', 'admin-pusat', 'staf-pelaksana'].includes(role) && (
            <NavItem id="surat-keluar" activeIds={['surat-keluar', 'surat-keluar-detail', 'buat-surat-keluar']} icon={FileText} label="Surat Keluar" />
          )}

          {['admin-teknis', 'admin', 'biro-hukum', 'legal'].includes(role) && (
            <NavItem id="buat-produk-hukum" activeIds={['bh-produk-hukum', 'buat-produk-hukum']} icon={Scale} label="Produk Hukum" />
          )}

          {['admin-teknis', 'admin', 'biro-hukum', 'legal'].includes(role) && (
            <NavItem id="harmonisasi-review" activeIds={['bh-harmonisasi', 'harmonisasi-review', 'harmonization']} icon={GitMerge} label="Harmonisasi" />
          )}

          {['admin-teknis', 'admin', 'pimpinan', 'pimpinan-unit'].includes(role) && (
            <NavItem id="persetujuan-akhir" icon={CheckSquare} label="Persetujuan Akhir" />
          )}

          {['admin-teknis', 'admin', 'biro-hukum', 'legal'].includes(role) && (
            <NavItem id="bh-arsip-digital" activeIds={['bh-arsip-digital', 'digital-archive', 'arsip-digital']} icon={Archive} label="Arsip Digital" />
          )}

          {['admin-teknis', 'admin'].includes(role) && (
            <>
              <NavItem id="user-management" activeIds={['user-management', 'user-detail']} icon={Users} label="User Management" />
              <NavItem id="template-management" icon={FileText} label="Template & Kop" />
              <NavItem id="role-config" icon={Settings} label="Role Config" />
              <NavItem id="system-logs" icon={FileText} label="System Logs" />
            </>
          )}

          {/* Fallback for legal mode decrees tab if needed */}
          {role === 'legal' && (
            <NavItem id="decrees" icon={Gavel} label="Decrees" />
          )}
        </ul>
      </nav>

      <div className="py-3 mx-4 border-t border-slate-200 flex flex-col">
        <BottomLink icon={HelpCircle} label={['biro-hukum', 'legal'].includes(role) ? "Help Center" : "Tracking Publik"} onClick={(e) => { e.preventDefault(); setActiveTab('tracking'); }} />
        <BottomLink icon={LogOut} label="Logout" onClick={handleLogoutClick} />
      </div>
      {logoutModal}
    </div>
  );
};

export default Sidebar;
