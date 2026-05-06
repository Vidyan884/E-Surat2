import React, { useState, useEffect } from 'react';
import { FileText, Image as ImageIcon, Plus, Edit3, Trash2, Check, X, ShieldAlert, HelpCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../components/Toast';

const TemplateManagement = ({ setActiveTab }) => {
  const { token, role } = useAuth();
  const { addToast } = useToast();
  
  const [activeSubTab, setActiveSubTab] = useState('template'); // 'template' or 'kop'
  const [templates, setTemplates] = useState([]);
  const [kops, setKops] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modals
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showKopModal, setShowKopModal] = useState(false);
  const [showTutorialModal, setShowTutorialModal] = useState(false);

  // Form State
  const [templateForm, setTemplateForm] = useState({ id: null, judul: '', kategori: '', konten: '', kopSuratId: '' });
  const [kopForm, setKopForm] = useState({ id: null, namaInstitusi: '', alamat: '', kontak: '', website: '', logoUrl: '', isActive: false, isImageOnly: false });

  useEffect(() => {
    fetchData();
  }, [activeSubTab]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Selalu fetch kops untuk dropdown di form template
      const kopRes = await fetch('/api/templates/kop', { headers: { 'Authorization': `Bearer ${token}` } });
      if (kopRes.ok) setKops(await kopRes.json());

      if (activeSubTab === 'template') {
        const res = await fetch('/api/templates', { headers: { 'Authorization': `Bearer ${token}` } });
        if (res.ok) setTemplates(await res.json());
      }
    } catch (err) {
      addToast('Gagal memuat data', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const saveTemplate = async () => {
    try {
      const method = templateForm.id ? 'PUT' : 'POST';
      const url = templateForm.id ? `/api/templates/${templateForm.id}` : '/api/templates';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(templateForm)
      });
      
      if (res.ok) {
        addToast('Template berhasil disimpan', 'success');
        setShowTemplateModal(false);
        fetchData();
      } else {
        throw new Error('Failed to save');
      }
    } catch (err) {
      addToast('Gagal menyimpan template', 'error');
    }
  };

  const deleteTemplate = async (id) => {
    if (!window.confirm('Hapus template ini?')) return;
    try {
      const res = await fetch(`/api/templates/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        addToast('Template dihapus', 'success');
        fetchData();
      }
    } catch (err) {
      addToast('Gagal menghapus', 'error');
    }
  };

  const saveKop = async () => {
    try {
      const method = kopForm.id ? 'PUT' : 'POST';
      const url = kopForm.id ? `/api/templates/kop/${kopForm.id}` : '/api/templates/kop';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(kopForm)
      });
      
      if (res.ok) {
        addToast('Kop Surat berhasil disimpan', 'success');
        setShowKopModal(false);
        fetchData();
      } else {
        throw new Error('Failed to save');
      }
    } catch (err) {
      addToast('Gagal menyimpan kop surat', 'error');
    }
  };

  const deleteKop = async (id) => {
    if (!window.confirm('Hapus kop surat ini?')) return;
    try {
      const res = await fetch(`/api/templates/kop/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        addToast('Kop surat dihapus', 'success');
        fetchData();
      }
    } catch (err) {
      addToast('Gagal menghapus', 'error');
    }
  };

  if (!['admin-teknis', 'admin'].includes(role)) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <ShieldAlert size={64} className="text-red-400 mb-4" />
        <h2 className="text-2xl font-bold text-slate-800">Akses Ditolak</h2>
        <p className="text-slate-500 mt-2">Anda tidak memiliki izin untuk mengakses Manajemen Template.</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 w-full max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-60 pointer-events-none"></div>
        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">Manajemen Template</h1>
          <p className="text-slate-500 mt-1.5 text-sm md:text-base max-w-lg">Atur draf template surat dan format kop institusi secara dinamis.</p>
        </div>
        <div className="relative z-10 shrink-0 flex flex-col sm:flex-row items-center gap-3">
          <button
            className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-sm border border-slate-200"
            onClick={() => setShowTutorialModal(true)}
          >
            <HelpCircle size={18} />
            Panduan
          </button>
          <button 
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-sm"
            onClick={() => {
              if (activeSubTab === 'template') {
                setTemplateForm({ id: null, judul: '', kategori: '', konten: '', kopSuratId: '' });
                setShowTemplateModal(true);
              } else {
                setKopForm({ id: null, namaInstitusi: '', alamat: '', kontak: '', website: '', logoUrl: '', isActive: false, isImageOnly: false });
                setShowKopModal(true);
              }
            }}
          >
            <Plus size={18} />
            {activeSubTab === 'template' ? 'Buat Template' : 'Buat Kop Surat'}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-slate-100 p-1 rounded-xl w-max border border-slate-200">
        <button 
          className={`px-5 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${activeSubTab === 'template' ? 'bg-white text-emerald-700 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
          onClick={() => setActiveSubTab('template')}
        >
          <FileText size={16} /> Template Isi Surat
        </button>
        <button 
          className={`px-5 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${activeSubTab === 'kop' ? 'bg-white text-emerald-700 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
          onClick={() => setActiveSubTab('kop')}
        >
          <ImageIcon size={16} /> Kop Surat (Header)
        </button>
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-slate-500">Memuat data...</div>
        ) : activeSubTab === 'template' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider w-[20%]">Kategori</th>
                  <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider w-[30%]">Judul Template</th>
                  <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider w-[40%]">Pratinjau Isi</th>
                  <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-center w-[10%]">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {templates.length === 0 ? (
                  <tr><td colSpan="4" className="p-8 text-center text-slate-500">Belum ada template.</td></tr>
                ) : templates.map(t => (
                  <tr key={t.id} className="hover:bg-slate-50">
                    <td className="px-4 py-4"><span className="text-xs font-bold uppercase tracking-wider px-2 py-1 rounded bg-emerald-100 text-emerald-700">{t.kategori}</span></td>
                    <td className="px-4 py-4 text-sm font-bold text-slate-800">
                      <div>{t.judul}</div>
                      {t.kopSurat && <div className="text-[10px] text-slate-500 font-normal mt-1 border border-slate-200 bg-white px-1.5 py-0.5 rounded w-max">Kop: {t.kopSurat.namaInstitusi}</div>}
                    </td>
                    <td className="px-4 py-4 text-xs text-slate-500 font-mono truncate max-w-[300px]">{t.konten}</td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex justify-center gap-2">
                        <button onClick={() => { setTemplateForm(t); setShowTemplateModal(true); }} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"><Edit3 size={16} /></button>
                        <button onClick={() => deleteTemplate(t.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider w-[15%]">Status</th>
                  <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider w-[35%]">Institusi</th>
                  <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider w-[40%]">Alamat & Kontak</th>
                  <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-center w-[10%]">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {kops.length === 0 ? (
                  <tr><td colSpan="4" className="p-8 text-center text-slate-500">Belum ada kop surat.</td></tr>
                ) : kops.map(k => (
                  <tr key={k.id} className={`hover:bg-slate-50 ${k.isActive ? 'bg-emerald-50/30' : ''}`}>
                    <td className="px-4 py-4">
                      {k.isActive ? 
                        <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-1 rounded w-max"><Check size={14}/> Aktif</span> : 
                        <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2 py-1 rounded w-max">Nonaktif</span>
                      }
                    </td>
                    <td className="px-4 py-4 text-sm font-bold text-slate-800">
                      <div className="flex items-center gap-3">
                        {k.logoUrl && <img src={k.logoUrl} alt="Logo" className="w-8 h-8 object-contain rounded-md border border-slate-200" />}
                        <div className="flex flex-col">
                          <span>{k.namaInstitusi}</span>
                          {k.isImageOnly && <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded w-max mt-1 font-semibold">GAMBAR PENUH</span>}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-xs text-slate-600">
                      {!k.isImageOnly ? (
                        <>
                          <div>{k.alamat}</div>
                          <div className="text-slate-400">{k.kontak}</div>
                        </>
                      ) : (
                        <span className="text-slate-400 italic">Hanya menampilkan gambar</span>
                      )}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex justify-center gap-2">
                        <button onClick={() => { setKopForm(k); setShowKopModal(true); }} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"><Edit3 size={16} /></button>
                        <button onClick={() => deleteKop(k.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modals */}
      {showTutorialModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[4000] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                <HelpCircle className="text-emerald-600" size={24} /> 
                Panduan Manajemen Template
              </h3>
              <button onClick={() => setShowTutorialModal(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
            </div>
            <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
              <div>
                <h4 className="font-bold text-emerald-800 flex items-center gap-2 mb-2">
                  <FileText size={18} /> 1. Template Isi Surat
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed mb-3">
                  Fitur ini digunakan untuk membuat draf standar dari berbagai jenis surat (contoh: Surat Keterangan Aktif, Surat Tugas). 
                </p>
                <ul className="list-disc list-inside text-sm text-slate-600 space-y-1.5 ml-1">
                  <li><strong>Kategori Kode:</strong> Identifier unik untuk memanggil template di dalam sistem (misal: <code className="bg-slate-100 px-1 py-0.5 rounded text-emerald-700">keterangan_aktif</code>).</li>
                  <li><strong>Konten:</strong> Anda bisa menggunakan variabel dinamis dalam tanda kurung siku, seperti <code className="bg-slate-100 px-1 py-0.5 rounded text-emerald-700">[Nama]</code> atau <code className="bg-slate-100 px-1 py-0.5 rounded text-emerald-700">[NIM]</code>, yang nantinya akan terisi otomatis saat surat dibuat.</li>
                </ul>
              </div>

              <div className="w-full h-px bg-slate-100"></div>

              <div>
                <h4 className="font-bold text-emerald-800 flex items-center gap-2 mb-2">
                  <ImageIcon size={18} /> 2. Kop Surat (Header)
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed mb-3">
                  Kop surat adalah header resmi institusi yang akan muncul di bagian paling atas dokumen PDF atau saat dicetak.
                </p>
                <ul className="list-disc list-inside text-sm text-slate-600 space-y-1.5 ml-1">
                  <li>Anda bisa membuat banyak desain kop surat, tetapi <strong>hanya satu yang bisa berstatus Aktif</strong> pada satu waktu.</li>
                  <li>Kop surat yang berstatus aktif akan secara otomatis digunakan pada semua dokumen persuratan yang baru dicetak.</li>
                </ul>
              </div>
            </div>
            <div className="p-5 border-t border-slate-100 flex justify-end bg-slate-50">
              <button onClick={() => setShowTutorialModal(false)} className="px-5 py-2.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm">Saya Mengerti</button>
            </div>
          </div>
        </div>
      )}

      {showTemplateModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[4000] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <h3 className="font-bold text-slate-800 text-lg">{templateForm.id ? 'Edit Template' : 'Buat Template Baru'}</h3>
              <button onClick={() => setShowTemplateModal(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Judul Template</label>
                <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none" value={templateForm.judul} onChange={e => setTemplateForm({...templateForm, judul: e.target.value})} placeholder="Cth: Surat Keterangan Aktif" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Kategori Kode (Identifier)</label>
                <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none" value={templateForm.kategori} onChange={e => setTemplateForm({...templateForm, kategori: e.target.value})} placeholder="Cth: keterangan, tugas, permohonan" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Kop Surat Bawaan (Opsional)</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none" value={templateForm.kopSuratId || ''} onChange={e => setTemplateForm({...templateForm, kopSuratId: e.target.value})}>
                  <option value="">- Tidak menggunakan Kop khusus -</option>
                  {kops.map(k => (
                    <option key={k.id} value={k.id}>{k.namaInstitusi}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Konten / Isi Draf</label>
                <textarea className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-mono focus:border-emerald-500 focus:outline-none min-h-[200px]" value={templateForm.konten} onChange={e => setTemplateForm({...templateForm, konten: e.target.value})} placeholder="Gunakan [Nama] untuk variabel dinamis..." />
              </div>
            </div>
            <div className="p-5 border-t border-slate-100 flex justify-end gap-3 bg-slate-50">
              <button onClick={() => setShowTemplateModal(false)} className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-200 rounded-lg">Batal</button>
              <button onClick={saveTemplate} className="px-4 py-2 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm">Simpan Template</button>
            </div>
          </div>
        </div>
      )}

      {showKopModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[4000] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <h3 className="font-bold text-slate-800 text-lg">{kopForm.id ? 'Edit Kop Surat' : 'Buat Kop Surat Baru'}</h3>
              <button onClick={() => setShowKopModal(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-1 rounded-xl border border-slate-200 mb-4">
                <button
                  className={`py-2 text-sm font-bold rounded-lg transition-all ${!kopForm.isImageOnly ? 'bg-white text-emerald-700 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
                  onClick={() => setKopForm({...kopForm, isImageOnly: false})}
                >
                  Teks Klasik
                </button>
                <button
                  className={`py-2 text-sm font-bold rounded-lg transition-all ${kopForm.isImageOnly ? 'bg-white text-emerald-700 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
                  onClick={() => setKopForm({...kopForm, isImageOnly: true})}
                >
                  Gambar Penuh
                </button>
              </div>

              <div className="flex items-center gap-3 bg-blue-50 p-3 rounded-lg border border-blue-100 mb-4">
                <input type="checkbox" id="is_active" checked={kopForm.isActive} onChange={e => setKopForm({...kopForm, isActive: e.target.checked})} className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                <label htmlFor="is_active" className="text-sm font-bold text-blue-800 cursor-pointer">Jadikan Kop Surat Aktif (Hanya bisa 1 yang aktif)</label>
              </div>
              
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {kopForm.isImageOnly ? 'Judul Kop Surat (Hanya untuk identifikasi)' : 'Nama Institusi (Baris 1 & 2)'}
                </label>
                <textarea className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none" value={kopForm.namaInstitusi} onChange={e => setKopForm({...kopForm, namaInstitusi: e.target.value})} placeholder={kopForm.isImageOnly ? "Contoh: Kop Banner Dies Natalis" : "Kementerian Pendidikan...\nUniversitas..."} rows={kopForm.isImageOnly ? 1 : 2} />
              </div>

              {!kopForm.isImageOnly && (
                <>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Alamat Lengkap</label>
                    <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none" value={kopForm.alamat} onChange={e => setKopForm({...kopForm, alamat: e.target.value})} placeholder="Jl. Raya Kampus..." />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Telepon / Fax</label>
                      <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none" value={kopForm.kontak} onChange={e => setKopForm({...kopForm, kontak: e.target.value})} placeholder="Telp: (021) 123..." />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Website / Email</label>
                      <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none" value={kopForm.website} onChange={e => setKopForm({...kopForm, website: e.target.value})} placeholder="Laman: www.univ.ac.id" />
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">{kopForm.isImageOnly ? 'Upload Gambar Kop Banner' : 'Upload Logo Institusi (Opsional)'}</label>
                <div className="flex items-center gap-3">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setKopForm({...kopForm, logoUrl: reader.result});
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none" 
                  />
                  {kopForm.logoUrl && (
                    <img src={kopForm.logoUrl} alt="Preview" className="h-10 w-10 object-contain rounded border border-slate-200 shrink-0" />
                  )}
                </div>
                <p className="text-[10px] text-slate-500 mt-1">{kopForm.isImageOnly ? 'Upload gambar banner memanjang yang akan mengisi seluruh bagian atas surat.' : 'Upload logo kecil yang akan diletakkan di sisi kiri atas.'} Format: JPG/PNG.</p>
              </div>
            </div>
            <div className="p-5 border-t border-slate-100 flex justify-end gap-3 bg-slate-50">
              <button onClick={() => setShowKopModal(false)} className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-200 rounded-lg">Batal</button>
              <button onClick={saveKop} className="px-4 py-2 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm">Simpan Kop</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateManagement;
