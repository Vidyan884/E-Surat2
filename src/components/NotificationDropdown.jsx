import React, { useState, useRef, useEffect } from 'react';
import { Bell, FileText, GitMerge, UserPlus, CheckCircle2, Clock } from 'lucide-react';

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

const getIconColors = (bgType) => {
  switch (bgType) {
    case 'blue': return 'bg-blue-100 text-blue-600';
    case 'yellow': return 'bg-orange-100 text-orange-600';
    case 'green': return 'bg-emerald-100 text-emerald-600';
    case 'purple': return 'bg-purple-100 text-purple-600';
    case 'orange': return 'bg-orange-100 text-orange-600';
    default: return 'bg-slate-100 text-slate-600';
  }
};

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
    <div className="relative" ref={dropdownRef}>
      <button 
        className="p-2 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-full transition-colors relative focus:outline-none focus:ring-2 focus:ring-emerald-500/30" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Notifications"
      >
        <Bell size={20} className="stroke-[2.5px]" />
        {unreadCount > 0 && (
          <span className="absolute top-0.5 right-0.5 min-w-[16px] h-[16px] px-1 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center shadow-sm shadow-red-500/40">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl shadow-slate-200/60 border border-slate-100 flex flex-col z-50 transform origin-top-right transition-all">
          <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 rounded-t-xl">
            <h4 className="text-sm font-bold text-slate-800 tracking-tight">Notifikasi</h4>
            {unreadCount > 0 && (
              <button 
                className="text-[11px] font-semibold text-emerald-600 hover:text-emerald-700 hover:underline transition-all" 
                onClick={markAllRead}
              >
                Tandai semua dibaca
              </button>
            )}
          </div>

          <div className="max-h-[360px] overflow-y-auto flex flex-col divide-y divide-slate-100 custom-scrollbar">
            {items.map(notif => {
              const IconComp = notif.icon;
              return (
                <div 
                  key={notif.id} 
                  className={`px-4 py-3.5 flex gap-3 transition-colors cursor-pointer group ${notif.unread ? 'bg-emerald-50/30 hover:bg-emerald-50' : 'hover:bg-slate-50'}`}
                  onClick={() => {
                    setItems(prev => prev.map(n => n.id === notif.id ? { ...n, unread: false } : n));
                  }}
                >
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${getIconColors(notif.iconBg)}`}>
                    <IconComp size={16} />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <span className={`text-sm font-semibold mb-0.5 transition-colors ${notif.unread ? 'text-slate-800 group-hover:text-emerald-700' : 'text-slate-700 group-hover:text-emerald-700'}`}>
                      {notif.title}
                    </span>
                    <span className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-1.5">
                      {notif.desc}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 tracking-wider">
                      {notif.time}
                    </span>
                  </div>
                  {notif.unread && (
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0 mt-1 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="p-2 border-t border-slate-100 rounded-b-xl bg-slate-50/30">
            <button className="w-full py-2 text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:bg-emerald-100/50 rounded-lg transition-colors text-center">
              Lihat Semua Notifikasi
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
