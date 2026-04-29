import React, { useState } from 'react';
import { Save, Bell, FileText, Trash2, Plus, Building2, Mail, Shield, ChevronDown } from 'lucide-react';
import { useToast } from '../components/Toast';

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
    <div className="p-4 md:p-6 lg:p-8 w-full max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-60 pointer-events-none"></div>
        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">Pengaturan Biro Hukum</h1>
          <p className="text-slate-500 mt-1.5 text-sm md:text-base max-w-lg">Kelola profil biro, preferensi notifikasi, dan template dokumen.</p>
        </div>
        <div className="relative z-10 shrink-0">
          <button 
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
            onClick={() => addToast('Pengaturan berhasil disimpan.', 'success')}
          >
            <Save size={18} />
            Simpan Perubahan
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Left Column */}
        <div className="w-full lg:w-3/5 flex flex-col gap-6">
          {/* Profil Biro Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="p-5 md:p-6 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center border border-emerald-200 shadow-sm">
                <Building2 size={20} />
              </div>
              <h3 className="font-bold text-lg text-slate-800 leading-none">Profil Biro</h3>
            </div>

            <div className="p-5 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2 flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-600 tracking-wide">Nama Biro</label>
                <input
                  type="text"
                  value={profil.namaBiro}
                  onChange={(e) => handleProfilChange('namaBiro', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 transition-all"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-600 tracking-wide">Singkatan</label>
                <input
                  type="text"
                  value={profil.singkatan}
                  onChange={(e) => handleProfilChange('singkatan', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 transition-all"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-600 tracking-wide">NIP Kepala Biro</label>
                <input
                  type="text"
                  value={profil.nip}
                  onChange={(e) => handleProfilChange('nip', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 transition-all"
                />
              </div>
              <div className="md:col-span-2 flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-600 tracking-wide">Kepala Biro</label>
                <input
                  type="text"
                  value={profil.kepalaBiro}
                  onChange={(e) => handleProfilChange('kepalaBiro', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 transition-all"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-600 tracking-wide">Email Biro</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    value={profil.email}
                    onChange={(e) => handleProfilChange('email', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 transition-all"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-600 tracking-wide">Telepon</label>
                <input
                  type="text"
                  value={profil.telepon}
                  onChange={(e) => handleProfilChange('telepon', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Pengaturan Workflow */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="p-5 md:p-6 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
              <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center border border-orange-200 shadow-sm">
                <Shield size={20} />
              </div>
              <h3 className="font-bold text-lg text-slate-800 leading-none">Pengaturan Workflow</h3>
            </div>

            <div className="p-5 md:p-6 flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-600 tracking-wide">Jalur Persetujuan Default</label>
                <div className="relative">
                  <select className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 appearance-none transition-all font-medium cursor-pointer">
                    <option>Kabiro → Wakil Rektor II → Wakil Rektor I → Rektor</option>
                    <option>Kabiro → Wakil Rektor I → Rektor</option>
                    <option>Kabiro → Rektor</option>
                  </select>
                  <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-600 tracking-wide">Batas Waktu Harmonisasi (hari kerja)</label>
                <div className="relative">
                  <select className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 appearance-none transition-all font-medium cursor-pointer">
                    <option>7 hari kerja</option>
                    <option>14 hari kerja</option>
                    <option>21 hari kerja</option>
                    <option>30 hari kerja</option>
                  </select>
                  <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-600 tracking-wide">Format Penomoran Otomatis</label>
                <input
                  type="text"
                  value="[JENIS]/[TAHUN]/[NOMOR_URUT]"
                  className="w-full bg-slate-100 border border-slate-200 text-slate-500 text-sm rounded-xl px-4 py-3 font-mono cursor-not-allowed"
                  readOnly
                />
                <span className="text-xs text-slate-400 font-medium mt-1">Contoh: PR/2026/0045</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full lg:w-2/5 flex flex-col gap-6">
          {/* Notifikasi Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="p-5 md:p-6 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center border border-blue-200 shadow-sm">
                <Bell size={20} />
              </div>
              <h3 className="font-bold text-lg text-slate-800 leading-none">Preferensi Notifikasi</h3>
            </div>

            <div className="flex flex-col divide-y divide-slate-100">
              {[
                { key: 'dokumenBaru', label: 'Dokumen baru masuk', desc: 'Notifikasi saat ada pengajuan produk hukum baru' },
                { key: 'harmonisasiSelesai', label: 'Harmonisasi selesai', desc: 'Notifikasi saat proses harmonisasi telah rampung' },
                { key: 'revisiDiminta', label: 'Revisi diminta', desc: 'Notifikasi saat dokumen dikembalikan untuk revisi' },
                { key: 'approvalRektor', label: 'Persetujuan Rektor', desc: 'Notifikasi saat dokumen membutuhkan TTD Rektor' },
                { key: 'deadlineReminder', label: 'Pengingat deadline', desc: 'Reminder H-3 sebelum batas waktu harmonisasi' },
                { key: 'weeklyDigest', label: 'Ringkasan mingguan', desc: 'Laporan ringkas aktivitas biro setiap Senin' },
              ].map(item => (
                <div key={item.key} className="p-5 hover:bg-slate-50 transition-colors flex items-center justify-between gap-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-800 mb-0.5">{item.label}</span>
                    <span className="text-xs text-slate-500 font-medium leading-snug">{item.desc}</span>
                  </div>
                  <button
                    className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${notifikasi[item.key] ? 'bg-emerald-500' : 'bg-slate-300'}`}
                    onClick={() => toggleNotif(item.key)}
                  >
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${notifikasi[item.key] ? 'translate-x-6' : 'translate-x-1'}`}></div>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Template Dokumen Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="p-5 md:p-6 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center border border-purple-200 shadow-sm">
                <FileText size={20} />
              </div>
              <h3 className="font-bold text-lg text-slate-800 leading-none">Template Dokumen</h3>
            </div>

            <div className="flex flex-col divide-y divide-slate-100">
              {templates.map(tpl => (
                <div key={tpl.id} className="p-5 hover:bg-slate-50 transition-colors flex items-center justify-between gap-4 group">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-800 mb-1">{tpl.name}</span>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">{tpl.count} dokumen • Diperbarui {tpl.updated}</span>
                  </div>
                  <button className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100" title="Hapus template">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div className="p-5 border-t border-slate-100 bg-slate-50/50">
              <button className="w-full bg-white hover:bg-emerald-50 text-emerald-700 border border-emerald-200 border-dashed px-5 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all">
                <Plus size={18} />
                Tambah Template Baru
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BHPengaturan;
