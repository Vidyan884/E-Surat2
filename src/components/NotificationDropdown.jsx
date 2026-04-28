import React, { useState, useRef, useEffect } from 'react';
import { Bell, FileText, GitMerge, UserPlus, CheckCircle2, Clock } from 'lucide-react';
import './NotificationDropdown.css';

const notifications = [
  {
    id: 1,
    icon: FileText,
    iconBg: 'blue',
    title: 'Surat masuk baru',
    desc: 'Surat dari Kementerian Pendidikan telah diregistrasi.',
    time: '5 menit lalu',
    unread: true,
  },
  {
    id: 2,
    icon: GitMerge,
    iconBg: 'yellow',
    title: 'Harmonisasi selesai',
    desc: 'Peraturan Rektor tentang Pedoman Akademik 2024 siap direview.',
    time: '32 menit lalu',
    unread: true,
  },
  {
    id: 3,
    icon: CheckCircle2,
    iconBg: 'green',
    title: 'Disposisi disetujui',
    desc: 'Disposisi surat #SM-2026-0412 telah disetujui oleh Wakil Rektor.',
    time: '1 jam lalu',
    unread: true,
  },
  {
    id: 4,
    icon: UserPlus,
    iconBg: 'purple',
    title: 'User baru terdaftar',
    desc: 'Rina Maharani (Staff HRD) telah ditambahkan ke sistem.',
    time: '2 jam lalu',
    unread: false,
  },
  {
    id: 5,
    icon: Clock,
    iconBg: 'orange',
    title: 'Deadline harmonisasi',
    desc: 'SK Pengangkatan Panitia UAS akan melewati batas waktu dalam 2 hari.',
    time: '3 jam lalu',
    unread: false,
  },
];

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState(notifications);
  const dropdownRef = useRef(null);

  const unreadCount = items.filter(n => n.unread).length;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAllRead = () => {
    setItems(prev => prev.map(n => ({ ...n, unread: false })));
  };

  return (
    <div className="notif-dropdown-wrapper" ref={dropdownRef}>
      <button className="notif-bell-btn" onClick={() => setIsOpen(!isOpen)}>
        <Bell size={20} className="header-icon" />
        {unreadCount > 0 && <span className="notif-badge">{unreadCount}</span>}
      </button>

      {isOpen && (
        <div className="notif-dropdown">
          <div className="notif-dropdown-header">
            <h4 className="notif-dropdown-title">Notifikasi</h4>
            {unreadCount > 0 && (
              <button className="notif-mark-all" onClick={markAllRead}>
                Tandai semua dibaca
              </button>
            )}
          </div>

          <div className="notif-dropdown-list">
            {items.map(notif => {
              const IconComp = notif.icon;
              return (
                <div 
                  key={notif.id} 
                  className={`notif-dropdown-item ${notif.unread ? 'unread' : ''}`}
                  onClick={() => {
                    setItems(prev => prev.map(n => n.id === notif.id ? { ...n, unread: false } : n));
                  }}
                >
                  <div className={`notif-item-icon ${notif.iconBg}`}>
                    <IconComp size={16} />
                  </div>
                  <div className="notif-item-content">
                    <span className="notif-item-title">{notif.title}</span>
                    <span className="notif-item-desc">{notif.desc}</span>
                    <span className="notif-item-time">{notif.time}</span>
                  </div>
                  {notif.unread && <div className="notif-unread-dot"></div>}
                </div>
              );
            })}
          </div>

          <div className="notif-dropdown-footer">
            <button className="notif-view-all">Lihat Semua Notifikasi</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
