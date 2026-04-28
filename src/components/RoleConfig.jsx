import React, { useState } from 'react';
import { 
  Plus, MoreVertical, Shield, Users, Eye, Edit3, Trash2, 
  ChevronDown, ChevronRight, Check, X, Search
} from 'lucide-react';
import './RoleConfig.css';

const rolesData = [
  {
    id: 1,
    name: 'Super Admin',
    description: 'Full system access with all administrative privileges',
    users: 2,
    color: '#dc2626',
    permissions: {
      'Surat Masuk': ['View', 'Register', 'Archive', 'Dispose'],
      'Surat Keluar': ['Draft', 'Sign', 'Bypass Verification'],
      'User Management': ['View', 'Create', 'Edit', 'Delete'],
      'Produk Hukum': ['Access', 'Create', 'Harmonize'],
      'System': ['View Logs', 'Configure Roles', 'Backup'],
    },
  },
  {
    id: 2,
    name: 'Admin Persuratan',
    description: 'Manages incoming and outgoing correspondence',
    users: 5,
    color: '#1e3a8a',
    permissions: {
      'Surat Masuk': ['View', 'Register', 'Archive', 'Dispose'],
      'Surat Keluar': ['Draft', 'Sign'],
      'User Management': [],
      'Produk Hukum': [],
      'System': ['View Logs'],
    },
  },
  {
    id: 3,
    name: 'Reviewer',
    description: 'Reviews and verifies documents before approval',
    users: 8,
    color: '#7c3aed',
    permissions: {
      'Surat Masuk': ['View'],
      'Surat Keluar': ['Draft'],
      'User Management': [],
      'Produk Hukum': ['Access'],
      'System': [],
    },
  },
  {
    id: 4,
    name: 'Dean Level Signatory',
    description: 'Authorized to sign documents at faculty dean level',
    users: 4,
    color: '#0891b2',
    permissions: {
      'Surat Masuk': ['View', 'Dispose'],
      'Surat Keluar': ['Draft', 'Sign'],
      'User Management': [],
      'Produk Hukum': ['Access'],
      'System': [],
    },
  },
  {
    id: 5,
    name: 'Staff',
    description: 'Basic access for general staff members',
    users: 24,
    color: '#64748b',
    permissions: {
      'Surat Masuk': ['View'],
      'Surat Keluar': [],
      'User Management': [],
      'Produk Hukum': [],
      'System': [],
    },
  },
  {
    id: 6,
    name: 'Department Head View',
    description: 'Read-only access to department-level documents',
    users: 6,
    color: '#059669',
    permissions: {
      'Surat Masuk': ['View'],
      'Surat Keluar': ['Draft'],
      'User Management': [],
      'Produk Hukum': ['Access'],
      'System': [],
    },
  },
];

const allPermissions = {
  'Surat Masuk': ['View', 'Register', 'Archive', 'Dispose'],
  'Surat Keluar': ['Draft', 'Sign', 'Bypass Verification'],
  'User Management': ['View', 'Create', 'Edit', 'Delete'],
  'Produk Hukum': ['Access', 'Create', 'Harmonize'],
  'System': ['View Logs', 'Configure Roles', 'Backup'],
};

