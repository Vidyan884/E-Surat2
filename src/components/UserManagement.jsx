import React, { useState } from 'react';
import { Search, ChevronDown, MoreVertical, UserPlus, Eye, Edit3, Trash2 } from 'lucide-react';
import { useToast } from './Toast';
import EmptyState from './EmptyState';
import ConfirmModal from './ConfirmModal';
import './UserManagement.css';

const usersData = [
  {
    id: 1,
    initials: 'AH',
    name: 'Ahmad Hidayat',
    email: 'ahmad.h@unia.ac.id',
    unit: 'Fasilkom',
    role: 'Super Admin',
    status: 'Active',
    color: '#6366f1',
  },
  {
    id: 2,
    initials: 'SS',
    name: 'Siti Surya',
    email: 'siti.s@unia.ac.id',
    unit: 'Rektorat',
    role: 'Admin Persuratan',
    status: 'Active',
    color: '#8b5cf6',
  },
  {
    id: 3,
    initials: 'BW',
    name: 'Budi Wibowo',
    email: 'budi.w@unia.ac.id',
    unit: 'Fasilkom',
    role: 'Reviewer',
    status: 'Inactive',
    color: '#64748b',
  },
  {
    id: 4,
    initials: 'DN',
    name: 'Dina Ningsih',
    email: 'dina.n@unia.ac.id',
    unit: 'HRD',
    role: 'Staff',
    status: 'Active',
    color: '#6366f1',
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
    <div className="um-container">
      {/* Page Header */}
      <div className="um-page-header">
        <div className="um-page-title-area">
          <h1 className="um-title">User Management</h1>
          <p className="um-subtitle">Manage system access, roles, and administrative accounts.</p>
        </div>
        <button className="um-btn-create">
          <UserPlus size={16} />
          Create New User
        </button>
      </div>

      {/* Filter Bar */}
      <div className="um-filter-bar">
        <div className="um-search-box">
          <Search size={16} className="um-search-icon" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="um-search-input"
          />
        </div>
        <div className="um-filter-dropdowns">
          <div className="um-select-wrapper">
            <select
              value={selectedUnit}
              onChange={(e) => setSelectedUnit(e.target.value)}
              className="um-select"
            >
              <option>All Units</option>
              <option>Fasilkom</option>
              <option>Rektorat</option>
              <option>HRD</option>
            </select>
            <ChevronDown size={14} className="um-select-arrow" />
          </div>
          <div className="um-select-wrapper">
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="um-select"
            >
              <option>All Roles</option>
              <option>Super Admin</option>
              <option>Admin Persuratan</option>
              <option>Reviewer</option>
              <option>Staff</option>
            </select>
            <ChevronDown size={14} className="um-select-arrow" />
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="um-table-wrapper">
        <table className="um-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Unit/Department</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr><td colSpan="6"><EmptyState type="search" /></td></tr>
            ) : (filteredUsers.map((user) => (
              <tr key={user.id} className="clickable-row" onClick={() => setActiveTab('user-detail')}>
                <td>
                  <div className="um-user-cell">
                    <div
                      className="um-avatar"
                      style={{ backgroundColor: user.color + '18', color: user.color }}
                    >
                      {user.initials}
                    </div>
                    <span className="um-user-name">{user.name}</span>
                  </div>
                </td>
                <td className="um-text-muted">{user.email}</td>
                <td className="um-text-muted">{user.unit}</td>
                <td className="um-text-default">{user.role}</td>
                <td>
                  <span className={`um-status-badge ${user.status === 'Active' ? 'active' : 'inactive'}`}>
                    {user.status}
                  </span>
                </td>
                <td>
                  <div className="um-actions-cell" style={{ position: 'relative' }}>
                    <button 
                      className="um-action-btn" 
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        setOpenMenu(openMenu === user.id ? null : user.id); 
                      }}
                    >
                      <MoreVertical size={16} />
                    </button>
                    {openMenu === user.id && (
                      <div className="um-dropdown-menu">
                        <button className="um-dropdown-item" onClick={(e) => { e.stopPropagation(); setActiveTab('user-detail'); setOpenMenu(null); }}>
                          <Eye size={14} /> View Detail
                        </button>
                        <button className="um-dropdown-item" onClick={(e) => { e.stopPropagation(); setOpenMenu(null); }}>
                          <Edit3 size={14} /> Edit User
                        </button>
                        <button className="um-dropdown-item danger" onClick={(e) => { e.stopPropagation(); setDeleteModal({ open: true, userName: user.name }); setOpenMenu(null); }}>
                          <Trash2 size={14} /> Delete
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

      {/* Pagination */}
      <div className="um-pagination">
        <span className="um-pagination-info">
          Showing 1 to {filteredUsers.length} of 24 users
        </span>
        <div className="um-pagination-controls">
          <button
            className="um-page-btn"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Prev
          </button>
          <button
            className="um-page-btn"
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>

      <ConfirmModal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, userName: '' })}
        onConfirm={() => addToast('User berhasil dihapus.', 'success')}
        title="Hapus User?"
        message="Anda yakin ingin menghapus user ini? Aksi ini tidak dapat dibatalkan."
        confirmText="Ya, Hapus"
        type="danger"
      />
    </div>
  );
};

export default UserManagement;
