import React from 'react';
import { SearchX, FileX, Inbox } from 'lucide-react';

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
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4 border border-slate-200 text-slate-400">
        <IconComp size={32} />
      </div>
      <h4 className="text-lg font-bold text-slate-800 mb-2">{title || preset.title}</h4>
      <p className="text-sm text-slate-500 max-w-sm mx-auto mb-6 leading-relaxed">
        {desc || preset.desc}
      </p>
      {actionLabel && onAction && (
        <button 
          className="bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-xl py-2.5 px-6 font-semibold text-sm shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
          onClick={onAction}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
