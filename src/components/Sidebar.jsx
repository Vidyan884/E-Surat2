import React, { useState } from 'react';
import { 
  LayoutDashboard, Mail, Users, Settings, FileText, Plus,
  Scale, Gavel, GitMerge, Archive, HelpCircle, LogOut, Building2, CheckSquare
} from 'lucide-react';
import ConfirmModal from './ConfirmModal';

const legalTabs = ['regulations', 'decrees', 'harmonization', 'digital-archive', 'persetujuan-akhir'];
const biroHukumTabs = ['bh-dashboard', 'bh-produk-hukum', 'buat-produk-hukum', 'bh-harmonisasi', 'harmonisasi-review', 'bh-arsip-digital', 'bh-pengaturan', 'persetujuan-akhir'];

const Sidebar = ({ activeTab, setActiveTab, onLogout, isOpen, role }) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const isLegalMode = legalTabs.includes(activeTab) || role === 'legal';
  const isBiroHukumMode = biroHukumTabs.includes(activeTab) || role === 'biro-hukum';

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

  // ── Biro Hukum Mode ──
  if (isBiroHukumMode) {
    return (
      <div className={sidebarClasses}>
        <div className="h-16 flex items-center px-6 gap-3 border-b border-slate-200 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center shrink-0 overflow-hidden p-0.5">
            <img src="/logo.png" alt="UNIA Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <h1 className="text-[15px] font-bold text-emerald-900 leading-tight tracking-tight">Biro Hukum</h1>
            <p className="text-[11px] text-slate-500">Administrasi Pusat</p>
          </div>
        </div>

        <div className="p-4">
          <button onClick={() => setActiveTab('buat-produk-hukum')} className="w-full bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg py-2.5 flex items-center justify-center gap-2 text-sm font-semibold transition-colors shadow-sm">
            <Plus size={16} />
            Buat Dokumen Baru
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-2">
          <ul className="flex flex-col gap-0.5">
            <NavItem id="bh-dashboard" icon={LayoutDashboard} label="Dashboard" />
            <NavItem id="buat-produk-hukum" activeIds={['bh-produk-hukum', 'buat-produk-hukum', 'harmonisasi-review']} icon={FileText} label="Produk Hukum" />
            <NavItem id="harmonisasi-review" activeIds={['bh-harmonisasi', 'harmonisasi-review']} icon={GitMerge} label="Harmonisasi" />
            <NavItem id="persetujuan-akhir" icon={CheckSquare} label="Persetujuan Akhir" />
            <NavItem id="bh-arsip-digital" icon={Archive} label="Arsip Digital" />
            <NavItem id="bh-pengaturan" icon={Settings} label="Pengaturan" />
          </ul>
        </nav>

        <div className="py-3 mx-4 border-t border-slate-200 flex flex-col">
          <BottomLink icon={LayoutDashboard} label="Admin Panel" onClick={(e) => { e.preventDefault(); setActiveTab('dashboard'); }} />
          <BottomLink icon={LogOut} label="Logout" onClick={handleLogoutClick} />
        </div>
        {logoutModal}
      </div>
    );
  }

  // ── Legal Services Mode ──
  if (isLegalMode) {
    return (
      <div className={sidebarClasses}>
        <div className="h-16 flex items-center px-6 gap-3 border-b border-slate-200 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center shrink-0 overflow-hidden p-0.5">
            <img src="/logo.png" alt="UNIA Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <h1 className="text-[15px] font-bold text-emerald-900 leading-tight tracking-tight">Legal Services</h1>
            <p className="text-[11px] text-slate-500">Academic Affairs</p>
          </div>
        </div>

        <div className="p-4">
          <button className="w-full bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg py-2.5 flex items-center justify-center gap-2 text-sm font-semibold transition-colors shadow-sm">
            <Plus size={16} />
            New Document
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-2">
          <ul className="flex flex-col gap-0.5">
            <NavItem id="dashboard" icon={LayoutDashboard} label="Dashboard" />
            <NavItem id="persetujuan-akhir" activeIds={['regulations', 'persetujuan-akhir']} icon={Scale} label="Regulations" />
            <NavItem id="decrees" icon={Gavel} label="Decrees" />
            <NavItem id="harmonization" icon={GitMerge} label="Harmonization" />
            <NavItem id="digital-archive" icon={Archive} label="Digital Archive" />
          </ul>
        </nav>

        <div className="py-3 mx-4 border-t border-slate-200 flex flex-col">
          <BottomLink icon={HelpCircle} label="Help Center" onClick={(e) => e.preventDefault()} />
          <BottomLink icon={LogOut} label="Logout" onClick={handleLogoutClick} />
        </div>
        {logoutModal}
      </div>
    );
  }

  // ── Admin Mode ──
  return (
    <div className={sidebarClasses}>
      <div className="h-16 flex items-center px-6 gap-3 border-b border-slate-200 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center shrink-0 overflow-hidden p-0.5">
          <img src="/logo.png" alt="UNIA Logo" className="w-full h-full object-contain" />
        </div>
        <div>
          <h1 className="text-[15px] font-bold text-emerald-900 leading-tight tracking-tight">UNIA Admin</h1>
          <p className="text-[11px] text-slate-500">Official Portal</p>
        </div>
      </div>

      <div className="p-4">
        <button onClick={() => setActiveTab('buat-surat-keluar')} className="w-full bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg py-2.5 flex items-center justify-center gap-2 text-sm font-semibold transition-colors shadow-sm">
          <Plus size={16} />
          Buat Surat Keluar
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-2">
        <ul className="flex flex-col gap-0.5">
          <NavItem id="dashboard" icon={LayoutDashboard} label="Dashboard" />
          <NavItem id="surat-masuk" activeIds={['surat-masuk', 'surat-detail', 'surat-keluar', 'surat-keluar-detail']} icon={Mail} label="Inbox" />
          <NavItem id="user-management" activeIds={['user-management', 'user-detail']} icon={Users} label="User Management" />
          <NavItem id="role-config" icon={Settings} label="Role Config" />
          <NavItem id="system-logs" icon={FileText} label="System Logs" />
          <NavItem id="persetujuan-akhir" icon={CheckSquare} label="Persetujuan Akhir" />
        </ul>
      </nav>

      <div className="py-3 mx-4 border-t border-slate-200 flex flex-col">
        <BottomLink icon={Building2} label="Biro Hukum" onClick={(e) => { e.preventDefault(); setActiveTab('bh-dashboard'); }} />
        <BottomLink icon={HelpCircle} label="Tracking Publik" onClick={(e) => { e.preventDefault(); setActiveTab('tracking'); }} />
        <BottomLink icon={LogOut} label="Logout" onClick={handleLogoutClick} />
      </div>
      {logoutModal}
    </div>
  );
};

export default Sidebar;
