import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';
import './ConfirmModal.css';

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
  if (!isOpen) return null;

  const iconColors = {
    danger: { bg: '#fef2f2', color: '#dc2626' },
    warning: { bg: '#fffbeb', color: '#d97706' },
    info: { bg: '#eff6ff', color: '#2563eb' },
  };

  const ic = iconColors[type] || iconColors.danger;

  return (
    <div className="cm-overlay" onClick={onClose}>
      <div className="cm-modal" onClick={(e) => e.stopPropagation()}>
        <button className="cm-close" onClick={onClose}>
          <X size={18} />
        </button>

        <div className="cm-icon-wrap" style={{ background: ic.bg }}>
          {type === 'danger' ? <Trash2 size={24} style={{ color: ic.color }} /> : <AlertTriangle size={24} style={{ color: ic.color }} />}
        </div>

        <h3 className="cm-title">{title}</h3>
        <p className="cm-message">{message}</p>

        <div className="cm-actions">
          <button className="cm-btn-cancel" onClick={onClose}>{cancelText}</button>
          <button className={`cm-btn-confirm ${type}`} onClick={() => { onConfirm(); onClose(); }}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
