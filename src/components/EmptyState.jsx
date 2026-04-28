import React from 'react';
import { SearchX, FileX, Inbox } from 'lucide-react';
import './EmptyState.css';

const presets = {
  search: {
    icon: SearchX,
    title: 'Tidak ada hasil ditemukan',
    desc: 'Coba ubah kata kunci pencarian atau hapus filter yang aktif.',
  },
  noData: {
    icon: FileX,
    title: 'Belum ada data',
    desc: 'Data akan muncul di sini setelah tersedia.',
  },
  empty: {
    icon: Inbox,
    title: 'Belum ada item',
    desc: 'Belum ada item untuk ditampilkan saat ini.',
  },
};

const EmptyState = ({ type = 'search', title, desc, actionLabel, onAction }) => {
  const preset = presets[type] || presets.search;
  const IconComp = preset.icon;

  return (
    <div className="empty-state">
      <div className="empty-state-icon-wrap">
        <IconComp size={32} />
      </div>
      <h4 className="empty-state-title">{title || preset.title}</h4>
      <p className="empty-state-desc">{desc || preset.desc}</p>
      {actionLabel && onAction && (
        <button className="empty-state-btn" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
