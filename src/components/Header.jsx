import React, { useState, useEffect } from 'react';
import { Search, Moon, Sun, HelpCircle, Menu } from 'lucide-react';
import NotificationDropdown from './NotificationDropdown';
import ProfileDropdown from './ProfileDropdown';
import './Header.css';

const legalTabs = ['regulations', 'decrees', 'harmonization', 'digital-archive'];
const biroHukumTabs = ['bh-dashboard', 'bh-produk-hukum', 'buat-produk-hukum', 'bh-harmonisasi', 'harmonisasi-review', 'bh-arsip-digital', 'bh-pengaturan', 'persetujuan-akhir'];

const Header = ({ activeTab, onToggleSidebar }) => {
  const isLegalMode = legalTabs.includes(activeTab);
  const isBiroHukumMode = biroHukumTabs.includes(activeTab);

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('e-surat-theme') === 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    localStorage.setItem('e-surat-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const getBrandName = () => {
    if (isBiroHukumMode) return 'Sistem Produk Hukum';
    if (isLegalMode) return 'LegalDoc Manager';
    return 'UNIA Electronic Letter System';
  };

  const getPlaceholder = () => {
    if (isBiroHukumMode) return 'Cari Dokumen...';
    if (isLegalMode) return 'Cari Dokumen...';
    return 'Search system...';
  };

  return (
    <header className="header">
      <button className="hamburger-btn" onClick={onToggleSidebar} aria-label="Toggle menu">
        <Menu size={22} />
      </button>
      <div className="header-brand">
        {getBrandName()}
      </div>

      <div className="header-center">
        <div className="search-container">
          <Search className="search-icon" size={16} />
          <input 
            type="text" 
            placeholder={getPlaceholder()}
            className="search-input"
          />
        </div>
      </div>

      <div className="header-actions">
        <button 
          className="theme-toggle-btn"
          onClick={() => setDarkMode(!darkMode)}
          title={darkMode ? 'Light Mode' : 'Dark Mode'}
        >
          {darkMode ? <Sun size={20} className="header-icon" /> : <Moon size={20} className="header-icon" />}
        </button>

        <NotificationDropdown />

        {(isLegalMode || isBiroHukumMode) && (
          <HelpCircle className="header-icon" size={20} />
        )}

        <ProfileDropdown />
      </div>
    </header>
  );
};

export default Header;
