import React, { useState } from 'react';
import { Save, Bell, BellOff, FileText, Trash2, Plus, Building2, Mail, Shield, ChevronDown } from 'lucide-react';
import { useToast } from './Toast';
import './BHPengaturan.css';

const BHPengaturan = () => {
  const { addToast } = useToast();
  const [profil, setProfil] = useState({
    namaBiro: 'Biro Hukum dan Organisasi',
    singkatan: 'BHO',
    kepalaBiro: 'Dr. Ahmad Fauzan, S.H., M.H.',
    nip: '197802152003121001',
    email: 'biro.hukum@unia.ac.id',
    telepon: '(021) 555-0199',
  });

  const [notifikasi, setNotifikasi] = useState({
    dokumenBaru: true,
    harmonisasiSelesai: true,
    revisiDiminta: true,
    approvalRektor: true,
    deadlineReminder: false,
    weeklyDigest: false,
  });

  const templates = [
    { id: 1, name: 'Template Peraturan Rektor', count: 12, updated: '15 Apr 2026' },
    { id: 2, name: 'Template Keputusan Rektor', count: 8, updated: '12 Apr 2026' },
    { id: 3, name: 'Template Surat Edaran', count: 5, updated: '10 Apr 2026' },
    { id: 4, name: 'Template MoU / Perjanjian Kerja Sama', count: 3, updated: '08 Apr 2026' },
  ];

  const handleProfilChange = (field, value) => {
    setProfil(prev => ({ ...prev, [field]: value }));
  };

  const toggleNotif = (key) => {
    setNotifikasi(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="bhp-container">
      {/* Page Header */}
      <div className="bhp-page-header">
        <div>
          <h1 className="bhp-title">Pengaturan Biro Hukum</h1>
          <p className="bhp-subtitle">Kelola profil biro, preferensi notifikasi, dan template dokumen.</p>
        </div>
        <button className="bhp-btn-save" onClick={() => addToast('Pengaturan berhasil disimpan.', 'success')}>
          <Save size={16} />
          Simpan Perubahan
        </button>
      </div>

      <div className="bhp-content-grid">
        {/* Left Column */}
        <div className="bhp-left-col">
          {/* Profil Biro Card */}
          <div className="bhp-card">
            <div className="bhp-card-header">
              <Building2 size={18} className="bhp-card-icon" />
              <h3 className="bhp-card-title">Profil Biro</h3>
            </div>

            <div className="bhp-form-grid">
              <div className="bhp-field full">
                <label className="bhp-label">Nama Biro</label>
                <input
                  type="text"
                  value={profil.namaBiro}
                  onChange={(e) => handleProfilChange('namaBiro', e.target.value)}
                  className="bhp-input"
                />
              </div>
              <div className="bhp-field">
                <label className="bhp-label">Singkatan</label>
                <input
                  type="text"
                  value={profil.singkatan}
                  onChange={(e) => handleProfilChange('singkatan', e.target.value)}
                  className="bhp-input"
                />
              </div>
              <div className="bhp-field">
                <label className="bhp-label">NIP Kepala Biro</label>
                <input
                  type="text"
                  value={profil.nip}
                  onChange={(e) => handleProfilChange('nip', e.target.value)}
                  className="bhp-input"
                />
              </div>
              <div className="bhp-field full">
                <label className="bhp-label">Kepala Biro</label>
                <input
                  type="text"
                  value={profil.kepalaBiro}
                  onChange={(e) => handleProfilChange('kepalaBiro', e.target.value)}
                  className="bhp-input"
                />
              </div>
              <div className="bhp-field">
                <label className="bhp-label">Email Biro</label>
                <div className="bhp-input-icon-wrap">
                  <Mail size={16} className="bhp-input-left-icon" />
                  <input
                    type="email"
                    value={profil.email}
                    onChange={(e) => handleProfilChange('email', e.target.value)}
                    className="bhp-input with-icon"
                  />
                </div>
              </div>
              <div className="bhp-field">
                <label className="bhp-label">Telepon</label>
                <input
                  type="text"
                  value={profil.telepon}
                  onChange={(e) => handleProfilChange('telepon', e.target.value)}
                  className="bhp-input"
                />
              </div>
            </div>
          </div>

          {/* Pengaturan Workflow */}
          <div className="bhp-card">
            <div className="bhp-card-header">
              <Shield size={18} className="bhp-card-icon" />
              <h3 className="bhp-card-title">Pengaturan Workflow</h3>
            </div>

            <div className="bhp-workflow-settings">
              <div className="bhp-field full">
                <label className="bhp-label">Jalur Persetujuan Default</label>
                <div className="bhp-select-wrapper">
                  <select className="bhp-select">
                    <option>Kabiro → Wakil Rektor II → Wakil Rektor I → Rektor</option>
                    <option>Kabiro → Wakil Rektor I → Rektor</option>
                    <option>Kabiro → Rektor</option>
                  </select>
                  <ChevronDown size={16} className="bhp-select-arrow" />
                </div>
              </div>
              <div className="bhp-field full">
                <label className="bhp-label">Batas Waktu Harmonisasi (hari kerja)</label>
                <div className="bhp-select-wrapper">
                  <select className="bhp-select">
                    <option>7 hari kerja</option>
                    <option>14 hari kerja</option>
                    <option>21 hari kerja</option>
                    <option>30 hari kerja</option>
                  </select>
                  <ChevronDown size={16} className="bhp-select-arrow" />
                </div>
              </div>
              <div className="bhp-field full">
                <label className="bhp-label">Format Penomoran Otomatis</label>
                <input
                  type="text"
                  value="[JENIS]/[TAHUN]/[NOMOR_URUT]"
                  className="bhp-input"
                  readOnly
                />
                <span className="bhp-hint">Contoh: PR/2026/0045</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="bhp-right-col">
          {/* Notifikasi Card */}
          <div className="bhp-card">
            <div className="bhp-card-header">
              <Bell size={18} className="bhp-card-icon" />
              <h3 className="bhp-card-title">Preferensi Notifikasi</h3>
            </div>

            <div className="bhp-notif-list">
              {[
                { key: 'dokumenBaru', label: 'Dokumen baru masuk', desc: 'Notifikasi saat ada pengajuan produk hukum baru' },
                { key: 'harmonisasiSelesai', label: 'Harmonisasi selesai', desc: 'Notifikasi saat proses harmonisasi telah rampung' },
                { key: 'revisiDiminta', label: 'Revisi diminta', desc: 'Notifikasi saat dokumen dikembalikan untuk revisi' },
                { key: 'approvalRektor', label: 'Persetujuan Rektor', desc: 'Notifikasi saat dokumen membutuhkan TTD Rektor' },
                { key: 'deadlineReminder', label: 'Pengingat deadline', desc: 'Reminder H-3 sebelum batas waktu harmonisasi' },
                { key: 'weeklyDigest', label: 'Ringkasan mingguan', desc: 'Laporan ringkas aktivitas biro setiap Senin' },
              ].map(item => (
                <div key={item.key} className="bhp-notif-item">
                  <div className="bhp-notif-text">
                    <span className="bhp-notif-label">{item.label}</span>
                    <span className="bhp-notif-desc">{item.desc}</span>
                  </div>
                  <button
                    className={`bhp-toggle ${notifikasi[item.key] ? 'on' : ''}`}
                    onClick={() => toggleNotif(item.key)}
                  >
                    <div className="bhp-toggle-knob"></div>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Template Dokumen Card */}
          <div className="bhp-card">
            <div className="bhp-card-header">
              <FileText size={18} className="bhp-card-icon" />
              <h3 className="bhp-card-title">Template Dokumen</h3>
            </div>

            <div className="bhp-template-list">
              {templates.map(tpl => (
                <div key={tpl.id} className="bhp-template-item">
                  <div className="bhp-template-info">
                    <span className="bhp-template-name">{tpl.name}</span>
                    <span className="bhp-template-meta">{tpl.count} dokumen • Diperbarui {tpl.updated}</span>
                  </div>
                  <button className="bhp-template-delete" title="Hapus template">
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>

            <button className="bhp-btn-add-template">
              <Plus size={16} />
              Tambah Template Baru
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BHPengaturan;
