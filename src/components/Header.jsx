import React, { useState, useEffect } from 'react';
import { Search, Moon, Sun, HelpCircle, Menu } from 'lucide-react';
import NotificationDropdown from './NotificationDropdown';
import ProfileDropdown from './ProfileDropdown';

const legalTabs = ['regulations', 'decrees', 'harmonization', 'digital-archive'];
const biroHukumTabs = ['bh-dashboard', 'bh-produk-hukum', 'buat-produk-hukum', 'bh-harmonisasi', 'harmonisasi-review', 'bh-arsip-digital', 'bh-pengaturan', 'persetujuan-akhir'];

const Header = ({ activeTab, onToggleSidebar, role, setRole }) => {
  const isLegalMode = legalTabs.includes(activeTab) || role === 'legal';
  const isBiroHukumMode = biroHukumTabs.includes(activeTab) || role === 'biro-hukum';

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
    if (isBiroHukumMode || isLegalMode) return 'Cari Dokumen...';
    return 'Search system...';
  };

  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-4 md:px-6 sticky top-0 z-30 shrink-0">
      <div className="flex items-center gap-3">
        <button 
          className="md:hidden p-2 -ml-2 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors" 
          onClick={onToggleSidebar} 
          aria-label="Toggle menu"
        >
          <Menu size={22} />
        </button>
        <div className="hidden md:block text-xs font-semibold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-3 py-1.5 rounded-md border border-emerald-100">
          {getBrandName()}
        </div>
      </div>

      <div className="flex-1 flex justify-center px-4">
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full border border-transparent focus-within:border-emerald-300 focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(16,185,129,0.1)] transition-all w-full max-w-md">
          <Search className="text-slate-400 shrink-0" size={16} />
          <input 
            type="text" 
            placeholder={getPlaceholder()}
            className="bg-transparent border-none outline-none text-sm w-full placeholder:text-slate-400 text-slate-700"
          />
        </div>
      </div>

      <div className="flex items-center gap-1 md:gap-3 shrink-0">
        <button 
          className="p-2 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-full transition-colors"
          onClick={() => setDarkMode(!darkMode)}
          title={darkMode ? 'Light Mode' : 'Dark Mode'}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <NotificationDropdown />

        {(isLegalMode || isBiroHukumMode) && (
          <button className="hidden sm:block p-2 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-full transition-colors">
            <HelpCircle size={20} />
          </button>
        )}

        <ProfileDropdown role={role} setRole={setRole} />
      </div>
    </header>
  );
};

export default Header;
