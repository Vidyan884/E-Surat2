import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, MoreVertical, UserPlus, Eye, Edit3, Trash2, X } from 'lucide-react';
import { useToast } from '../components/Toast';
import { useAuth } from '../contexts/AuthContext';
import EmptyState from '../components/EmptyState';
import ConfirmModal from '../components/ConfirmModal';

const UserManagement = ({ setActiveTab }) => {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [allRoles, setAllRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('All Roles');
  const [currentPage, setCurrentPage] = useState(1);
  const [openMenu, setOpenMenu] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ open: false, userName: '' });
  
  // Edit Roles Modal State
  const [editRoleModal, setEditRoleModal] = useState({ open: false, user: null, selectedRoles: [] });
  
  const { addToast } = useToast();

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [usersRes, rolesRes] = await Promise.all([
        fetch('/api/users', { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch('/api/users/roles', { headers: { 'Authorization': `Bearer ${token}` } })
      ]);
      if (usersRes.ok && rolesRes.ok) {
        setUsers(await usersRes.json());
        setAllRoles(await rolesRes.json());
      }
    } catch (err) {
      console.error('Failed to fetch data', err);
      addToast('Gagal mengambil data dari server', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const handleUpdateRoles = async () => {
    try {
      const res = await fetch(`/api/users/${editRoleModal.user.id}/roles`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ roles: editRoleModal.selectedRoles })
      });
      if (res.ok) {
        addToast('Roles berhasil diperbarui!', 'success');
        setEditRoleModal({ open: false, user: null, selectedRoles: [] });
        fetchData();
      } else {
        throw new Error('Update failed');
      }
    } catch (err) {
      addToast('Gagal memperbarui roles', 'error');
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase());
    
    const userRoleNames = user.roles?.map(r => r.name) || [];
    const matchRole = selectedRole === 'All Roles' || userRoleNames.includes(selectedRole);
    
    return matchSearch && matchRole;
  });

  return (
    <div className="p-4 md:p-6 lg:p-8 w-full max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-60 pointer-events-none"></div>
        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">User Management</h1>
          <p className="text-slate-500 mt-1.5 text-sm md:text-base max-w-lg">Kelola akses sistem, role, dan akun administratif.</p>
        </div>
        <div className="relative z-10 shrink-0">
          <button className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5">
            <UserPlus size={18} />
            Tambah User Baru
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Cari berdasarkan nama atau username..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 transition-all"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-48 shrink-0">
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 appearance-none transition-all cursor-pointer"
            >
              <option>All Roles</option>
              {allRoles.map(r => (
                <option key={r.id} value={r.name}>{r.name}</option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-visible">
        <div className="overflow-x-auto min-h-[300px]">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Name</th>
                <th className="px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Username</th>
                <th className="px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Roles</th>
                <th className="px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan="4" className="py-8 text-center text-slate-500">Memuat data...</td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-8">
                    <EmptyState type="search" />
                  </td>
                </tr>
              ) : (filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-emerald-50/50 transition-colors group cursor-pointer">
                  <td className="px-5 py-4 align-middle">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 border bg-emerald-50 text-emerald-600 border-emerald-200"
                      >
                        {user.name.substring(0, 2).toUpperCase()}
                      </div>
                      <span className="text-sm font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 align-middle text-sm text-slate-500 font-medium">{user.username}</td>
                  <td className="px-5 py-4 align-middle">
                    <div className="flex flex-wrap gap-1">
                      {user.roles?.map(r => (
                        <span key={r.id} className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                          {r.name}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-5 py-4 align-middle text-center relative">
                    <div className="inline-flex relative">
                      <button 
                        className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-700 hover:bg-emerald-100 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                        onClick={(e) => { 
                          e.stopPropagation(); 
                          setOpenMenu(openMenu === user.id ? null : user.id); 
                        }}
                      >
                        <MoreVertical size={18} />
                      </button>
                      
                      {openMenu === user.id && (
                        <div className="absolute right-0 top-10 mt-1 w-48 bg-white rounded-xl shadow-xl shadow-slate-200/60 border border-slate-100 py-1.5 z-50 flex flex-col transform origin-top-right transition-all">
                          <button className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 flex items-center gap-3 transition-colors font-medium" onClick={(e) => { e.stopPropagation(); setActiveTab('user-detail'); setOpenMenu(null); }}>
                            <Eye size={16} className="text-slate-400" /> View Detail
                          </button>
                          <button 
                            className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 flex items-center gap-3 transition-colors font-medium" 
                            onClick={(e) => { 
                              e.stopPropagation(); 
                              setEditRoleModal({ open: true, user, selectedRoles: user.roles?.map(r => r.name) || [] }); 
                              setOpenMenu(null); 
                            }}
                          >
                            <Edit3 size={16} className="text-slate-400" /> Edit Roles
                          </button>
                          <div className="my-1 border-t border-slate-100"></div>
                          <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors font-medium" onClick={(e) => { e.stopPropagation(); setDeleteModal({ open: true, userName: user.name }); setOpenMenu(null); }}>
                            <Trash2 size={16} /> Delete User
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              )))}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-slate-500">
            Menampilkan <strong className="text-slate-800">1</strong> sampai <strong className="text-slate-800">{filteredUsers.length}</strong> dari <strong className="text-slate-800">24</strong> users
          </div>
          <div className="flex items-center gap-2">
            <button
              className={`px-4 py-1.5 rounded-lg border text-sm font-semibold transition-colors ${currentPage === 1 ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-emerald-600'}`}
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Prev
            </button>
            <button
              className="px-4 py-1.5 rounded-lg border bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-emerald-600 text-sm font-semibold transition-colors"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, userName: '' })}
        onConfirm={() => addToast('User berhasil dihapus.', 'success')}
        title="Hapus User?"
        message={`Anda yakin ingin menghapus user ${deleteModal.userName}? Aksi ini tidak dapat dibatalkan.`}
        confirmText="Ya, Hapus"
        type="danger"
      />

      {/* Edit Role Modal */}
      {editRoleModal.open && (
        <div className="fixed inset-0 z-[5000] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-800">Edit Roles: {editRoleModal.user?.name}</h3>
              <button 
                onClick={() => setEditRoleModal({ open: false, user: null, selectedRoles: [] })}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-5 max-h-[60vh] overflow-y-auto">
              <p className="text-sm text-slate-500 mb-4">Pilih peran/akses yang ingin diberikan ke pengguna ini. Satu pengguna dapat memiliki lebih dari satu peran.</p>
              <div className="flex flex-col gap-2">
                {allRoles.map(role => {
                  const isChecked = editRoleModal.selectedRoles.includes(role.name);
                  return (
                    <label key={role.id} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${isChecked ? 'bg-emerald-50 border-emerald-200' : 'bg-white border-slate-200 hover:bg-slate-50'}`}>
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 border-slate-300"
                        checked={isChecked}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setEditRoleModal(prev => ({ ...prev, selectedRoles: [...prev.selectedRoles, role.name] }));
                          } else {
                            setEditRoleModal(prev => ({ ...prev, selectedRoles: prev.selectedRoles.filter(r => r !== role.name) }));
                          }
                        }}
                      />
                      <span className={`text-sm font-semibold ${isChecked ? 'text-emerald-800' : 'text-slate-700'}`}>{role.name}</span>
                    </label>
                  );
                })}
              </div>
            </div>
            <div className="p-5 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
              <button 
                onClick={() => setEditRoleModal({ open: false, user: null, selectedRoles: [] })}
                className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-200 bg-slate-100 rounded-xl transition-colors"
              >
                Batal
              </button>
              <button 
                onClick={handleUpdateRoles}
                className="px-5 py-2 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm transition-colors"
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
