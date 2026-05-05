import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AlertTriangle, Trash2, X, Info } from 'lucide-react';

const ConfirmModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = 'Konfirmasi', 
  message = 'Apakah Anda yakin?',
  confirmText = 'Ya, Lanjutkan',
  cancelText = 'Batal',
  type = 'danger' // 'danger' | 'warning' | 'info'
}) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  const typeConfig = {
    danger: { 
      iconBg: 'bg-red-100', 
      iconColor: 'text-red-600', 
      btnBg: 'bg-red-600 hover:bg-red-700 active:bg-red-800 shadow-red-600/30',
      icon: Trash2
    },
    warning: { 
      iconBg: 'bg-orange-100', 
      iconColor: 'text-orange-600', 
      btnBg: 'bg-orange-600 hover:bg-orange-700 active:bg-orange-800 shadow-orange-600/30',
      icon: AlertTriangle
    },
    info: { 
      iconBg: 'bg-emerald-100', 
      iconColor: 'text-emerald-600', 
      btnBg: 'bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 shadow-emerald-600/30',
      icon: Info
    },
  };

  const config = typeConfig[type] || typeConfig.danger;
  const IconComponent = config.icon;

  return createPortal(
    <div 
      className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 relative animate-in fade-in zoom-in-95 duration-200" 
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-1.5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
          onClick={onClose}
        >
          <X size={18} />
        </button>

        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${config.iconBg}`}>
          <IconComponent size={24} className={config.iconColor} />
        </div>

        <h3 className="text-lg font-bold text-slate-800 mb-2">{title}</h3>
        <p className="text-sm text-slate-500 leading-relaxed mb-6">{message}</p>

        <div className="flex items-center gap-3 w-full">
          <button 
            className="flex-1 py-2.5 px-4 rounded-xl border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50 hover:border-slate-300 transition-all"
            onClick={onClose}
          >
            {cancelText}
          </button>
          <button 
            className={`flex-1 py-2.5 px-4 rounded-xl text-white font-semibold text-sm shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 ${config.btnBg}`}
            onClick={() => { onConfirm(); onClose(); }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ConfirmModal;
