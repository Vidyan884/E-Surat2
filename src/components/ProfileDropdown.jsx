import React, { useState, useRef, useEffect } from 'react';
import { User, Settings, Shield, LogOut, ChevronDown } from 'lucide-react';

const ProfileDropdown = ({ onLogout, role, setRole }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button 
        className="flex items-center gap-1.5 md:gap-2 hover:bg-emerald-50 p-1 md:px-2 md:py-1.5 rounded-full md:rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/30" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <img 
          src="https://i.pravatar.cc/150?img=11" 
          alt="Profile"
          className="w-8 h-8 rounded-full object-cover border-2 border-emerald-100 shadow-sm"
        />
        <ChevronDown size={14} className={`text-slate-400 transition-transform hidden sm:block ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl shadow-slate-200/60 border border-slate-100 py-2 z-50 transform origin-top-right transition-all">
          <div className="px-4 py-2 border-b border-slate-100 flex items-center gap-3 mb-1">
            <img 
              src="https://i.pravatar.cc/150?img=11" 
              alt="Profile" 
              className="w-10 h-10 rounded-full object-cover border border-slate-200"
            />
            <div className="flex flex-col">
              <span className="text-sm font-bold text-slate-800">Ahmad Hidayat</span>
              <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md w-max mt-0.5">Super Admin</span>
            </div>
          </div>

          <button className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 flex items-center gap-3 transition-colors font-medium">
            <User size={16} className="text-slate-400" />
            Profil Saya
          </button>
          <button className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 flex items-center gap-3 transition-colors font-medium">
            <Settings size={16} className="text-slate-400" />
            Pengaturan
          </button>
          <button className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 flex items-center gap-3 transition-colors font-medium">
            <Shield size={16} className="text-slate-400" />
            Keamanan
          </button>

          <div className="my-1 border-t border-slate-100" />
          
          {/* Switch Role Section */}
          <div className="px-4 py-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Switch Role</span>
            <div className="flex flex-col gap-1">
              <button 
                onClick={() => { setRole('admin'); setIsOpen(false); }}
                className={`w-full text-left px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${role === 'admin' ? 'bg-emerald-100 text-emerald-700' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                Super Admin
              </button>
              <button 
                onClick={() => { setRole('biro-hukum'); setIsOpen(false); }}
                className={`w-full text-left px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${role === 'biro-hukum' ? 'bg-emerald-100 text-emerald-700' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                Biro Hukum
              </button>
              <button 
                onClick={() => { setRole('legal'); setIsOpen(false); }}
                className={`w-full text-left px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${role === 'legal' ? 'bg-emerald-100 text-emerald-700' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                Legal Services
              </button>
            </div>
          </div>

          <div className="my-1 border-t border-slate-100" />

          <button 
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors font-medium" 
            onClick={() => { setIsOpen(false); onLogout && onLogout(); }}
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