const RoleConfig = () => {
  const [selectedRole, setSelectedRole] = useState(rolesData[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedModules, setExpandedModules] = useState(
    Object.keys(allPermissions).reduce((acc, key) => ({ ...acc, [key]: true }), {})
  );

  const filteredRoles = rolesData.filter(role =>
    role.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleModule = (module) => {
    setExpandedModules(prev => ({ ...prev, [module]: !prev[module] }));
  };

  const hasPermission = (module, perm) => {
    return selectedRole.permissions[module]?.includes(perm) || false;
  };

  const totalPerms = Object.values(selectedRole.permissions).flat().length;
  const totalAvailable = Object.values(allPermissions).flat().length;

  return (
    <div className="rc-container">
      {/* Page Header */}
      <div className="rc-page-header">
        <div>
          <h1 className="rc-title">Role Configuration</h1>
          <p className="rc-subtitle">Define access levels and permission sets for system roles.</p>
        </div>
        <button className="rc-btn-create">
          <Plus size={16} />
          Create New Role
        </button>
      </div>

      {/* Main Layout */}
      <div className="rc-layout">
        {/* Left Panel — Role List */}
        <div className="rc-roles-panel">
          <div className="rc-roles-search">
            <Search size={15} className="rc-search-icon" />
            <input
              type="text"
              placeholder="Search roles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rc-search-input"
            />
          </div>
          <div className="rc-roles-list">
            {filteredRoles.map(role => (
              <div 
                key={role.id}
                className={`rc-role-item ${selectedRole.id === role.id ? 'active' : ''}`}
                onClick={() => setSelectedRole(role)}
              >
                <div className="rc-role-item-left">
                  <div 
                    className="rc-role-dot" 
                    style={{ backgroundColor: role.color }}
                  ></div>
                  <div className="rc-role-info">
                    <span className="rc-role-name">{role.name}</span>
                    <span className="rc-role-users">{role.users} users</span>
                  </div>
                </div>
                <ChevronRight size={16} className="rc-role-arrow" />
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel — Role Detail */}
        <div className="rc-detail-panel">
          {/* Role Header */}
          <div className="rc-detail-header">
            <div className="rc-detail-header-left">
              <div 
                className="rc-detail-icon"
                style={{ backgroundColor: `${selectedRole.color}15`, color: selectedRole.color }}
              >
                <Shield size={20} />
              </div>
              <div>
                <h2 className="rc-detail-name">{selectedRole.name}</h2>
                <p className="rc-detail-desc">{selectedRole.description}</p>
              </div>
            </div>
            <div className="rc-detail-actions">
              <button className="rc-btn-icon" title="Edit Role">
                <Edit3 size={16} />
              </button>
              <button className="rc-btn-icon danger" title="Delete Role">
                <Trash2 size={16} />
              </button>
            </div>
          </div>

          {/* Stats Row */}
          <div className="rc-stats-row">
            <div className="rc-stat-card">
              <span className="rc-stat-value">{selectedRole.users}</span>
              <span className="rc-stat-label">Assigned Users</span>
            </div>
            <div className="rc-stat-card">
              <span className="rc-stat-value">{totalPerms}</span>
              <span className="rc-stat-label">Active Permissions</span>
            </div>
            <div className="rc-stat-card">
              <span className="rc-stat-value">{Object.keys(allPermissions).length}</span>
              <span className="rc-stat-label">Modules Access</span>
            </div>
          </div>

          {/* Permission Matrix */}
          <div className="rc-permissions-section">
            <div className="rc-perm-header">
              <h3 className="rc-perm-title">Permission Matrix</h3>
              <span className="rc-perm-count">{totalPerms} / {totalAvailable} permissions enabled</span>
            </div>

            <div className="rc-modules">
              {Object.entries(allPermissions).map(([module, perms]) => {
                const activeCount = selectedRole.permissions[module]?.length || 0;
                return (
                  <div key={module} className="rc-module">
                    <button 
                      className="rc-module-header"
                      onClick={() => toggleModule(module)}
                    >
                      <div className="rc-module-left">
                        <ChevronDown 
                          size={16} 
                          className={`rc-module-chevron ${expandedModules[module] ? 'open' : ''}`}
                        />
                        <span className="rc-module-name">{module}</span>
                        <span className="rc-module-count">
                          {activeCount}/{perms.length}
                        </span>
                      </div>
                      <div className="rc-module-bar">
                        <div 
                          className="rc-module-bar-fill"
                          style={{ 
                            width: `${(activeCount / perms.length) * 100}%`,
                            backgroundColor: activeCount === perms.length ? '#22c55e' : '#1e3a8a'
                          }}
                        ></div>
                      </div>
                    </button>
                    {expandedModules[module] && (
                      <div className="rc-perm-grid">
                        {perms.map(perm => {
                          const enabled = hasPermission(module, perm);
                          return (
                            <div key={perm} className={`rc-perm-item ${enabled ? 'enabled' : 'disabled'}`}>
                              <div className={`rc-perm-check ${enabled ? 'on' : ''}`}>
                                {enabled ? <Check size={12} /> : <X size={12} />}
                              </div>
                              <span className="rc-perm-label">{perm}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="rc-detail-footer">
            <button className="rc-btn-reset">Reset Changes</button>
            <button className="rc-btn-save">Save Configuration</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleConfig;
