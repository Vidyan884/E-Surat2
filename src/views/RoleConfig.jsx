import React, { useState, useEffect } from 'react';
import { 
  Plus, Shield, Edit3, Trash2, 
  ChevronDown, ChevronRight, Check, X, Search
} from 'lucide-react';

const allPermissions = {
  'Surat Masuk': ['View', 'Register', 'Archive', 'Dispose'],
  'Surat Keluar': ['Draft', 'Sign', 'Bypass Verification'],
  'User Management': ['View', 'Create', 'Edit', 'Delete'],
  'Produk Hukum': ['Access', 'Create', 'Harmonize'],
  'System': ['View Logs', 'Configure Roles', 'Backup'],
};

import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../components/Toast';

const RoleConfig = () => {
  const { token } = useAuth();
  const { addToast } = useToast();
  
  const [rolesData, setRolesData] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const [expandedModules, setExpandedModules] = useState(
    Object.keys(allPermissions).reduce((acc, key) => ({ ...acc, [key]: true }), {})
  );

  useEffect(() => {
    fetchRoles();
  }, [token]);

  const fetchRoles = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/roles', { headers: { 'Authorization': `Bearer ${token}` } });
      if (res.ok) {
        const data = await res.json();
        setRolesData(data);
        if (data.length > 0 && !selectedRole) {
          setSelectedRole(data[0]);
        } else if (selectedRole) {
          // Update selected role with fresh data
          const updated = data.find(r => r.id === selectedRole.id);
          if (updated) setSelectedRole(updated);
        }
      }
    } catch (err) {
      addToast('Gagal memuat peran', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredRoles = rolesData.filter(role =>
    role.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleModule = (module) => {
    setExpandedModules(prev => ({ ...prev, [module]: !prev[module] }));
  };

  const hasPermission = (module, perm) => {
    if (!selectedRole) return false;
    return selectedRole.permissions[module]?.includes(perm) || false;
  };

  const togglePermission = (module, perm) => {
    if (!selectedRole) return;
    const currentPerms = selectedRole.permissions[module] || [];
    const newPerms = currentPerms.includes(perm)
      ? currentPerms.filter(p => p !== perm)
      : [...currentPerms, perm];
    
    setSelectedRole({
      ...selectedRole,
      permissions: {
        ...selectedRole.permissions,
        [module]: newPerms
      }
    });
  };

  const saveConfiguration = async () => {
    if (!selectedRole) return;
    setIsSaving(true);
    try {
      const url = selectedRole.id === 'new' ? '/api/roles' : `/api/roles/${selectedRole.id}`;
      const method = selectedRole.id === 'new' ? 'POST' : 'PUT';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          name: selectedRole.name,
          description: selectedRole.description,
          color: selectedRole.color,
          permissions: selectedRole.permissions
        })
      });

      if (res.ok) {
        addToast('Konfigurasi peran berhasil disimpan', 'success');
        fetchRoles();
      } else {
        throw new Error('Gagal menyimpan');
      }
    } catch (err) {
      addToast('Terjadi kesalahan saat menyimpan', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const createNewRole = () => {
    setSelectedRole({
      id: 'new',
      name: 'New Custom Role',
      description: 'Deskripsi untuk peran baru ini...',
      color: '#0ea5e9',
      users: 0,
      permissions: {}
    });
  };

  const deleteRole = async () => {
    if (!selectedRole || selectedRole.id === 'new') return;
    if (!window.confirm(`Hapus peran ${selectedRole.name}? Pengguna di peran ini mungkin akan kehilangan akses.`)) return;
    
    try {
      const res = await fetch(`/api/roles/${selectedRole.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        addToast('Peran berhasil dihapus', 'success');
        setSelectedRole(null);
        fetchRoles();
      }
    } catch (err) {
      addToast('Gagal menghapus peran', 'error');
    }
  };

  const totalPerms = selectedRole ? Object.values(selectedRole.permissions).flat().length : 0;
  const totalAvailable = Object.values(allPermissions).flat().length;

  if (isLoading) return <div className="p-8 text-center text-slate-500">Memuat peran...</div>;

  return (
    <div className="p-4 md:p-6 lg:p-10 w-full min-h-[calc(100vh-80px)] bg-slate-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-100 rounded-full blur-[120px] opacity-40 -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-50 rounded-full blur-[100px] opacity-50 translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        
        {/* Premium Page Header */}
        <div className="bg-gradient-to-r from-emerald-900 to-emerald-800 p-8 rounded-3xl shadow-xl shadow-emerald-900/10 border border-emerald-700/30 flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/50 border border-emerald-600/30 text-amber-400 text-xs font-bold tracking-widest uppercase mb-4">
              <Shield size={14} /> Security & Access
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-2">Konfigurasi Peran</h1>
            <p className="text-emerald-100/80 text-sm md:text-base max-w-xl font-medium leading-relaxed">Tentukan tingkat akses tingkat lanjut dan kelola set izin untuk setiap peran sistem dengan kontrol granular.</p>
          </div>
          <div className="relative z-10 shrink-0">
            <button onClick={createNewRole} className="group bg-gradient-to-b from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-emerald-950 px-6 py-3 rounded-2xl text-sm font-bold flex items-center justify-center gap-3 transition-all shadow-lg hover:shadow-amber-500/30 hover:-translate-y-1">
              <div className="bg-emerald-950/10 p-1 rounded-lg"><Plus size={18} /></div>
              <span>Buat Peran Baru</span>
            </button>
          </div>
        </div>

        {/* Main Layout */}
        <div className="flex flex-col xl:flex-row gap-8 items-start">
          
          {/* Left Panel — Role List (Glassmorphism) */}
          <div className="w-full xl:w-80 flex flex-col shrink-0 bg-white/70 backdrop-blur-2xl p-5 rounded-3xl border border-white shadow-xl shadow-slate-200/50 xl:sticky top-28 max-h-[calc(100vh-140px)] overflow-hidden">
            <div className="relative mb-5 shrink-0">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Cari peran..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-slate-100/50 hover:bg-slate-100 border border-slate-200/60 text-slate-800 text-sm font-medium rounded-2xl focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all placeholder:text-slate-400"
              />
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-3 pr-2 pb-2">
              {filteredRoles.map(role => {
                const isActive = selectedRole?.id === role.id;
                return (
                  <div 
                    key={role.id}
                    className={`p-4 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all duration-300 group ${isActive ? 'bg-white border-emerald-500 shadow-md shadow-emerald-500/10' : 'bg-white/50 border-transparent hover:border-slate-200 hover:bg-white'}`}
                    onClick={() => setSelectedRole(role)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-black/5" style={{ backgroundColor: `${role.color}15`, color: role.color }}>
                        <Shield size={18} />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className={`text-sm font-extrabold leading-tight ${isActive ? 'text-emerald-900' : 'text-slate-700'}`}>{role.name}</span>
                        <span className="text-xs font-semibold text-slate-400">{role.users} pengguna</span>
                      </div>
                    </div>
                    <ChevronRight size={18} className={`transition-transform duration-300 ${isActive ? 'text-emerald-500 translate-x-1' : 'text-slate-300 group-hover:text-slate-500'}`} />
                  </div>
                );
              })}
              {filteredRoles.length === 0 && (
                <div className="text-center py-10 text-slate-400 text-sm font-medium">Peran tidak ditemukan</div>
              )}
            </div>
          </div>

          {/* Right Panel — Role Detail */}
          {selectedRole ? (
          <div className="flex-1 w-full flex flex-col gap-6">
            
            {/* Header & Stats Container */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Role Identity Card */}
              <div className="lg:col-span-2 bg-white rounded-3xl p-6 md:p-8 border border-slate-200/60 shadow-xl shadow-slate-200/40 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 blur-[60px] opacity-20 pointer-events-none transition-all group-hover:scale-150" style={{ backgroundColor: selectedRole.color }}></div>
                
                <div className="flex flex-col h-full justify-between relative z-10">
                  <div className="flex items-start justify-between mb-8 gap-4">
                    <div className="flex-1">
                      <input 
                        type="text" 
                        className="text-2xl md:text-3xl font-black text-slate-800 leading-tight mb-2 bg-transparent border-b-2 border-transparent hover:border-slate-200 focus:border-emerald-500 focus:outline-none transition-colors w-full rounded-none px-0"
                        value={selectedRole.name} 
                        onChange={e => setSelectedRole({...selectedRole, name: e.target.value})}
                        placeholder="Nama Peran"
                      />
                      <input 
                        type="text"
                        className="text-sm font-medium text-slate-500 bg-transparent border-b-2 border-transparent hover:border-slate-200 focus:border-emerald-500 focus:outline-none transition-colors w-full rounded-none px-0"
                        value={selectedRole.description}
                        onChange={e => setSelectedRole({...selectedRole, description: e.target.value})}
                        placeholder="Deskripsi singkat mengenai peran ini"
                      />
                    </div>
                    <div className="flex flex-col items-end gap-3 shrink-0">
                      <div className="flex items-center gap-2 p-1.5 bg-slate-50 rounded-xl border border-slate-100">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2">Warna</label>
                        <input 
                          type="color" 
                          value={selectedRole.color} 
                          onChange={e => setSelectedRole({...selectedRole, color: e.target.value})}
                          className="w-8 h-8 p-0 border-0 rounded-lg cursor-pointer bg-transparent"
                          title="Warna Peran"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <button onClick={saveConfiguration} disabled={isSaving} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3.5 rounded-2xl text-sm font-bold transition-all shadow-md hover:shadow-lg hover:shadow-emerald-600/20 hover:-translate-y-0.5 disabled:opacity-50 disabled:transform-none">
                      {isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}
                    </button>
                    {selectedRole.id !== 'new' && (
                      <button onClick={deleteRole} className="p-3.5 rounded-2xl text-red-500 hover:text-white hover:bg-red-600 border-2 border-red-100 hover:border-red-600 transition-all bg-red-50 shadow-sm" title="Hapus Peran">
                        <Trash2 size={20} />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Stats Card */}
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 border border-slate-700 shadow-xl shadow-slate-900/20 text-white flex flex-col justify-center relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/20 rounded-full blur-[40px]"></div>
                
                <div className="space-y-6 relative z-10">
                  <div>
                    <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Pengguna Aktif</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-black text-white">{selectedRole.users}</span>
                      <span className="text-sm font-medium text-slate-400">akun</span>
                    </div>
                  </div>
                  
                  <div className="h-px w-full bg-slate-700/50"></div>
                  
                  <div>
                    <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Hak Akses Modul</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-amber-400">{totalPerms}</span>
                      <span className="text-sm font-medium text-slate-400">/ {totalAvailable} izin aktif</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Permission Matrix */}
            <div className="bg-white rounded-3xl border border-slate-200/60 shadow-xl shadow-slate-200/40 overflow-hidden">
              <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-800 tracking-tight">Matriks Akses & Izin</h3>
                  <p className="text-sm text-slate-500 font-medium mt-1">Konfigurasi hak akses untuk setiap modul dalam sistem.</p>
                </div>
                <div className="shrink-0">
                  <span className="inline-flex items-center px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-bold shadow-sm">
                    {totalPerms} Izin Diberikan
                  </span>
                </div>
              </div>

              <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50/30">
                {Object.entries(allPermissions).map(([module, perms]) => {
                  const activeCount = selectedRole.permissions[module]?.length || 0;
                  const progressPercentage = (activeCount / perms.length) * 100;
                  const isFullyActive = activeCount === perms.length;

                  return (
                    <div key={module} className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                      <button 
                        className="w-full flex items-center justify-between p-5 focus:outline-none bg-gradient-to-b from-white to-slate-50/50"
                        onClick={() => toggleModule(module)}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${isFullyActive ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                            <Shield size={16} />
                          </div>
                          <div className="flex flex-col items-start">
                            <span className="text-base font-bold text-slate-800">{module}</span>
                            <span className="text-xs font-semibold text-slate-400">
                              {activeCount} dari {perms.length} diaktifkan
                            </span>
                          </div>
                        </div>
                        <ChevronDown 
                          size={20} 
                          className={`text-slate-400 transition-transform duration-300 ${expandedModules[module] ? 'rotate-180 text-emerald-500' : 'group-hover:text-slate-600'}`}
                        />
                      </button>
                      
                      <div className={`transition-all duration-300 ease-in-out ${expandedModules[module] ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                        <div className="p-5 pt-0 border-t border-slate-100 bg-slate-50/50">
                          <div className="flex items-center gap-2 mb-4 mt-4">
                            <div className="h-1.5 flex-1 bg-slate-200 rounded-full overflow-hidden">
                              <div 
                                className={`h-full transition-all duration-700 rounded-full ${isFullyActive ? 'bg-emerald-500' : 'bg-emerald-400'}`}
                                style={{ width: `${progressPercentage}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-2.5">
                            {perms.map(perm => {
                              const enabled = hasPermission(module, perm);
                              return (
                                <button 
                                  key={perm} 
                                  onClick={() => togglePermission(module, perm)}
                                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border-2 transition-all cursor-pointer ${enabled ? 'bg-emerald-50 border-emerald-500 shadow-sm shadow-emerald-500/10' : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'}`}
                                >
                                  <div className={`w-4 h-4 rounded flex items-center justify-center shrink-0 transition-colors ${enabled ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-transparent'}`}>
                                    <Check size={10} strokeWidth={4} />
                                  </div>
                                  <span className={`text-sm font-bold ${enabled ? 'text-emerald-900' : 'text-slate-600'}`}>{perm}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
          ) : (
            <div className="flex-1 w-full bg-white/50 backdrop-blur-xl rounded-3xl border border-slate-200/50 shadow-xl flex flex-col items-center justify-center p-20 text-center relative overflow-hidden h-[600px]">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-slate-50/50 pointer-events-none"></div>
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6 shadow-inner relative z-10">
                <Shield size={40} className="text-slate-300" />
              </div>
              <h2 className="text-2xl font-bold text-slate-700 mb-2 relative z-10">Tidak Ada Peran Terpilih</h2>
              <p className="text-slate-500 max-w-md font-medium relative z-10">Silakan pilih peran dari daftar di sebelah kiri untuk melihat detail konfigurasi, atau tekan tombol "Buat Peran Baru".</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoleConfig;
