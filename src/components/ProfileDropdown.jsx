import React, { useState, useRef, useEffect } from 'react';
import { User, Settings, Shield, LogOut, ChevronDown } from 'lucide-react';
import './ProfileDropdown.css';

const ProfileDropdown = ({ onLogout }) => {
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
    <div className="profile-dropdown-wrapper" ref={ref}>
      <button className="profile-trigger" onClick={() => setIsOpen(!isOpen)}>
        <img 
          src="https://i.pravatar.cc/150?img=11" 
          alt="Profile"
          className="profile-trigger-img"
        />
        <ChevronDown size={14} className={`profile-chevron ${isOpen ? 'open' : ''}`} />
      </button>

      {isOpen && (
        <div className="profile-dropdown">
          <div className="profile-dropdown-header">
            <img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="profile-dd-avatar" />
            <div>
              <div className="profile-dd-name">Ahmad Hidayat</div>
              <div className="profile-dd-role">Super Admin</div>
            </div>
          </div>

          <div className="profile-dd-divider" />

          <button className="profile-dd-item" onClick={() => setIsOpen(false)}>
            <User size={16} />
            <span>Profil Saya</span>
          </button>
          <button className="profile-dd-item" onClick={() => setIsOpen(false)}>
            <Settings size={16} />
            <span>Pengaturan</span>
          </button>
          <button className="profile-dd-item" onClick={() => setIsOpen(false)}>
            <Shield size={16} />
            <span>Keamanan</span>
          </button>

          <div className="profile-dd-divider" />

          <button className="profile-dd-item danger" onClick={() => { setIsOpen(false); onLogout && onLogout(); }}>
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
