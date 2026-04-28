import React, { useState } from 'react';
import { 
  LayoutDashboard, Mail, Users, Settings, FileText, Plus,
  Scale, Gavel, GitMerge, Archive, HelpCircle, LogOut, Building2, CheckSquare
} from 'lucide-react';
import ConfirmModal from './ConfirmModal';
import './Sidebar.css';

const legalTabs = ['regulations', 'decrees', 'harmonization', 'digital-archive', 'persetujuan-akhir'];
const biroHukumTabs = ['bh-dashboard', 'bh-produk-hukum', 'buat-produk-hukum', 'bh-harmonisasi', 'harmonisasi-review', 'bh-arsip-digital', 'bh-pengaturan', 'persetujuan-akhir'];

const Sidebar = ({ activeTab, setActiveTab, onLogout, isOpen }) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const isLegalMode = legalTabs.includes(activeTab);
  const isBiroHukumMode = biroHukumTabs.includes(activeTab);

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

  // ── Biro Hukum Mode ──
  if (isBiroHukumMode) {
    return (
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-logo">
          <div className="logo-icon-bh">
            <span>BH</span>
          </div>
          <div className="logo-text">
            <h1>Biro Hukum</h1>
            <p>Administrasi Pusat</p>
          </div>
        </div>

        <div className="sidebar-top-action">
          <button className="btn-create-user" onClick={() => setActiveTab('buat-produk-hukum')}>
            <Plus size={16} />
            Buat Dokumen Baru
          </button>
        </div>

        <nav className="sidebar-nav">
          <ul>
            <li className={`nav-item ${activeTab === 'bh-dashboard' ? 'active' : ''}`}>
              <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('bh-dashboard'); }} title="Dashboard">
                <LayoutDashboard size={18} className="nav-icon" />
                <span>Dashboard</span>
              </a>
            </li>
            <li className={`nav-item ${activeTab === 'bh-produk-hukum' || activeTab === 'buat-produk-hukum' || activeTab === 'harmonisasi-review' ? 'active' : ''}`}>
              <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('buat-produk-hukum'); }} title="Produk Hukum">
                <FileText size={18} className="nav-icon" />
                <span>Produk Hukum</span>
              </a>
            </li>
            <li className={`nav-item ${activeTab === 'bh-harmonisasi' ? 'active' : ''}`}>
              <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('harmonisasi-review'); }} title="Harmonisasi">
                <GitMerge size={18} className="nav-icon" />
                <span>Harmonisasi</span>
              </a>
            </li>
            <li className={`nav-item ${activeTab === 'persetujuan-akhir' ? 'active' : ''}`}>
              <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('persetujuan-akhir'); }} title="Persetujuan Akhir">
                <CheckSquare size={18} className="nav-icon" />
                <span>Persetujuan Akhir</span>
              </a>
            </li>
            <li className={`nav-item ${activeTab === 'bh-arsip-digital' ? 'active' : ''}`}>
              <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('bh-arsip-digital'); }} title="Arsip Digital">
                <Archive size={18} className="nav-icon" />
                <span>Arsip Digital</span>
              </a>
            </li>
            <li className={`nav-item ${activeTab === 'bh-pengaturan' ? 'active' : ''}`}>
              <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('bh-pengaturan'); }} title="Pengaturan">
                <Settings size={18} className="nav-icon" />
                <span>Pengaturan</span>
              </a>
            </li>
          </ul>
        </nav>

        <div className="sidebar-bottom-links">
          <a href="#" className="sidebar-bottom-link" onClick={(e) => { e.preventDefault(); setActiveTab('dashboard'); }} title="Admin Panel">
            <LayoutDashboard size={18} className="nav-icon" />
            <span>Admin Panel</span>
          </a>
          <a href="#" className="sidebar-bottom-link" onClick={handleLogoutClick} title="Logout">
            <LogOut size={18} className="nav-icon" />
            <span>Logout</span>
          </a>
        </div>
        {logoutModal}
      </div>
    );
  }

  // ── Legal Services Mode ──
  if (isLegalMode) {
    return (
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-logo">
          <div className="logo-icon-legal">
            <Building2 size={18} />
          </div>
          <div className="logo-text">
            <h1>Legal Services</h1>
            <p>Academic Affairs</p>
          </div>
        </div>

        <div className="sidebar-top-action">
          <button className="btn-create-user">
            <Plus size={16} />
            New Document
          </button>
        </div>

        <nav className="sidebar-nav">
          <ul>
            <li className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}>
              <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('dashboard'); }} title="Dashboard">
                <LayoutDashboard size={18} className="nav-icon" />
                <span>Dashboard</span>
              </a>
            </li>
            <li className={`nav-item ${activeTab === 'regulations' || activeTab === 'persetujuan-akhir' ? 'active' : ''}`}>
              <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('persetujuan-akhir'); }} title="Regulations">
                <Scale size={18} className="nav-icon" />
                <span>Regulations</span>
              </a>
            </li>
            <li className={`nav-item ${activeTab === 'decrees' ? 'active' : ''}`}>
              <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('decrees'); }} title="Decrees">
                <Gavel size={18} className="nav-icon" />
                <span>Decrees</span>
              </a>
            </li>
            <li className={`nav-item ${activeTab === 'harmonization' ? 'active' : ''}`}>
              <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('harmonization'); }} title="Harmonization">
                <GitMerge size={18} className="nav-icon" />
                <span>Harmonization</span>
              </a>
            </li>
            <li className={`nav-item ${activeTab === 'digital-archive' ? 'active' : ''}`}>
              <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('digital-archive'); }} title="Digital Archive">
                <Archive size={18} className="nav-icon" />
                <span>Digital Archive</span>
              </a>
            </li>
          </ul>
        </nav>

        <div className="sidebar-bottom-links">
          <a href="#" className="sidebar-bottom-link" onClick={(e) => e.preventDefault()} title="Help Center">
            <HelpCircle size={18} className="nav-icon" />
            <span>Help Center</span>
          </a>
          <a href="#" className="sidebar-bottom-link" onClick={handleLogoutClick} title="Logout">
            <LogOut size={18} className="nav-icon" />
            <span>Logout</span>
          </a>
        </div>
        {logoutModal}
      </div>
    );
  }

  // ── Admin Mode ──
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-logo">
        <div className="logo-text">
          <h1>UNIA Admin</h1>
          <p>Official Portal</p>
        </div>
      </div>

      <div className="sidebar-top-action">
        <button className="btn-create-user" onClick={() => setActiveTab('user-management')}>
          <Plus size={16} />
          Create New User
        </button>
      </div>

      <nav className="sidebar-nav">
        <ul>
          <li className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}>
            <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('dashboard'); }} title="Dashboard">
              <LayoutDashboard size={18} className="nav-icon" />
              <span>Dashboard</span>
            </a>
          </li>
          <li className={`nav-item ${['surat-masuk', 'surat-detail', 'surat-keluar', 'surat-keluar-detail'].includes(activeTab) ? 'active' : ''}`}>
            <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('surat-masuk'); }} title="Inbox">
              <Mail size={18} className="nav-icon" />
              <span>Inbox</span>
            </a>
          </li>
          <li className={`nav-item ${activeTab === 'user-management' || activeTab === 'user-detail' ? 'active' : ''}`}>
            <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('user-management'); }} title="User Management">
              <Users size={18} className="nav-icon" />
              <span>User Management</span>
            </a>
          </li>
          <li className={`nav-item ${activeTab === 'role-config' ? 'active' : ''}`}>
            <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('role-config'); }} title="Role Config">
              <Settings size={18} className="nav-icon" />
              <span>Role Config</span>
            </a>
          </li>
          <li className={`nav-item ${activeTab === 'system-logs' ? 'active' : ''}`}>
            <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('system-logs'); }} title="System Logs">
              <FileText size={18} className="nav-icon" />
              <span>System Logs</span>
            </a>
          </li>
          <li className={`nav-item ${activeTab === 'persetujuan-akhir' ? 'active' : ''}`}>
            <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('persetujuan-akhir'); }} title="Persetujuan Akhir">
              <CheckSquare size={18} className="nav-icon" />
              <span>Persetujuan Akhir</span>
            </a>
          </li>
        </ul>
      </nav>

      <div className="sidebar-bottom-links">
        <a href="#" className="sidebar-bottom-link" onClick={(e) => { e.preventDefault(); setActiveTab('bh-dashboard'); }} title="Biro Hukum">
          <Building2 size={18} className="nav-icon" />
          <span>Biro Hukum</span>
        </a>
        <a href="#" className="sidebar-bottom-link" onClick={(e) => { e.preventDefault(); setActiveTab('tracking'); }} title="Tracking Publik">
          <HelpCircle size={18} className="nav-icon" />
          <span>Tracking Publik</span>
        </a>
        <a href="#" className="sidebar-bottom-link" onClick={handleLogoutClick} title="Logout">
          <LogOut size={18} className="nav-icon" />
          <span>Logout</span>
        </a>
      </div>
      {logoutModal}
    </div>
  );
};

export default Sidebar;
