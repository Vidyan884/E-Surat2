import React, { useState } from 'react';
import { Search, ChevronDown, MoreVertical, UserPlus, Eye, Edit3, Trash2 } from 'lucide-react';
import { useToast } from '../components/Toast';
import EmptyState from '../components/EmptyState';
import ConfirmModal from '../components/ConfirmModal';

const usersData = [
  {
    id: 1,
    initials: 'AH',
    name: 'Ahmad Hidayat',
    email: 'ahmad.h@unia.ac.id',
    unit: 'Fasilkom',
    role: 'Super Admin',
    status: 'Active',
    color: '#10b981', // emerald-500
  },
  {
    id: 2,
    initials: 'SS',
    name: 'Siti Surya',
    email: 'siti.s@unia.ac.id',
    unit: 'Rektorat',
    role: 'Admin Persuratan',
    status: 'Active',
    color: '#3b82f6', // blue-500
  },
  {
    id: 3,
    initials: 'BW',
    name: 'Budi Wibowo',
    email: 'budi.w@unia.ac.id',
    unit: 'Fasilkom',
    role: 'Reviewer',
    status: 'Inactive',
    color: '#64748b', // slate-500
  },
  {
    id: 4,
    initials: 'DN',
    name: 'Dina Ningsih',
    email: 'dina.n@unia.ac.id',
    unit: 'HRD',
    role: 'Staff',
    status: 'Active',
    color: '#8b5cf6', // violet-500
  },
];

const UserManagement = ({ setActiveTab }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('All Units');
  const [selectedRole, setSelectedRole] = useState('All Roles');
  const [currentPage, setCurrentPage] = useState(1);
  const [openMenu, setOpenMenu] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ open: false, userName: '' });
  const { addToast } = useToast();

  const filteredUsers = usersData.filter((user) => {
    const matchSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchUnit = selectedUnit === 'All Units' || user.unit === selectedUnit;
    const matchRole = selectedRole === 'All Roles' || user.role === selectedRole;
    return matchSearch && matchUnit && matchRole;
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
            placeholder="Cari berdasarkan nama atau email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 transition-all"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-48 shrink-0">
            <select
              value={selectedUnit}
              onChange={(e) => setSelectedUnit(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 appearance-none transition-all cursor-pointer"
            >
              <option>All Units</option>
              <option>Fasilkom</option>
              <option>Rektorat</option>
              <option>HRD</option>
            </select>
            <ChevronDown size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
          <div className="relative flex-1 md:w-48 shrink-0">
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 appearance-none transition-all cursor-pointer"
            >
              <option>All Roles</option>
              <option>Super Admin</option>
              <option>Admin Persuratan</option>
              <option>Reviewer</option>
              <option>Staff</option>
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
                <th className="px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Email</th>
                <th className="px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Unit/Department</th>
                <th className="px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Role</th>
                <th className="px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-8">
                    <EmptyState type="search" />
                  </td>
                </tr>
              ) : (filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-emerald-50/50 transition-colors group cursor-pointer" onClick={() => setActiveTab('user-detail')}>
                  <td className="px-5 py-4 align-middle">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 border"
                        style={{ backgroundColor: user.color + '15', color: user.color, borderColor: user.color + '30' }}
                      >
                        {user.initials}
                      </div>
                      <span className="text-sm font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 align-middle text-sm text-slate-500 font-medium">{user.email}</td>
                  <td className="px-5 py-4 align-middle text-sm text-slate-500">{user.unit}</td>
                  <td className="px-5 py-4 align-middle">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-5 py-4 align-middle">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-semibold ${user.status === 'Active' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                      {user.status}
                    </span>
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
                          <button className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 flex items-center gap-3 transition-colors font-medium" onClick={(e) => { e.stopPropagation(); setOpenMenu(null); }}>
                            <Edit3 size={16} className="text-slate-400" /> Edit User
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
    </div>
  );
};

export default UserManagement;
